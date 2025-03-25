import BookingDetails from "@/components/BookingDetails";
import { BookingImages } from "@/components/BookingImages";
import SectionTitle from "@/components/shared/SectionTitle";
import { getBookingDetails } from "@/lib/actions/booking.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
	const { userId } = auth();

	const id = params.id;

	const user = await getUserInfo(userId!);

	const bookingDetails = await getBookingDetails(id!, userId!);

	return (
		<div className="pb-12 relative">
			<BookingImages images={bookingDetails?.booking?.listing?.images} />
			<BookingDetails
				name={bookingDetails?.booking?.listing?.name}
				address={bookingDetails?.booking?.listing?.address}
				city={bookingDetails?.booking?.listing?.city}
				state={bookingDetails?.booking?.listing?.state}
				description={bookingDetails?.booking?.listing?.description}
				rentPrice={bookingDetails?.booking?.listing?.rentPrice}
				bookedDate={bookingDetails?.booking?.createdAt}
				availabilityDate={
					bookingDetails?.booking?.listing?.availabilityDate
				}
				bookingStatus={bookingDetails?.booking?.status}
				bookingID={bookingDetails?.booking?._id}
				landlordName={`${bookingDetails?.booking?.listing?.user?.firstName} ${bookingDetails?.booking?.listing?.user?.lastName}`}
				landlordEmail={bookingDetails?.booking?.listing?.user?.email}
				landlordPhoneNumber={
					bookingDetails?.booking?.listing?.user?.phoneNumber
				}
				user={user}
				renterName={`${bookingDetails?.booking?.user?.firstName} ${bookingDetails?.booking?.user?.lastName}`}
				renterEmail={bookingDetails?.booking?.user?.email}
				renterPhoneNumber={bookingDetails?.booking?.user?.phoneNumber}
			/>
		</div>
	);
};

export default page;
