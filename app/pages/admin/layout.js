import Banner from "@/app/components/Banner";

export default function AdminLayout({ children }) {
    return (
        <>
            <Banner>Bienvenido..</Banner>
            { children }
        </>
    )
};