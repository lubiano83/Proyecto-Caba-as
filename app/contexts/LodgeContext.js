"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const LodgeContext = createContext();

export const LodgeProvider = ({ children }) => {

    const [ lodges, setLodges ] = useState([]);
    const [ lodgeById, setLodgeById ] = useState({});
    const [ image, setImage ] = useState(null);
    const [ name, setName ] = useState("");
    const [ size, setSize ] = useState("");
    const [ bedroom, setBedroom ] = useState("");
    const [ bathroom, setBathroom ] = useState("");
    const [ capacity, setCapacity ] = useState("");
    const [ high, setHigh ] = useState("");
    const [ medium, setMedium ] = useState("");
    const [ low, setLow ] = useState("");
    const router = useRouter();

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
                setName("");
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
                setName("");
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

    const changeWifi = async(id, newWifi) => {
        try {
            const response = await fetch(`/api/lodges/wifi/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ available: newWifi })
            });
            if (response.ok) {
                alert("Wifi modificado con éxito");
                await getLodges();
                await getLodgeById(id);
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

    const addImageToLodgeById = async(id) => {
        try {
            const formData = new FormData();
            formData.append("image", image);
            const response = await fetch(`/api/lodges/image/${id}`, {
                method: "PATCH",
                body: formData,
            });
            if (response.ok) {
                alert("Imagen agregada con éxito");
                setImage(null);
                await getLodges();
                await getLodgeById(id);
                router.push("/pages/admin/lodges");
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
    
    const changeAvailable = async(id, newAvailable) => {
        try {
            const response = await fetch(`/api/lodges/available/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ available: newAvailable })
            });
            if (response.ok) {
                alert("Disponibilidad modificada con éxito");
                await getLodges();
                await getLodgeById(id);
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
    
    const deleteAllImageFromLodge = async(id) => {
        try {
            const response = await fetch(`/api/lodges/image/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Imagenes eliminadas con éxito");
                setImage(null);
                await getLodges();
                await getLodgeById(id);
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
        <LodgeContext.Provider value={{ lodges, lodgeById, createLodge, getLodgeById, updateLodgeById, changeWifi, addImageToLodgeById, changeAvailable, deleteAllImageFromLodge, deleteLodgeById, clearLodge, image, setImage, name, setName, size, setSize, bedroom, setBedroom, bathroom, setBathroom, capacity, setCapacity, high, setHigh, medium, setMedium, low, setLow }}>
            {children}
        </LodgeContext.Provider>
    )
}