"use client";
import useAuth from "@/app/hooks/useAuth";
import Boton from "../Boton";
import Title from "../Title";
import Link from "next/link";

export default function LoginForm() {

    const { loginUser, email, setEmail, password, setPassword } = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await loginUser();
    };

    return (
        <div className="h-full w-full flex justify-center items-center">
            <form onSubmit={handleSubmit} className="rounded-xl p-4 flex flex-col justify-center items-center gap-4 min-w-72 w-1/2 shadow-sm shadow-gray-700 max-w-xl bg-light">
                <Title>Login:</Title>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu email.." className="border-2 border-dark rounded-lg bg-white px-2 py-1 w-full text-gray-700" />
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu contraseña.." className="border-2 border-dark rounded-lg bg-white px-2 py-1 w-full text-gray-700" />
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <Link href={"/pages/auth/register"}>
                            <Boton>Register</Boton>
                        </Link>
                        <Boton type="submit">Ingresar</Boton>
                    </div>
                    <Link href={"/pages/profile/password/recover"}>
                        <p className="text-dark">Recuperar Contraseña..</p>
                    </Link>
                </div>
            </form>
        </div>
    )
};