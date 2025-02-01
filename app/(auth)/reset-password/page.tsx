import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
import Header from "@/components/shared/Header";

const page = () => {
	return (
		<div>
			<Header color="black" />
			<div className="py-24 bg-green-50">
				<div className="container">
					<div className="text-center space-y-4">
						<h1 className="text-2xl md:text-3xl lg:text-3xl font-bold">
							Reset Password
						</h1>
						<p className="text-sm md:text-base leading-loose">
							Give your visitor a smooth online experience with a
							solid UX design
						</p>
					</div>
					<ResetPasswordForm />
				</div>
			</div>
		</div>
	);
};

export default page;
