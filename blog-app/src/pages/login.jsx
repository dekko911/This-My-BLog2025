import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuroraBackground } from "../components/ui/aurora-background";
import { swalToast } from "../lib/sweet-alert";

export const LoginPage = () => {
	const navigate = useNavigate();

	const [form, setForm] = useState({});
	const [validationError, setValidationError] = useState([]);

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const url = "http://localhost:8000/api/login";
			const res = await axios.post(url, form);

			if (res.data) {
				if (res.data.status && res.data.status === "success") {
					const plainTextToken = res.data.token.plainTextToken;
					const token = plainTextToken.split("|")[1];

					const abilities = res.data.token.accessToken.abilities;
					const name = res.data.token.accessToken.name;
					const email = res.data.user.email;

					Cookies.set("token", token);
					Cookies.set("abilities", abilities);
					Cookies.set("name", name);
					Cookies.set("email", email);

					if (abilities == "admin") {
						navigate("/users", { preventScrollReset: true });
					} else {
						navigate("/blogs", { preventScrollReset: true });
					}

					swalToast("success", `Welcome, ${res.data.user.name} !`, 300);
				}

				if (res.data.status && res.data.status === "fail") {
					swalToast("warning", `${res.data.message}`, 368);
				}
			}
		} catch (error) {
			if (error.status === 422) {
				setValidationError(error.response.data.errors);
			}
		}
	};

	return (
		<AuroraBackground showRadialGradient={false}>
			<div className="w-110 bg-white/10 p-5 rounded-lg shadow-md/10 backdrop-blur-md motion-preset-blur-down">
				<form onSubmit={handleLogin}>
					<Link to="/">
						<FaHome className="mx-1 scale-150 text-white hover:rotate-[5deg] hover:translate-x-2 hover:text-zinc-400 duration-300" />
					</Link>
					<h1 className="text-center mt-6 text-6xl uppercase font-extrabold font-montserrat tracking-wide bg-linear-to-r from-white to-zinc-600 bg-clip-text text-transparent text-shadow-md/5">
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
		</AuroraBackground>
	);
};
