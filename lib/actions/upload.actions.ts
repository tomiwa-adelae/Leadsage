// "use server";
// import { v2 as cloudinary } from "cloudinary";
// import { handleError } from "../utils";

// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const uploadDocuments = async (document: any, selectedImage?: any) => {
// 	try {
// 		if (
// 			document.startsWith("data:application/pdf") ||
// 			document.startsWith("data:image/jpeg") ||
// 			document.startsWith("data:image/png") ||
// 			document.startsWith("data:image/jpg") ||
// 			document.startsWith("data:image/gif") ||
// 			document.startsWith("data:image/webp")
// 		) {
// 			let result;

// 			if (selectedImage) {
// 				await cloudinary.uploader.destroy(selectedImage.id, {});
// 				result = await cloudinary.uploader.upload(document, {
// 					folder: "leadsage",
// 				});
// 			} else {
// 				result = await cloudinary.uploader.upload(document, {
// 					folder: "leadsage",
// 				});
// 			}

// 			return { url: result.secure_url, id: result.public_id };
// 		} else {
// 			let result;
// 			if (selectedImage) {
// 				await cloudinary.uploader.destroy(selectedImage.id, {
// 					resource_type: "raw",
// 				});
// 				result = await cloudinary.uploader.upload(document, {
// 					folder: "leadsage",
// 					resource_type: "raw",
// 				});
// 			} else {
// 				result = await cloudinary.uploader.upload(document, {
// 					folder: "leadsage",
// 					resource_type: "raw",
// 				});
// 			}
// 			return { url: result.secure_url, id: result.public_id };
// 		}
// 	} catch (error: any) {
// 		handleError(error);
// 		return {
// 			status: error?.status || 400,
// 			message:
// 				error?.message ||
// 				"Oops! Couldn't upload the document! Try again later.",
// 		};
// 	}
// };

"use server";
import { v2 as cloudinary } from "cloudinary";
import { handleError } from "../utils";
import "../database";
import { revalidatePath } from "next/cache";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImages = async ({
	listingImages,
	photos,
}: {
	listingImages: any;
	photos: string[];
}) => {
	try {
		const uploadPromises = photos.map((image) => {
			const isImage =
				image.startsWith("data:image/jpeg") ||
				image.startsWith("data:image/png") ||
				image.startsWith("data:image/jpg") ||
				image.startsWith("data:image/gif") ||
				image.startsWith("data:image/webp");

			const isPDF = image.startsWith("data:application/pdf");

			return cloudinary.uploader.upload(image, {
				folder: "leadsage",
				resource_type: isImage || isPDF ? "image" : "raw",
			});
		});

		const results = await Promise.all(uploadPromises);

		revalidatePath(`/listings`);
		revalidatePath(`/apartments`);

		return results.map((result, index) => ({
			src: result.secure_url,
			imageId: result.public_id,
		}));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error.message || "Oops! Images not uploaded. Try again later",
		};
	}
};

export const uploadImage = async (image: any) => {
	try {
		const isImage =
			image.startsWith("data:image/jpeg") ||
			image.startsWith("data:image/png") ||
			image.startsWith("data:image/jpg") ||
			image.startsWith("data:image/gif") ||
			image.startsWith("data:image/webp");

		const isPDF = image.startsWith("data:application/pdf");

		const result = await cloudinary.uploader.upload(image, {
			folder: "leadsage",
			resource_type: isImage || isPDF ? "image" : "raw",
		});

		return {
			src: result.secure_url,
			imageId: result.public_id,
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't upload the image! Try again later.",
		};
	}
};
