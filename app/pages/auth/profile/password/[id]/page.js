"use client";
import ChangePassword from "@/app/components/auth/profile/ChangePassword";
import { useParams } from "next/navigation";

export default function ChangePasswordPage() {

    const { id } = useParams();

    return (
        <>
            <ChangePassword id={id} />
        </>
    )
};