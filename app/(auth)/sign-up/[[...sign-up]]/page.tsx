import Header from "@/components/shared/Header";
import { SignUp } from "@clerk/nextjs";

export default function page() {
	return (
		<div>
			<Header color="black" />
			<div className="py-24 bg-green-50">
				<div className="container">
					<div className="text-center space-y-4">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
							Register
						</h1>
						<p className="text-base leading-relaxed">
							Give your visitor a smooth online experience with a
							solid UX design
						</p>
					</div>
					<div className="flex items-center justify-center mt-10">
						<SignUp />
					</div>
				</div>
			</div>
		</div>
	);
}
