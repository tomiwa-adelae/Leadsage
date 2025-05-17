import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { formatMoneyInput } from "@/lib/utils";
import { DEFAULT_LISTING_IMAGE } from "@/constant";

const ProductCard = ({
	images,
	name,
	rentPrice,
	address,
	city,
	state,
	id,
}: {
	id: string;
	address: string;
	city: string;
	state: string;
	rentPrice: string;
	name: string;
	images: { url: string }[];
}) => {
	return (
		<Link
			href={`/apartments/${id}`}
			className="inline-block border rounded-xl overflow-hidden cursor-pointer group shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-[300px] lg:w-[350px]"
		>
			<div className="overflow-hidden">
				<Image
					src={images[0]?.url || DEFAULT_LISTING_IMAGE}
					alt={name}
					width={1000}
					height={1000}
					className="group-hover:scale-[1.1] aspect-video min-h-60 w-full object-cover transition ease-out"
				/>
			</div>
			<div className="p-3 lg:p-6">
				<div className="flex flex-col items-start pb-4 justify-between gap-4">
					<h4 className="text-green-400 text-lg lg:text-xl font-medium hover:text-green-700 transition ease-in-out">
						{name}
					</h4>
					<p className="text-gray-700 text-sm lg:text-base">
						<Image
							src={"/assets/icons/location.svg"}
							alt={"Location"}
							width={1000}
							height={1000}
							className="w-[20px] h-[20px] inline-block mr-2"
						/>
						{city}, {state}
					</p>
				</div>
				<div>
					<Separator className="my-2" />
				</div>
				<p className="text-gray-800 font-semibold text-base py-2">
					₦{formatMoneyInput(rentPrice)}
					{/* ₦600,000 */}
				</p>
			</div>
		</Link>
	);
};

export default ProductCard;
