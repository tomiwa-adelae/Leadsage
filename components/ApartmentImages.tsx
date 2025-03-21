"use client";
import React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { OpenImageModal } from "./shared/OpenImageModal";
import { OpenDeleteImageModal } from "./shared/OpenDeleteImageModal";

export function ApartmentImages({
	isRenter,
	details,
	user,
}: {
	isRenter: boolean | any;
	details: any;
	user: string;
}) {
	const [open, setOpen] = React.useState(false);
	const [openModal, setOpenModal] = React.useState(false);
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [selectedImage, setSelectedImage] = React.useState<any>(null);
	const [openDeleteImageModal, setOpenDeleteImageModal] =
		React.useState<boolean>(false);

	const handleOpenModal = (image: { url: string }) => {
		setSelectedImage(image);
		setOpenModal(true);
	};

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};
	const placeholderImage = { url: "/assets/icons/edit-image.svg" };

	const imagesToShow =
		details?.images.length >= 3
			? details?.images
			: [
					...details?.images,
					...Array(3 - details?.images.length).fill(placeholderImage),
			  ];

	// Ensure images are in the correct format for Lightbox
	const lightboxSlides =
		details?.images?.map((image: { url: string }) => ({
			src: image.url,
		})) || [];

	return (
		<div className="py-10">
			<div className="grid grid-cols-4 md:grid-cols-3 grid-rows-2 gap-4">
				{imagesToShow.map((image: { url: string }, index: number) => (
					<div
						key={index}
						className={`relative rounded-lg border border-input overflow-hidden group ${
							index + 1 === 1
								? "col-span-full md:col-span-2 md:row-span-2"
								: "col-span-2 md:col-start-3"
						}`}
						onClick={() => {
							if (
								isRenter &&
								image.url === placeholderImage.url
							) {
								setOpenModal(true);
							} else {
								handleOpen(index);
							}
						}}
					>
						<Image
							src={image.url}
							width={1000}
							height={1000}
							alt={"Images"}
							className={`w-full h-full aspect-video ${
								image !== placeholderImage && "object-cover"
							} cursor-pointer`}
						/>
						{isRenter && image.url !== placeholderImage.url && (
							<div className="flex items-center justify-center gap-4 absolute top-2 right-2 z-50">
								<Image
									src={"/assets/icons/edit.svg"}
									alt={"Edit Icon"}
									width={24}
									height={24}
									className="cursor-pointer"
									onClick={(e: any) => {
										e.stopPropagation();
										handleOpenModal(image);
									}}
								/>
								<Image
									src={"/assets/icons/delete.svg"}
									alt={"Trash Icon"}
									width={24}
									height={24}
									className="cursor-pointer"
									onClick={(e: any) => {
										e.stopPropagation();
										setOpenDeleteImageModal(true);
										setSelectedImage(image);
									}}
								/>
							</div>
						)}
						<div className="w-full h-full absolute top-0 left-0 group-hover:bg-black/20 transition-all cursor-pointer"></div>
					</div>
				))}
			</div>

			{open && (
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					slides={lightboxSlides}
					index={currentIndex}
				/>
			)}

			{openModal && (
				<OpenImageModal
					id={details?._id}
					open={openModal}
					closeModal={() => setOpenModal(false)}
					userId={details?.user}
					selectedImage={selectedImage}
				/>
			)}

			{openDeleteImageModal && (
				<OpenDeleteImageModal
					image={selectedImage}
					listingId={details?._id}
					open={openDeleteImageModal}
					closeModal={() => {
						setOpenDeleteImageModal(false);
					}}
					userId={details?.user}
				/>
			)}
		</div>
	);
}
