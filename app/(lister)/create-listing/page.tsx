import { CreateListingForm } from "@/components/forms/CreateListingForm";
import SectionTitle from "@/components/shared/SectionTitle";
import { getListing } from "@/lib/actions/list.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

interface PageProps {
	searchParams: { id?: string; steps: number };
}

const page = async ({ searchParams }: PageProps) => {
	let steps = 1;

	const listingId = searchParams?.id;
	steps = searchParams?.steps;
	const { userId } = auth();

	const user = await getUserInfo(userId!);

	let listing;

	if (listingId) {
		listing = await getListing(listingId);
	}

	return (
		<div className="pb-12">
			<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
				<SectionTitle
					title="Create Listing"
					subTitle="Lorem ipsum dolor sit amet, consectetur."
				/>
			</div>
			{/* <CreateListingForm
				listingId={listingId}
				userId={user?._id}
				steps={steps}
				listing={listing}
			/> */}
		</div>
	);
};

export default page;
