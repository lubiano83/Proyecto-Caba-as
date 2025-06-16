import Image from "next/image";
import Boton from "../Boton";
import Message from "../Message";

export default function ProfileData({ user, logoutUser }) {

    const handleLogout = async() => {
        const success = await logoutUser();
        console.log("logout:", success);
    };

    return (
        <>
            { user ? (
                <div className="text-gray-700 flex flex-col justify-center items-center gap-4 rounded-2xl p-4 overflow-hidden bg-light shadow-sm shadow-gray-700">
                    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                        <div className="aspect-square w-full h-auto justify-center items-center bg-medium relative">
                            <Image src={user?.image || "/user-circle-svgrepo-com-white.svg"} alt="imagen usuario" fill priority className="object-cover" />
                        </div>
                        <div className="px-4 flex flex-col justify-between items-start h-64">
                            <h3 className=""><strong>Id:</strong> {user?._id}</h3>
                            <h3 className=""><strong>Nombre:</strong> {user?.first_name} {user?.last_name}</h3>
                            <h3 className=""><strong>Email:</strong> {user?.email}</h3>
                            <h3 className=""><strong>Telefono:</strong> {user?.phone}</h3>
                            <h3 className=""><strong>Dirección:</strong> {user?.address?.street} {user?.address?.number}, {user?.address?.state}, {user?.address?.country}</h3>
                            <h3 className=""><strong>Plan:</strong> {user?.plan}</h3>
                            <h3 className=""><strong>Role:</strong> {user?.role}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-2 flex-wrap">
                            <Boton fnc={() => handleLogout()}>Salir</Boton>
                            <Boton>Editar</Boton>
                        </div>
                    </div>
                </div>
            ) : <Message>Cargando...</Message> }
        </>
    )
};