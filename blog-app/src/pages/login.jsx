import { FaHome } from "react-icons/fa"
import { Link } from "react-router"

export const LoginPage = () => {
    return (
        <div className="relative flex justify-center items-center min-h-screen bg-linear-to-r from-zinc-600 to-zinc-400">
            <div className="translate-x-[70%] w-72 h-72 bg-red-500 rounded-full mix-blend-multiply fliter blur-xl opacity-80 animate-blob"></div>
            <div className="translate-y-[10%] w-72 h-72 bg-yellow-500 rounded-full z-[1] mix-blend-multiply fliter blur-xl opacity-80 animate-bleb"></div>
            <div className="-translate-x-[70%] w-72 h-72 bg-green-500 rounded-full mix-blend-multiply fliter blur-xl opacity-80 animate-blub"></div>
            <form className="absolute bg-white/20 p-5 w-[30%] h-[60vh] rounded-lg shadow-md/10 backdrop-blur-md motion-preset-blur-down z-[3]">
                <Link to="/"><FaHome className="mx-1 scale-150 text-white hover:rotate-[5deg] hover:translate-x-2 hover:text-zinc-300 duration-300" /></Link>
                <h1 className="flex justify-center mt-6 text-6xl uppercase font-extrabold font-montserrat tracking-wide bg-linear-to-r from-zinc-50 to-zinc-300 bg-clip-text text-transparent text-shadow-md/5">Login</h1>
                <input type="email" className="border-zinc-50 rounded-md h-12 bg-zinc-50 p-3 mt-9 w-full shadow-md/10" placeholder="you@example.com" />
                <input type="password" className="border-zinc-50 rounded-md h-12 bg-zinc-50 p-3 mt-8 w-full shadow-md/20" placeholder="Enter Password ..." />
                <button type="submit" className="border-2 mt-8 rounded-md text-white uppercase mx-[40%] px-4 py-2 hover:bg-zinc-700 hover:-translate-y-1 hover:shadow-md/30 duration-300">Login</button>
            </form>
        </div>
    )
}