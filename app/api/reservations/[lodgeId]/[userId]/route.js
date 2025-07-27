import { NextResponse } from "next/server";
import ReservationDao from "@/app/dao/reservation.dao.js";
import UserDao from "@/app/dao/user.dao.js";
import LodgeDao from "@/app/dao/lodge.dao.js";
import SeasonDao from "@/app/dao/season.dao.js";
import { calculateTotalPrice, confirmReservationDate } from "@/app/utils/helpers.utils.js";
import { sendReservationEmail } from "@/app/utils/nodemailer.utils.js";

const reservationDao = new ReservationDao();
const userDao = new UserDao();
const lodgeDao = new LodgeDao();
const seasonDao = new SeasonDao();

export async function POST(request, { params }) {
    try {
        const { userId, lodgeId } = await params;
        const user = await userDao.getById(userId);
        if(!user) return NextResponse.json({ message: "Usuario no econtrado.." }, { status: 400 });
        // if(user.role === "admin" || user.role === "developer") return NextResponse.json({ message: "No puedes reservar una cabaña.." }, { status: 400 });
        const lodge = await lodgeDao.getById(lodgeId);
        if(!lodge) return NextResponse.json({ message: "Cabaña no econtrada.." }, { status: 404 });
        if(lodge.available === false) return NextResponse.json({ message: "Esa cabaña no esta disponible.." }, { status: 400 });
        const { people, arrive, leave } = await request.json();
        if( !people || !arrive || !leave ) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!regex.test(arrive) || !regex.test(leave)) return NextResponse.json({ message: "Las fechas deben ser en formato: YYYY-MM-DD" }, { status: 400 });
        const seasons = await seasonDao.gets();
        let price = await calculateTotalPrice(arrive, leave, lodge, seasons);
        const modifiedData = { user: userId, lodge: lodgeId, name: `${user.first_name} ${user.last_name}`, email: user.email, people: Number(people), arrive: new Date(arrive), leave: new Date(leave), price: Number(price), paid: false };
        if( isNaN(Number(people))) return NextResponse.json({ message: "El campo: people, debe ser tipo number.." }, { status: 400 });
        if(people < 1 || people > lodge.capacity) return NextResponse.json({ message: `Ese lodge tiene una capacidad maxima entre 1 y ${lodge.capacity} personas` }, { status: 400 });
        if(modifiedData.people > lodge.capacity) return NextResponse.json({ message: `La capacidad maxima es de ${lodge.capacity} personas..` }, { status: 400 });
        const reservations = await reservationDao.gets();
        console.log(reservations)
        const conflict = await confirmReservationDate(modifiedData, lodgeId, reservations);
        if (conflict) return NextResponse.json({ message: "Esta cabaña ya está reservada en las fechas seleccionadas.." }, { status: 400 });
        const emailResponse = await sendReservationEmail(modifiedData);
        if (!emailResponse.success) return NextResponse.json({ message: "Reserva creada, pero hubo un error al enviar el email.", error: emailResponse.error }, { status: 500 });
        const reservation = await reservationDao.create(modifiedData);
        await lodgeDao.updateById(lodgeId, {$push: { reservations: reservation._id }});
        await userDao.updateById(userId, {$push: { reservations: reservation._id }});
        return NextResponse.json({ message: "Reserva creada con éxito.." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
};