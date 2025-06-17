import { NextResponse } from "next/server";
import UserDao from "../../dao/user.dao";

const userDao = new UserDao();

export async function GET() {
    try {
        const users = await userDao.gets();
        return NextResponse.json({ message: "Todos los usuarios registrados..", payload: users.length }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}

export async function DELETE() {
    try {
        await userDao.deleteAll();
        const users = await userDao.gets();
        return NextResponse.json({ message: "Todos los usuarios eliminados..", payload: users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}