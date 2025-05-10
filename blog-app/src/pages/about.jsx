import { GuestLayout } from "../layouts/guest";

export const AboutPage = () => {
	return (
		<GuestLayout>
			<div className="grid gap-y-3 pt-14">
				<h1 className="text-6xl font-extrabold text-shadow-md/5 flex justify-center tracking-wider">
					About
				</h1>
				<div className="motion-opacity-in-0 motion-translate-y-in-[5vh] motion-blur-in-sm">
					<div className="p-8 grid grid-cols-2 m-5">
						<p className="ps-12 indent-8 font-lora tracking-normal text-shadow-sm/5 text-justify self-center text-base/loose">
							Halo Semuanya, saya I Kadek Miko Suyasa kalian bisa memanggilku{" "}
							<span className="italic bg-zinc-50 text-black">Miko/Dekko</span>,
							Salam Kenal ya ! <span className="italic">By the way</span>,
							terkadang saya suka mengucapkan selamat kepada diriku sendiri yang
							bertepatan pada hari
							<span className="italic bg-zinc-50 text-black">25 Maret.</span>
						</p>
						<h1 className="font-montserrat font-extrabold text-9xl justify-center flex self-center tracking-tight bg-linear-90 from-red-900 to-red-600 bg-clip-text text-transparent hover:tracking-wider duration-300 hover:scale-[110%] hover:animate-pulse">
							Dekko
						</h1>
					</div>
					<div
						className="bg-[url(../photo1.jpg)] bg-center bg-cover grayscale-100 bg-no-repeat py-[250px] hover:grayscale-0 duration-500 transform-gpu hover:saturate-125 cursor-pointer"
						onClick={() => {
							window.open("../photo1.jpg");
						}}
					/>
					<p className="font-lora flex justify-center text-justify mx-[250px] pt-5 text-base/loose tracking-normal text-shadow-sm/5">
						Saya mengambil jurusan Manajemen Informatika di Kampus Alfa Prima
						dan masih dalam status pelajar disana. Terdengarnya tidak penting,
						memang. tapi setidaknya saya bisa memulai percakapan dengan,
						"...sebagai seorang yang ingin terjun ke dunia coding".
					</p>
					<p className="font-lora flex justify-center text-justify mx-[250px] pt-5 text-base/loose tracking-normal text-shadow-sm/5">
						Memulai Ngoding semenjak saya masuk ke dunia perkuliahan, lalu entah
						mengapa, saya mulai suka dengan hal yang berbau coding, terutama
						dengan tailwind css. Seiring bertambah dewasa, saya mulai jenuh
						dengan bermain handphone terus-terusan, bisa-bisa membuat saya
						menggunakan kaca mata karena dekat dengan layar handphone dengan
						terus-menerus. (mulai gak nyambung....)
					</p>
					<p className="font-lora flex justify-center text-justify mx-[250px] pt-5 text-base/loose tracking-normal text-shadow-sm/5">
						Untuk Genre Lagu tergantung dengan mood saya, hehe... Terkadang suka
						lagu rock, dan terkadang bisa berubah suka lagu pop, dll. Ya
						begitulah manusia, kadang ga bisa ditebak. Untuk game juga sama,
						tapi bedanya sekarang udah gak tertarik lagi sama game yang berranah
						esport, dengan kata lain game yang bikin sakit kepala dan pengen
						lembiru handphone (beli yang baru maksud dari lembiru itu.) mungkin
						segitu saja yang ingin saya ceritakan tentang kehidupan saya. Kalau
						kebanyakan takut gak enakkan...
					</p>
					<h1 className="text-6xl font-montserrat font-extrabold text-shadow-md/10 flex justify-center pt-12">
						What I Do{" "}
						<span className="ms-3 italic bg-zinc-50 text-black">Before ?</span>
					</h1>
					<h1 className="text-8xl font-extrabold flex justify-center p-10 text-shadow-md/25">
						nothing yet.{" "}
						<span className="ms-2 font-extralight text-sm flex items-end text-shadow-sm/5">
							sad...
						</span>
					</h1>
					<p className="flex justify-center -mt-3 opacity-50 mb-10">
						*but next time, i will make a changes in my life... i'm promise.
					</p>
				</div>
			</div>
		</GuestLayout>
	);
};
