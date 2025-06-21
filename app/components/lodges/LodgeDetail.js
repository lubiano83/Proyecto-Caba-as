"use client";
import useLodge from "@/app/hooks/useLodge";
import { useEffect } from "react";
import Message from "../Message";
import Image from "next/image";
import Link from "next/link";
import Boton from "../Boton";
import GoBack from "../GoBack";

export default function LodgeDetail({ id }) {

    const { lodgeById, getLodgeById, clearLodge } = useLodge();

    useEffect(() => {
        clearLodge();
        getLodgeById(id);
    }, []);

    console.log("lodgeById:", lodgeById)

    return (
        <div className="h-full w-full flex flex-col justify-center items-center text-gray-700 p-8">
            { !lodgeById ? <Message>Cargando...</Message> : (
                <div className="min-w-72 w-full max-w-5xl bg-light p-4 rounded-xl shadow-sm shadow-gray-700 flex flex-col justify-center items-center gap-4">
                    <div className="w-full aspect-video relative overflow-x-auto whitespace-nowrap bg-medium">
                        <div className="flex gap-4 w-max h-full">
                           <Image src={lodgeById?.images[0]} width={300} height={300} />
                    </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full flex justify-between items-center gap-4 flex-wrap">
                            <div className="flex flex-col justify-center items-start gap-1">
                                <h3><strong>Id:</strong> {lodgeById._id}</h3>
                                <h3><strong>Nombre:</strong> {lodgeById.name}</h3>
                                <h3><strong>Capacidad:</strong> {lodgeById.capacity-1}-{lodgeById.capacity} personas</h3>
                            </div>
                            <div className="flex flex-col justify-center items-start gap-1">
                                <div className="flex justify-center items-center gap-4">
                                    <h3><strong>Piezas:</strong> {lodgeById.bedroom}</h3>
                                    <h3><strong>Baños:</strong> {lodgeById.bathroom}</h3>
                                </div>
                                <div className="flex justify-center items-center gap-4">
                                    <h3><strong>Tamaño:</strong> {lodgeById.size}</h3>
                                    <h3><strong>Wifi:</strong> {lodgeById.wifi ? "Sí" : "No"}</h3>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-start gap-1">
                                <h3><strong>T/Alta:</strong> {lodgeById.season?.high}/noche</h3>
                                <h3><strong>T/Baja:</strong> {lodgeById.season?.medium}/noche</h3>
                                <h3><strong>T/Media:</strong> {lodgeById.season?.low}/noche</h3>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <GoBack path={"/pages/lodges"} />
                            <Link href={"/"}>
                                <Boton fnc={() => alert("Reserva realizada con éxito.")}>
                                    Reservar
                                </Boton>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};