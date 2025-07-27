"use client";
import Reservations from "@/app/components/reservations/Reservations";
import { useParams } from "next/navigation";

export default function CreateReservationPage() {

    const { lodgeId, userId } = useParams();

    return (
        <>
            <Reservations lodgeId={lodgeId} userId={userId} />
        </>
    )
};