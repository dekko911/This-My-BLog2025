import { Link } from "react-router";
import { AuthLayout } from "../../layouts/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

export const UsersPage = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const url = "http://localhost:8000/api/users";
			const res = await axios.get(url);

			setUsers(res.data.users);
		};

		fetchData();
	}, []);

	return (
		<AuthLayout>
			<div className="grid gap-2 justify-center">
				<h1 className="flex justify-center font-extrabold text-6xl mb-3 mt-10 text-shadow-sm/10">
					Data Users
				</h1>
				<Link className="p-1 flex items-center gap-x-1.5 hover:bg-linear-to-r from-zinc-600 to-zinc-800 w-32 rounded-md hover:shadow-md/20 hover:-translate-y-1 duration-300">
					<FaPlus />
					Create New
				</Link>
				<div className="motion-preset-blur-up-sm h-100 shadow-md/20 bg-white/20 backdrop-blur-lg w-240 rounded-lg mb-8">
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
									<td className="p-2 border-r border-b border-zinc-200/20">
										{user.name}
									</td>
									<td className="p-2 border-r border-b border-zinc-200/20">
										{user.email}
									</td>
									<td className="p-2 border-r border-b border-zinc-200/20">
										{user.roles}
									</td>
									<td className="p-2 w-40 mx-auto self-center border-b border-zinc-200/20 whitespace-nowrap">
										<Link
											to="/users/create"
											className="hover:text-pink-500 hover:pe-2 duration-300 pe-1"
										>
											Edit
										</Link>
										<span className="text-center text-zinc-200/20 text-shadow-none">
											|
										</span>
										<button className="text-shadow-md/10 hover:translate-x-[5px] hover:text-red-500 duration-300 ms-1">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</AuthLayout>
	);
};
