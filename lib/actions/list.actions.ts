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

		const lists = await List.find({
			...keyword,
			status: "completed",
			isPublished: true,
		})
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

		const listing = await List.findById(id)
			.populate("user")
			.populate("category");

		if (!listing)
			return {
				status: 400,
				message: `Oops! List was not found.`,
			};

		return {
			status: 200,
			message: "Success",
			listing: JSON.parse(JSON.stringify(listing)),
		};
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

// Create a listing by the name
export const addListingName = async ({
	name,
	userId,
}: {
	name: string;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		if (!name || !userId)
			return { status: 400, message: "An error occurred!" };

		const user = await User.findById(userId);

		if (!user || !user?.isRenter)
			return {
				status: 400,
				message: "You are not authorized for this request.",
			};

		const listing = await List.create({ name, user: userId });

		if (!listing)
			return {
				status: 400,
				message: "Listing not created. Try again later!",
			};

		return {
			status: 201,
			message: "Listing created successfully",
			listing: JSON.parse(JSON.stringify(listing)),
		};
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

// Create a listing by the name
export const addListingPropertyDetails = async ({
	category,
	address,
	city,
	state,
	userId,
	listingId,
}: {
	address: string;
	city: string;
	state: string;
	listingId: string;
	category: any;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		if (!category || !address || !city || !state || !listingId || !userId)
			return { status: 400, message: "An error occurred!" };

		const listing = await List.findById(listingId);

		if (!listing) return { status: 400, message: "An error occurred!" };

		const user = await User.findById(userId);

		if (!user || !user?.isRenter)
			return {
				status: 400,
				message: "You are not authorized for this request.",
			};

		listing.category = category || listing.category;
		listing.city = city || listing.city;
		listing.state = state || listing.state;
		listing.address = address || listing.address;

		const updatedListing = await listing.save();

		if (!updatedListing)
			return { status: 400, message: "An error occurred!" };

		return {
			status: 201,
			message: "Property information successfully added.",
			listing: JSON.parse(JSON.stringify(updatedListing)),
		};
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

// Create a listing by the name
export const addListingRentDetails = async ({
	// squareMeters,
	availabilityDate,
	description,
	bedrooms,
	bathrooms,
	listingId,
	userId,
}: {
	// squareMeters?: string;
	availabilityDate: any;
	description: string;
	listingId: string;
	bedrooms: any;
	bathrooms: any;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		if (
			!availabilityDate ||
			!description ||
			!bedrooms ||
			!bathrooms ||
			!listingId ||
			!userId
		)
			return { status: 400, message: "An error occurred!" };

		const listing = await List.findById(listingId);

		if (!listing) return { status: 400, message: "An error occurred!" };

		const user = await User.findById(userId);

		if (!user || !user?.isRenter)
			return {
				status: 400,
				message: "You are not authorized for this request.",
			};

		// listing.squareMeters = squareMeters || listing.squareMeters;
		listing.bathrooms = bathrooms || listing.bathrooms;
		listing.bedrooms = bedrooms || listing.bedrooms;
		listing.description = description || listing.description;
		listing.availabilityDate = availabilityDate || listing.availabilityDate;

		const updatedListing = await listing.save();

		if (!updatedListing)
			return { status: 400, message: "An error occurred!" };

		return {
			status: 201,
			message: "Rent details successfully added.",
			listing: JSON.parse(JSON.stringify(updatedListing)),
		};
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

// Create a listing by the name
export const addListingPolicies = async ({
	petPolicy,
	smokingPolicy,
	listingId,
	userId,
}: {
	petPolicy: string;
	smokingPolicy: string;
	listingId: string;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		if (!petPolicy || !smokingPolicy || !listingId || !userId)
			return { status: 400, message: "An error occurred!" };

		const listing = await List.findById(listingId);

		if (!listing) return { status: 400, message: "An error occurred!" };

		const user = await User.findById(userId);

		if (!user || !user?.isRenter)
			return {
				status: 400,
				message: "You are not authorized for this request.",
			};

		listing.petPolicy =
			petPolicy === "yes" ? true : false || listing.petPolicy;
		listing.smokingPolicy =
			smokingPolicy === "yes" ? true : false || listing.smokingPolicy;

		const updatedListing = await listing.save();

		if (!updatedListing)
			return { status: 400, message: "An error occurred!" };

		return {
			status: 201,
			message: "Policies successfully added.",
			listing: JSON.parse(JSON.stringify(updatedListing)),
		};
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

// Create a listing by the name
export const addListingCost = async ({
	rentNegotiable,
	securityDeposit,
	rent,
	listingId,
	userId,
}: {
	rentNegotiable: string;
	securityDeposit?: any;
	rent: string;
	listingId: string;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		if (
			!rentNegotiable ||
			!securityDeposit ||
			!rent ||
			!listingId ||
			!userId
		)
			return { status: 400, message: "An error occurred!" };

		const listing = await List.findById(listingId);

		if (!listing) return { status: 400, message: "An error occurred!" };

		const user = await User.findById(userId);

		if (!user || !user?.isRenter)
			return {
				status: 400,
				message: "You are not authorized for this request.",
			};

		listing.rentNegotiable =
			rentNegotiable === "yes" ? true : false || listing.rentNegotiable;
		listing.securityDeposit = securityDeposit || listing.securityDeposit;
		listing.rent = rent || listing.rent;

		const updatedListing = await listing.save();

		if (!updatedListing)
			return { status: 400, message: "An error occurred!" };

		return {
			status: 201,
			message: "Cost successfully added.",
			listing: JSON.parse(JSON.stringify(updatedListing)),
		};
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

// Create a listing by the name
export const addListingFinalDetails = async ({
	listedBy,
	fullName,
	email,
	phoneNumber,
	listingId,
	userId,
}: {
	listedBy: string;
	fullName?: any;
	email: string;
	phoneNumber: string;
	listingId: string;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		if (!listedBy || !fullName || !email || !listingId || !userId)
			return { status: 400, message: "An error occurred!" };

		const listing = await List.findById(listingId);

		if (!listing) return { status: 400, message: "An error occurred!" };

		const user = await User.findById(userId);

		if (!user || !user?.isRenter)
			return {
				status: 400,
				message: "You are not authorized for this request.",
			};

		listing.listedBy = listedBy || listing.listedBy;
		user.phoneNumber = phoneNumber || user.phoneNumber;

		const updatedListing = await listing.save();
		await user.save();

		if (!updatedListing)
			return { status: 400, message: "An error occurred!" };

		return {
			status: 201,
			message: "Details successfully added.",
			listing: JSON.parse(JSON.stringify(updatedListing)),
		};
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

// Create a listing by the name
export const addListingPublish = async ({
	listingId,
	userId,
}: {
	listingId: string;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		if (!listingId || !userId)
			return { status: 400, message: "An error occurred!" };

		const listing = await List.findById(listingId);

		if (!listing) return { status: 400, message: "An error occurred!" };

		const user = await User.findById(userId);

		if (!user || !user?.isRenter)
			return {
				status: 400,
				message: "You are not authorized for this request.",
			};

		const {
			name,
			petPolicy,
			smokingPolicy,
			images,
			address,
			city,
			state,
			category,
			bathrooms,
			bedrooms,
			description,
			amenities,
			rentNegotiable,
			listedBy,
		} = listing;

		if (
			!name ||
			!petPolicy ||
			!smokingPolicy ||
			images?.length === 0 ||
			!address ||
			!city ||
			!state ||
			!bathrooms ||
			!bedrooms ||
			!description ||
			amenities?.length === 0 ||
			!listedBy
		)
			return {
				status: 400,
				message:
					"You have not filled all the required field. Kindly go through them all again",
			};

		listing.status = "completed";

		const updatedListing = await listing.save();
		await user.save();

		if (!updatedListing)
			return { status: 400, message: "An error occurred!" };

		return {
			status: 201,
			message: "Listing successfully created.",
			listing: JSON.parse(JSON.stringify(updatedListing)),
		};
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

// Create a listing by the name
export const addListingImages = async ({
	uploadedImages,
	listingId,
	userId,
}: {
	uploadedImages: any;
	listingId: string;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		if (!listingId || !userId)
			return { status: 400, message: "An error occurred!" };

		if (uploadedImages.length === 0)
			return {
				status: 400,
				message: "Oops! Upload at least one photo",
			};

		const listing = await List.findById(listingId);

		if (!listing) return { status: 400, message: "An error occurred!" };

		const user = await User.findById(userId);

		if (!user || !user?.isRenter)
			return {
				status: 400,
				message: "You are not authorized for this request.",
			};

		listing.images = Array.isArray(listing.images) ? listing.images : [];
		listing.images = [...uploadedImages, ...listing.images];

		console.log(uploadedImages);

		const updatedListing = await listing.save();

		if (!updatedListing)
			return { status: 400, message: "An error occurred!" };

		return {
			status: 201,
			message: "Media successfully added.",
			listing: JSON.parse(JSON.stringify(updatedListing)),
		};
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

// Create a listing by the name
export const addListingAmenities = async ({
	amenities,
	listingId,
	userId,
}: {
	amenities: any;
	listingId: string;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		if (!listingId || !userId)
			return { status: 400, message: "An error occurred!" };

		if (amenities.length === 0)
			return {
				status: 400,
				message: "Oops! Select at least one amenity",
			};

		const listing = await List.findById(listingId);

		if (!listing) return { status: 400, message: "An error occurred!" };

		const user = await User.findById(userId);

		if (!user || !user?.isRenter)
			return {
				status: 400,
				message: "You are not authorized for this request.",
			};

		// Merge existing and new amenities, avoiding duplicates
		// @ts-ignore
		const existingAmenityNames = listing?.amenities.map((a: any) => a.name);
		const filteredNewAmenities = amenities.filter(
			(a: any) => !existingAmenityNames.includes(a.name)
		);
		// @ts-ignore
		listing.amenities = [...listing?.amenities, ...filteredNewAmenities];
		const updatedListing = await listing.save();

		if (!updatedListing)
			return { status: 400, message: "An error occurred!" };

		return {
			status: 201,
			message: "Amenities successfully added.",
			listing: JSON.parse(JSON.stringify(updatedListing)),
		};
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

// // Create a listing for each host
// export const createList = async ({ details, userId }: CreateListParams) => {
// 	try {
// 		await connectToDatabase();

// 		if (!details.name)
// 			return {
// 				status: 400,
// 				message: "Oops! You are required to enter a name.",
// 			};

// 		if (!userId)
// 			return {
// 				status: 400,
// 				message: "Oops! User ID not found.",
// 			};

// 		const user = await User.findById(userId);

// 		if (!user)
// 			return {
// 				status: 400,
// 				message: "Oops! User not found.",
// 			};

// 		if (!user.isRenter)
// 			return {
// 				status: 400,
// 				message: "Oops! You are not authorized to create a listing.",
// 			};

// 		const list = await List.create({ ...details, user: userId });

// 		if (!list)
// 			return {
// 				status: 400,
// 				message: `Oops! List was not created.`,
// 			};

// 		revalidatePath("/listings");
// 		return {
// 			status: 200,
// 			list: JSON.parse(JSON.stringify(list)),
// 			message: "You have successfully created a listing.",
// 		};
// 	} catch (error: any) {
// 		handleError(error);
// 		return {
// 			status: error?.status || 400,
// 			message:
// 				error?.message ||
// 				"Oops! Couldn't get any listings! Try again later.",
// 		};
// 	}
// };

// export const updateListingDetails = async ({
// 	listingId,
// 	userId,
// 	details,
// }: {
// 	listingId: string;
// 	userId: string;
// 	details: any;
// }) => {
// 	try {
// 		await connectToDatabase();

// 		const user = await User.findById(userId);

// 		if (!listingId)
// 			return {
// 				status: 400,
// 				message: "Oops! Listing ID is missing.",
// 			};

// 		if (!user)
// 			return {
// 				status: 400,
// 				message: "Oops! User not found.",
// 			};

// 		if (!user.isRenter)
// 			return {
// 				status: 400,
// 				message: "Oops! You are not authorized to update this listing.",
// 			};

// 		const listing = await List.findOne({ user: userId, _id: listingId });

// 		if (!listing)
// 			return {
// 				status: 400,
// 				message: "Oops! Listing is not found.",
// 			};

// 		listing.name = details.name || listing.name;
// 		listing.category = details.category || listing.category;
// 		listing.address = details.address || listing.address;
// 		listing.city = details.city || listing.city;
// 		listing.state = details.state || listing.state;
// 		listing.squareMeters = details.squareMeters || listing.squareMeters;
// 		listing.availabilityDate =
// 			details.availabilityDate || listing.availabilityDate;
// 		listing.bedrooms = details.bedrooms || listing.bedrooms;
// 		listing.bathrooms = details.bathrooms || listing.bathrooms;
// 		listing.description = details.description || listing.description;

// 		await listing.save();
// 		revalidatePath(`/apartments`);
// 		revalidatePath(`/apartments/${listing._id}`);

// 		return {
// 			status: 201,
// 			message: `Change successful!`,
// 			list: JSON.parse(JSON.stringify(listing)),
// 		};
// 	} catch (error: any) {
// 		handleError(error);
// 		return {
// 			status: error?.status || 400,
// 			message:
// 				error?.message ||
// 				"Oops! Couldn't update the listing! Try again later.",
// 		};
// 	}
// };

// // Edit and update the listing by Renter
// export const updateListing = async ({
// 	userId,
// 	listingId,
// 	type,
// 	value,
// }: {
// 	userId: string;
// 	listingId: string;
// 	type: string;
// 	value: string | any;
// }) => {
// 	try {
// 		await connectToDatabase();

// 		// const user = await User.findById(userId);

// 		// if (!user)
// 		// 	return {
// 		// 		status: 400,
// 		// 		message: "Oops! User not found.",
// 		// 	};

// 		// if (!user.isRenter)
// 		// 	return {
// 		// 		status: 400,
// 		// 		message: "Oops! You are not authorized to update this listing.",
// 		// 	};

// 		// const listing = await List.findOne({ user: userId, _id: listingId });

// 		// if (!listing)
// 		// 	return {
// 		// 		status: 400,
// 		// 		message: "Oops! Listing is not found.",
// 		// 	};

// 		// // Ensure the type exists on the listing object before updating
// 		// if (!(type in listing)) {
// 		// 	return {
// 		// 		status: 400,
// 		// 		message: `Oops! Invalid field '${type}' for updating.`,
// 		// 	};
// 		// }

// 		// // Handle image replacement
// 		// if (type === "images") {
// 		// 	const oldImage = listing.images.find(
// 		// 		(img: any) => img._id.toString() === value?.oldImage
// 		// 	);

// 		// 	if (oldImage) {
// 		// 		// Remove the old image from MongoDB
// 		// 		await List.findByIdAndUpdate(
// 		// 			listingId,
// 		// 			{ $pull: { images: { id: oldImage.id } } }, // Remove the old image
// 		// 			{ new: true }
// 		// 		);
// 		// 	}

// 		// 	// Add the new image to MongoDB
// 		// 	await List.findByIdAndUpdate(
// 		// 		listingId,
// 		// 		{ $push: { images: value } },
// 		// 		{ new: true }
// 		// 	);
// 		// } else {
// 		// 	// Update non-array fields normally
// 		// 	listing[type] = value || listing[type];
// 		// 	await listing.save();
// 		// }

// 		// await listing.save();

// 		// revalidatePath(`/apartments`);
// 		// revalidatePath(`/apartments/${listing._id}`);

// 		// return {
// 		// 	status: 201,
// 		// 	message: `Successfully updated the ${
// 		// 		type === "isPublished" ? "publish status" : type
// 		// 	}`,
// 		// };
// 	} catch (error: any) {
// 		handleError(error);
// 		return {
// 			status: error?.status || 400,
// 			message:
// 				error?.message ||
// 				"Oops! Couldn't update the listing! Try again later.",
// 		};
// 	}
// };

// // Delete listing by renter or admin
// export const deleteListing = async ({
// 	userId,
// 	listingId,
// }: {
// 	userId: string;
// 	listingId: string;
// }) => {
// 	try {
// 		await connectToDatabase();

// 		// const user = await User.findById(userId);

// 		// if (!user)
// 		// 	return {
// 		// 		status: 400,
// 		// 		message: "Oops! User not found.",
// 		// 	};

// 		// if (!user.isRenter && !user.isAdmin)
// 		// 	return {
// 		// 		status: 400,
// 		// 		message: "Oops! You are not authorized to delete this listing.",
// 		// 	};

// 		// const listing = await List.findById(listingId);

// 		// if (!listing)
// 		// 	return {
// 		// 		status: 400,
// 		// 		message: "Oops! Listing is not found.",
// 		// 	};

// 		// const deletedListing = await List.findByIdAndDelete(listingId);

// 		// if (!deletedListing)
// 		// 	return {
// 		// 		status: 400,
// 		// 		message: "Oops! Document not deleted. Try again later.",
// 		// 	};

// 		// revalidatePath(`/apartments`);
// 		// revalidatePath(`/listings`);

// 		// return { status: 201, message: `Successfully deleted!` };
// 	} catch (error: any) {
// 		handleError(error);
// 		return {
// 			status: error?.status || 400,
// 			message:
// 				error?.message ||
// 				"Oops! Couldn't get any listings! Try again later.",
// 		};
// 	}
// };

// // Delete listing image
// export const deleteListingImage = async ({
// 	userId,
// 	image,
// 	listingId,
// }: {
// 	userId: string;
// 	image: any;
// 	listingId: string;
// }) => {
// 	try {
// 		await connectToDatabase();

// 		const user = await User.findById(userId);

// 		if (!user)
// 			return {
// 				status: 400,
// 				message: "Oops! User not found.",
// 			};

// 		if (!user.isRenter && !user.isAdmin)
// 			return {
// 				status: 400,
// 				message: "Oops! You are not authorized to delete this listing.",
// 			};

// 		const listing = await List.findById(listingId);

// 		if (!listing)
// 			return {
// 				status: 400,
// 				message: "Oops! Listing is not found.",
// 			};

// 		// Delete from cloudinary first
// 		await cloudinary.uploader.destroy(image.id, {});

// 		const oldImage = listing.images.find(
// 			(img: any) => img._id.toString() === image._id
// 		);

// 		// Remove the old image from MongoDB
// 		const deletedImage = await List.findByIdAndUpdate(
// 			listingId,
// 			{ $pull: { images: { id: oldImage.id } } }, // Remove the old image
// 			{ new: true }
// 		);

// 		if (!deletedImage)
// 			return {
// 				status: 400,
// 				message: "Oops! Image not deleted. Try again later.",
// 			};

// 		revalidatePath(`/apartments`);
// 		revalidatePath(`/apartments/${listing._id}`);
// 		revalidatePath(`/listings`);

// 		return { status: 201, message: `Successfully deleted!` };
// 	} catch (error: any) {
// 		handleError(error);
// 		return {
// 			status: error?.status || 400,
// 			message:
// 				error?.message ||
// 				"Oops! Couldn't get any listings! Try again later.",
// 		};
// 	}
// };
