import Link from "next/link";

export default function Address({ address }) {
    return (
        <div className="flex justify-center items-center gap-1 text-center flex-wrap">
            <strong>Dirección:</strong> 
            <Link href={"https://maps.app.goo.gl/Hi7eQXZho17VPcEA6"} target="_blank" className="hover:text-gray-400">
                {address}
            </Link>
        </div>
    )
};