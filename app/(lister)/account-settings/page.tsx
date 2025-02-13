import { AccountSettingsForm } from "@/components/forms/AccountSettingsForm";
import SectionTitle from "@/components/shared/SectionTitle";
import React from "react";

const page = () => {
	return (
		<div className="pt-8 pb-12">
			<SectionTitle
				title={"Account Settings"}
				subTitle="Welcome to your Leadsage dashboard."
			/>
			<AccountSettingsForm />
		</div>
	);
};

export default page;
