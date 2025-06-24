import { NextResponse } from "next/server";
import UsersDao from "@/app/dao/user.dao";
import { sendPasswordEmail } from "@/app/utils/nodemailer.utils";
import { generateRandomPassword } from "@/app/utils/helpers.utils";
import { createHash } from "@/app/utils/bcrypt.utils";

const userDao = new UsersDao();

export async function PATCH(request) {
    try {
        const { email } = await request.json();
        const user = await userDao.getByProperty({ email });
        if(!user) return NextResponse.json({ message: "Ese email no esta registrado.." }, { status: 404 });
        const password = generateRandomPassword(10);
        const sendPassword = await sendPasswordEmail(user[0], password);
        const hashedPassword = await createHash(password);
        if(!sendPassword) return NextResponse.json({ message: "No se pudo restablecer la contraseña, intentalo nuevamente.." }, { status: 400 });
        await userDao.updateById(user[0]._id, { loginAttempts: 0, password: hashedPassword });
        return NextResponse.json({ message: "Contraseña restablecida con exito.." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}