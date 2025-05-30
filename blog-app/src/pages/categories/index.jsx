import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router";
import { AuthLayout } from "../../layouts/auth";
import { swalDialogConfirm, swalToast } from "../../lib/sweet-alert";

export const CategoryPage = () => {
	const hasToken = Cookies.get("token");

	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const url = `http://localhost:8000/api/categories?search=${search}`;
			const res = await axios.get(url, {
				headers: { Authorization: `Bearer ${hasToken}` },
			});

			setCategories(res.data.categories);
			setIsLoading(false);
		};

		fetchData();
	}, [search, hasToken, isLoading]);

	const handleDelete = (id) => {
		swalDialogConfirm(
			"Deleting Category",
			"Are You Sure Deleting This Data ?",
			"info"
		).then(async (res) => {
			if (res.isConfirmed) {
				const url = `http://localhost:8000/api/categories/${id}`;
				const res = await axios.delete(url, {
					headers: { Authorization: `Bearer ${hasToken}` },
				});

				if (res.data) {
					swalToast("success", `${res.data.status}`, 300);
					setCategories((prev) =>
						prev.filter((category) => category.id !== id)
					);
				}
			}
		});
	};

	return (
		<AuthLayout>
			<div className="grid justify-center gap-y-4">
				<h1 className="text-center font-bold text-7xl text-shadow-md/10 mt-9">
					Data Categories
				</h1>

				<div className="motion-preset-blur-up-md">
					<div className="grid grid-cols-2 w-200 mt-8 items-center">
						<Link
							to="/categories/create"
							className="flex items-center gap-1.5 hover:text-green-500 duration-300 hover:translate-x-1 hover:text-shadow-md/10 text-lg"
						>
							<FaPlus />
							Create New
						</Link>

						<input
							type="search"
							className="bg-white text-black rounded-md px-4 py-2 w-65 ms-auto"
							placeholder="Type Here . . ."
							onKeyUp={(e) => {
								setSearch(e.target.value);
							}}
						/>
					</div>

					<div className="w-200 bg-white/20 backdrop-blur-lg rounded-md shadow-md/20 mb-6">
						<table className="m-3.5 w-190">
							<thead className="border-b border-zinc-200/20">
								<tr>
									<th className="p-2 font-normal border-r border-zinc-200/20">
										No.
									</th>
									<th className="p-2 font-normal border-r border-zinc-200/20">
										Name
									</th>
									<th className="p-2 font-normal border-r border-zinc-200/20">
										Slug
									</th>
									<th className="p-2 font-normal">🛠️</th>
								</tr>
							</thead>
							<tbody className="text-center">
								<img
									src="../src/assets/photo/loading.gif"
									alt="loading"
									className={`p-5 translate-x-[280%] w-30 ${
										isLoading ? "block" : "hidden"
									}`}
								/>
								{categories.map((category, key) => (
									<tr key={key}>
										<td className="p-2 border-b border-r border-zinc-200/20">
											{key + 1}
										</td>
										<td className="border-b border-r border-zinc-200/20">
											{category.name}
										</td>
										<td className="border-b border-r border-zinc-200/20">
											{category.slug}
										</td>
										<td className="border-b border-zinc-200/20">
											<button
												className="ms-1.5 hover:text-red-500 hover:text-shadow-md/10 duration-300 cursor-pointer"
												onClick={() => {
													handleDelete(category.id);
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
