"use client"
import { createContext, useEffect, useState } from "react";

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {

    const [ reservations, setReservations ] = useState(null);
    const [ arrive, setArrive ] = useState(null);
    const [ leave, setLeave ] = useState(null);
    const [ people, setPeople ] = useState("");

    useEffect(() => {
        getReservations();
    }, []);

    const getReservations = async() => {
        try {
            const response = await fetch("/api/reservations", {
                method: "GET"
            });
            const data = await response.json();
            setReservations(data.payload);
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const createReservation = async(lodgeId, userId) => {
        try {
            const formattedArrive = arrive.toISOString().split("T")[0]; // "YYYY-MM-DD"
            const formattedLeave = leave.toISOString().split("T")[0];   // "YYYY-MM-DD"

            const response = await fetch(`/api/reservations/${lodgeId}/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ people, arrive: formattedArrive, leave: formattedLeave })
            });
            if(response.ok) {
                alert("Reserva creada con exito");
                setPeople("");
                setArrive("");
                setLeave("");
                await getReservations();
                return true;
            } else {
                const error = await response.json();
                alert(error.message);
                return false;
            };
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    return (
        <ReservationContext.Provider value={{ getReservations, createReservation, reservations, arrive, setArrive, leave, setLeave, people, setPeople }}>
            {children}
        </ReservationContext.Provider>
    )
};