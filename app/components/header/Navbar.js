import Link from "next/link";
import Logo from "../Logo";
import SvgImage from "../SvgImage";

export default function Navbar({ toggleDarkMode, handleShow }) {
    return (
        <div className="w-full bg-dark py-3 px-4 flex justify-around items-center gap-3">
            <div className="flex justify-center items-center gap-1">
                <SvgImage src={"/menu-svgrepo-com.svg"} fnc={handleShow} />
                <Logo />
            </div>
            <SvgImage src={"/sun-svgrepo-com-white.svg"} fnc={toggleDarkMode} />
            <Link href={"/pages/profile"}>
                <SvgImage src={"/user-circle-svgrepo-com-white.svg"} />
            </Link>
        </div>
    )
};