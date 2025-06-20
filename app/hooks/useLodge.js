"use client";
import { useContext } from "react";
import { LodgeContext } from "@/app/contexts/LodgeContext";

const useLodge = () => {
    return useContext(LodgeContext);
};

export default useLodge;