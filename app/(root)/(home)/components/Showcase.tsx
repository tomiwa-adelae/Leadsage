"use client";
import CountUp from "react-countup";
import { homeStats } from "@/constant";
import Image from "next/image";
import Header from "@/components/shared/Header";
import ShowcaseBoxes from "./ShowcaseBoxes";
import { ShowcaseSearchForm } from "@/components/forms/ShowcaseSearchForm";

const Showcase = () => {
	return (
		<div
			style={{ backgroundImage: `url(/assets/images/showcase-img.jpg)` }}
			className="text-white bg-no-repeat bg-center bg-cover bg-current"
		>
			<Header />
			<main className="container py-20 grid grid-cols-1 lg:grid-cols-5 gap-14">
				<div className="col-span-3">
					<h1 className="font-medium text-4xl leading-snug md:text-5xl md:leading-snug">
						Find Your Perfect Home, Designed for You
					</h1>
					{/* <p className="hidden lg:block text-base text-gray-200 mt-4">
						Explore a diverse selection of properties that match
						your lifestyle and budget. Whether you're renting,
						buying, or investing, we help you find the ideal space
						with ease—saving you time, effort, and money along the
						way.
					</p> */}
					<ShowcaseSearchForm />
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
						{homeStats.map(({ number, title, suffix }, index) => (
							<div key={index} className="grid gap-1">
								<h3 className="font-medium text-2xl lg:text-3xl">
									<CountUp
										start={0}
										end={number}
										duration={2.25}
										decimal=","
										suffix={suffix}
									/>
								</h3>
								<p className="text-sm lg:text-base">{title}</p>
							</div>
						))}
					</div>
				</div>
				<div className="col-span-2 m-auto hidden md:block relative">
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
