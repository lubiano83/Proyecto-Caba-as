import Link from "next/link";
import Welcome from "./components/welcome/Welcome";
import Boton from "./components/Boton";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-gray-700 p-8 gap-8">
      <h2 className="text-3xl font-semibold text-dark text-center">La Vida en Las Trancas</h2>
      <Welcome />
      <div className="w-full flex justify-center">
          <Link href="/pages/lodges">
              <Boton>Reservar</Boton>
          </Link>
      </div>
    </div>
  );
}
