"use client";
import useLodge from "@/app/hooks/useLodge";
import useAuth from "@/app/hooks/useAuth";
import Banner from "@/app/components/Banner";
import Message from "@/app/components/Message";

export default function AdminLayout({ children }) {

    const { lodges } = useLodge();
    const { user, quantityRegistered, quantityLogged } = useAuth();

    return (
        <>
            { !user || user?.role === "user" ? (
                <div className="h-full w-full flex justify-center items-center">
                    <Message>No autorizado..</Message>
                </div>
            ) : (
            <>
                <Banner>
                    <p><strong>Registrados:</strong> {quantityRegistered}</p>
                    <p><strong>Online:</strong> {quantityLogged}</p>
                    <p><strong>Cabañas:</strong> {lodges.length}</p>
                    <p><strong>Reservas:</strong> 0</p>
                </Banner>
                { children }
            </>
            )}
        </>
    )
};