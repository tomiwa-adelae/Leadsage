"use client";
import React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "./ui/button";
import { Grip } from "lucide-react";

export function ApartmentImages({ images }: { images: any }) {
	const [open, setOpen] = React.useState(false);
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [openAllPhotosModal, setOpenAllPhotosModal] = React.useState(false);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 relative">
			<div
				className={`relative col-span-2 rounded-lg border border-input overflow-hidden group `}
				onClick={() => handleOpen(0)}
			>
				<Image
					src={images[0].src}
					width={1000}
					height={1000}
					alt={"Images"}
					className={`aspect-square md:aspect-video object-cover cursor-pointer`}
				/>

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
				<Button
					className="md:hidden absolute bottom-2 right-2"
					variant={"outline"}
					size={"md"}
					onClick={() => setOpenAllPhotosModal(true)}
				>
					<Grip /> Show all photos
				</Button>
			</div>
			{open && (
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					slides={images}
					index={currentIndex}
				/>
			)}
		</div>
	);
}
