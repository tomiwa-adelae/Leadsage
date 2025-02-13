"use client";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "./ui/button";
import { MoveUpRight } from "lucide-react";

const UploadApartmentImages = () => {
	const [files, setFiles] = useState<File[]>([]);
	const handleFileUpload = (files: File[]) => {
		setFiles(files);
		console.log(files);
	};
	return (
		<div className="bg-white rounded-md p-6 mt-14">
			<h3 className="text-base lg:text-lg font-medium">Upload Images</h3>
			<Separator className="my-4" />
			<FileUpload onChange={handleFileUpload} />
			<Button size={"lg"} className="mt-8">
				Save <MoveUpRight />
			</Button>
		</div>
	);
};

export default UploadApartmentImages;
