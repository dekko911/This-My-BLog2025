import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router";
import { AuthLayout } from "../../layouts/auth";
import { swalDialogConfirm, swalToast } from "../../lib/sweet-alert";

export const BlogsPage = () => {
	const hasToken = Cookies.get("token");

	const [blogs, setBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const urlSearch = `http://localhost:8000/api/blogs?search=${search}`;
			const res = await axios.get(urlSearch, {
				headers: { Authorization: `Bearer ${hasToken}` },
			});

			setBlogs(res.data.blogs);

			setIsLoading(false);
		};

		fetchData();
	}, [search, hasToken, isLoading]);

	const handleDelete = (id) => {
		swalDialogConfirm(
			"Deleting Data Blog",
			"Are You Sure Delete This Data ?",
			"info"
		).then(async (res) => {
			if (res.isConfirmed) {
				const url = `http://localhost:8000/api/blogs/${id}`;
				const res = await axios.delete(url, {
					headers: { Authorization: `Bearer ${hasToken}` },
				});

				if (res.data) {
					swalToast("success", `${res.data.status}`, 270);

					setBlogs((blogs) => blogs.filter((blog) => blog.id !== id));
				}
			}
		});
	};

	return (
		<AuthLayout>
			<div className="grid gap-y-3 justify-center">
				<h1 className="font-extrabold text-6xl mt-10 text-center tracking-wide mb-[5vh]">
					Data Blogs
				</h1>

				<div className="motion-preset-blur-up-md">
					<div className="grid grid-cols-2 mb-3">
						<Link
							to="/blogs/create"
							className="p-1 flex items-center gap-x-1.5 w-35 rounded-md hover:text-green-500 hover:text-shadow-md/15 hover:translate-x-1 duration-300 text-lg"
						>
							<FaPlus className="mb-[0.1vh]" />
							Create New
						</Link>
						<input
							type="search"
							className="w-57 ms-auto shadow-md/15 rounded-md bg-white text-black px-4 focus:outline-0 focus:animate-pulse"
							placeholder="Type Here ..."
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
					</div>

					<div className="bg-white/20 backdrop-blur-lg rounded-md mb-10 w-full shadow-md/20">
						<table className="m-3 w-270">
							<thead className="text-shadow-md/10 border-b border-zinc-200/20">
								<tr>
									<th className="p-3 font-normal border-r border-zinc-200/20">
										No.
									</th>
									<th className="p-3 font-normal border-r border-zinc-200/20">
										Author
									</th>
									<th className="p-3 font-normal border-r border-zinc-200/20">
										<Link
											to="/categories"
											className="animate-pulse hover:text-blue-600 hover:underline hover:animate-none"
										>
											Category
										</Link>
									</th>
									<th className="p-3 font-normal border-r border-zinc-200/20">
										Title
									</th>
									<th className="p-3 font-normal border-r border-zinc-200/20">
										Slug
									</th>
									<th className="p-3 font-normal border-r border-zinc-200/20">
										Description
									</th>
									<th className="p-3 font-normal border-r border-zinc-200/20">
										Release Date
									</th>
									<th className="p-3 font-normal border-r border-zinc-200/20">
										Photo
									</th>
									<th className="p-3 font-normal">🛠️</th>
								</tr>
							</thead>
							<tbody className="text-center">
								<img
									src="../src/assets/photo/loading.gif"
									alt="loading"
									className={`p-5 translate-x-[405%] w-30 ${
										isLoading ? "block" : "hidden"
									}`}
								/>
								{blogs.map((blog, key) => (
									<tr key={key}>
										<td className="p-2 border-b border-r border-zinc-200/20">
											{key + 1}
										</td>
										<td className="p-2 border-b border-r border-zinc-200/20">
											{blog?.user?.name}
										</td>
										<td className="p-2 border-b border-r border-zinc-200/20">
											{blog?.category?.name}
										</td>
										<td className="p-2 border-b border-r border-zinc-200/20 w-40">
											{blog.title}
										</td>
										<td className="p-2 border-b border-r border-zinc-200/20 w-30">
											<Link
												to={`/details/${blog.slug}`}
												className="hover:text-blue-600 hover:underline"
											>
												{blog.slug}
											</Link>
										</td>
										<td className="p-3 border-b border-r border-zinc-200/20 line-clamp-9 text-justify w-[270px] whitespace-pre-wrap">
											{blog.description}
										</td>
										<td className="p-2 border-b border-r border-zinc-200/20 w-29">
											{blog.release}
										</td>
										<td className="p-2 border-b border-r border-zinc-200/20">
											<img
												src={`http://localhost:8000/storage/blogs/photo/${blog.photo}`}
												alt="Foto"
												className="cursor-pointer rounded-md hover:scale-105 duration-300 w-50"
												onClick={() => {
													window.open(
														`http://localhost:8000/storage/blogs/photo/${blog.photo}`
													);
												}}
											/>
										</td>
										<td className="p-2 border-b border-zinc-200/20">
											<Link
												to={`/blogs/${blog.id}`}
												className="block hover:text-pink-500 duration-300 hover:text-shadow-md/10 cursor-pointer"
											>
												Edit
											</Link>
											<button
												className="hover:text-red-500 duration-300 hover:text-shadow-md/10 cursor-pointer"
												onClick={() => {
													handleDelete(blog.id);
												}}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</AuthLayout>
	);
};
