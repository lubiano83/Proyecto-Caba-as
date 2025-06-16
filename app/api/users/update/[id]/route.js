import { NextResponse } from "next/server";
import UsersDao from "@/app/dao/user.dao";

const userDao = new UsersDao();

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const user = await userDao.getById(id);
        if(!user) return NextResponse.json({ message: "Usuario no encontrado.." }, { status: 404 });
        const { first_name, last_name, phone, address } = await request.json();
        const { country, state, city, street, number } = address;
        if(!first_name || !last_name || !phone || !country || !state || !city || !street || !number) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
        const phoneRegex = /^\+569\d{8}$/;
        if (!phoneRegex.test(phone)) return NextResponse.json({ message: "Debes ingresar un telefono válido.." }, { status: 400 });
        const updatedUser = { first_name: String(first_name).toLowerCase().trim(), last_name: String(last_name).toLowerCase().trim(), phone: String(phone).trim(), address: { country: String(country).toLowerCase().trim(), state: String(state).toLowerCase().trim(), city: String(city).toLowerCase().trim(), street: String(street).toLowerCase().trim(), number: String(number).toLowerCase().trim() }};
        if(isNaN(Number(number))) return NextResponse.json({ message: "El campo number debe ser tipo numero.." }, { status: 400 });
        if(number <= 0 || number !== Math.floor(number)) return NextResponse.json({ message: "El numero debe ser entero y mayor que cero.." });
        await userDao.updateById(id, updatedUser);
        const userUpdated = await userDao.getById(id);
        return NextResponse.json({ message: "Usuario actualizado con exito..", payload: userUpdated });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}