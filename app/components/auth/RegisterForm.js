import Link from "next/link";
import Boton from "../Boton";
import GoBack from "../GoBack";

export default function RegisterForm() {
    return (
        <div className="h-full w-full text-gray-700 flex flex-col justify-center items-center gap-6 bg-light">
            Register
            <div className="flex justify-center items-center gap-2">
                <GoBack path={"/"} />
                <Link href={"/pages/auth/login"}>
                    <Boton>Login</Boton>
                </Link>
            </div>
        </div>
    )
};