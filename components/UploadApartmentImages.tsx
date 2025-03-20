"use client";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "./ui/button";
import { MoveUpRight } from "lucide-react";
import { uploadDocuments } from "@/lib/actions/upload.actions";
import { Loader2 } from "lucide-react";

const UploadApartmentImages = () => {
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState<any>("");

	const [files, setFiles] = useState<File[]>([]);
	const handleFileUpload = (files: File[]) => {
		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = async () => {
			try {
				const binaryString = reader.result;

				setLoading(true);

				setImage(binaryString);

				// const result = await uploadDocuments(binaryString);
			} catch (error) {
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};
	};
	return (
		<div className="bg-white rounded-md p-6 mt-14">
			<h3 className="text-base lg:text-lg font-medium">Upload Images</h3>
			<Separator className="my-4" />
			<FileUpload
				loading={loading}
				onChange={handleFileUpload}
				image={image}
			/>
			<Button size={"lg"} className="mt-8">
				Save <MoveUpRight />
			</Button>
		</div>
	);
};

export default UploadApartmentImages;
