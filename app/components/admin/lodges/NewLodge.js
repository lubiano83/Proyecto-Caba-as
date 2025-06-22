"use client";
import Boton from "../../Boton";
import GoBack from "../../GoBack";
import Title from "../../Title";
import useLodge from "@/app/hooks/useLodge";

export default function AddLodge() {

    const { createLodge, name, setName, size, setSize, bedroom, setBedroom, bathroom, setBathroom, capacity, setCapacity, high, setHigh, medium, setMedium, low, setLow } = useLodge();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await createLodge();
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-xl p-4 flex flex-col justify-center items-center gap-4 min-w-72 w-[100%] max-w-xl shadow-sm shadow-gray-700 bg-light">
            <Title>Agregar Cabaña:</Title>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la cabaña.." className={`border-2 rounded-lg bg-white px-2 py-1 w-full`} />
            <input type="number" name="size" value={size} onChange={(e) => setSize(e.target.value)} placeholder="Tamaño en mt2.." className={`border-2 rounded-lg bg-white px-2 py-1 w-full`} />
            <input type="number" name="bedroom" value={bedroom} onChange={(e) => setBedroom(e.target.value)} placeholder="Numero de piezas.." className={`border-2 rounded-lg bg-white px-2 py-1 w-full`} />
            <input type="number" name="bathroom" value={bathroom} onChange={(e) => setBathroom(e.target.value)} placeholder="Numero de baños.." className={`border-2 rounded-lg bg-white px-2 py-1 w-full`} />
            <input type="number" name="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Maximo de personas.." className={`border-2 rounded-lg bg-white px-2 py-1 w-full`} />
            <input type="number" name="high" value={high} onChange={(e) => setHigh(e.target.value)} placeholder="Precio temporada alta.." className={`border-2 rounded-lg bg-white px-2 py-1 w-full`} />
            <input type="number" name="medium" value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="Precio temporada media.." className={`border-2 rounded-lg bg-white px-2 py-1 w-full`} />
            <input type="number" name="low" value={low} onChange={(e) => setLow(e.target.value)} placeholder="Precio temporada baja.." className={`border-2 rounded-lg bg-white px-2 py-1 w-full`} />
            <div className="flex justify-center items-center gap-2">
                <GoBack path={"/pages/admin"} />
                <Boton type="submit">Agregar</Boton>
            </div>
        </form>
    )
};