import React from "react";
import Header from "./Header";
import { Button } from "../ui/button";
import Link from "next/link";

const Showcase = () => {
	return (
		<div
			style={{ backgroundImage: `url(/assets/images/showcase-img.jpg)` }}
			className="min-h-screen"
		>
			<Header />
		</div>
	);
};

export default Showcase;
