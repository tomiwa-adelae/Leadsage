"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function PartneringCompanies() {
	return (
		<div className="rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden py-10">
			<InfiniteMovingCards
				items={companies}
				direction="right"
				speed="slow"
			/>
		</div>
	);
}

const companies = [
	{
		logo: "/assets/images/icons/amazon.webp",
		name: "Amazon",
	},
	{
		logo: "/assets/images/icons/amd.webp",
		name: "AMD",
	},
	{
		logo: "/assets/images/icons/cisco.webp",
		name: "Cisco",
	},
	{
		logo: "/assets/images/icons/dropcam.webp",
		name: "Dropcam",
	},
	{
		logo: "/assets/images/icons/logitech.webp",
		name: "Logitech",
	},
	{
		logo: "/assets/images/icons/spotify.webp",
		name: "Spotify",
	},
];
