import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import SessionsDao from "@/app/dao/session.dao";

const sessionDao = new SessionsDao();

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(process.env.COOKIE_NAME)?.value;
        if (!token) return NextResponse.json({ message: "Token no encontrado, sesión cerrada.." }, { status: 401 });
        cookieStore.set({ name: process.env.COOKIE_NAME, value: "", maxAge: 0, httpOnly: true, secure: false, sameSite: "lax", path: "/" });
        await sessionDao.delete(token);
        return NextResponse.json({ message: "Logout realizado con exito.." });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}