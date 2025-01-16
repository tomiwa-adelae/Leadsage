import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { ScrollingCategories } from "./ScrollingCategories";

const BrowserCategories = () => {
	return (
		<div className="container py-16">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
				<div className="space-y-2">
					<h2 className="font-semibold text-2xl lg:text-3xl">
						Browse buildings by category
					</h2>
					<p className="text-sm text-gray-700">
						Lorem ipsum, dolor sit amet consectetur adipisicing.
					</p>
				</div>
				<Button
					size={"lg"}
					asChild
					className="text-green-400 bg-[#E6F5EB] hover:text-white"
				>
					<Link href="/categories">
						All categories <MoveUpRight />
					</Link>
				</Button>
			</div>
			<ScrollingCategories />
		</div>
	);
};

export default BrowserCategories;
