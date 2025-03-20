"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadDocuments = async (document: any) => {
	try {
		if (
			document.startsWith("data:application/pdf") ||
			document.startsWith("data:image/jpeg") ||
			document.startsWith("data:image/png") ||
			document.startsWith("data:image/jpg") ||
			document.startsWith("data:image/gif") ||
			document.startsWith("data:image/webp")
		) {
			const result = await cloudinary.uploader.upload(document, {
				folder: "leadsage",
			});

			return { url: result.secure_url };
		} else {
			const result = await cloudinary.uploader.upload(document, {
				folder: "leadsage",
				resource_type: "raw",
			});

			return { url: result.secure_url };
		}
	} catch (error) {}
};
