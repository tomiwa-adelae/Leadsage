"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { toast } from "@/hooks/use-toast";
import { FileUpload } from "../ui/file-upload";

export function OpenImageModal({
	id,
	open,
	closeModal,
	userId,
	selectedImage,
}: {
	id: string;
	userId: string;
	open: boolean;
	closeModal: () => void;
	selectedImage?: any;
}) {
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState<any>("");

	// Handle form submission
	const handleSubmit = async () => {
		try {
			setLoading(true);
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Drawer open={open} onClose={closeModal}>
			<DrawerContent>
				<div className="mx-auto w-full sm:max-w-sm lg:max-w-lg py-10 container">
					<h4 className="text-sm uppercase font-medium">
						Edit Image
					</h4>
					<FileUpload
						title={selectedImage ? "Change file" : "Upload file"}
						loading={loading}
						onChange={(files) => {
							const reader = new FileReader();
							reader.readAsDataURL(files[0]);
							reader.onload = async () => {
								try {
									const binaryString = reader.result;

									setLoading(true);

									setImage(binaryString);
								} catch (error) {
									setLoading(false);
								} finally {
									setLoading(false);
								}
							};
						}}
					/>

					{/* Action Buttons */}
					<div className="flex items-center justify-between gap-4 mt-4 flex-col md:flex-row w-full">
						<DrawerClose asChild>
							<Button
								size="lg"
								onClick={closeModal}
								variant="outline"
								className="w-full md:w-auto"
							>
								Cancel
							</Button>
						</DrawerClose>
						<Button
							size="lg"
							onClick={handleSubmit}
							disabled={loading}
							className="w-full md:w-auto"
						>
							{loading ? "Submitting..." : "Submit"}
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
