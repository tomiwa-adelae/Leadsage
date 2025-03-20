"use client";
import React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FileUpload } from "./ui/file-upload";
import { OpenImageModal } from "./shared/OpenImageModal";

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

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	const placeholderImage = "/assets/icons/edit-image.svg";

	// Ensure images are in the correct format for Lightbox
	const lightboxSlides =
		details?.images?.map((image: string) => ({ src: image })) || [];

	return (
		<div className="py-10">
			<div className="grid grid-cols-4 md:grid-cols-3 grid-rows-2 gap-4">
				{(details?.images.length >= 3
					? details?.images
					: [...details?.images, placeholderImage]
				).map((image: string, index: number) => (
					<div
						key={index}
						className={`${
							index + 1 === 1
								? "col-span-full md:col-span-2 md:row-span-2"
								: "col-span-2 md:col-start-3"
						}`}
						onClick={() => {
							if (image === placeholderImage) {
								setOpenModal(true);
							} else {
								handleOpen(index);
							}
						}}
					>
						<Image
							src={image}
							width={1000}
							height={1000}
							alt={"Images"}
							className={`w-full h-full rounded-lg aspect-video border ${
								image !== placeholderImage && "object-cover"
							} cursor-pointer`}
						/>
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
					closeModal={() => {
						setOpenModal(false);
					}}
					userId={details?.user}
				/>
			)}
		</div>
	);
}
