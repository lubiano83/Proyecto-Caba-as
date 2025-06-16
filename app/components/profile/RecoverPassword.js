"use client"
import useAuth from "@/app/hooks/useAuth";
import Boton from "../Boton";
import GoBack from "../GoBack";
import Title from "../Title";

export default function RecoverPassword() {

    const { RecoverPassword, email, setEmail } = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await RecoverPassword()
    };

    return (
        <div className="h-full w-full flex justify-center items-center text-gray-700">
            <form onSubmit={handleSubmit} className="rounded-xl p-4 flex flex-col justify-center items-center gap-4 min-w-72 w-1/2 shadow-sm shadow-gray-700 max-w-xl bg-light">
                <Title>Recover Password:</Title>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu email.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <div className="flex justify-center items-center gap-2">
                    <GoBack path={"/pages/auth/login"} />
                    <Boton type="submit">Enviar</Boton>
                </div>
            </form>
        </div>
    )
};