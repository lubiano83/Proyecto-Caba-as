"use client";
import LodgeDetail from "@/app/components/lodges/LodgeDetail";
import { useParams } from "next/navigation";

export default function LodgeDetailPage() {

    const { id } = useParams();

    return (
        <>
            <LodgeDetail id={id} />
        </>
    )
};