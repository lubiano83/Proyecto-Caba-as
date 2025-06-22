import Link from "next/link";
import Welcome from "./components/welcome/Welcome";
import Boton from "./components/Boton";
import Title from "./components/Title";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6 text-gray-700 gap-6">
      <Title>La Vida en Las Trancas</Title>
      <Welcome />
      <Link href="/pages/lodges">
        <Boton>Cabañas</Boton>
      </Link>
    </div>
  );
}
