
export default function Boton({ children, fnc }) {

    return (
        <button className="py-1 border-2 w-24 border-white bg-dark text-white rounded-xl cursor-pointer hover:scale-105 shadow-sm shadow-gray-700" onClick={fnc} >
            {children}
        </button>
    )
};