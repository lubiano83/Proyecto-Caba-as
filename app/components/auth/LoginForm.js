import Link from "next/link";
import Boton from "../Boton";
import GoBack from "../GoBack";

export default function LoginForm() {
    return (
        <div className="h-full w-full text-gray-700 flex flex-col justify-center items-center gap-6 bg-light">
            Login
            <div className="flex justify-center items-center gap-2">
                <GoBack path={"/"} />
                <Link href={"/pages/auth/register"}>
                    <Boton>Register</Boton>
                </Link>
            </div>
        </div>
    )
};