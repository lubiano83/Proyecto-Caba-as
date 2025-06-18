import Link from "next/link";
import Welcome from "./components/welcome/Welcome";
import Boton from "./components/Boton";
import Title from "./components/Title";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-gray-700 p-8 gap-8">
      <Title>La Vida en Las Trancas</Title>
      <Welcome />
      <Link href="/pages/lodges">
        <Boton>Reservar</Boton>
      </Link>
    </div>
  );
}
