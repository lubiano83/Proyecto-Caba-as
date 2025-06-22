"use client";
import Admin from "@/app/components/admin/Admin";
import Title from "@/app/components/Title";

export default function AdminPage() {

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 text-gray-700 gap-6">
            <Title>Administración:</Title>
            <Admin />
        </div>
    )
};