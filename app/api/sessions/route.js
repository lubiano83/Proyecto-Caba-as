import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET() {
    try {
       const sessions = await userDao.gets();
       return NextResponse.json({ message: "Todos los usuarios conectados..", payload: sessions.length }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Token inválido", error: err.message }, { status: 403 });
    }
}
