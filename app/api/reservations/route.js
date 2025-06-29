import { NextResponse } from "next/server";
import ReservationDao from "@/app/dao/reservation.dao.js";

const reservationDao = new ReservationDao();

export async function GET() {
    try {
        const reservations = await reservationDao.gets();
        return NextResponse.json({ message: "Todas las reservas..", payload: reservations }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
};