"use client";
import useAuth from "@/app/hooks/useAuth";
import Title from "../Title";
import Boton from "../Boton";
import GoBack from "../GoBack";

export default function ChangeImage({ id }) {

    const { ChangeImageById, setImage, image } = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await ChangeImageById(id);
    };

    return (
        <div className="h-full w-full flex justify-center items-center text-gray-700">
            <form onSubmit={handleSubmit} className="rounded-xl p-8 flex flex-col justify-center items-center gap-4 min-w-72 w-1/2 shadow-sm shadow-gray-700 max-w-xl bg-light">
                <Title>Cambiar Imagen:</Title>
                <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} placeholder="Selecciona una imagen..." className={`border-2 rounded-lg bg-white px-2 py-1 w-full`} />
                <div className="flex justify-center items-center gap-2">
                    <GoBack path={"/pages/profile"} />
                    <Boton type="submit">Guardar</Boton>
                </div>
            </form>
        </div>
    )
};