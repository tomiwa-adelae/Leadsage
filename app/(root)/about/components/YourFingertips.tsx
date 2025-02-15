import { yourFingerTipsDetails } from "@/constant";
import { Medal } from "lucide-react";
import Image from "next/image";
import React from "react";

const YourFingertips = () => {
	return (
		<div className="py-16 container">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="flex flex-col justify-center">
					<h2 className="text-gray-900 font-bold text-xl md:text-3xl leading-normal md:leading-normal">
						A Whole World of Homes{" "}
						<br className="hidden md:block" /> and Properties at
						Your Fingertips
					</h2>
					<div className="mt-8 grid gap-8">
						{yourFingerTipsDetails.map(
							({ title, icon, description }, index) => {
								const Icon = icon;
								return (
									<div
										key={index}
										className="flex items-center lg:items-start justify-start gap-3"
									>
										<div className="py-1">
											<Image
												src={icon}
												alt={title}
												width={1000}
												height={1000}
												className="w-[25px] h-[25px] lg:w-[50px] lg:h-[50px]"
											/>
										</div>
										<div className="space-y-1">
											<h4 className="font-medium text-sm md:text-base lg:text-xl text-gray-900">
												{title}
											</h4>
											<p className="hidden lg:block text-sm leading-loose text-gray-700">
												{description}
											</p>
										</div>
									</div>
								);
							}
						)}
					</div>
				</div>
				<Image
					src={"/assets/images/home-building.png"}
					alt="Home building"
					width={1000}
					height={1000}
					className="w-auto h-auto"
				/>
			</div>
		</div>
	);
};

export default YourFingertips;
