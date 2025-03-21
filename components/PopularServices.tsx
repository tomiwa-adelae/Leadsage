import React from "react";
import ProductCard from "./cards/ProductCard";
import { Button } from "./ui/button";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { popularProperties } from "@/constant";
import { getAllListings } from "@/lib/actions/list.actions";

const PopularServices = async () => {
	const listings = await getAllListings({
		query: "",
		page: 1,
		limit: 5,
	});

	return (
		<div className="container pb-16">
			<div className="space-y-2">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Popular Properties
				</h2>
				<p className="hidden lg:block text-sm text-gray-700">
					Check out our most viewed and top-selling properties—trusted
					by many for their quality, location, and value.
				</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
				{popularProperties.map(
					({ image, title, location, price }, index) => (
						<ProductCard
							key={index}
							image={image}
							title={title}
							price={price}
							location={location}
						/>
					)
				)}
			</div>
			<div className="w-full mt-8 flex items-center justify-center">
				<Button
					size={"lg"}
					asChild
					className="text-green-400 bg-[#E6F5EB] hover:text-white"
				>
					<Link href="/services">
						All services <MoveUpRight />
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default PopularServices;
