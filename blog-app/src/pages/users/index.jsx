import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthLayout } from "../../layouts/auth";
import { swalDialogConfirm, swalToast } from "../../lib/sweet-alert";
import { createPortal } from "react-dom";

export const UsersPage = () => {
	const hasToken = Cookies.get("token");
	const navigate = useNavigate();

	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const urlSearch = `http://localhost:8000/api/users?search=${search}`;
			const res = await axios.get(urlSearch, {
				headers: { Authorization: `Bearer ${hasToken}` },
			});

			if (res.data.status === "Role Not Match.") {
				navigate("/blogs", {
					preventScrollReset: true,
				});

				swalToast("warning", "Oops, Something Wen't Wrong !");
			}
			setUsers(res.data.users);

			setIsLoading(false);
		};

		fetchData();
	}, [search, hasToken, navigate, isLoading]);

	const handleDelete = (id) => {
		swalDialogConfirm(
			"Deleting User",
			"Are You Sure Delete This User ?",
			"info"
		).then(async (res) => {
			if (res.isConfirmed) {
				const url = `http://localhost:8000/api/users/${id}`;
				const res = await axios.delete(url, {
					headers: { Authorization: `Bearer ${hasToken}` },
				});

				if (res.data) {
					swalToast("success", `${res.data.status}`, 270);
					setUsers((prev) => prev.filter((user) => user.id !== id));
				}
			}
		});
	};

	return (
		<AuthLayout>
			<div className="grid gap-y-3 justify-center relative">
				{createPortal(
					<img
						src="../src/assets/photo/loading.gif"
						alt="loading"
						className={`p-11 absolute top-42 right-110 w-30 motion-preset-blur-up-md ${
							isLoading ? "block" : "hidden"
						}`}
					/>,
					document.body
				)}
				<h1 className="flex justify-center font-extrabold text-6xl mb-5 mt-10 text-shadow-sm/10">
					Data Users
				</h1>

				<div className="motion-preset-blur-up-md">
					<div className="grid grid-cols-2 mb-4">
						<Link
							to="/users/create"
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
					<div className="shadow-md/20 bg-white/20 backdrop-blur-lg w-240 rounded-lg mb-8">
						<table className="w-233 m-3">
							<thead className="border-b border-zinc-200/20 text-shadow-md/10">
								<tr>
									<th className="font-normal border-r border-zinc-200/20 p-2">
										No.
									</th>
									<th className="font-normal border-r border-zinc-200/20 p-2">
										Name
									</th>
									<th className="font-normal border-r border-zinc-200/20 p-2">
										Email
									</th>
									<th className="border-r border-zinc-200/20 p-2">
										<Link
											to="/roles"
											className="font-normal animate-pulse hover:text-blue-600 hover:underline hover:animate-none"
										>
											Roles
										</Link>
									</th>
									<th className="font-normal p-2">🛠️</th>
								</tr>
							</thead>
							<tbody className="text-center border-b border-zinc-200/20 text-shadow-md/10">
								{users.map((user, key) => (
									<tr key={key}>
										<td className="p-2 border-r border-b border-zinc-200/20">
											{key + 1}
										</td>
										<td className="border-r border-b border-zinc-200/20">
											{user.name}
										</td>
										<td className="border-r border-b border-zinc-200/20">
											{user.email}
										</td>
										<td className="border-r border-b border-zinc-200/20">
											{user?.roles
												?.map((role) => {
													return `${role.name}`;
												})
												.join(" ")}
										</td>
										<td className="w-40 mx-auto self-center border-b border-zinc-200/20 whitespace-nowrap">
											<Link
												to={`/users/${user.id}`}
												className="hover:text-pink-500 duration-300 pe-1 cursor-pointer"
											>
												Edit
											</Link>
											<span className="text-center text-zinc-200/20 text-shadow-none">
												|
											</span>
											<button
												className="text-shadow-md/10 hover:text-red-500 cursor-pointer duration-300 ms-1"
												onClick={() => {
													handleDelete(user.id);
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
