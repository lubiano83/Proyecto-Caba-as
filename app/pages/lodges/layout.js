import Banner from "@/app/components/menu/Banner";

export default function LodgesLayout({ children }) {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center text-gray-700">
            <Banner></Banner>
            { children }
        </div>
    )
};