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
				<div className="flex justify-between p-3 text-white bg-white/15 gap-3 rounded-md w-110 mt-30 mb-40 z-[1] shadow-md/10 motion-preset-blur-up-md">
					<div className="flex flex-col gap-y-3 justify-center ps-2">
						<h1 className="capitalize">
							Name : <span>{hasName}</span>
						</h1>
						<h1>
							Email : <span>{hasEmail}</span>
						</h1>
						<h1 className="capitalize">
							Role : <span>{hasAbilities}</span>
						</h1>
					</div>

					<div className="p-5">
						<img
							src="/src/assets/photo/profile.png"
							alt="profile"
							className="w-30"
						/>
					</div>
				</div>
			</AuroraBackground>
		</AuthLayout>
	);
};
