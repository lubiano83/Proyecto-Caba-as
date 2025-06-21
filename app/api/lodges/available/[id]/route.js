import { NextResponse } from "next/server";
import LodgesDao from "@/app/dao/lodge.dao";

const lodgeDao = new LodgesDao();

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const lodge = await lodgeDao.getById(id);
        if(!lodge) return NextResponse.json({ message: "Ese lodge no existe.." }, { status: 404 });
        if(lodge.images.length === 0) return NextResponse.json({ message: "Debes tener al menos una imagen cargada.." }, { status: 400 });
        const changeAvailable = { available: !lodge.available };
        await lodgeDao.updateById(id, changeAvailable);
        return NextResponse.json({ message: "Available cambiado con exito.." }, { satus: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}