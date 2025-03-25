import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const NoBookingBox = ({ isRenter }: { isRenter: boolean }) => {
	return (
		<div className="bg-white rounded-md py-8 mt-10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
			<div className="container text-center flex flex-col gap-10 items-center justify-center">
				<h3 className="font-semibold text-lg lg:text-xl">
					No bookings yet
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
				<p className="text-gray-700 text-sm">
					{isRenter
						? "No one has made any bookings yet! Once they make a booking, you would see them here."
						: "You haven't made any bookings yet! Start exploring and find the perfect space that meets your needs."}
				</p>
				{!isRenter && (
					<Button size={"md"} asChild>
						<Link href="/apartments">Browse apartments</Link>
					</Button>
				)}
			</div>
		</div>
	);
};

export default NoBookingBox;
