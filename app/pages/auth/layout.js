import Banner from "@/app/components/menu/Banner";

export default function AuthLayout({ children }) {
    return (
        <>
            <Banner></Banner>
            { children }
        </>
    )
};