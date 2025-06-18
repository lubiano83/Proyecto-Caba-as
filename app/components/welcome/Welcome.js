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
        <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full overflow-x-auto">
                <div className="flex gap-4 snap-x snap-mandatory overflow-x-auto scrollbar-hide">
                    {images.map((src, index) => (
                        <div key={index} className="relative min-w-[90%] sm:min-w-[70%] md:min-w-[60%] xl:min-w-[40%] aspect-video snap-center rounded-xl overflow-hidden shadow-md">
                            <Image src={src} alt={`Imagen ${index + 1}`} fill className="object-cover" priority />
                        </div>
                    ))}
                </div>
            </div>
            <section className="w-full text-center space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Las Trancas es un valle mágico rodeado de montañas, bosques nativos y cumbres nevadas. Ideal para quienes buscan
                    desconexión, aire puro y paisajes de ensueño durante todo el año.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                    En invierno, el centro de ski Nevados de Chillán se transforma en el principal atractivo de la zona, ofreciendo pistas para
                    todos los niveles y aguas termales al aire libre para relajarse después de una jornada intensa.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Durante el verano, Las Trancas se convierte en un paraíso para los fanáticos de la bicicleta de montaña. El Bike Park Nevados
                    ofrece circuitos de downhill, enduro y cross-country, con senderos bien mantenidos que atraviesan bosques y laderas.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Además, hay múltiples rutas de trekking, lagunas escondidas, miradores y una gastronomía local que sorprende por su calidez
                    y sabor. Ya sea que busques adrenalina o tranquilidad, Las Trancas tiene algo especial para ti.
                </p>
            </section>
        </div>
    );
};