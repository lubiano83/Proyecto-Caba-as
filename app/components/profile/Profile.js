"use client";
import useAuth from "@/app/hooks/useAuth";
import LoginPage from "@/app/pages/auth/login/page";
import Boton from "../Boton";

export default function Profile() {

    const { handleLogout, logged } = useAuth();

    return (
        <div className="h-full w-full flex justify-center items-center">
            { !logged ? <LoginPage /> : <Boton fnc={() => handleLogout()} >Salir</Boton> }
        </div>
    )
};