"use client";
import { createContext, useEffect, useState } from "react";

export const LodgeContext = createContext();

export const LodgeProvider = ({ children }) => {

    const [ lodges, setLodges ] = useState([]);
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

    return (
        <LodgeContext.Provider value={{ lodges }}>
            {children}
        </LodgeContext.Provider>
    )
}