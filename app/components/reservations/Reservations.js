"use client";
import useReservation from "@/app/hooks/useReservation";
import Calendar from "@/app/components/reservations/Calendar";
import Title from "../Title";
import GoBack from "../GoBack";
import Boton from "../Boton";

export default function Reservations({ lodgeId, userId }) {

    const { createReservation, setArrive, setLeave, people, setPeople, reservations } = useReservation();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await createReservation( lodgeId, userId );
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-8 text-gray-700">
            <form onSubmit={handleSubmit} className="rounded-xl p-4 flex flex-col justify-center items-center gap-4 min-w-72 w-1/2 shadow-sm shadow-gray-700 max-w-xl bg-light">
                <Title>Crea tu Reserva:</Title>
                <Calendar setArrive={setArrive} setLeave={setLeave} lodgeId={lodgeId} reservations={reservations} />
                <input type="number" name="people" value={people} onChange={(e) => setPeople(e.target.value)} placeholder="Cantidad de personas.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <div className="flex justify-center items-center gap-2">
                    <GoBack path={"/pages/lodges"} />
                    <Boton type="submit">Guardar</Boton>
                </div>
            </form>
        </div>
    )
};