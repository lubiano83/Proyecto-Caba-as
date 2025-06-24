import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(process.env.COOKIE_NAME)?.value;
        if (!token) return NextResponse.json({ message: "No autorizado.." }, { status: 401 });
        const decoded = jwt.verify(token, process.env.COOKIE_KEY);
        const user = await userDao.getById(decoded.id);
        if (!user) return NextResponse.json({ message: "Usuario no encontrado.." }, { status: 404 });
        return NextResponse.json({ payload: user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Token inválido", error: err.message }, { status: 403 });
    }
}
