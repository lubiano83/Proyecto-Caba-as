"use client";
import EditProfile from "@/app/components/auth/profile/EditProfile";
import { useParams } from "next/navigation";

export default function EditProfilePage() {

    const { id } = useParams();

    return (
        <>
            <EditProfile id={id} />
        </>
    )
};