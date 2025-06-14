
export default function Boton({ children, fnc }) {

    return (
        <button className={`px-4 py-1 border-2 bg-dark border-medium text-white rounded-xl cursor-pointer hover:scale-105`} onClick={fnc} >
            {children}
        </button>
    )
};