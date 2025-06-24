import Link from "next/link";
import Message from "../Message";

export default function Admin() {

    return (
        <div className="w-full flex justify-center items-center gap-4">
            <Link href={"/pages/admin/lodges/add"} className="bg-light px-4 py-2 rounded-xl shadow-sm shadow-gray-700 hover:scale-105">
                <Message>Agregar</Message>
            </Link>
            <Link href={"/pages/admin/lodges"} className="bg-light px-4 py-2 rounded-xl shadow-sm shadow-gray-700 hover:scale-105">
                <Message>Cabañas</Message>
            </Link>
        </div>
    )
};