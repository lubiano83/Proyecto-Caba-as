"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ logged, setLogged ] = useState(false);
    const [ quantityLogged, setQuantityLogged ] = useState(0);
    const [ quantityRegistered, setQuantityRegistered ] = useState(0);
    const [ image, setImage ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ newPasswordTwo, setNewPasswordTwo ] = useState("");
    const [ first_name, setFirst_name ] = useState("");
    const [ last_name, setLast_name ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ state, setState ] = useState("");
    const [ city, setCity ] = useState("");
    const [ street, setStreet ] = useState("");
    const [ number, setNumber ] = useState("");
    const router = useRouter();

    useEffect(() => {
        usersRegistered();
        usersLogged();
        checkSession();
    }, [user]);

    const usersRegistered = async() => {
        try {
            const response = await fetch("/api/users", {
                method: "GET"
            });
            const data = await response.json();
            setQuantityRegistered(data.payload);
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const usersLogged = async() => {
        try {
            const response = await fetch("/api/sessions", {
                method: "GET"
            });
            const data = await response.json();
            setQuantityLogged(data.payload);
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const registerUser = async() => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first_name, last_name, phone, email, password, address: { country, state, city, street, number }})});
            if(response.ok) {
                await usersRegistered();
                setEmail("");
                setFirst_name("");
                setLast_name("");
                setPhone("");
                setCountry("");
                setState("");
                setCity("");
                setStreet("");
                setNumber("");
                router.push("/pages/auth/login");
                return true;
            } else {
                const error = await response.json();
                alert(error.message);
                return false
            }
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const loginUser = async() => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })});
            if (response.ok) {
                await checkSession();
                await usersLogged();
                setLogged(true);
                setEmail("");
                setPassword("");
                router.push("/");
                return true;
            } else {
                setLogged(false);
                const error = await response.json();
                alert(error.message);
                return false;
            }
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const logoutUser = async() => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                await usersLogged();
                alert("Logout realizado con éxito");
                setLogged(false);
                setUser(null);
                router.push("/");
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

    const updateUserById = async(id) => {
        try {
            const response = await fetch(`/api/users/update/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first_name, last_name, phone, address: { country, state, city, street, number } })});
            if(response.ok) {
                await checkSession();
                setFirst_name("");
                setLast_name("");
                setPhone("");
                setCountry("");
                setState("");
                setCity("");
                setStreet("");
                setNumber("");
                router.push("/pages/profile");
                return true;
            } else {
                const error = await response.json();
                alert(error.message);
                return false
            }
        } catch (error) {
            console.error("Hubo un problema al conectarse al backend..", error.message);
        }
    };

    const ChangeImageById = async (id) => {
        try {
            if (!image) return alert("Debes seleccionar una imagen primero..");
            const file = image;
            const buffer = await file.arrayBuffer();
            const response = await fetch(`/api/users/update/image/${id}`, {
                method: "PATCH",
                body: buffer,
                headers: {
                    "Content-Type": file.type,
                    "X-Filename": file.name,
                },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                await checkSession();
                alert("Imagen actualizada con éxito");
                setImage(null);
                setUser((prev) => ({ ...prev, image: data.imageUrl }));
                router.push("/pages/profile");
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

    const ChangePasswordById = async(id) => {
        try {
            const response = await fetch(`/api/users/update/password/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, newPassword, newPasswordTwo })});
            if (response.ok) {
                await checkSession();
                alert("Contraseña actualizada con éxito");
                setPassword("");
                setNewPassword("");
                setNewPasswordTwo("");
                router.push("/pages/profile");
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

    const RecoverPassword = async() => {
        try {
            const response = await fetch(`/api/users/update/password/recover`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })});
                if (response.ok) {
                await checkSession();
                alert("Contraseña restablecida con éxito");
                setEmail("");
                router.push("/pages/auth/login");
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

    const checkSession = async () => {
        try {
            const response = await fetch("/api/users/id", {
                method: "GET",
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.payload);
                setLogged(true);
            }
        } catch (error) {
            console.error("Error al validar sesión:", error.message);
        }
    };
    
    return (
        <AuthContext.Provider value={{ user, logged, quantityLogged, quantityRegistered, registerUser, loginUser, logoutUser, updateUserById, ChangeImageById, ChangePasswordById, RecoverPassword, usersRegistered, usersLogged, image, setImage, email, setEmail, password, setPassword, newPassword, setNewPassword, newPasswordTwo, setNewPasswordTwo, first_name, setFirst_name, last_name, setLast_name, phone, setPhone, country, setCountry, state, setState, city, setCity, street, setStreet, number, setNumber }}>
            {children}
        </AuthContext.Provider>
    )
};

