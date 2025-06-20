import { NextResponse } from "next/server";
import LodgeDao from "@/app/dao/lodge.dao";

const lodgeDao = new LodgeDao();

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const lodge = await lodgeDao.getById(id);
        return NextResponse.json({ message: "Lodge obtenido por el id..", payload: lodge }, { status: 200 });
    } catch (error) {
         return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}