"use client";
import React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export function BookingImages({ images }: { images: any }) {
	const [open, setOpen] = React.useState(false);
	const [currentIndex, setCurrentIndex] = React.useState(0);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	// Ensure images are in the correct format for Lightbox
	const lightboxSlides =
		images?.map((image: { url: string }) => ({
			src: image.url,
		})) || [];

	return (
		<div className="py-10">
			<div className="grid grid-cols-4 md:grid-cols-3 grid-rows-2 gap-4">
				{images.map((image: { url: string }, index: number) => (
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
							src={image.url}
							width={1000}
							height={1000}
							alt={"Images"}
							className={`w-full h-full aspect-video object-cover cursor-pointer`}
						/>
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
		</div>
	);
}
