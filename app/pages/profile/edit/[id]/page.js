"use client";
import EditProfile from "@/app/components/profile/EditProfile";
import { useParams } from "next/navigation";

export default function EditProfilePage() {

    const { id } = useParams();

    return (
        <>
            <EditProfile id={id} />
        </>
    )
};