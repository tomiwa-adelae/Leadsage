"use server";

import { connectToDatabase } from "../database";
import List from "../database/models/list.models";
import User from "../database/models/user.model";
import { handleError } from "../utils";

// Get all the listing by renters
export async function getListings({ userId }: { userId: string }) {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (!user.isRenter)
			return {
				status: 400,
				message:
					"Oops! You are not authorized to access this endpoint.",
			};

		const lists = await List.find({ userId })
			.sort({ createdAt: -1 })
			.populate("user");

		return JSON.parse(JSON.stringify(lists));
	} catch (error: any) {
		handleError(error);
	}
}

export const createListing = async ({
	userId,
	details,
}: CreateListingParams) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (!user.isRenter)
			return {
				status: 400,
				message:
					"Oops! You are not authorized to access this endpoint.",
			};

		console.log(details);
	} catch (error: any) {
		handleError(error);
	}
};
