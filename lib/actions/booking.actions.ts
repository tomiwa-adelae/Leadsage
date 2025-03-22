"use server";

import {
	generateAdminEmail,
	generateRenterEmail,
	generateUserEmail,
} from "@/templates";
import { connectToDatabase } from "../database";
import Booking from "../database/models/booking.model";
import List from "../database/models/list.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

import Mailjet from "node-mailjet";

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

		const booking = await Booking.findById(id);

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

		const bookedListing = await Booking.create({ listing, user });

		if (!bookedListing)
			return {
				status: 400,
				message: `Oops! Booking not successful.`,
			};

		const bookingDetails = await Booking.findById(bookedListing?._id)
			.populate("user")
			.populate({ path: "listing", populate: { path: "user" } });

		// **Send Confirmation Email to User**
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
					HTMLPart: generateUserEmail(bookingDetails),
				},
			],
		});

		// **Send Email to Renters**
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
					HTMLPart: generateRenterEmail(bookingDetails),
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
