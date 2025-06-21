"use client";
import { createContext, useEffect, useState } from "react";

export const LodgeContext = createContext();

export const LodgeProvider = ({ children }) => {

    const [ lodges, setLodges ] = useState([]);
    const [ lodgeById, setLodgeById ] = useState({});
    const [ name, setName ] = useState("");
    const [ size, setSize ] = useState("");
    const [ bedroom, setBedroom ] = useState("");
    const [ bathroom, setBathroom ] = useState("");
    const [ capacity, setCapacity ] = useState("");
    const [ high, setHigh ] = useState("");
    const [ medium, setMedium ] = useState("");
    const [ low, setLow ] = useState("");

    useEffect(() => {
        getLodges();
    }, []);

    const getLodges = async() => {
        try {
            const response = await fetch("/api/lodges", {
                method: "GET"
            });
            const data = await response.json();
            setLodges(data.payload);
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const getLodgeById = async(id) => {
        try {
            const response = await fetch(`/api/lodges/${id}`, {
                method: "GET"
            })
            const data = await response.json();
            setLodgeById(data.payload);
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const createLodge = async() => {
        try {
            const response = await fetch("/api/lodges", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    size,
                    bedroom,
                    bathroom,
                    capacity,
                    season: {
                        high,
                        medium,
                        low
                    },
                })
            })
            if (response.ok) {
                alert("Cabaña creada con éxito");
                setHotel("");
                setSize("");
                setBedroom("");
                setBathroom("");
                setCapacity("");
                setHigh("");
                setMedium("");
                setLow("");
                await getLodges();
                return true;
            } else {
                const error = await response.json();
                alert(error.message);
                return false;
            }
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const updateLodgeById = async(id) => {
        try {
            const response = await fetch(`/api/lodges/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    size,
                    bedroom,
                    bathroom,
                    capacity,
                    season: {
                        high,
                        medium,
                        low
                    },
                })
            });
            if (response.ok) {
                alert("Cabaña modificada con éxito");
                setHotel("");
                setSize("");
                setBedroom("");
                setBathroom("");
                setCapacity("");
                setWifi("");
                setHigh("");
                setMedium("");
                setLow("");
                await getLodges();
                return true;
            } else {
                const error = await response.json();
                alert(error.message);
                return false;
            }
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const deleteLodgeById = async(id) => {
        try {
            const response = await fetch(`/api/lodges/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                alert("Lodge eliminado con éxito");
                setImage(null);
                await getLodges();
                return true;
            } else {
                const error = await response.json();
                alert(error.message);
                return false;
            }
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const clearLodge = () => setLodgeById(null);

    return (
        <LodgeContext.Provider value={{ lodges, lodgeById, createLodge, getLodgeById, updateLodgeById, deleteLodgeById, clearLodge }}>
            {children}
        </LodgeContext.Provider>
    )
}