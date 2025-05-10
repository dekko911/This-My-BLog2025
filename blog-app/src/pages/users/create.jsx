import axios from "axios";
import { useEffect, useState } from "react";
import { AuthLayout } from "../../layouts/auth";

export const CreateUserPage = () => {
	const [form, setForm] = useState({});
	const [validationError, setValidationError] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = "http://localhost:8000/api/users";

		const formData = new FormData();

		form.name && formData.append("name", form.name);
		form.email && formData.append("email", form.email);
		form.password && formData.append("password", form.password);
		form.roles && formData.append("roles", form.roles);

		try {
			const res = await axios.post(url, formData);

			console.log(res.data);

			if (res.data.status && res.data.status === 200) {
				//
			}
		} catch (error) {
			console.error(error);

			if (error.status === 422) {
				setValidationError(error.response.data.errors);
			}
		}
	};

	useEffect(() => {
		console.log(form);
	}, [form]);

	return (
		<AuthLayout>
			<div className="grid justify-center gap-y-4">
				<h1 className="font-bold text-6xl mt-6 mb-4 text-center">
					Create User
				</h1>
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
						className="bg-zinc-200 rounded-md w-full focus:outline-1 focus:outline-zinc-200/20 text-black px-5 focus:animate-pulse py-2 mb-3"
						placeholder="Your Name ..."
						onKeyUp={(e) => {
							setForm((prev) => {
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
						className="bg-zinc-200 rounded-md w-full focus:outline-1 focus:outline-zinc-200/20 text-black px-5 focus:animate-pulse py-2 mb-3"
						placeholder="example@example.com"
						onKeyUp={(e) => {
							setForm((prev) => {
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
							setForm((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>
					{validationError.password && (
						<span className="text-red-500 text-md font-semibold">
							{validationError.password}
						</span>
					)}

					<label htmlFor="" className="flex font-semibold tracking-wider mb-2">
						Roles :
					</label>
					<input
						type="text"
						name="roles"
						className="bg-zinc-200 rounded-md w-full focus:outline-1 focus:outline-zinc-200/20 text-black px-5 focus:animate-pulse py-2 mb-2"
						placeholder="writer, creator, user"
						onKeyUp={(e) => {
							setForm((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>
					{validationError.roles && (
						<span className="text-red-500 text-md font-semibold">
							{validationError.roles}
						</span>
					)}

					<button className="mx-auto w-full mt-5 text-2xl uppercase bg-pink-600 p-2 rounded-lg text-white font-bold font-montserrat tracking-wide shadow-md/15 hover:bg-pink-700">
						Login
					</button>
				</form>
			</div>
		</AuthLayout>
	);
};
