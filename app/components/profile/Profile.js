"use client";
import useAuth from "@/app/hooks/useAuth";
import LoginPage from "@/app/pages/auth/login/page";
import ProfileData from "./ProfileData";

export default function Profile() {

    const { user, logged, logoutUser, getUserById } = useAuth();

    return (
        <div className="h-full w-full flex justify-center items-center p-8">
            { !logged ? <LoginPage /> : <ProfileData user={user} logoutUser={logoutUser} getUserById={getUserById} /> }
        </div>
    )
};