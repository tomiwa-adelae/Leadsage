"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { companies } from "@/constant";

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
