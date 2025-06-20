import Link from "next/link";

export default function Contact({ email }) {
    return (
        <div className="flex justify-center item-center gap-1 text-center flex-wrap">
            <strong>Contacto:</strong> 
            <Link href={`mailto:${email}`} className="hover:text-gray-400">
                {email}
            </Link>
        </div>
    )
};