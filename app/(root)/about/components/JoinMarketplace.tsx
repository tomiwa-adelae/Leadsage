"use client";
import { Button } from "@/components/ui/button";
import { aboutWorkersBenefits, homeStats } from "@/constant";
import { Check, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";

const JoinMarketplace = () => {
	return (
		<div className="pb-16 lg:pb-16 bg-white container">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-14">
				<Image
					src={"/assets/images/showcase-display-img.png"}
					alt={"2 images of a building"}
					width={1000}
					height={1000}
					className="w-auto h-auto"
				/>
				<div className="flex flex-col justify-center">
					<h2 className="font-medium text-3xl md:text-4xl">
						Join Africa’s Leading Housing Marketplace
					</h2>
					<p className="hidden lg:block text-base leading-relaxed my-4">
						Finding the perfect home or property shouldn't be
						complicated. At Leadsage Africa, we make it easy to
						discover, rent, or list properties with confidence. Our
						platform connects tenants with verified listings and
						provides landlords with seamless property management
						tools.
					</p>
					<ul className="hidden lg:block space-y-4">
						{aboutWorkersBenefits.map((benefit, index) => (
							<li
								key={index}
								className="text-base text-black inline-flex gap-4 items-center leading-relaxed"
							>
								<Check className="w-5 h-5" />
								<p>{benefit}</p>
							</li>
						))}
					</ul>
					<div>
						<Button
							size={"lg"}
							asChild
							className="text-green-400 w-auto mt-4 lg:mt-8 bg-[#E6F5EB] hover:text-white"
						>
							<Link href="/services">
								Find buildings <MoveUpRight />
							</Link>
						</Button>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 justify-items-center text-center gap-10 pt-16">
				{homeStats.map(({ number, title, suffix }, index) => (
					<div key={index} className="grid gap-2">
						<h3 className="font-medium text-3xl lg:text-6xl">
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
	);
};

export default JoinMarketplace;
