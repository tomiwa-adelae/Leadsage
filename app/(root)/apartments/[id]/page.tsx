import ApartmentDetails from "@/components/ApartmentDetails";
import { ApartmentImages } from "@/components/ApartmentImages";
import Header from "@/components/shared/Header";
import { images } from "@/constant";
import { getListing } from "@/lib/actions/list.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import Marquee from "react-fast-marquee";

const ApartmentLocation = dynamic(
	() => import("@/components/ApartmentLocation.tsx"),
	{
		ssr: false,
	}
);

const page = async ({
	searchParams,
	params,
}: {
	searchParams: { admin?: string };
	params: { id: string };
}) => {
	const { userId } = auth();

	const user = await getUserInfo(userId!);

	const id = params.id;

	const listing = await getListing(id!);

	console.log(listing);

	const requiredFields = [
		listing?.name,
		listing?.category,
		listing?.rentPrice,
		listing?.address,
		listing?.city,
		listing?.state,
		listing?.description,
		listing?.images,
		listing?.availabilityDate,
		// listing?.location,
	];

	const totalFields = requiredFields.length;

	const completedFields = requiredFields.filter(Boolean).length;

	const completedText = `${completedFields} / ${totalFields}`;

	const hasEnoughImages =
		Array.isArray(listing?.images) && listing.images.length >= 3;

	const isComplete = requiredFields.every(Boolean) && hasEnoughImages;

	console.log(isComplete, totalFields, completedText);

	if (listing.status === 400) redirect("/not-found.tsx");

	return (
		<div>
			<Header color="black" />
			<div className="container">
				{!isComplete && (
					<Marquee className="mt-4 font-medium text-sm bg-primary/50 py-4">
						This listing is currently unpublished and not visible to
						others. Complete{" "}
						<span className="mx-2">{completedText}</span> more
						fields to publish it
					</Marquee>
				)}
				{isComplete && !listing?.isPublished && (
					<Marquee className="mt-4 font-medium text-sm bg-primary/50 py-4">
						This listing is currently unpublished and not visible to
						others. Publish it now
					</Marquee>
				)}
				<ApartmentImages
					details={listing}
					isRenter={user?.isRenter}
					user={user}
				/>
				<ApartmentDetails
					user={user}
					details={listing}
					isRenter={user?.isRenter}
					isComplete={isComplete}
				/>
				<ApartmentLocation />
			</div>
		</div>
	);
};

export default page;
