import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Check, CircleCheck, MoveUpRight } from "lucide-react";
import Image from "next/image";

const FindBuildings = () => {
	return (
		<div className="container grid grid-cols-1 lg:grid-cols-5 gap-8 pt-6 pb-6">
			<div className="lg:col-span-2 flex flex-col items-start justify-center">
				<h4 className="font-medium text-base text-green-400 mb-4">
					For customers
				</h4>
				<h3 className="text-gray-900 font-bold text-3xl">
					Find building your own way
				</h3>
				<p className="text-gray-700 text-sm leading-loose my-8">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Similique ea esse aperiam nostrum quo tenetur! Officiis
					repellat quo deserunt? Quas odio ad autem expedita
					quibusdam.
				</p>
				<Button size={"lg"} asChild>
					<Link href="/services">
						Contact us <MoveUpRight />
					</Link>
				</Button>
			</div>
			<div className="col-span-1 lg:col-span-3 relative flex items-center justify-center">
				<Image
					src={"/assets/images/home-building.png"}
					alt="Home building"
					width={1000}
					height={1000}
					className="w-auto h-auto rounded-3xl"
				/>
				<div className="bg-green-700 py-8 lg:py-12 px-6 lg:px-12 font-medium rounded-3xl inline-block absolute top-[50%] left-[40%] translate-x-[-40%] translate-y-[-50%]">
					<ul className="text-white text-sm space-y-6">
						<li>
							<CircleCheck className="text-white inline-block w-4 h-4 mr-2" />{" "}
							The best for every budget
						</li>
						<li>
							<CircleCheck className="text-white inline-block w-4 h-4 mr-2" />{" "}
							Quality work done quickly
						</li>
						<li>
							<CircleCheck className="text-white inline-block w-4 h-4 mr-2" />{" "}
							Protected payments, every time
						</li>
						<li>
							<CircleCheck className="text-white inline-block w-4 h-4 mr-2" />{" "}
							24/7 support
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default FindBuildings;
