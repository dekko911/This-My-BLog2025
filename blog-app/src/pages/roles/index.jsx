import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AuthLayout } from "../../layouts/auth";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
import { swalDialogConfirm, swalToast } from "../../lib/sweet-alert";

export const RolesPage = () => {
	const hasToken = Cookies.get("token");

	const [roles, setRoles] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchRoles = async () => {
			const url = `http://localhost:8000/api/roles?search=${search}`;
			const res = await axios.get(url, {
				headers: { Authorization: `Bearer ${hasToken}` },
			});

			setRoles(res.data.roles);
		};

		fetchRoles();
	}, [search, hasToken]);

	const handleDelete = (id) => {
		swalDialogConfirm(
			"Deleting Role",
			"Are You Sure Delete This Data ?",
			"info"
		).then(async (res) => {
			if (res.isConfirmed) {
				const url = `http://localhost:8000/api/roles/${id}`;
				const res = await axios.delete(url, {
					headers: { Authorization: `Bearer ${hasToken}` },
				});

				if (res.data) {
					swalToast("success", `${res.data.status}`, 260);
					setRoles((prev) => prev.filter((role) => role.id !== id));
				}
			}
		});
	};

	return (
		<AuthLayout>
			<div className="grid justify-center gap-y-6">
				<h1 className="text-center font-bold text-7xl text-shadow-md/10 mt-9">
					Data Roles
				</h1>

				<div className="motion-preset-blur-up-md">
					<div className="grid grid-cols-2 w-200 mt-8 items-center">
						<Link
							to="/roles/create"
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

					<table className="w-200 bg-white/20 backdrop-blur-lg rounded-md shadow-md/20 mt-3 mb-6">
						<thead className="m-3.5 w-190">
							<tr className="border-b border-zinc-200/20">
								<th className="p-2 font-normal border-r border-zinc-200/20">
									No.
								</th>
								<th className="p-2 font-normal border-r border-zinc-200/20">
									Owner Role
								</th>
								<th className="p-2 font-normal border-r border-zinc-200/20">
									Name
								</th>
								<th className="p-2 font-normal">🛠️</th>
							</tr>
						</thead>
						<tbody className="text-center">
							{roles.map((role, key) => (
								<tr key={key}>
									<td className="p-2 border-b border-r border-zinc-200/20">
										{key + 1}
									</td>
									<td className="border-b border-r border-zinc-200/20">
										{role?.user?.name}
									</td>
									<td className="border-b border-r border-zinc-200/20">
										{role.name}
									</td>
									<td className="border-b border-zinc-200/20">
										<button
											className="ms-1.5 hover:text-red-500 hover:text-shadow-md/10 duration-300 cursor-pointer"
											onClick={() => {
												handleDelete(role.id);
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
		</AuthLayout>
	);
};
