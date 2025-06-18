import Title from "./components/Title";
import Welcome from "./components/welcome/Welcome";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col justify-start items-center text-gray-700 p-6 gap-8">
      <Title>Bienvenidos a las Trancas!!</Title>
      <Welcome />
    </div>
  );
}
