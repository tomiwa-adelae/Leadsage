import { CreateListingForm } from "@/components/forms/CreateListingForm";
import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import UploadApartmentImages from "@/components/UploadApartmentImages";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { MoveUpRight } from "lucide-react";
import React from "react";

const page = async () => {
	const { userId } = auth();

	const user = await getUserInfo(userId!);
	return (
		<div className="pb-12">
			<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
				<SectionTitle
					title="Create Apartment"
					subTitle="Lorem ipsum dolor sit amet, consectetur."
				/>
				<Button size={"lg"}>
					Save & Publish <MoveUpRight />
				</Button>
			</div>
			<CreateListingForm userId={user?._id} />
			<UploadApartmentImages />
		</div>
	);
};

export default page;
