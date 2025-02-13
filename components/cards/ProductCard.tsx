import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";

const ProductCard = ({
	image,
	title,
	price,
	location,
}: {
	location: string;
	price: string;
	title: string;
	image: string;
}) => {
	return (
		<Link
			href={`/apartments/12345`}
			className="inline-block border rounded-xl overflow-hidden cursor-pointer group shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
		>
			<div className="overflow-hidden">
				<Image
					src={image}
					alt={title}
					width={1000}
					height={1000}
					className="group-hover:scale-[1.1] aspect-video object-cover transition ease-out"
				/>
			</div>
			<div className="py-6 px-6">
				<div className="flex flex-col items-start pb-4 justify-between gap-4">
					<h4 className="text-green-400 text-lg font-semibold hover:text-green-400 transition ease-in-out">
						{title}
					</h4>
					<p className="text-gray-700 text-sm">
						<Image
							src={"/assets/icons/location.svg"}
							alt={"Location"}
							width={1000}
							height={1000}
							className="w-[20px] h-[20px] inline-block mr-2"
						/>
						{location}
					</p>
				</div>
				<div>
					<Separator className="my-4" />
				</div>
				<p className="text-gray-700 text-sm">
					From <b className="text-gray-900">&#8358;{price}</b>{" "}
					annually
				</p>
			</div>
		</Link>
	);
};

export default ProductCard;
