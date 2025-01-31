"use client";
import { Button } from "@/components/ui/button";
import { aboutWorkersBenefits, homeStats } from "@/constant";
import { Check, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";

const JoinMarketplace = () => {
	return (
		<div className="py-8 lg:py-16 bg-white container">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-14">
				<Image
					src={"/assets/images/showcase-display-img.png"}
					alt={"2 images of a building"}
					width={1000}
					height={1000}
					className="w-auto h-auto"
				/>
				<div className="flex flex-col justify-center">
					<h2 className="text-gray-900 font-bold text-2xl md:text-3xl leading-normal md:leading-normal">
						Join World's Best Marketplace for Workers
					</h2>
					<p className="text-gray-700 text-sm leading-loose my-8">
						It is a long established fact that a reader will be
						distracted by the readable content of a page when
						looking at its layout. The point of using Lorem Ipsum is
						that it has a more-or-less normal distribution of
						letters, as opposed to using 'Content here, content
						here', making it look like readable English.
					</p>
					<ul className="space-y-4">
						{aboutWorkersBenefits.map((benefit, index) => (
							<li
								key={index}
								className="text-sm inline-flex gap-4 items-center leading-relaxed"
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
							className="text-green-400 w-auto mt-8 bg-[#E6F5EB] hover:text-white"
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
						<h3 className="font-bold text-4xl">
							<CountUp
								start={0}
								end={number}
								duration={2.25}
								decimal=","
								suffix={suffix}
							/>
						</h3>
						<strong className="text-sm font-medium">{title}</strong>
					</div>
				))}
			</div>
		</div>
	);
};

export default JoinMarketplace;
