import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";
import { createHash } from "@/app/utils/bcrypt.utils";
import { generateRandomPassword } from "@/app/utils/helpers.utils";
import { sendPasswordEmail } from "@/app/utils/nodemailer.utils.js";

const userDao = new UserDao();

export async function POST(request) {
    try {
        const { first_name, last_name, email, phone, address } = await request.json();
        const { country, state, city, street, number } = address;
        if (!first_name || !last_name || !email || !phone || !country || !state || !city || !street || !number) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
        const existingUser = await userDao.getByProperty({ email });
        if (existingUser.length > 0) return NextResponse.json({ message: "Ese email ya está registrado.." }, { status: 409 });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return NextResponse.json({ message: "Debes ingresar un email válido.." }, { status: 400 });
        const phoneRegex = /^\+569\d{8}$/;
        if (!phoneRegex.test(phone)) return NextResponse.json({ message: "Debes ingresar un telefono válido.." }, { status: 400 });
        const password = generateRandomPassword(10);
        const hashedPassword =  await createHash(String(password));
        const newUser = { first_name: String(first_name).toLowerCase().trim(), last_name: String(last_name).toLowerCase().trim(), email: String(email).toLowerCase().trim(), phone: String(phone), password: hashedPassword, address: { country: String(country).toLowerCase().trim(), state: String(state).toLowerCase().trim(), city: String(city).toLowerCase().trim(), street: String(street).toLowerCase().trim(), number: String(number).trim() }};
        const sendPassword = await sendPasswordEmail(newUser, password);
        if(!sendPassword.success) return NextResponse.json({ message: "No se pudo enviar el email con la contraseña.." }, { status: 400 });
        await userDao.create(newUser);
        return NextResponse.json({ message: "Usuario registrado con exito..", payload: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}