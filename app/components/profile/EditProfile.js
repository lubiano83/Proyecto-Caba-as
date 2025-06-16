"use client";
import useAuth from "@/app/hooks/useAuth";
import Title from "../Title";
import Boton from "../Boton";
import GoBack from "../GoBack";

export default function EditProfile({ id }) {

    const { updateUserById, first_name, setFirst_name, last_name, setLast_name, phone, setPhone, country, setCountry, state, setState, city, setCity, street, setStreet, number, setNumber } = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const success = await updateUserById(id);
        console.log("update:", success);
    };

    return (
        <div className="h-full w-full flex justify-center items-center p-8">
            <form onSubmit={handleSubmit} className="rounded-xl p-4 flex flex-col justify-center items-center gap-4 min-w-72 w-1/2 shadow-sm shadow-gray-700 max-w-xl bg-light">
                <Title>Update:</Title>
                <input type="text" name="first_name" value={first_name} onChange={(e) => setFirst_name(e.target.value)} placeholder="Ingresa tu nombre.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <input type="text" name="last_name" value={last_name} onChange={(e) => setLast_name(e.target.value)} placeholder="Ingresa tu apellido.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Ingresa tu pais.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Ingresa tu region/estado.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ingresa tu ciudad.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <input type="text" name="street" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Ingresa tu calle.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <input type="text" name="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Ingresa tu numero.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ingresa tu telefono.." className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full" />
                <div className="flex justify-center items-center gap-2">
                    <GoBack path={"/pages/profile"} />
                    <Boton type="submit">Guardar</Boton>
                </div>
            </form>
        </div>
    )
};