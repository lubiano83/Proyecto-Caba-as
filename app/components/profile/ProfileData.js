import Image from "next/image";
import Boton from "../Boton";
import Message from "../Message";
import Link from "next/link";

export default function ProfileData({ user }) {

    return (
        <>
            { user ? (
                <div className="text-gray-700 flex flex-col justify-center items-center gap-4 rounded-2xl p-4 overflow-hidden bg-light shadow-sm shadow-gray-700 min-w-72 w-1/2 max-w-md">
                    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                            <Link href={`/pages/profile/image/${user?._id}`} className="group aspect-square w-full h-auto relative bg-medium cursor-pointer">
                                <Image src={user?.image || "/user-circle-svgrepo-com-white.svg"} alt="imagen usuario" fill priority className="object-cover" />
                                <span className="absolute inset-0 flex justify-center items-center text-gray-700 font-bold text-lg opacity-0 group-hover:opacity-80 bg-white bg-opacity-50 transition-opacity duration-300">Cambiar Imagen</span>
                            </Link>
                        </div>
                        <div className="w-full px-4 flex flex-col justify-between items-start h-48">
                            <h3 className=""><strong>Nombre:</strong> {user?.first_name} {user?.last_name}</h3>
                            <h3 className=""><strong>Email:</strong> {user?.email}</h3>
                            <h3 className=""><strong>Telefono:</strong> {user?.phone}</h3>
                            <h3 className=""><strong>Dirección:</strong> {user?.address?.street} {user?.address?.number}, {user?.address?.state}, {user?.address?.country}</h3>
                            <h3 className=""><strong>Plan:</strong> {user?.plan}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-2 flex-wrap">
                            <Link href={`/pages/profile/password/${user?._id}`}>
                                <Boton>Password</Boton>
                            </Link>
                            <Link href={`/pages/profile/edit/${user?._id}`}>
                                <Boton>Editar</Boton>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : <Message>Cargando...</Message> }
        </>
    )
};