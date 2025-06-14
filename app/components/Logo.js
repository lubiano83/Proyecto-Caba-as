import Link from "next/link";

export default function Logo() {
    return (
        <h1 className="font-bold italic text-xl hover:text-gray-700">
            <Link href={"/"}>
                Las Trancas Lodges
            </Link>
        </h1>
    )
};