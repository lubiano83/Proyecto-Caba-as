"use client";
import useLodge from "@/app/hooks/useLodge";
import Image from "next/image";
import Link from "next/link";
import Boton from "../Boton";
import Message from "../Message";

export default function Lodges() {
  const { lodges } = useLodge();

  const availableLodges = lodges?.filter((lodge) => lodge.available !== false) || [];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8 text-gray-700 gap-2">
      { !lodges ? ( <Message>Cargando...</Message> ) : availableLodges.length === 0 ? ( <Message>No hay cabañas disponibles..</Message> ) : (
          availableLodges.map((lodge) => (
            <div key={lodge._id} className="min-w-72 w-full max-w-md bg-light rounded-xl p-4 shadow-sm shadow-gray-700 flex flex-col justify-center items-center gap-4">
              <div className="w-full aspect-square relative bg-medium">
                <Image src={Array.isArray(lodge?.images) && lodge.images.length > 0 ? lodge.images[0] : "/house-svgrepo-com.svg"} alt="lodge image" fill priority className="object-cover object-center" />
              </div>
              <div className="w-full flex flex-col justify-center items-start">
                <h3><strong>Nombre:</strong> {lodge.name}</h3>
                <h3><strong>Capacidad:</strong> {lodge.capacity-1}-{lodge.capacity} personas</h3>
              </div>
              <Link href={`/pages/lodges/${lodge._id}`}>
                <Boton>Detalle</Boton>
              </Link>
            </div>
          ))
        )
      }
    </div>
  );
};