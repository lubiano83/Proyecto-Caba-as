"use client";
import Footer from "./footer/Footer";
import Navbar from "./header/Navbar";
import Menu from "./menu/Menu";
import useDarkMode from "../hooks/useDarkMode";
import useShow from "../hooks/useShow";

export default function Inicio({ children, email, address, derechos }) {

    const { toggleDarkMode } = useDarkMode();
    const { show, handleShow } = useShow();

    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] font-serif">
            <Navbar toggleDarkMode={toggleDarkMode} handleShow={handleShow} />
            <div className="w-full h-full flex justify-start items-start">
                { show ? <Menu /> : "" }
                { children }
            </div>
            <Footer email={email} address={address} derechos={derechos} />
        </div>
    )
};