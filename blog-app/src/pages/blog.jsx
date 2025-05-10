import { Link } from "react-router";
import { GuestLayout } from "../layouts/guest";

export const BlogPage = () => {
	return (
		<GuestLayout>
			<div className="grid gap-y-[16vh]">
				<h1>Blog Page</h1>

				<div className="flex gap-12 mx-auto">
					<Link className="bg-linear-60 from-purple-500 to-pink-500 text-white text-2xl rounded-lg p-3 font-bold hover:animate-pulse">
						Lagi Bener
					</Link>
					<Link className="bg-linear-60 from-purple-500 to-pink-500 text-white text-2xl rounded-lg p-3 font-bold hover:animate-pulse">
						Daily Life
					</Link>
					<Link className="bg-linear-60 from-purple-500 to-pink-500 text-white text-2xl rounded-lg p-3 font-bold hover:animate-pulse">
						Holidays
					</Link>
				</div>
			</div>
		</GuestLayout>
	);
};
