"use client";
import useLodge from "@/app/hooks/useLodge";
import useAuth from "@/app/hooks/useAuth";
import Banner from "@/app/components/Banner";

export default function AdminLayout({ children }) {

    const { lodges } = useLodge();
    const { quantityRegistered, quantityLogged } = useAuth();

    return (
        <>
            <Banner>
                <p><strong>Registrados:</strong> {quantityRegistered}</p>
                <p><strong>Online:</strong> {quantityLogged}</p>
                <p><strong>Cabañas:</strong> {lodges.length}</p>
                <p><strong>Reservas:</strong> 0</p>
            </Banner>
            { children }
        </>
    )
};