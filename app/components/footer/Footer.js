import Logo from "../Logo";
import Address from "./Address";
import Contact from "./Contact";
import Derechos from "./Derechos";

export default function Footer({ email, address, derechos }) {
    return (
        <div className="bg-dark p-4 w-full flex justify-evenly items-center gap-4 flex-wrap-reverse z-2">
            <div className="flex flex-col justify-center items-center gap-4 flex-wrap text-center">
                <Address address={address} />
                <Derechos derechos={derechos} />
            </div>
            <div className="flex flex-col-reverse justify-center items-center gap-4 text-center sm:flex-col">
                <Contact email={email} />
                <Logo />
            </div>
        </div>
    )
};