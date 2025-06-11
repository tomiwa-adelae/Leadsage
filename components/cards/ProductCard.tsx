import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { formatMoneyInput } from "@/lib/utils";
import { DEFAULT_LISTING_IMAGE } from "@/constant";

const ProductCard = ({
	images,
	name,
	rent,
	address,
	city,
	state,
	id,
}: {
	id: string;
	address: string;
	city: string;
	state: string;
	rent: string;
	name: string;
	images: { url: string }[];
}) => {
	return (
		<Link
			href={`/apartments/${id}`}
			className="inline-block aspect-auto hover:bg-[#F7F7F7] transition-all w-[250px] md:w-[320px] lg:w-[400px] rounded-xl overflow-hidden cursor-pointer group"
		>
			<div className="overflow-hidden">
				<Image
					src={images[0]?.url || DEFAULT_LISTING_IMAGE}
					alt={name}
					width={1000}
					height={1000}
					className="group-hover:scale-[1.1] aspect-auto w-full rounded-xl object-cover transition ease-out"
				/>
			</div>
			<h4 className="mt-4 text-green-400 text-lg md:text-xl font-semibold hover:text-green-700 transition ease-in-out">
				{name}
			</h4>
			<p className="text-muted-foreground text-sm lg:text-base mt-1.5">
				{city}, {state}
			</p>
			<p className="text-base font-medium mt-2">
				₦{formatMoneyInput(rent)}
			</p>
		</Link>
	);
};

export default ProductCard;
