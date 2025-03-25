"use server";

import {
	generateAdminEmail,
	generateRenterEmail,
	generateLandlordEmail,
	generateRenterCancellationEmail,
	generateAdminCancellationEmail,
	generateLandlordCancellationEmail,
	generateRenterApprovedEmail,
	generateRenterRejectedEmail,
	generateLandlordApprovedEmail,
	generateLandlordRejectedEmail,
	generateAdminApprovedEmail,
	generateAdminRejectedEmail,
} from "@/templates";
import { connectToDatabase } from "../database";
import Booking from "../database/models/booking.model";
import List from "../database/models/list.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

import Mailjet from "node-mailjet";
import { BOOKING_LIMIT } from "@/constant";
import { revalidatePath } from "next/cache";

const mailjet = Mailjet.apiConnect(
	process.env.MAILJET_API_PUBLIC_KEY!,
	process.env.MAILJET_API_PRIVATE_KEY!
);

// Get booking details
export const getBookingDetails = async (id: string, userId: string) => {
	try {
		await connectToDatabase();

		if (!id)
			return {
				status: 400,
				message: "Oops! Booking ID not found.",
			};

		const user = await User.findOne({ clerkId: userId });

		if (!user)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		const booking = await Booking.findById(id)
			.populate({
				path: "listing",
				populate: { path: "user" },
			})
			.populate("user");
		// .populate({
		// 	path: "listing",
		// 	populate: { path: "category" },
		// });

		if (!booking)
			return {
				status: 400,
				message: "Oops! Booking is not found.",
			};

		return { status: 200, booking: JSON.parse(JSON.stringify(booking)) };
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get booking! Try again later.",
		};
	}
};

// Create the booking
export const bookListing = async ({
	user,
	listing,
}: {
	user: string;
	listing: string;
}) => {
	try {
		await connectToDatabase();

		const existingUser = await User.findById(user);

		if (!existingUser)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		const existingListing = await List.findById(listing);

		if (!existingListing)
			return {
				status: 400,
				message: "Oops! Listing is not found.",
			};

		const existingBooking = await Booking.findOne({ user, listing });
		if (existingBooking)
			return {
				status: 400,
				message: "You have already booked this listing.",
			};

		const bookedListing = await Booking.create({ listing, user });

		if (!bookedListing)
			return {
				status: 400,
				message: `Oops! Booking not successful.`,
			};

		const bookingDetails = await Booking.findById(bookedListing?._id)
			.populate("user")
			.populate({ path: "listing", populate: { path: "user" } });

		// **Send Confirmation Email to renter**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: bookingDetails.user.email,
							Name: bookingDetails.user.firstName,
						},
					],
					Subject: `🎉 Booking Received – Leadsage`,
					TextPart: `🎉 Booking Received – Leadsage`,
					HTMLPart: generateRenterEmail(bookingDetails),
				},
			],
		});

		// **Send Email to Landlord**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: bookingDetails.listing.user.email, // Admin Email
							Name: "Leadsage",
						},
					],
					Subject: `📩 New Booking Application Submitted`,
					TextPart: `A new booking application has been submitted.`,
					HTMLPart: generateLandlordEmail(bookingDetails),
				},
			],
		});

		// **Send Email to Admin**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: process.env.ADMIN_EMAIL_ADDRESS!, // Admin Email
							Name: "Leadsage",
						},
					],
					Subject: `📩 New Booking Application Submitted`,
					TextPart: `A new booking application has been submitted.`,
					HTMLPart: generateAdminEmail(bookingDetails),
				},
			],
		});

		return {
			status: 200,
			booking: JSON.parse(JSON.stringify(bookedListing)),
			message: "You have successfully booked a listing.",
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get booking! Try again later.",
		};
	}
};

