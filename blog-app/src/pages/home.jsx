import { Link } from "react-router";
import { GuestLayout } from "../layouts/guest";

export const HomePage = () => {
	return (
		<GuestLayout>
			<div className="grid grid-cols-2 -mt-[10%] motion-opacity-in-0 motion-translate-y-in-[5vh] motion-blur-in-sm -mb-[8%]">
				<h1 className="col-span-2 col-start-2 font-montserrat translate-y-75 ms-[13%] text-7xl font-extrabold bg-linear-90 from-zinc-500 to-zinc-400 bg-clip-text text-transparent me-[30%]">
					Welcome !
				</h1>
				<img
					src="../photo2.png"
					alt="Photo"
					className="-translate-y-[20%] scale-x-[-1] mask-b-from-38% mask-b-to-95% translate-x-[25%] z-[1] w-[600px] duration-500 transform-gpu brightness-130 grayscale-100 hover:grayscale-0 hover:saturate-150"
				/>
				<p className="flex font-montserrat items-center text-lg/8 text-justify pe-[15%]">
					Selamat Datang di Blog Dekko! Blog ini berisi informasi tentang Miko,
					tulis-tulisannya beragram seperti hidup saya yang selalu dihebohkan
					dengan kejutan-kejutan yang tidak terduga. Heheh...
				</p>
				<Link
					to="/blogs"
					className="col-start-2 -translate-y-72 uppercase outline-2 ms-[33%] ps-2 me-[362px] hover:-translate-y-[45vh] duration-300 antialiased rounded-sm hover:bg-zinc-700 hover:shadow-md/50"
				>
					Masuk Ke Blog
				</Link>
			</div>
		</GuestLayout>
	);
};
