export default function Banner({ children }) {
    return (
        <section className="w-full p-1 bg-medium flex justify-evenly items-center gap-4">
            <p className="hover:text-gray-700">{ children }</p>
        </section>
    )
};