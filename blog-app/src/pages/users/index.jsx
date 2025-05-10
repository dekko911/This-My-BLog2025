import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router";
import { AuthLayout } from "../../layouts/auth";

export const UsersPage = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const urlSearch = `http://localhost:8000/api/users?search=${search}`;
			const res = await axios.get(urlSearch);

			setUsers(res.data.users);
		};

		fetchData();
	}, [search]);

	return (
		<AuthLayout>
			<div className="grid gap-y-3 justify-center">
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
									<th className="font-normal border-r border-zinc-200/20 p-2">
										Roles
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
											{user.roles}
										</td>
										<td className="w-40 mx-auto self-center border-b border-zinc-200/20 whitespace-nowrap">
											<Link
												to={``}
												className="hover:text-pink-500 duration-300 pe-1"
											>
												Edit
											</Link>
											<span className="text-center text-zinc-200/20 text-shadow-none">
												|
											</span>
											<button className="text-shadow-md/10 hover:text-red-500 duration-300 ms-1">
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
