"use client";
import useAuth from "@/app/hooks/useAuth";
import Title from "../../Title";
import Boton from "../../Boton";
import GoBack from "../../GoBack";

export default function ChangePassword({ id }) {

    const { ChangePasswordById, password, setPassword, newPassword, setNewPassword, newPasswordTwo, setNewPasswordTwo } = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await ChangePasswordById(id);
    };

    return (
        <div className="h-full w-full flex justify-center items-center text-gray-700">
            <form onSubmit={handleSubmit} className="rounded-xl p-4 flex flex-col justify-center items-center gap-4 min-w-72 w-1/2 shadow-sm shadow-gray-700 max-w-xl bg-light">
                <Title>Change Password:</Title>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu antigua contraseña.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <input type="password" name="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Ingresa tu nueva contraseña.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <input type="password" name="password" value={newPasswordTwo} onChange={(e) => setNewPasswordTwo(e.target.value)} placeholder="Repite tu nueva contraseña.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <div className="flex justify-center items-center gap-2">
                    <GoBack path={"/pages/auth/profile"} />
                    <Boton type="submit">Guardar</Boton>
                </div>
            </form>
        </div>
    )
};