"use client";
import React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Grip, Loader, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShowAllPhotosModal } from "@/components/ShowAllPhotosModal";
import { DeleteImageModal } from "@/components/DeleteImageModal";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "@/hooks/use-toast";
import { addListingImages } from "@/lib/actions/list.actions";
import { uploadImage, uploadImages } from "@/lib/actions/upload.actions";
import { useRouter } from "next/navigation";

export function ApartmentImages({
	images,
	userId,
	listingId,
}: {
	images: any;
	userId: string;
	listingId: string;
}) {
	const router = useRouter();
	const [loading, setLoading] = React.useState(false);
	const [photos, setPhotos] = React.useState<string[]>([]);
	const [photo, setPhoto] = React.useState<any>();
	const [open, setOpen] = React.useState(false);
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [openAllPhotosModal, setOpenAllPhotosModal] = React.useState(false);
	const [selectedImageId, setSelectedImageId] = React.useState<string | null>(
		null
	);
	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	const handleDeleteClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		imageId: string
	) => {
		e.stopPropagation(); // prevent triggering Lightbox
		setSelectedImageId(imageId);
		setOpenDeleteModal(true);
	};

	const handleUpload = async () => {
		try {
			setLoading(true);

			if (photos.length === 0)
				return toast({
					title: "There is no photo selected.",
					variant: "destructive",
				});

			const uploadedImages = await uploadImages({
				listingImages: images,
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
				toast({ title: "Successfully updated your listing images" });
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
		<div>
			{images?.length === 0 && (
				<div>
					<div className="mb-6">
						<h3 className="text-lg mb-1 font-semibold text-primary">
							Add photos to your listing
						</h3>
						<p className="text-base text-muted-foreground">
							Upload high-quality images that highlight your
							apartment’s best features. Great photos attract more
							renters!
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
									const previewImage =
										reader.result as string;
									setPhotos((prev: any) => [
										previewImage,
										...prev,
									]);
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
						{images?.map((photo: any, index: any) => (
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
					<div className="flex justify-end mt-6">
						<Button
							onClick={handleUpload}
							disabled={
								photos?.length + images?.length < 3 || loading
							}
							size="lg"
						>
							{loading ? "Adding..." : "Add photos"}
						</Button>
					</div>
				</div>
			)}
			<div className="grid grid-cols-4 md:grid-cols-3 md:grid-rows-2 gap-4">
				{images.length !== 0 &&
					[
						...images,
						...Array(Math.max(0, 3 - images.length)).fill(null),
					].map((image, index) => {
						const isUploadBox = image === null;

						return (
							<div
								key={index}
								className={`relative rounded-lg border border-input overflow-hidden group ${
									index + 1 === 1
										? "col-span-full md:col-span-2 md:row-span-2"
										: "col-span-2 md:col-start-3"
								}`}
							>
								{isUploadBox ? (
									<>
										{photo ? (
											<div className="relative">
												<Image
													src={photo.src}
													alt={"New photo"}
													width={1000}
													height={1000}
													className="size-ful aspect-video object-cover"
												/>
												<Button
													className="text-white hover:text-destructive absolute top-1 right-1"
													size="icon"
													onClick={() => setPhoto("")}
												>
													<Trash2 />
												</Button>
												{loading && (
													<Loader className="animate-spin size-8" />
												)}
											</div>
										) : (
											<FileUpload
												showTitle={false}
												loading={false}
												onChange={(files) => {
													const reader =
														new FileReader();
													reader.readAsDataURL(
														files[0]
													);
													reader.onload =
														async () => {
															try {
																const previewImage =
																	reader.result as string;
																// You can call a function here to upload and update the images list
																setPhoto({
																	src: previewImage,
																	imageId:
																		"temp",
																});

																setLoading(
																	true
																);

																const uploadedImage =
																	await uploadImage(
																		previewImage
																	);

																const res =
																	await addListingImages(
																		{
																			userId,
																			listingId,
																			uploadedImages:
																				[
																					uploadedImage,
																				],
																		}
																	);

																console.log(
																	res
																);

																if (
																	res.status ===
																	400
																)
																	return toast(
																		{
																			title: res.message,
																			variant:
																				"destructive",
																		}
																	);

																toast({
																	title: "Photos successfully uploaded!",
																});
																router.refresh();
																setLoading(
																	false
																);
															} catch (error: any) {
																setLoading(
																	false
																);
																toast({
																	title:
																		error?.message ||
																		"An error occurred!",
																	variant:
																		"destructive",
																});
															} finally {
																setLoading(
																	false
																);
															}
														};
												}}
											/>
										)}
									</>
								) : (
									<>
										<Image
											src={image.src}
											width={1000}
											height={1000}
											alt={"Images"}
											className={`w-full h-full aspect-video object-cover cursor-pointer`}
											onClick={() => handleOpen(index)}
										/>
										<Button
											className="text-white hover:text-destructive absolute top-1 right-1"
											size="icon"
											onClick={(e) =>
												handleDeleteClick(
													e,
													image.imageId
												)
											}
										>
											<Trash2 />
										</Button>
									</>
								)}
							</div>
						);
					})}

				{/* {images.length !== 0 &&
					images.map(
						(
							image: { src: string; imageId: string },
							index: number
						) => (
							<div
								key={index}
								className={`relative rounded-lg border border-input overflow-hidden group ${
									index + 1 === 1
										? "col-span-full md:col-span-2 md:row-span-2"
										: "col-span-2 md:col-start-3"
								}`}
								onClick={() => handleOpen(index)}
							>
								<Image
									src={image.src}
									width={1000}
									height={1000}
									alt={"Images"}
									className={`w-full h-full aspect-video object-cover cursor-pointer`}
								/>
								<Button
									className="text-white hover:text-destructive absolute top-1 right-1"
									size="icon"
									onClick={(e) =>
										handleDeleteClick(e, image?.imageId!)
									}
								>
									<Trash2 />
								</Button>
							</div>
						)
					)} */}
			</div>
			<Button
				className="md:hidden absolute bottom-2 right-2"
				variant={"outline"}
				size={"md"}
				onClick={() => setOpenAllPhotosModal(true)}
			>
				<Grip /> Show all photos
			</Button>
			<div className="absolute top-0 left-0 group-hover:bg-black/20 transition-all cursor-pointer"></div>
			{images.length > 3 && (
				<Button
					className="absolute bottom-2 right-2"
					variant={"outline"}
					size={"md"}
					onClick={() => setOpenAllPhotosModal(true)}
				>
					<Grip /> Show all photos
				</Button>
			)}
			{open && (
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					slides={images}
					index={currentIndex}
				/>
			)}
			{openAllPhotosModal && (
				<ShowAllPhotosModal
					open={openAllPhotosModal}
					closeModal={() => setOpenAllPhotosModal(false)}
					photos={images}
				/>
			)}
			{openDeleteModal && selectedImageId && (
				<DeleteImageModal
					open={openDeleteModal}
					closeModal={() => {
						setOpenDeleteModal(false);
						setSelectedImageId(null);
					}}
					userId={userId}
					listingId={listingId}
					imageId={selectedImageId}
				/>
			)}
		</div>
	);
}
