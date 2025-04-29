import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa"
import { Link } from "react-router"

export const Footer = () => {
    return (
        <div className="bg-linear-90 from-zinc-600 to-zinc-800 p-5 grid grid-cols-2 gap-4 inset-shadow-sm inset-shadow-zinc-900/40">
            <div className="flex items-center m-[30px] ps-[5.5%] w-[200px]">
                <img src="../logoM.png" alt="Logo" />
            </div>
            <div className="justify-end items-center align-middle text-zinc-50 grid grid-rows-2 gap-y-4 pe-12">
                <span className="ps-1 font-bold text-xl uppercase tracking-[0.4rem] font-poppins self-end">Information</span>
                <div className="flex justify-self-center self-start gap-x-3 scale-[150%]">
                    <Link to="https://www.facebook.com/dekmico.exactly" className="hover:text-blue-600 duration-200 hover:-mt-1 hover:-rotate-[1.5deg]"><FaFacebook /></Link>
                    <Link to="https://www.instagram.com/dekkmikoo/" className="hover:text-pink-600 duration-200 hover:-mt-1 hover:-rotate-[1.5deg]"><FaInstagram /></Link>
                    <Link to="https://youtube.com/@dekkmikoo?si=vc-KtAU13Agwz33q" className="hover:text-red-600 duration-200 hover:-mt-1 hover:-rotate-[1.5deg]"><FaYoutube /></Link>
                    <Link to="https://github.com/dekko911" className="hover:text-zinc-400 duration-200 hover:-mt-1 hover:-rotate-[1.5deg]"><FaGithub /></Link>
                </div>
            </div>
            <div className="hover:opacity-60 duration-300 col-span-2 text-zinc-50/70 flex justify-center tracking-[0.2px]">&#xA9; {new Date().getFullYear()} Miko Suyasa, All Rights Reserved.</div>
        </div>
    )
}