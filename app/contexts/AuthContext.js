"use client";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [ logged, setLogged ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ first_name, setFirst_name ] = useState("");
    const [ last_name, setLast_name ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ address, setAddress ] = useState("");
    const router = useRouter();

    const handleRegister = async(e) => {
        e.preventDefault();
        try {
            await registerUser();
            setNombre("");
            setEmail("");
            setPassword("");
            alert("Register realizado con exito..");
            router.push("/pages/auth/login");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            alert("Login realizado con exito..");
            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogout = async(e) => {
        try {
            await logoutUser();
            alert("logout realizado con exito..");
            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    };

    const registerUser = async() => {
        try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ first_name, last_name, email, phone, address }),
        });
        const data = await response.json();
        if(!response.ok) throw new Error(data.message);
        setUser(data);
        } catch (error) {
        throw new Error(error.message);
        }
    };

    const loginUser = async (email, password) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setLogged(true);
            setEmail(email);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const logoutUser = async() => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "DELETE",
                credentials: "include",
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message);
            setLogged(false);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ logged, setLogged, handleRegister, handleLogin, handleLogout, email, setEmail, password, setPassword, first_name, setFirst_name, last_name, setLast_name, phone, setPhone, address, setAddress }}>
            {children}
        </AuthContext.Provider>
    )
};

