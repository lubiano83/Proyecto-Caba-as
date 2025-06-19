"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Welcome() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/welcome");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error al obtener imágenes:", error.message);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full overflow-x-auto">
        <div className="flex gap-2 snap-x snap-mandatory overflow-x-auto scrollbar-hide">
          {images.map((src, index) => (
            <div key={index} className="relative min-w-[90%] sm:min-w-[70%] md:min-w-[60%] xl:min-w-[40%] aspect-video snap-center rounded-xl overflow-hidden shadow-md">
              <Image src={src} alt={`Imagen ${index + 1}`} fill sizes="(max-width: 640px) 90vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, 40vw" className="object-cover" priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
      <section className="w-[90%] text-center space-y-4">
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