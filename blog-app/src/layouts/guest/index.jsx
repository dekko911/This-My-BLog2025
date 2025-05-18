import { Link } from "react-router";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { useLocation } from "react-router";

export const GuestLayout = ({ children }) => {
	const location = useLocation();

	return (
		<div className="bg-linear-90 from-zinc-400 to-zinc-600">
			<Header to="/">
				<Link
					to="/about"
					className={`hover:text-pink-500 hover:-mt-0.5 duration-200 ${
						location.pathname === "/about"
							? "text-white animate-pulse duration-300"
							: null
					}`}
				>
					About
				</Link>
				<Link
					to="/blog"
					className={`hover:text-pink-500 hover:-mt-0.5 duration-200 ${
						location.pathname === "/blog"
							? "text-white animate-pulse duration-300"
							: null
					}`}
				>
					Blog
				</Link>
				<Link
					to="/login"
					className="hover:text-pink-500 hover:translate-x-1 duration-200"
				>
					Login
				</Link>
			</Header>

			<div className="text-zinc-50">{children}</div>

			<Footer />
		</div>
	);
};
