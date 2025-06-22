"use client";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";
import SvgImage from "../SvgImage";

export default function Menu({ handleShow }) {

    const { logged, user, logoutUser } = useAuth();

    const handleLogout = async() => {
        await logoutUser();
    };

    return (
        <aside className="fixed top-0 w-64 h-full bg-medium flex flex-col justify-center items-center font-bold z-1 pt-13 pb-42 sm:pb-22">
            <div className="w-full pt-4 pr-4 flex justify-end items-end">
                <SvgImage src={"/cross-svgrepo-com.svg"} fnc={handleShow} />
            </div>
            <div className="w-full h-full flex flex-col justify-evenly items-center gap-4">
                <Link href={"/"}>
                    <p className="hover:text-gray-400">Inicio</p>
                </Link>
                { user?.role === "admin" && 
                    <Link href={"/pages/admin"}>
                        <p className="hover:text-gray-400">Admin</p>
                    </Link>
                }
                <Link href={"/pages/lodges"}>
                    <p className="hover:text-gray-400">Cabañas</p>
                </Link>
                { !logged && 
                    <Link href={"/pages/auth/login"}>
                        <p className="hover:text-gray-400">Login</p>
                    </Link>
                }
                { !logged && 
                    <Link href={"/pages/auth/register"}>
                        <p className="hover:text-gray-400">Register</p>
                    </Link>
                }
                { logged && <p className="hover:text-gray-700" onClick={() => handleLogout()}>Logout</p> }
            </div>
        </aside>
    )
};