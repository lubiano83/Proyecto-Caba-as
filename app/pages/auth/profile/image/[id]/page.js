"use client";
import ChangeImage from "@/app/components/auth/profile/ChangeImage";
import { useParams } from "next/navigation";

export default function ChangeImagePage() {

    const { id } = useParams();

    return (
        <>
            <ChangeImage id={id} />
        </>
    )
};