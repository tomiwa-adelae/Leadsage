import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";

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
		<div className="inline-block border rounded-xl overflow-hidden cursor-pointer group">
			<div className="overflow-hidden">
				<Image
					src={image}
					alt={title}
					width={1000}
					height={1000}
					className="group-hover:scale-[1.1] w-full h-[300px] object-cover transition ease-out"
				/>
			</div>
			<div className="px-6 pt-6 pb-10 space-y-5">
				<h4 className="text-gray-900 text-lg font-semibold hover:text-green-400 transition ease-in-out">
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
				<Separator />
				<p className="text-gray-700 text-base">
					From <b className="text-gray-900">&#8358;{price}</b>{" "}
					annually
				</p>
			</div>
		</div>
	);
};

export default ProductCard;
