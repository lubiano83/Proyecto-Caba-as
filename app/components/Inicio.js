"use client";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import Menu from "./menu/Menu";
import useDarkMode from "../hooks/useDarkMode";
import useShow from "../hooks/useShow";
import useAuth from "../hooks/useAuth";

export default function Inicio({ children, email, address, derechos }) {

    const { toggleDarkMode } = useDarkMode();
    const { show, handleShow } = useShow();
    const { user } = useAuth();

    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] font-serif">
            <Navbar toggleDarkMode={toggleDarkMode} handleShow={handleShow} user={user} />
            <div className="w-full h-full flex flex-col justify-start items-start">
                { show ? <Menu handleShow={handleShow}  /> : "" }
                { children }
            </div>
            <Footer email={email} address={address} derechos={derechos} />
        </div>
    )
};