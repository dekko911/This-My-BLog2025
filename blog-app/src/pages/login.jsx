import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { swalToast } from "../lib/sweet-alert";

export const LoginPage = () => {
	const navigate = useNavigate();

	const [form, setForm] = useState({});
	const [validationError, setValidationError] = useState([]);

	const handleLogin = async (e) => {
		e.preventDefault();

		const url = "http://localhost:8000/api/login";

		try {
			const res = await axios.post(url, form);

			if (res.data) {
				const plainTextToken = res.data.token.plainTextToken;
				const token = plainTextToken.split("|")[1];

				const abilities = res.data.token.accessToken.abilities;

				Cookies.set("token", token);
				Cookies.set("abilities", abilities);

				//console.log(res.data);

				swalToast("success", `Welcome, ${res.data.user.name} !`, 300);

				if (abilities == "admin") {
					navigate("/users");
				} else {
					navigate("/blogs");
				}
			}
		} catch (error) {
			console.error(error);

			if (error.status === 422) {
				setValidationError(error.response.data.errors);
			}
		}
	};

	return (
		<div className="relative flex justify-center items-center min-h-screen bg-linear-to-r from-zinc-600 to-zinc-400">
			<div className="translate-x-[70%] w-72 h-72 bg-red-500 rounded-full mix-blend-multiply fliter blur-xl opacity-80 animate-blob"></div>
			<div className="translate-y-[10%] w-72 h-72 bg-yellow-500 rounded-full z-[1] mix-blend-multiply fliter blur-xl opacity-80 animate-bleb"></div>
			<div className="-translate-x-[70%] w-72 h-72 bg-green-500 rounded-full mix-blend-multiply fliter blur-xl opacity-80 animate-blub"></div>
			<form
				onSubmit={handleLogin}
				className="absolute bg-white/20 p-5 w-[30%] rounded-lg shadow-md/10 backdrop-blur-md motion-preset-blur-down z-[3]"
			>
				<Link to="/">
					<FaHome className="mx-1 scale-150 text-white hover:rotate-[5deg] hover:translate-x-2 hover:text-zinc-300 duration-300" />
				</Link>
				<h1 className="flex justify-center mt-6 text-6xl uppercase font-extrabold font-montserrat tracking-wide bg-linear-to-r from-zinc-50 to-zinc-300 bg-clip-text text-transparent text-shadow-md/5">
					Login
				</h1>
				<input
					type="email"
					name="email"
					className="border-zinc-50 rounded-md h-12 bg-zinc-50 p-3 mt-9 w-full shadow-md/10"
					placeholder="example@example.com"
					onKeyUp={(e) => {
						setForm((prev) => {
							return { ...prev, [e.target.name]: e.target.value };
						});
					}}
				/>
				{validationError.email && (
					<span className="text-red-500 mt-2 font-semibold block">
						{validationError.email}
					</span>
				)}

				<input
					type="password"
					name="password"
					className="border-zinc-50 rounded-md h-12 bg-zinc-50 p-3 mt-8 w-full shadow-md/20"
					placeholder="Enter Password ..."
					onKeyUp={(e) => {
						setForm((prev) => {
							return { ...prev, [e.target.name]: e.target.value };
						});
					}}
				/>
				{validationError.password && (
					<span className="text-red-500 mt-2 font-semibold block">
						{validationError.password}
					</span>
				)}

				<button
					type="submit"
					className="border-2 mt-10 rounded-md text-white uppercase mx-[40%] px-4 py-2 hover:bg-zinc-700 hover:-translate-y-1 hover:shadow-md/30 duration-300 cursor-pointer"
				>
					Login
				</button>
			</form>
		</div>
	);
};
