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

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const { name, size, bedroom, bathroom, capacity, wifi, season } = await request.json();
        const { high, medium, low } = season;
        if(!name || !size || !bedroom || !bathroom || !capacity || !high || !medium || !low) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
        const updatedLodge = { name: String(name).toLowerCase().trim(), size: Number(size), bedroom: Number(bedroom), bathroom: Number(bathroom), capacity: Number(capacity), high: Number(high), medium: Number(medium), low: Number(low)};
        if(isNaN(Number(size)) || isNaN(Number(bedroom)) || isNaN(Number(bathroom)) || isNaN(Number(capacity)) || isNaN(Number(high)) || isNaN(Number(medium)) || isNaN(Number(low))) return NextResponse.json({ message: "Los campos: size, bedroom, bathroom, capacity, high, medium y low, deben ser tipo number.." });
        await lodgeDao.updateById(id, updatedLodge);
        const lodge = await lodgeDao.getById(id);
        console.log(lodge)
        return NextResponse.json({ message: "Lodge actualizado con exito..", payload: lodge }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await lodgeDao.deleteById(id);
        return NextResponse.json({ message: "Lodge eliminado con exito.." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}