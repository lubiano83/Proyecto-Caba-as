"use client";
import useAuth from "@/app/hooks/useAuth";

export default function Admin() {

    const { quantityLogged, quantityRegistered } = useAuth();

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-8 text-gray-700 gap-2">
            <p><strong>Registrados:</strong>{quantityRegistered}</p>
            <p><strong>Online:</strong>{quantityLogged}</p>
        </div>
    )
};