"use client";
import Header from "./Header";
import CountUp from "react-countup";
import { ShowcaseSearchForm } from "../forms/ShowcaseSearchForm";
import { homeStats } from "@/constant";
import Image from "next/image";
import { House, ShieldCheck } from "lucide-react";
import ShowcaseBoxes from "./ShowcaseBoxes";

const Showcase = () => {
	return (
		<div
			style={{ backgroundImage: `url(/assets/images/showcase-img.jpg)` }}
			className="min-h-screen text-white bg-no-repeat bg-center bg-cover bg-current"
		>
			<Header />
			<main className="container py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-8">
				<div>
					<h1 className="font-bold text-4xl leading-relaxed">
						Find Your Dream Home, Tailored Just for You
					</h1>
					<p className="text-sm leading-loose text-gray-200 mt-4">
						Explore a wide range of properties tailored to your
						needs. Discover the perfect space at the best prices,
						saving you time and money while finding a place to call
						home.
					</p>
					<ShowcaseSearchForm />
					<div className="mt-6">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{homeStats.map(
								({ number, title, suffix }, index) => (
									<div key={index} className="grid gap-1">
										<h3 className="font-bold text-2xl">
											<CountUp
												start={0}
												end={number}
												duration={2.25}
												decimal=","
												suffix={suffix}
											/>
										</h3>
										<strong className="text-sm font-medium">
											{title}
										</strong>
									</div>
								)
							)}
						</div>
					</div>
				</div>
				<div className="m-auto hidden md:block relative">
					<Image
						src={"/assets/images/showcase-display-img.png"}
						alt="Showcase Images"
						width={1000}
						height={1000}
						className="w-auto h-auto"
					/>
					<ShowcaseBoxes />
				</div>
			</main>
		</div>
	);
};

export default Showcase;
