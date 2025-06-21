"use client";
import useLodge from "@/app/hooks/useLodge";
import { useEffect } from "react";
import Message from "../Message";
import Image from "next/image";
import Link from "next/link";
import Boton from "../Boton";
import GoBack from "../GoBack";

export default function LodgeDetail({ id }) {
    const { lodgeById, getLodgeById } = useLodge();

    useEffect(() => {
        getLodgeById(id);
    }, []);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center text-gray-700 p-8">
            { !lodgeById ? <Message>Cargando...</Message> : (
                <div className="min-w-72 w-full max-w-5xl bg-light p-4 rounded-xl shadow-sm shadow-gray-700 flex flex-col justify-center items-center gap-4">
                    <div className="w-full aspect-video relative overflow-x-auto whitespace-nowrap bg-medium">
                        <div className="flex gap-4 w-max h-full">
                            {Array.isArray(lodgeById.images) && lodgeById.images.length > 0 && (
                                lodgeById.images.map((image, index) => (
                                    <div key={index} className="relative h-full min-w-full max-w-full rounded-xl overflow-hidden">
                                        <Image src={image} alt={`Imagen ${index + 1}`} fill className="object-cover object-center" />
                                    </div>
                                ))
                            )}
                    </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full flex flex-col justify-center items-center gap-2">
                            <div className="w-full flex justify-between items-center gap-2 flex-wrap">
                                <h3><strong>Id:</strong> {lodgeById._id}</h3>
                            </div>
                            <div className="w-full flex justify-between items-center gap-2 flex-wrap">
                                <h3><strong>Piezas:</strong> {lodgeById.bedroom}</h3>
                                <h3><strong>Baños:</strong> {lodgeById.bathroom}</h3>
                                <h3><strong>Tamaño:</strong> {lodgeById.size}</h3>
                                <h3><strong>Wifi:</strong> {lodgeById.wifi ? "Sí" : "No"}</h3>
                            </div>
                            <div className="w-full flex justify-between items-center gap-2 flex-wrap">
                                <h3><strong>T/Alta:</strong> {lodgeById?.season?.high}/noche</h3>
                                <h3><strong>T/Baja:</strong> {lodgeById?.season?.medium}/noche</h3>
                                <h3><strong>T/Media:</strong> {lodgeById?.season?.low}/noche</h3>
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