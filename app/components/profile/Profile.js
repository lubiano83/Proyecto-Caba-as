"use client";
import useAuth from "@/app/hooks/useAuth";
import LoginPage from "@/app/pages/auth/login/page";
import ProfileData from "./ProfileData";

export default function Profile() {

    const { user, logged, logoutUser } = useAuth();

    return (
        <div className="w-full h-full flex justify-center items-center p-8">
            { !logged ? <LoginPage /> : <ProfileData user={user} logoutUser={logoutUser} /> }
        </div>
    )
};