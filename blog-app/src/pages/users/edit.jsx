import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthLayout } from "../../layouts/auth";
import { swalToast } from "../../lib/sweet-alert";

export const EditUserPage = () => {
	const hasToken = Cookies.get("token");

	const params = useParams();
	const navigate = useNavigate();

	const [user, setUser] = useState({});
	const [validationError, setValidationError] = useState([]);

	useEffect(() => {
		const fetchUser = async () => {
			const url = `http://localhost:8000/api/users/${params.id}`;
			const res = await axios.get(url, {
				headers: { Authorization: `Bearer ${hasToken}` },
			});

			setUser(res.data.user);
		};

		fetchUser();
	}, [params.id, hasToken]);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			const url = `http://localhost:8000/api/users/${params.id}`;

			try {
				const res = await axios.patch(url, user, {
					headers: { Authorization: `Bearer ${hasToken}` },
				});

				if (res.data) {
					swalToast("success", `${res.data.message}`, 360);
					navigate("/users");
				}
			} catch (error) {
				if (error.status === 422) {
					setValidationError(error.response.data.errors);
				}

				if (error.response.status === 500) {
					swalToast("warning", `${error.response.data.message}`, 365);
				}
			}
		},
		[hasToken, navigate, params.id, user]
	);

	return (
		<AuthLayout>
			<div className="grid justify-center gap-y-4">
				<h1 className="font-bold text-6xl mt-6 mb-4 text-center">Edit User</h1>
				<form
					onSubmit={handleSubmit}
					className="mb-9 p-9 w-[650px] rounded-lg shadow-md/20 bg-white/10 backdrop-blur-lg motion-preset-blur-up-md"
				>
					<label htmlFor="" className="flex font-semibold tracking-wider mb-2">
						Name :
					</label>
					<input
						type="text"
						name="name"
						defaultValue={user.name || ""}
						className="bg-zinc-200 rounded-md w-full focus:outline-1 focus:outline-zinc-200/20 text-black px-5 focus:animate-pulse py-2 mb-3"
						placeholder="Your Name ..."
						onKeyUp={(e) => {
							setUser((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>
					{validationError.name && (
						<span className="text-red-500 text-md font-semibold">
							{validationError.name}
						</span>
					)}

					<label htmlFor="" className="flex font-semibold tracking-wider mb-2">
						Email :
					</label>
					<input
						type="email"
						name="email"
						defaultValue={user.email || ""}
						className="bg-zinc-200 rounded-md w-full focus:outline-1 focus:outline-zinc-200/20 text-black px-5 focus:animate-pulse py-2 mb-3"
						placeholder="example@example.com"
						onKeyUp={(e) => {
							setUser((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>
					{validationError.email && (
						<span className="text-red-500 text-md font-semibold">
							{validationError.email}
						</span>
					)}

					<label htmlFor="" className="flex font-semibold tracking-wider mb-2">
						Password :
					</label>
					<input
						type="password"
						name="password"
						className="bg-zinc-200 rounded-md w-full focus:outline-1 focus:outline-zinc-200/20 text-black px-5 focus:animate-pulse py-2 mb-3"
						placeholder="********"
						onKeyUp={(e) => {
							setUser((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>

					<button className="w-full mt-5 text-2xl uppercase bg-pink-600 p-2 rounded-lg text-white font-bold font-montserrat tracking-wide shadow-md/15 hover:bg-pink-700 cursor-pointer">
						Submit
					</button>
				</form>
			</div>
		</AuthLayout>
	);
};
