"use client";
import { useRouter } from "next/navigation";
import SvgImage from "../SvgImage";

export default function Banner({ children }) {

    const router = useRouter();

    return (
        <section className="w-full py-1 px-4 bg-medium flex justify-between items-center gap-4 text-white">
            <div onClick={() => router.back()}><SvgImage src={"/arrow-sm-left-svgrepo-com.svg"} /></div>
            <div className="w-full flex justify-evenly items-center gap-4">{ children }</div>
            <div onClick={() => router.forward()}><SvgImage src={"/arrow-sm-right-svgrepo-com.svg"} /></div>
        </section>
    )
};