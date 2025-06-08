import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../../layouts/auth";
import { swalToast } from "../../lib/sweet-alert";

export const CreateRolePage = () => {
	const hasToken = Cookies.get("token");
	const navigate = useNavigate();

	const [form, setForm] = useState({});
	const [userSelect, setUserSelect] = useState([]);
	const [validationError, setValidationError] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const urlUsers = "http://localhost:8000/api/users";
			const res = await axios.get(urlUsers, {
				headers: { Authorization: `Bearer ${hasToken}` },
			});

			const results = [];
			res.data.users.forEach((data) => {
				results.push({
					key: data.name,
					value: data.id,
				});
			});

			setUserSelect([{ key: "Select a User", value: "" }, ...results]);
		};

		fetchUsers();
	}, [hasToken]);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			const url = "http://localhost:8000/api/roles";

			try {
				const res = await axios.post(url, form, {
					headers: { Authorization: `Bearer ${hasToken}` },
				});

				if (res.data) {
					swalToast("success", `${res.data.message}`, 350);

					navigate("/roles");
				}
			} catch (error) {
				//console.error(error);

				if (error.status === 500) {
					swalToast("warning", `${error.response.data.message}`, 300);
				}

				if (error.status === 422) {
					setValidationError(error.response.data.errors);
				}

				if (error.response.data.line === 817) {
					swalToast("error", "Duplicate Role !", 280);
				}
			}
		},
		[form, hasToken, navigate]
	);

	return (
		<AuthLayout>
			<div className="grid gap-y-4 justify-center">
				<h1 className="text-center text-6xl font-extrabold text-shadow-md/10 mt-10">
					Create Role
				</h1>
				<div className="motion-preset-blur-up-md shadow-md/20 bg-white/20 backdrop-blur-lg mt-6 w-130 p-5 rounded-lg mb-5">
					<form onSubmit={handleSubmit}>
						<label htmlFor="" className="font-bold">
							Owner :
						</label>
						<select
							className="block bg-white text-black px-2 w-full rounded-lg py-3 mt-1 focus:outline-0 mb-3"
							name="user_id"
							onChange={(e) => {
								const userValue = e.target.value;

								setForm((prev) => {
									return { ...prev, [e.target.name]: userValue };
								});
							}}
						>
							{userSelect.map((user) => {
								return (
									<option key={user.value} value={user.value}>
										{user.key}
									</option>
								);
							})}
						</select>
						{validationError.user_id && (
							<span className="text-red-600 block">
								{validationError.user_id}
							</span>
						)}

						<label htmlFor="" className="font-bold">
							Name :
						</label>
						<input
							type="text"
							name="name"
							className="block bg-white text-black px-3 w-full rounded-lg py-3 mt-1 focus:outline-0 mb-3"
							placeholder="writer only . . ."
							onKeyUp={(e) => {
								setForm((prev) => {
									return { ...prev, [e.target.name]: e.target.value };
								});
							}}
						/>
						{validationError.name && (
							<span className="text-red-600 block">{validationError.name}</span>
						)}

						<button className="bg-pink-600 rounded-lg hover:bg-pink-700 cursor-pointer text-white mt-5 py-3 font-bold text-2xl w-full shadow-sm/20">
							Submit
						</button>
						<button
							className="bg-zinc-600 rounded-lg w-full hover:bg-zinc-700 cursor-pointer text-white mt-3 py-3 font-bold text-2xl shadow-sm/20"
							type="reset"
						>
							Reset
						</button>
					</form>
				</div>
			</div>
		</AuthLayout>
	);
};
