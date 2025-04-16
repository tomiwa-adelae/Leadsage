import ChooseAccountForm from "@/components/forms/ChooseAccountForm";
import Header from "@/components/shared/Header";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const user = await getUserInfo(userId!);

	if (user?.isRenter !== undefined) redirect("/dashboard");

	return (
		<div>
			<Header color="black" />
			<div className="py-24 bg-green-50">
				<div className="container">
					<div className="text-center space-y-4">
						<h1 className="text-2xl md:text-3xl lg:text-3xl font-bold leading-relaxed">
							Get Started with Leadsage – Choose Your Role
						</h1>
						<p className="text-sm leading-loose">
							Leadsage connects property seekers with trusted
							hosts. Whether you're looking for a home or listing
							one, we’ve got you covered. Select the account type
							that fits your needs.
						</p>
					</div>
					<ChooseAccountForm />
				</div>
			</div>
		</div>
	);
};

export default page;