// Get the bookings for the member
export const getBookings = async ({
	userId,
	query,
	limit = BOOKING_LIMIT,
	page,
}: GetBookingsParams) => {
	try {
		await connectToDatabase();

		if (!userId)
			return {
				status: 400,
				message: "Oops! User ID not found.",
			};

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		const keyword = query
			? {
					$or: [
						{
							name: {
								$regex: query,
								$options: "i",
							},
						},
						{
							category: {
								$regex: query,
								$options: "i",
							},
						},
					],
			  }
			: {};
		const skipAmount = (Number(page) - 1) * limit;

		let bookings;
		let bookingCount;

		if (user?.isRenter) {
			if (!user.isRenter)
				return {
					status: 400,
					message:
						"Oops! You are not authorized to get this bookings.",
				};

			bookings = await Booking.find({
				...keyword,
			})
				.populate({
					path: "listing",
					populate: { path: "user" },
				})
				.populate("user")
				// .populate({
				// 	path: "listing",
				// 	populate: { path: "category" },
				// })
				.sort({ createdAt: -1 })
				.skip(skipAmount)
				.limit(limit);

			// Filter bookings where the listing's owner matches the renter's userId
			const renterBookings = bookings.filter(
				(booking) => booking.listing?.user?.toString() === userId
			);

			bookingCount = renterBookings.length;

			return {
				data: JSON.parse(JSON.stringify(bookings)),
				totalPages: Math.ceil(bookingCount / limit),
			};
		} else {
			bookings = await Booking.find({ ...keyword, user: userId })
				.sort({ createdAt: -1 })
				.skip(skipAmount)
				.limit(limit)
				.populate("user")
				.populate({ path: "listing", populate: { path: "user" } });
			// .populate({
			// 	path: "listing",
			// 	populate: { path: "category" },
			// });

			bookingCount = await Booking.countDocuments({ ...keyword });

			return {
				data: JSON.parse(JSON.stringify(bookings)),
				totalPages: Math.ceil(bookingCount / limit),
			};
		}
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get bookings! Try again later.",
		};
	}
};

// Cancel booking by member
export const updateBookingStatus = async ({
	userId,
	bookingId,
	updateStatus,
}: {
	userId: string;
	bookingId: string;
	updateStatus: string;
}) => {
	try {
		await connectToDatabase();

		if (!userId)
			return {
				status: 400,
				message: "Oops! User ID not found.",
			};

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		const booking = await Booking.findById(bookingId)
			.populate("user")
			.populate({ path: "listing", populate: { path: "user" } });

		if (!booking)
			return {
				status: 400,
				message: "Oops! Booking not found.",
			};

		if (
			updateStatus === "cancelled" &&
			user._id.toString() !== booking.user._id.toString()
		)
			return {
				status: 400,
				message: "Oops! You are not authorized to cancel this booking.",
			};

		if (
			updateStatus === "approved" &&
			user._id.toString() !== booking.listing.user._id.toString()
		)
			return {
				status: 400,
				message: "Oops! You are not authorized to cancel this booking.",
			};

		if (
			updateStatus === "rejected" &&
			user._id.toString() !== booking.listing.user._id.toString()
		)
			return {
				status: 400,
				message: "Oops! You are not authorized to cancel this booking.",
			};

		booking.status = updateStatus;

		await booking.save();

		revalidatePath(`/bookings`);
		revalidatePath(`/bookings/${bookingId}`);

		// **Send Confirmation Email to renter**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: booking.user.email,
							Name: booking.user.firstName,
						},
					],
					Subject: `Your Booking Has Been Successfully ${updateStatus}`,
					TextPart: `Your Booking Has Been Successfully ${updateStatus}`,
					HTMLPart:
						updateStatus === "cancelled"
							? generateRenterCancellationEmail(booking)
							: updateStatus === "approved"
							? generateRenterApprovedEmail(booking)
							: generateRenterRejectedEmail(booking),
				},
			],
		});

		// **Send Email to Landlord**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: booking.listing.user.email, // Admin Email
							Name: "Leadsage",
						},
					],
					Subject: `Booking Cancellation Notice for ${booking.listing.name}`,
					TextPart: `Booking Cancellation Notice for ${booking.listing.name}`,
					HTMLPart:
						updateStatus === "cancelled"
							? generateLandlordCancellationEmail(booking)
							: updateStatus === "approved"
							? generateLandlordApprovedEmail(booking)
							: generateLandlordRejectedEmail(booking),
				},
			],
		});

		// **Send Email to Admin**
		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: process.env.SENDER_EMAIL_ADDRESS!,
						Name: process.env.COMPANY_NAME!,
					},
					To: [
						{
							Email: process.env.ADMIN_EMAIL_ADDRESS!, // Admin Email
							Name: "Leadsage",
						},
					],
					Subject: `Booking Cancellation Alert – ${booking.listing.name}`,
					TextPart: `Booking Cancellation Alert – ${booking.listing.name}`,
					HTMLPart:
						updateStatus === "cancelled"
							? generateAdminCancellationEmail(booking)
							: updateStatus === "approved"
							? generateAdminApprovedEmail(booking)
							: generateAdminRejectedEmail(booking),
				},
			],
		});

		return {
			status: 201,
			message: `You have successfully ${updateStatus} this booking.`,
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get bookings! Try again later.",
		};
	}
};
