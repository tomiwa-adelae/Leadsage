"use server";

import { LISTING_LIMIT } from "@/constant";
import { connectToDatabase } from "../database";
import List from "../database/models/list.model";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllListings = async ({
	query,
	limit = LISTING_LIMIT,
	page,
}: GetAllListingsParams) => {
	try {
		await connectToDatabase();

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

		const lists = await List.find({ ...keyword })
			.populate("user")
			.sort({ createdAt: -1 })
			.skip(skipAmount)
			.limit(limit);

		const listCount = await List.countDocuments({ ...keyword });

		return {
			data: JSON.parse(JSON.stringify(lists)),
			totalPages: Math.ceil(listCount / limit),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get any listings! Try again later.",
		};
	}
};

// Get the listings for each host
export const getMyListings = async ({
	query,
	limit = LISTING_LIMIT,
	page,
	userId,
}: GetMyListingsParams) => {
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

		const lists = await List.find({ ...keyword, user: userId })
			.populate("user")
			.sort({ createdAt: -1 })
			.skip(skipAmount)
			.limit(limit);

		const listCount = await List.countDocuments({
			...keyword,
			user: userId,
		});

		return {
			data: JSON.parse(JSON.stringify(lists)),
			totalPages: Math.ceil(listCount / limit),
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get any listings! Try again later.",
		};
	}
};

// Get a single listing
export const getListing = async (id: string) => {
	try {
		await connectToDatabase();

		if (!id)
			return {
				status: 400,
				message: "Oops! Listing ID not found.",
			};

		const listing = await List.findById(id);

		if (!listing)
			return {
				status: 400,
				message: `Oops! List was not found.`,
			};

		return JSON.parse(JSON.stringify(listing));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get the listing! Try again later.",
		};
	}
};

// Create a listing for each host
export const createList = async ({ details, userId }: CreateListParams) => {
	try {
		await connectToDatabase();

		if (!details.name)
			return {
				status: 400,
				message: "Oops! You are required to enter a name.",
			};

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

		if (!user.isRenter)
			return {
				status: 400,
				message: "Oops! You are not authorized to create a listing.",
			};

		const list = await List.create({ ...details, user: userId });

		if (!list)
			return {
				status: 400,
				message: `Oops! List was not created.`,
			};

		revalidatePath("/listings");
		return {
			list: JSON.parse(JSON.stringify(list)),
			message: "You have successfully created a listing.",
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get any listings! Try again later.",
		};
	}
};

// Edit and update the listing by Renter
export const updateListing = async ({
	userId,
	listingId,
	type,
	value,
}: {
	userId: string;
	listingId: string;
	type: string;
	value: string | any;
}) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		if (!user.isRenter)
			return {
				status: 400,
				message: "Oops! You are not authorized to update this listing.",
			};

		const listing = await List.findOne({ user: userId, _id: listingId });

		if (!listing)
			return {
				status: 400,
				message: "Oops! Listing is not found.",
			};

		// Ensure the type exists on the listing object before updating
		if (!(type in listing)) {
			return {
				status: 400,
				message: `Oops! Invalid field '${type}' for updating.`,
			};
		}

		// Handle image replacement
		if (type === "images") {
			const oldImage = listing.images.find(
				(img: any) => img._id.toString() === value?.oldImage
			);

			if (oldImage) {
				// Remove the old image from MongoDB
				await List.findByIdAndUpdate(
					listingId,
					{ $pull: { images: { id: oldImage.id } } }, // Remove the old image
					{ new: true }
				);
			}

			// Add the new image to MongoDB
			await List.findByIdAndUpdate(
				listingId,
				{ $push: { images: value } },
				{ new: true }
			);
		} else {
			// Update non-array fields normally
			listing[type] = value || listing[type];
			await listing.save();
		}

		await listing.save();

		revalidatePath(`/apartments`);
		revalidatePath(`/apartments/${listing._id}`);

		return { status: 201, message: `Successfully updated the ${type}` };
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't update the listing! Try again later.",
		};
	}
};

// Delete listing by renter or admin
export const deleteListing = async ({
	userId,
	listingId,
}: {
	userId: string;
	listingId: string;
}) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		if (!user.isRenter && !user.isAdmin)
			return {
				status: 400,
				message: "Oops! You are not authorized to delete this listing.",
			};

		const listing = await List.findById(listingId);

		if (!listing)
			return {
				status: 400,
				message: "Oops! Listing is not found.",
			};

		const deletedListing = await List.findByIdAndDelete(listingId);

		if (!deletedListing)
			return {
				status: 400,
				message: "Oops! Document not deleted. Try again later.",
			};

		revalidatePath(`/apartments`);
		revalidatePath(`/listings`);

		return { status: 201, message: `Successfully deleted!` };
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get any listings! Try again later.",
		};
	}
};

// Delete listing image
export const deleteListingImage = async ({
	userId,
	image,
	listingId,
}: {
	userId: string;
	image: any;
	listingId: string;
}) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		if (!user.isRenter && !user.isAdmin)
			return {
				status: 400,
				message: "Oops! You are not authorized to delete this listing.",
			};

		const listing = await List.findById(listingId);

		if (!listing)
			return {
				status: 400,
				message: "Oops! Listing is not found.",
			};

		// Delete from cloudinary first
		await cloudinary.uploader.destroy(image.id, {});

		const oldImage = listing.images.find(
			(img: any) => img._id.toString() === image._id
		);

		// Remove the old image from MongoDB
		const deletedImage = await List.findByIdAndUpdate(
			listingId,
			{ $pull: { images: { id: oldImage.id } } }, // Remove the old image
			{ new: true }
		);

		if (!deletedImage)
			return {
				status: 400,
				message: "Oops! Image not deleted. Try again later.",
			};

		revalidatePath(`/apartments`);
		revalidatePath(`/apartments/${listing._id}`);
		revalidatePath(`/listings`);

		return { status: 201, message: `Successfully deleted!` };
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get any listings! Try again later.",
		};
	}
};
