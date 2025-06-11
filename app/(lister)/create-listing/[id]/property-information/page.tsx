import PropertyInformationForm from "@/components/forms/listing/PropertyInformationForm";
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
