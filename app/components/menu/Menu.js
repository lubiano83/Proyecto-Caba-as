import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";

export default function Menu() {

    const { logged, user, logoutUser } = useAuth();

    const handleLogout = async() => {
        await logoutUser();
    };

    return (
        <aside className="fixed top-0 w-64 h-full bg-medium flex justify-center items-center font-bold z-1 pt-13 pb-42 sm:pb-22">
            <div className="w-full h-full flex flex-col justify-evenly items-center gap-4">
                { user?.role === "admin" && 
                    <Link href={"/pages/admin"}>
                        <p className="hover:text-gray-700">Admin</p>
                    </Link>
                }
                <Link href={"/"}>
                    <p className="hover:text-gray-700">Lodges</p>
                </Link>
                { logged && 
                    <Link href={"/pages/profile"}>
                        <p className="hover:text-gray-700">Profile</p>
                    </Link>
                }
                { !logged && 
                    <Link href={"/pages/auth/login"}>
                        <p className="hover:text-gray-700">Login</p>
                    </Link>
                }
                { !logged && 
                    <Link href={"/pages/auth/register"}>
                        <p className="hover:text-gray-700">Register</p>
                    </Link>
                }
                { logged && <p className="hover:text-gray-700" onClick={() => handleLogout()}>Logout</p> }
            </div>
        </aside>
    )
};