import React from "react";
import ProductCard from "./cards/ProductCard";
import { Button } from "./ui/button";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { popularProperties } from "@/constant";
import { getAllListings } from "@/lib/actions/list.actions";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const PopularServices = async () => {
	const listings = await getAllListings({
		query: "",
		page: 1,
		limit: 5,
	});

	return (
		<div className="container pb-16">
			<div className="space-y-2">
				<h2 className="font-medium text-3xl md:text-4xl">
					Popular Properties
				</h2>
				<p className="hidden lg:block text-base text-muted-foreground leading-relaxed lg:max-w-lg">
					Check out our most viewed and top-selling properties—trusted
					by many for their quality, location, and value.
				</p>
			</div>
			<ScrollArea className="">
				<div className="flex w-max space-x-8 pt-4 pr-10 pb-4">
					{listings.data?.map((listing: any, index: string) => (
						<ProductCard
							key={index}
							id={listing._id}
							images={listing.images}
							name={listing.name}
							rent={listing.price}
							address={listing.address}
							city={listing.city}
							state={listing.state}
						/>
					))}
					{listings.data?.map((listing: any, index: string) => (
						<ProductCard
							key={index}
							id={listing._id}
							images={listing.images}
							name={listing.name}
							rent={listing.rent}
							address={listing.address}
							city={listing.city}
							state={listing.state}
						/>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
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
