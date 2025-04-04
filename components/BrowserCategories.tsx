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
					<h2 className="font-medium text-3xl md:text-4xl">
						Our Categories
					</h2>
					<p className="hidden lg:block text-base text-gray-700 leading-relaxed lg:max-w-lg">
						Explore a wide variety of properties categorized to suit
						your needs, from residential homes to commercial spaces.
						Find exactly what you're looking for with ease.
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
