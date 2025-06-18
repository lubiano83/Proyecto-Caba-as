"use client";
import Image from "next/image";
import Link from "next/link";
import Boton from "../Boton";

export default function Welcome() {
    const images = [
        "/images/4414_Valle_de_las_Trancas.avif",
        "/images/Laguna-Huemul.jpg",
        "/images/trancas7.jpg",
        "/images/valle-las-trancas-c-tamara-nunez-5-1024x683.jpg",
        "/images/Laguna-Huemul.jpg",
        "/images/4414_Valle_de_las_Trancas.avif",
    ];

    return (
        <div className="w-full h-full flex flex-col justify-between items-center gap-8">
            <div className="w-full h-full flex justify-evenly items-center flex-wrap gap-8">
                {images.map((src, index) => (
                    <div key={index} className="relative aspect-video min-w-72 w-[100%] max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
                        <Image src={src} alt={`Imagen ${index + 1}`} fill className="object-cover rounded-lg" priority />
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-center items-center">
                <Link href="/pages/lodges">
                    <Boton>Reservar</Boton>
                </Link>
            </div>
        </div>
    );
};