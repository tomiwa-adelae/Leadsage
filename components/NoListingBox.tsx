import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const NoListingBox = () => {
	return (
		<div className="bg-white rounded-md py-8 mt-10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
			<div className="container text-center flex flex-col gap-10 items-center justify-center">
				<h3 className="font-semibold text-lg lg:text-xl">
					No listings added yet
				</h3>
				<div className="flex items-center justify-center gap-4">
					<Image
						src={"/assets/icons/house-two.svg"}
						alt={"House icon"}
						width={1000}
						height={1000}
						className="w-[60px] h-[60px]"
					/>
					<Image
						src={"/assets/icons/plus.svg"}
						alt={"Plus icon"}
						width={1000}
						height={1000}
						className="w-[60px] h-[60px]"
					/>
				</div>
				<p className="text-muted-foreground text-sm">
					Listing your space is the first step to take as a Leadsage
					landlord and we’ve made that super easy for you. Now, let’s
					show the world what they are missing.
				</p>
				<Button size={"md"} asChild>
					<Link href="/create-listing">List your first space</Link>
				</Button>
			</div>
		</div>
	);
};

export default NoListingBox;
