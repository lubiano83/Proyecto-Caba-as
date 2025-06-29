import { NextResponse } from "next/server";
import SeasonDao from "@/app/dao/season.dao";

const seasonDao = new SeasonDao();

export async function GET() {
    try {
        const seasons = await seasonDao.gets();
        return NextResponse.json({ message: "Todas las temporadas..", payload: seasons }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
};

export async function POST(request) {
    try {
        await seasonDao.deleteAll();
        const { highSeasonStart, highSeasonEnd, midSeasonStart, midSeasonEnd } = await request.json();
        if(!highSeasonStart || !highSeasonEnd || !midSeasonStart || !midSeasonEnd) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
        const modifiedSeason = { highSeasonStart: String(highSeasonStart), highSeasonEnd: String(highSeasonEnd), midSeasonStart: String(midSeasonStart), midSeasonEnd: String(midSeasonEnd) };
        await seasonDao.create(modifiedSeason);
        return NextResponse.json({ message: "Temporadas creadas con exito.." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
};