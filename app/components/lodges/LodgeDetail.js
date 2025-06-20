"use client";
import useLodge from "@/app/hooks/useLodge"
import { useEffect } from "react";
import Message from "../Message";
import Image from "next/image";
import Link from "next/link";
import Boton from "../Boton";

export default function LodgeDetail({ id }) {

    const { lodgeById, getLodgeById } = useLodge();

    console.log(lodgeById)

    useEffect(() => {
        getLodgeById(id)
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-8 text-gray-700 gap-2">
            { !lodgeById ? <Message>Cargando...</Message> : (
                <div className="min-w-72 w-[100%] max-w-md bg-light rounded-xl p-4 shadow-sm shadow-gray-700 flex flex-col justify-center items-center gap-4">
                    <div className="w-full aspect-square relative">
                        <Image src={lodgeById?.images[0] || "/house-svgrepo-com.svg"} alt="lodge image" fill priority className="object-cover object-center rounded-xl" />
                    </div>
                    <div className="w-full flex flex-col justify-center items-start">
                        <h3><strong>Id:</strong> {lodgeById?._id}</h3>
                        <h3><strong>Nombre:</strong> {lodgeById?.name}</h3>
                        <h3><strong>Piezas:</strong> {lodgeById?.bedroom}</h3>
                        <h3><strong>Baños:</strong> {lodgeById?.bathroom}</h3>
                        <h3><strong>Tamaño:</strong> {lodgeById?.size}</h3>
                        <h3><strong>Capacidad:</strong> {lodgeById?.capacity-1}-{lodgeById?.capacity} personas</h3>
                        <h3><strong>Wifi:</strong> {lodgeById?.wifi ? "Si" : "No"}</h3>
                    </div>
                    <Link href={"/"}>
                        <Boton fnc={() => alert("Reserva realizada con exito..")}>Reservar</Boton>
                    </Link>
                </div>
            )}
        </div>
    )
};