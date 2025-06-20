import { NextResponse } from "next/server";
import LodgeDao from "@/app/dao/lodge.dao";

const lodgeDao = new LodgeDao();

export async function GET() {
    try {
        const lodges = await lodgeDao.gets();
        return NextResponse.json({ message: "Todas las cabañas..", payload: lodges }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, size, bedroom, bathroom, capacity, season } = await request.json();
        const { high, medium, low } = season;
        if(!name || !size || !bedroom || !bathroom || !capacity || !high || !medium || !low) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
        const lodgeCreated = { name: String(name).toLowerCase().trim(), size: Number(size), bedroom: Number(bedroom), bathroom: Number(bathroom), capacity: Number(capacity), season: { high: Number(high), medium: Number(medium), low: Number(low) }};
        if(isNaN(Number(size)) || isNaN(Number(bedroom)) || isNaN(Number(bathroom)) || isNaN(Number(capacity)) || isNaN(Number(high)) || isNaN(Number(medium)) || isNaN(Number(low))) return NextResponse.json({ message: "El campo: size, bedrrom, bathrrom, capacity, high, medium, low, deben ser tipo numero.." }, { status: 400 });
        await lodgeDao.create(lodgeCreated);
        return NextResponse.json({ message: "Lodge creado con exito.." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
}