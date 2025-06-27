import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { swalToast } from "../../lib/sweet-alert";
import axios from "axios";

export const AuthLayout = ({ children }) => {
	const hasToken = Cookies.get("token");

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!Cookies.get("token") && !Cookies.get("abilities")) {
			navigate("/", { preventScrollReset: true });

			swalToast("warning", "Oops, Something Went Wrong !");
		}
	}, [navigate]);

	const handleLogout = async (e) => {
		e.preventDefault();

		const url = `http://localhost:8000/api/logout`;
		const res = await axios.post(url, {
			headers: { Authorization: `Bearer ${hasToken}` },
		});

		if (res.data) {
			if (res.data.status) return;
		}
	};

	return (
		<div className="bg-linear-90 from-zinc-700 to-zinc-500">
			<Header to="/profile">
				<Link
					to="/users"
					className={`hover:text-pink-500 hover:-mt-1 duration-200 ${
						location.pathname === "/users"
							? "text-white animate-pulse duration-300"
							: null
					} ${Cookies.get("abilities") != "admin" ? "hidden" : "block"}`}
				>
					Users
				</Link>
				<Link
					to="/blogs"
					className={`hover:text-pink-500 hover:-mt-1 duration-200 ${
						location.pathname === "/blogs"
							? "text-white animate-pulse duration-300"
							: null
					}`}
				>
					Blogs
				</Link>
				<Link
					to="/profile"
					className={`hover:text-pink-500 hover:-mt-1 duration-200 ${
						location.pathname === "/profile"
							? "text-white animate-pulse duration-300"
							: null
					}`}
				>
					Profile
				</Link>

				<button
					className={`hover:text-pink-500 hover:translate-x-1 duration-200 text-shadow-sm/5 cursor-pointer`}
					onClick={() => {
						Cookies.remove("token");
						Cookies.remove("abilities");
						Cookies.remove("name");
						Cookies.remove("email");

						navigate("/");

						swalToast("info", "Goodbye !", 240);
					}}
					onSubmit={handleLogout}
				>
					Logout
				</button>
			</Header>

			<div className="text-zinc-50">{children}</div>

			<Footer />
		</div>
	);
};
