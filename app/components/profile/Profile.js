"use client";
import useAuth from "@/app/hooks/useAuth";
import LoginPage from "@/app/pages/auth/login/page";
import Boton from "../Boton";

export default function Profile() {

    const { handleLogout, logged } = useAuth();

    if(!logged) return <LoginPage />

    return (
        <div className="bg-light">
            <Boton fnc={() => handleLogout()} >Salir</Boton>
        </div>
    )
};