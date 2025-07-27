"use client"
import { useContext } from "react";
import { ReservationContext } from "@/app/contexts/ReservationContext";

const useReservation = () => {
    return useContext(ReservationContext);
};

export default useReservation;