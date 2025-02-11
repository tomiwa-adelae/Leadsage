"use client";
import React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export function ApartmentImages({ images }: any) {
	const [open, setOpen] = React.useState(false);
	const [currentIndex, setCurrentIndex] = React.useState(0);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	return (
		<div className="py-10">
			<div className="grid grid-cols-4 md:grid-cols-3 grid-rows-2 gap-4">
				{images.map(
					(
						{ src, alt }: { src: string; alt: string },
						index: number
					) => (
						<div
							key={index}
							className={`${
								index + 1 === 1
									? "col-span-full md:col-span-2 md:row-span-2"
									: "col-span-2 md:col-start-3"
							}`}
							onClick={() => handleOpen(index)}
						>
							<Image
								src={src}
								width={1000}
								height={1000}
								alt={alt}
								className="w-full h-full rounded-lg aspect-video object-cover cursor-pointer"
							/>
						</div>
					)
				)}
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
