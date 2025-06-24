"use client"
import { useParams } from "next/navigation";
import AddImage from "@/app/components/admin/lodges/AddImage";

export default function AddImagePage() {

    const { id } = useParams();

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 text-gray-700 gap-6">
            <AddImage id={id} />
        </div>
    )
};