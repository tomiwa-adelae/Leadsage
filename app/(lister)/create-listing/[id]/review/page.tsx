import { CostForm } from "@/components/forms/listing/CostForm";
import FinalDetailsForm from "@/components/forms/listing/FinalDetailsForm";
import { RentDetailsForm } from "@/components/forms/listing/RentDetailsForm";
import { ReviewForm } from "@/components/forms/listing/ReviewForm";
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
			<ReviewForm
				listingId={listingId}
				userId={user?._id}
				user={user}
				listing={listing?.listing}
			/>
		</div>
	);
};

export default page;
