import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GuestLayout } from "../layouts/guest";

export const BlogPage = () => {
	const [blogs, setBlogs] = useState([]);
	//const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const url = `http://localhost:8000/api/blog`;
			const res = await axios.get(url);

			setBlogs(res.data.blogs);
		};

		fetchData();
	}, []);

	return (
		<GuestLayout>
			<div className="grid gap-y-[13vh] motion-preset-focus">
				<h1 className="text-center text-7xl font-bold text-shadow-md/10 mt-14">
					Blog Page
				</h1>

				<div className="grid grid-cols-3 gap-y-10 mx-auto w-250 gap-x-5 mb-12">
					{blogs.map((blog, key) => (
						<div className="block" key={key}>
							<figure className="relative mb-3">
								<Link to={`/detail/${blog.slug}`}>
									<img
										src={`http://localhost:8000/storage/blogs/photo/${blog.photo}`}
										alt="Photo"
										className=" w-80 h-60 object-cover object-center brightness-[80%] grayscale-[40%] hover:brightness-100 duration-300 hover:shadow-md/10 hover:grayscale-0"
									/>
								</Link>
								<figCaption>
									<p className="absolute px-3 py-1 text-[13px] tracking-widest right-5 text-white top-5 uppercase font-bold font-montserrat bg-red-600">
										{blog?.category?.name}
									</p>
								</figCaption>
							</figure>
							<h1 className="text-center font-semibold font-montserrat text-shadow-md/10 text-lg">
								{blog.title}
							</h1>
							<div className="flex justify-center gap-x-2 mt-2 text-sm text-shadow-sm/5">
								<p className="font-montserrat">{blog.release}</p>
								<span className="text-white font-semibold">&#183;</span>
								<p className="text-white">{blog?.user?.name}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</GuestLayout>
	);
};
