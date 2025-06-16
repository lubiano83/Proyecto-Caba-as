export default function Menu() {
    return (
        <aside className="fixed top-0 w-64 h-full bg-medium flex justify-center items-center font-bold z-1 pt-13 pb-42 sm:pb-22">
            <div className="w-full h-full flex flex-col justify-evenly items-center gap-4">
                <p className="hover:text-gray-700">Admin</p>
                <p className="hover:text-gray-700">Lodges</p>
                <p className="hover:text-gray-700">Contact</p>
            </div>
        </aside>
    )
};