"use client";
import { useParams } from "next/navigation";
import UpdateLodge from "@/app/components/admin/lodges/UpdateLodge";

export default function UpdateLodgePage() {

    const { id } = useParams();

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 text-gray-700 gap-6">
            <UpdateLodge id={id} />
        </div>
    )
};