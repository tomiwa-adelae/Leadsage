import Header from "@/components/shared/Header";
import { getListing } from "@/lib/actions/list.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import React from "react";
import { ApartmentImages } from "./_components/ApartmentImages";
import ApartmentDetails from "./_components/ApartmentDetails";
import { EditForm } from "./_components/EditForm";

const page = async ({ params }: { params: { id: string } }) => {
	const { userId } = auth();

	const user = await getUserInfo(userId!);

	const id = params.id;

	const listing = await getListing(id!);

	return (
		<div className="pb-12">
			<div>
				<div className="flex items-center justify-between gap-4">
					<div>
						<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
							{listing?.listing?.name}
						</h2>
						<p className="text-sm lg:text-base text-muted-foreground mt-2">
							{listing?.listing?.address},{" "}
							{listing?.listing?.city}, {listing?.listing?.state},{" "}
							<span className="capitalize">
								{listing?.listing?.country}
							</span>
						</p>
					</div>
					<EditForm
						name={listing?.listing?.name}
						category={listing?.listing?.category._id}
						address={listing?.listing?.address}
						city={listing?.listing?.city}
						state={listing?.listing?.state}
						bedrooms={listing?.listing?.bedrooms}
						bathrooms={listing?.listing?.bathrooms}
						description={listing?.listing?.description}
						rent={listing?.listing?.rent}
						securityDeposit={listing?.listing?.securityDeposit}
						userId={user?._id}
						fullName={`${user?.firstName} ${user?.lastName}`}
						email={user?.email}
						phoneNumber={user?.phoneNumber}
						listedBy={listing?.listing?.listedBy}
						listingId={listing?.listing?._id}
					/>
				</div>
				<div className="mt-4">
					<ApartmentImages
						images={listing?.listing?.images}
						listingId={listing?.listing?._id}
						userId={user?._id}
					/>
				</div>
				<ApartmentDetails
					rent={listing?.listing?.rent}
					securityDeposit={listing?.listing?.securityDeposit}
					petPolicy={listing?.listing?.petPolicy}
					smokingPolicy={listing?.listing?.smokingPolicy}
					description={listing?.listing?.description}
					amenities={listing?.listing?.amenities}
					listId={listing?.listing?._id}
					status={listing?.listing?.status}
					userId={user?._id}
				/>
			</div>
		</div>
	);
};

export default page;
