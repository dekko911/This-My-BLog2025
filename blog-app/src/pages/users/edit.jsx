import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthLayout } from "../../layouts/auth";

export const EditUserPage = () => {
	const params = useParams();
	const [user, setUser] = useState({});
	const [validationError, setValidationError] = useState([]);

	useEffect(() => {
		const fetchUser = async () => {
			const url = `http://localhost:8000/api/users/${params.id}`;
			const res = await axios.get(url);

			setUser(res.data.user);
		};

		fetchUser();
	}, [params.id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = `http://localhost:8000/api/users/${params.id}`;

		try {
			const res = await axios.patch(url, user);

			console.log(res.data);

			if (res.data) {
				const Toast = Swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: true,
					didOpen: (toast) => {
						toast.onmouseenter = Swal.stopTimer;
						toast.onmouseleave = Swal.resumeTimer;
					},
				});
				Toast.fire({
					icon: "success",
					title: `${res.data.message}`,
				});
			}
		} catch (error) {
			//console.error(error);

			if (error.status === 422) {
				setValidationError(error.response.data.errors);
			}

			if (error.response.status === 500) {
				const Toast = Swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					didOpen: (toast) => {
						toast.onmouseenter = Swal.stopTimer;
						toast.onmouseleave = Swal.resumeTimer;
					},
				});
				Toast.fire({
					icon: "warning",
					title: `${error.response.data.message}`,
				});
			}
		}
	};

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

					<label htmlFor="" className="flex font-semibold tracking-wider mb-2">
						Roles :
					</label>
					<input
						type="text"
						name="roles"
						defaultValue={user.roles || ""}
						className="bg-zinc-200 rounded-md w-full focus:outline-1 focus:outline-zinc-200/20 text-black px-5 focus:animate-pulse py-2 mb-2"
						placeholder="writer, creator, user"
						onKeyUp={(e) => {
							setUser((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>
					{validationError.roles && (
						<span className="text-red-500 text-md font-semibold">
							{validationError.roles}
						</span>
					)}

					<button className="w-full mt-5 text-2xl uppercase bg-pink-600 p-2 rounded-lg text-white font-bold font-montserrat tracking-wide shadow-md/15 hover:bg-pink-700 cursor-pointer">
						Submit
					</button>
				</form>
			</div>
		</AuthLayout>
	);
};
