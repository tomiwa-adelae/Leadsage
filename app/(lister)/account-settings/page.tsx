import { AccountSettingsForm } from "@/components/forms/AccountSettingsForm";
import SectionTitle from "@/components/shared/SectionTitle";
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

	return (
		<div className="pb-12">
			<SectionTitle
				title={"Account Settings"}
				subTitle="Welcome to your Leadsage dashboard."
			/>
			<AccountSettingsForm
				picture={user?.picture}
				firstName={user?.firstName}
				lastName={user?.lastName}
				phoneNumber={user?.phoneNumber}
				userId={user?._id}
				email={user?.email}
				isRenter={user?.isRenter}
				city={user?.city}
				address={user?.address}
				state={user?.state}
			/>
		</div>
	);
};

export default page;
