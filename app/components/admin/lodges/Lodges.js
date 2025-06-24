"use client";
import Link from "next/link";
import SvgImage from "../../SvgImage";
import useLodge from "@/app/hooks/useLodge";

export default function Lodges() {

    const { lodges, changeWifi, changeAvailable, deleteLodgeById, deleteAllImageFromLodge } = useLodge();

    return (
        <div className="flex flex-col justify-between items-center gap-6">
            <table className="flex flex-col justify-center items-center shadow-sm shadow-gray-700 bg-light">
                <thead className="bg-medium text-white">
                    <tr>
                        <th className="border border-white w-24 p-2">Imagen</th>
                        <th className="border border-white w-44 p-2">Nombre</th>
                        <th className="border border-white w-18 p-2">Piezas</th>
                        <th className="border border-white w-18 p-2">Baños</th>
                        <th className="border border-white w-15 p-2">Mt2</th>
                        <th className="border border-white w-24 p-2">Personas</th>
                        <th className="border border-white w-16 p-2">Wifi</th>
                        <th className="border border-white w-22 p-2">T/Alta</th>
                        <th className="border border-white w-22 p-2">T/Media</th>
                        <th className="border border-white w-22 p-2">T/Baja</th>
                        <th className="border border-white w-27 p-2">Disponible</th>
                        <th className="border border-white w-40 p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 rounded-xl">
                    {
                        lodges?.map(lodge => (
                            <tr key={lodge._id} className="text-center rounded-xl">
                                <td className="border border-gray-700 w-24 p-2 gap-1">
                                    { lodge.images.length > 0 ? (
                                        lodge.images.map((img, index) => <Link key={index} href={img} target="_blank">{ index === 4 ? index+1 : `${index+1},` } </Link> )
                                    ) : (
                                        "0"
                                    )}
                                </td>
                                <td className={`border w-44 p-2 truncate max-w-[12rem]`}>{lodge.name}</td>
                                <td className={`border w-18 p-2`}>{lodge.bedroom}</td>
                                <td className={`border w-18 p-2`}>{lodge.bathroom}</td>
                                <td className={`border w-15 p-2`}>{lodge.size}</td>
                                <td className={`border w-24 p-2`}>{lodge.capacity}</td>
                                <td className={`border w-16 p-2`}>
                                    <input type="checkbox" checked={lodge.wifi} onChange={() => changeWifi(lodge._id, !lodge.wifi)} className="w-5 h-5" />
                                </td>
                                <td className={`border w-22 p-2`}>{lodge.season.high}</td>
                                <td className={`border w-22 p-2`}>{lodge.season.medium}</td>
                                <td className={`border w-22 p-2`}>{lodge.season.low}</td>
                                <td className={`border w-27 p-2`}>
                                    <input type="checkbox" checked={lodge.available} onChange={() => changeAvailable(lodge._id, !lodge.available)} className="w-5 h-5" />
                                </td>
                                <td className={`border w-40 p-2`}>
                                    <div className="flex justify-center items-center gap-2">
                                        <div className="relative group">
                                            <Link href={`/pages/admin/lodges/${lodge._id}`}>
                                                <SvgImage src={"/edit-3-svgrepo-com.svg"} />
                                            </Link>
                                            <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-white text-xs p-1 rounded-lg w-25`}>
                                                Modificar Lodge
                                            </span>
                                        </div>
                                        <div className="relative group">
                                            <Link href={`/pages/admin/lodges/image/${lodge._id}`}>
                                                <SvgImage src={"/image-plus-svgrepo-com-green.svg"} />
                                            </Link>
                                            <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-white text-xs p-1 rounded-md w-24`}>
                                                Agregar Imagen
                                            </span>
                                        </div>
                                        <div className="relative group">
                                            <SvgImage src={"/image-square-xmark-svgrepo-com.svg"} fnc={() => deleteAllImageFromLodge(lodge._id)} />
                                            <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-white text-xs p-1 rounded-md w-25`}>
                                                Borrar Imagenes
                                            </span>
                                        </div>
                                        <div className="relative group">
                                            <SvgImage src={"/cross-svgrepo-com-red.svg"} fnc={() => deleteLodgeById(lodge._id)} />
                                            <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-white text-xs p-1 rounded-md w-24`}>
                                                Eliminar Lodge
                                            </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};