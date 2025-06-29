import Banner from "@/app/components/menu/Banner";

export default function ReservationsLayout({ children }) {
    return (
        <>
            <Banner></Banner>
            { children }
        </>
    )
};