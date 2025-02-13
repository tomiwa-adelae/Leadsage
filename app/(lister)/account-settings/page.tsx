import { AccountSettingsForm } from "@/components/forms/AccountSettingsForm";
import SectionTitle from "@/components/shared/SectionTitle";
import React from "react";

const page = () => {
	return (
		<div className="pb-12">
			<SectionTitle
				title={"Account Settings"}
				subTitle="Welcome to your Leadsage dashboard."
			/>
			<AccountSettingsForm />
		</div>
	);
};

export default page;
