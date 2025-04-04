import { Button } from "@/components/ui/button";
import { aboutStats } from "@/constant";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const FindYourBuilding = () => {
	return (
		<div className="bg-red-100 py-16 text-black">
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="flex flex-col items-start justify-center">
					<h2 className="font-medium text-3xl md:text-4xl">
						Find the Perfect Property for Your Next Chapter
					</h2>
					<p className="hidden lg:block text-base text-gray-700 leading-relaxed my-8">
						Discover a wide range of homes, apartments, and
						commercial spaces designed to fit your lifestyle and
						budget. Whether you're looking to rent, buy, or invest,
						Leadsage Africa makes the process simple and
						stress-free.
					</p>
					<Button className="mt-4 lg:mt-0" size={"lg"} asChild>
						<Link href="/services">
							Get started <MoveUpRight />
						</Link>
					</Button>
				</div>
				<div className="flex">
					<div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
						{aboutStats.map(({ title, stats }, index) => (
							<div
								key={index}
								className={`inline-flex items-center flex-col justify-center text-center gap-4  bg-white rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 py-12 ${
									index === 1 && "row-span-2"
								}`}
							>
								<h3 className="font-medium text-2xl md:text-3xl text-green-400">
									{stats}
								</h3>
								<p className="text-base text-gray-700 leading-relaxed">
									{title}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FindYourBuilding;
