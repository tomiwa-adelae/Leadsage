"use client";
import React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "./ui/button";
import { Grip, Trash2 } from "lucide-react";
import { ShowAllPhotosModal } from "./ShowAllPhotosModal";
import { DeleteImageModal } from "./DeleteImageModal";

export function ApartmentImages({ images }: { images: any }) {
	const [open, setOpen] = React.useState(false);
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [openAllPhotosModal, setOpenAllPhotosModal] = React.useState(false);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	return (
		<div>
			<div className="grid grid-cols-4 md:grid-cols-3 md:grid-rows-2 gap-4">
				{images.map(
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
							<div className="w-full h-full absolute top-0 left-0 group-hover:bg-black/20 transition-all cursor-pointer"></div>
						</div>
					)
				)}
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
		</div>
	);
}
