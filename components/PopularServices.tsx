import React from "react";
import ProductCard from "./cards/ProductCard";
import { Button } from "./ui/button";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

const PopularServices = () => {
	return (
		<div className="container pb-16">
			<div className="space-y-2">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Popular Services
				</h2>
				<p className="text-sm text-gray-700">
					Most viewed and all-time top-selling buildings and spaces
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
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
