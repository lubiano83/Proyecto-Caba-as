import { NextResponse } from "next/server";
import SessionDao from "@/app/dao/session.dao";

const sessionDao = new SessionDao();

export async function GET() {
    try {
       const sessions = await sessionDao.gets();
       return NextResponse.json({ message: "Todos los usuarios conectados..", payload: sessions.length }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Token inválido", error: err.message }, { status: 403 });
    }
}
