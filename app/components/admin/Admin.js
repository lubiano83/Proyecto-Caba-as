import Link from "next/link";
import Message from "../Message";
import Title from "../Title";

export default function Admin() {

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 text-gray-700 gap-8">
            <Title>Administración</Title>
            <div className="w-full h-full flex justify-center items-center gap-4">
                <Link href={"/pages/admin/lodges"} className="bg-light px-4 py-2 rounded-xl shadow-sm shadow-gray-700 hover:scale-105">
                    <Message>Cabañas</Message>
                </Link>
            </div>
        </div>
    )
};