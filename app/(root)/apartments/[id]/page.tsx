// import ApartmentDetails from "@/components/ApartmentDetails";
// import { ApartmentImages } from "@/components/ApartmentImages";
// import Header from "@/components/shared/Header";
// import { images } from "@/constant";
// import { getListing } from "@/lib/actions/list.actions";
// import { getUserInfo } from "@/lib/actions/user.actions";
// import { auth } from "@clerk/nextjs";
// import dynamic from "next/dynamic";
// import { redirect } from "next/navigation";
// import Marquee from "react-fast-marquee";

// const ApartmentLocation = dynamic(
// 	() => import("@/components/ApartmentLocation.tsx"),
// 	{
// 		ssr: false,
// 	}
// );

// const page = async ({ params }: { params: { id: string } }) => {
// 	const { userId } = auth();

// 	const user = await getUserInfo(userId!);

// 	const id = params.id;

// 	const listing = await getListing(id!);

// 	if (listing.status === 400) redirect("/not-found.tsx");

// 	return (
// 		<div>
// 			<Header color="black" />
// 			<div className="container py-6 bg-red-300">
// 				<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
// 					{listing?.listing?.name}
// 				</h2>
// 				<p className="text-sm lg:text-base text-muted-foreground mt-2">
// 					{listing?.listing.address}, {listing?.listing.city},{" "}
// 					{listing?.listing?.state},{" "}
// 					<span className="capitalize">
// 						{listing?.listing?.country}
// 					</span>
// 				</p>
// 				<div className="bg-yellow-300">
// 					<ApartmentImages images={listing?.listing?.images} />
// 				</div>
// 				{/* {!isComplete && (
// 					<Marquee className="mt-4 font-medium text-sm bg-primary/50 py-4">
// 						This listing is currently unpublished and not visible to
// 						others. Complete{" "}
// 						<span className="mx-2">{completedText}</span> more
// 						fields to publish it
// 					</Marquee>
// 				)} */}
// 				{/* {isComplete && !listing?.isPublished && (
// 					<Marquee className="mt-4 font-medium text-sm bg-primary/50 py-4">
// 						This listing is currently unpublished and not visible to
// 						others. Publish it now
// 					</Marquee>
// 				)}
// 				<ApartmentImages
// 					details={listing}
// 					isRenter={user?.isRenter}
// 					user={user}
// 				/>
// 				<ApartmentDetails
// 					user={user}
// 					details={listing}
// 					isRenter={user?.isRenter}
// 					isComplete={isComplete}
// 				/>
// 				<ApartmentLocation /> */}
// 			</div>
// 		</div>
// 	);
// };

// export default page;

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

const page = async ({ params }: { params: { id: string } }) => {
	const { userId } = auth();

	const user = await getUserInfo(userId!);

	const id = params.id;

	const listing = await getListing(id!);

	// if (listing.status === 400) redirect("/not-found.tsx");

	return (
		<div>
			<Header color="black" />
			<div className="container py-6">
				<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
					{listing?.listing?.name}
				</h2>
				<p className="text-sm lg:text-base text-muted-foreground mt-2">
					{listing?.listing?.address}, {listing?.listing?.city},{" "}
					{listing?.listing?.state},{" "}
					<span className="capitalize">
						{listing?.listing?.country}
					</span>
				</p>
				<div className="mt-4">
					<ApartmentImages images={listing?.listing?.images} />
				</div>
				<ApartmentDetails
					rent={listing?.listing?.rent}
					securityDeposit={listing?.listing?.securityDeposit}
					petPolicy={listing?.listing?.petPolicy}
					smokingPolicy={listing?.listing?.smokingPolicy}
					description={listing?.listing?.description}
					amenities={listing?.listing?.amenities}
					listId={listing?.listing?._id}
					userId={user?._id}
				/>
			</div>
		</div>
	);
};

export default page;
