import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import UserDao from "../../../dao/user.dao";
import { isValidPassword } from "../../../utils/bcrypt.utils";
import jwt from "jsonwebtoken";

const userDao = new UserDao();

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if(!email || !password ) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
        const user = await userDao.getByProperty({ email });
        if (!user) return NextResponse.json({ message: "Ese usuario no está registrado.." }, { status: 404 });
        if(user[0].loginAttempts >= 3) return NextResponse.json({ message: "Tu cuenta a sido bloqueada, debes cambiar tu contraseña.." }, { status: 403 });
        const passwordMatch = await isValidPassword(user[0], String(password).trim());
        if ( !passwordMatch ) {
            user[0].loginAttempts++;
            await userDao.updateById(user[0]._id, { loginAttempts: user[0].loginAttempts });
            return NextResponse.json({ status: 401, message: "La contraseña es incorrecta.." }, { status: 401 });
        };
        const cookieStore = await cookies();
        const userLogged = cookieStore.get(process.env.COOKIE_NAME)?.value;
        if (userLogged) return NextResponse.json({ message: "Ese usuario ya está logeado.." }, { status: 400 });
        const token = jwt.sign({ id: user[0]._id, role: user[0].role, plan: user[0].plan }, process.env.COOKIE_KEY, { expiresIn: "30m" });
        cookieStore.set({ name: process.env.COOKIE_NAME, value: token, httpOnly: true, maxAge: 3600, secure: false, sameSite: "lax", path: "/" });
        await userDao.updateById(user[0]._id, { loginAttempts: 0 });
        return NextResponse.json({ message: "Login realizado con éxito", token }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}