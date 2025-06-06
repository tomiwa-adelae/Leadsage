import { CreateListingForm } from "@/components/forms/CreateListingForm";
import BasicInformationForm from "@/components/forms/listing/BasicInformationForm";
import PropertyInformationForm from "@/components/forms/listing/PropertyInformationForm";
import SectionTitle from "@/components/shared/SectionTitle";
import { getListing } from "@/lib/actions/list.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const page = async ({ params }: { params: { id: string } }) => {
	const { userId } = auth();

	const listingId = params.id;

	const user = await getUserInfo(userId!);

	let listing = await getListing(listingId);

	return (
		<div className="pb-12">
			<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
				<SectionTitle
					title="Create Listing"
					subTitle="Lorem ipsum dolor sit amet, consectetur."
				/>
			</div>
			<PropertyInformationForm
				listingId={listingId}
				userId={user?._id}
				category={listing?.listing?.category}
				address={listing?.listing?.address}
				city={listing?.listing.city}
				state={listing?.listing?.state}
			/>
		</div>
	);
};

export default page;
