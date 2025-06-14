"use client";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;