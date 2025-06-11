import { CreateListingForm } from "@/components/forms/CreateListingForm";
import BasicInformationForm from "@/components/forms/listing/BasicInformationForm";
import SectionTitle from "@/components/shared/SectionTitle";
import { getListing } from "@/lib/actions/list.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

interface PageProps {
	searchParams: { listingId?: string };
}

const page = async ({ searchParams }: PageProps) => {
	const listingId: any = searchParams?.listingId;
	const { userId } = auth();

	const user = await getUserInfo(userId!);

	let listing;

	if (listingId) {
		listing = await getListing(listingId);
	}

	console.log();

	console.log(`lisitng`, listing);

	return (
		<div className="pb-12">
			{/* <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
				<SectionTitle
					title="Create Listing"
					subTitle="Lorem ipsum dolor sit amet, consectetur."
				/>
			</div> */}
			<BasicInformationForm
				userId={user?._id}
				name={listing?.listing?.name}
			/>
		</div>
	);
};

export default page;
