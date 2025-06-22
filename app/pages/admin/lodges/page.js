import Lodges from "@/app/components/admin/lodges/Lodges";
import GoBack from "@/app/components/GoBack";
import Title from "@/app/components/Title";

export default function LodgesPage() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 text-gray-700 gap-6">
            <Title>Cabañas:</Title>
            <Lodges />
            <GoBack path={"/pages/admin"} />
        </div>
    )
};