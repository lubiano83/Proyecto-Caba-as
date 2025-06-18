import Image from "next/image";

export default function SvgImage({ src, fnc }) {
    return (
        <Image src={src} alt="imagen svg" width={30} height={30} onClick={fnc} className='hover:scale-110 cursor-pointer rounded-2xl' />
    )
};