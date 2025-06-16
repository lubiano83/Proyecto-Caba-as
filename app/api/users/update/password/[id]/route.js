import { NextResponse } from "next/server";
import UsersDao from "@/app/dao/user.dao";
import { isValidPassword, createHash } from "@/app/utils/bcrypt.utils";

const userDao = new UsersDao();

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const user = await userDao.getById(id);
        if(!user) return NextResponse.json({ message: "Usuario no encontrado.." }, { status: 404 });
        if(user.loginAttempts >= 3) return NextResponse.json({ message: "Tu cuenta a sido bloqueada, debes cambiar tu contraseña.." }, { status: 403 });
        const { password, newPassword, newPasswordTwo } = await request.json();
        if(!password || !newPassword || !newPasswordTwo) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
        if(newPassword !== newPasswordTwo) return NextResponse.json({ message: "Las nuevas contraseñas deben ser identicas.." });
        const passwordMatch = await isValidPassword(user, String(password).trim());
        if ( !passwordMatch ) {
            user.loginAttempts++;
            await userDao.updateById(user._id, { loginAttempts: user.loginAttempts });
            return NextResponse.json({ message: "La contraseña es incorrecta.." }, { status: 401 });
        };
        if(String(newPassword).length < 8 || String(newPassword).length > 10) return NextResponse.json({ message: "La contraseña debe contener entre 8 a 10 caracteres.." }, { status: 400 });
        const newestPassword = await createHash(String(newPassword));
        await userDao.updateById(user._id, { loginAttempts: 0, password: newestPassword });
        return NextResponse.json({ message: "Contraseña modificada con exito.." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
};