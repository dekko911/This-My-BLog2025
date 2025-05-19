import Cookies from "js-cookie";
import { AuroraBackground } from "../components/ui/aurora-background";
import { AuthLayout } from "../layouts/auth";

export const Profile = () => {
	const hasAbilities = Cookies.get("abilities");
	const hasName = Cookies.get("name");
	const hasEmail = Cookies.get("email");

	return (
		<AuthLayout>
			<AuroraBackground showRadialGradient={false}>
				<div className="block mx-auto p-3 bg-white/15 gap-3 rounded-md w-100 mt-30 mb-40 z-[1] shadow-md/10 motion-preset-blur-up-md">
					<h1 className="text-center text-blue-500">
						Name : <span className="text-red-500">{hasName}</span>
					</h1>
					<h1 className="text-center text-pink-500">
						Email : <span className="text-yellow-500">{hasEmail}</span>
					</h1>
					<h1 className="text-center text-white">
						Role : <span className="text-green-500">{hasAbilities}</span>
					</h1>

					<h1 className="font-bold text-3xl text-center mt-5 text-white">
						*Nanti Akan Di Develop
					</h1>
				</div>
			</AuroraBackground>
		</AuthLayout>
	);
};
