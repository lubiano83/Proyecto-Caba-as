import { useRouter } from "next/navigation";
import SvgImage from "./SvgImage";

export default function Banner({ children }) {

    const router = useRouter();

    return (
        <section className="w-full py-1 px-4 bg-medium flex justify-between items-center gap-4">
            <p onClick={() => router.back()}><SvgImage src={"/arrow-sm-left-svgrepo-com.svg"} /></p>
            <p className="hover:text-gray-700">{ children }</p>
            <p onClick={() => router.forward()}><SvgImage src={"/arrow-sm-right-svgrepo-com.svg"} /></p>
        </section>
    )
};