import { Link } from "react-router";
import { GuestLayout } from "../layouts/guest";

export const HomePage = () => {
	return (
		<GuestLayout>
			<div className="grid grid-cols-2 -mt-[10%] motion-opacity-in-0 motion-translate-y-in-[5vh] motion-blur-in-sm -mb-[8%] sm:overflow-x-hidden">
				<h1 className="col-span-2 col-start-2 font-montserrat sm:translate-y-30 sm:text-5xl sm:mb-3 sm:text-shadow-sm/10 lg:text-shadow-none md:text-5xl lg:translate-y-76 lg:ms-[13%] lg:text-7xl font-extrabold bg-linear-90 from-zinc-500 to-zinc-400 bg-clip-text text-transparent lg:me-[30%]">
					Welcome !
				</h1>
				<img
					src="../src/assets/photo/photo2.png"
					alt="Photo"
					className="-translate-y-[20%] scale-x-[-1] mask-b-from-38% mask-b-to-95% lg:translate-x-[25%] z-[1] lg:w-[600px] duration-500 transform-gpu brightness-130 grayscale-100 hover:grayscale-0 hover:saturate-150 cursor-pointer"
					onClick={() => {
						window.open("../src/assets/photo/photo2.png", "_blank");
					}}
				/>
				<p className="flex font-montserrat items-center lg:text-lg/8 sm:text-base/relaxed text-justify pe-[15%]">
					Selamat Datang di Blog Dekko! Blog ini berisi informasi tentang Miko,
					tulis-tulisannya beragram seperti hidup saya yang selalu dihebohkan
					dengan kejutan-kejutan yang tidak terduga. Heheh...
				</p>
				<Link
					to="/blog"
					className="col-start-2 lg:-translate-y-72 uppercase outline-2 lg:ms-[33%] lg:ps-2 lg:me-[362px] lg:hover:-translate-y-[45vh] duration-300 rounded-sm hover:bg-zinc-700 hover:shadow-md/50 sm:-translate-y-[16vh] sm:me-[132px] sm:ms-[20%] sm:ps-2 sm:hover:-translate-y-28"
				>
					Masuk Ke Blog
				</Link>
			</div>
		</GuestLayout>
	);
};
