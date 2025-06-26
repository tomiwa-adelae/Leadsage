"use client";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { addListingImages } from "@/lib/actions/list.actions";
import { uploadImages } from "@/lib/actions/upload.actions";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface RentDetailsProps {
	userId: string;
	listingId: string;
	listingImages: any;
}

const MediaForm: React.FC<RentDetailsProps> = ({
	userId,
	listingId,
	listingImages,
}) => {
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState<string[]>([]);
	const router = useRouter();

	const handleUpload = async () => {
		try {
			setLoading(true);

			if (photos.length === 0)
				return toast({
					title: "There is no photo selected.",
					variant: "destructive",
				});

			const uploadedImages = await uploadImages({
				listingImages,
				photos,
			});

			const res = await addListingImages({
				userId,
				listingId,
				uploadedImages,
			});

			if (res.status === 400)
				return toast({ title: res.message, variant: "destructive" });

			toast({ title: "Photos successfully uploaded!" });
			setPhotos([]);
			if (photos.length >= 3) {
				router.push(`/create-listing/${listingId}/amenities`);
			} else {
				toast({
					title: "Please upload at least 5 photos",
					variant: "destructive",
				});
			}
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			toast({
				title: error.message || "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
			<div className="mb-6">
				<h3 className="text-lg mb-1 font-semibold text-primary">
					Add photos
				</h3>
				<p className="text-base text-muted-foreground">
					Upload high-quality images that highlight your apartment’s
					best features. Great photos attract more renters!
				</p>
			</div>
			<FileUpload
				showTitle={false}
				loading={false}
				onChange={(files) => {
					const reader = new FileReader();
					reader.readAsDataURL(files[0]);
					reader.onload = async () => {
						try {
							const previewImage = reader.result as string;
							setPhotos((prev) => [previewImage, ...prev]);
						} catch (error) {
							toast({ title: "An error occurred!" });
						} finally {
							// setLoading(false);
						}
					};
				}}
			/>
			<div className="grid grid-cols-2 gap-4">
				{photos.map((photo, index) => (
					<div key={index} className="relative">
						<Image
							src={photo}
							alt="Photo"
							width={1000}
							height={1000}
							className="aspect-square object-cover rounded-lg"
						/>
						<Button
							className="text-white hover:text-destructive absolute top-1 right-1"
							size="icon"
							onClick={() => {
								const updatedPhotos = photos.filter(
									(_, i) => i !== index
								);
								setPhotos(updatedPhotos);
							}}
							disabled={loading}
						>
							<Trash2 />
						</Button>
					</div>
				))}
				{listingImages.map((photo: any, index: any) => (
					<div key={index} className="relative">
						<Image
							src={photo.src}
							alt="Photo"
							width={1000}
							height={1000}
							className="aspect-square object-cover rounded-lg"
						/>
						<Button
							className="text-white hover:text-destructive absolute top-1 right-1"
							size="icon"
							onClick={() => {
								const updatedPhotos = photos.filter(
									(_, i) => i !== index
								);
								setPhotos(updatedPhotos);
							}}
							disabled={loading}
						>
							<Trash2 />
						</Button>
					</div>
				))}
			</div>
			<div className="flex justify-between mt-6">
				<Button
					className="underline"
					variant={"ghost"}
					asChild
					size="lg"
				>
					<Link href={`/create-listing/${listingId}/rent-details`}>
						Back
					</Link>
				</Button>
				<Button
					onClick={handleUpload}
					disabled={photos.length < 3 || loading}
					size="lg"
				>
					{loading ? "Saving" : "Continue"}
				</Button>
			</div>
		</div>
	);
};

export default MediaForm;
