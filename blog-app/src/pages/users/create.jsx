import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../../layouts/auth";
import { swalToast } from "../../lib/sweet-alert";

export const CreateUserPage = () => {
	const hasToken = Cookies.get("token");
	const navigate = useNavigate();

	const [form, setForm] = useState({});
	const [validationError, setValidationError] = useState([]);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			const url = "http://localhost:8000/api/users";

			try {
				const res = await axios.post(url, form, {
					headers: { Authorization: `Bearer ${hasToken}` },
				});

				if (res.data) {
					swalToast("success", `${res.data.message}`, 300);

					navigate(-1); // -1 balik sekali, -2 balik dua kali, -3 balik tiga kali ke halaman sebelumnya
				}
			} catch (error) {
				if (error.response.data.line === 817) {
					swalToast("error", "Duplicate Data User !", 320);
				}

				if (error.status === 422) {
					setValidationError(error.response.data.errors);
				}
			}
		},
		[form, hasToken, navigate]
	);

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

					<button className="w-full mt-5 text-2xl uppercase bg-pink-600 p-2 rounded-lg text-white font-bold font-montserrat tracking-wide shadow-md/15 hover:bg-pink-700">
						Submit
					</button>
					<button
						className="bg-zinc-600 rounded-lg w-full hover:bg-zinc-700 cursor-pointer text-white mt-3.5 p-2 font-bold text-2xl uppercase font-montserrat shadow-md/15"
						type="reset"
					>
						Reset
					</button>
				</form>
			</div>
		</AuthLayout>
	);
};
