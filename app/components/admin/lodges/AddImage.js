"use client";
import useLodge from "@/app/hooks/useLodge";
import Boton from "../../Boton";
import GoBack from "../../GoBack";
import Title from "../../Title";

export default function AddImage({ id }) {

    const { addImageToLodgeById, setImage } = useLodge();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await addImageToLodgeById(id);
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-xl p-8 flex flex-col justify-center items-center gap-4 min-w-72 w-1/2 shadow-sm shadow-gray-700 max-w-xl bg-light">
            <Title>Agregar Imagen:</Title>
            <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} placeholder="Selecciona una imagen..." className={`border-2 rounded-lg bg-white px-2 py-1 w-full`} />
            <div className="flex justify-center items-center gap-2">
                <GoBack path={"/pages/admin/lodges"} />
                <Boton type="submit">Guardar</Boton>
            </div>
        </form>
    )
};