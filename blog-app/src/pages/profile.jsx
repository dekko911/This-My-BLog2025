import Cookies from "js-cookie";
import { AuthLayout } from "../layouts/auth";

export const Profile = () => {
	const hasAbilities = Cookies.get("abilities");
	const hasName = Cookies.get("name");
	const hasEmail = Cookies.get("email");

	return (
		<AuthLayout>
			<div className="block mx-auto p-3 bg-white/20 gap-3 rounded-md w-150 mt-30 mb-40">
				<h1 className="text-center text-blue-500">
					Name : <span className="text-red-500">{hasName}</span>
				</h1>
				<h1 className="text-center text-pink-500">
					Email : <span className="text-yellow-500">{hasEmail}</span>
				</h1>
				<h1 className="text-center text-black">
					Role : <span className="text-green-500">{hasAbilities}</span>
				</h1>

				<h1 className="font-bold text-3xl text-center mt-5">
					*Nanti Akan Di Develop
				</h1>
			</div>
		</AuthLayout>
	);
};
