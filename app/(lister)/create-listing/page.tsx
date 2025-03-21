import { CreateListingForm } from "@/components/forms/CreateListingForm";
import SectionTitle from "@/components/shared/SectionTitle";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const page = async () => {
	const { userId } = auth();

	const user = await getUserInfo(userId!);
	return (
		<div className="pb-12">
			<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
				<SectionTitle
					title="Create Listing"
					subTitle="Lorem ipsum dolor sit amet, consectetur."
				/>
			</div>
			<CreateListingForm userId={user?._id} />
		</div>
	);
};

export default page;
