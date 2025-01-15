import { needSomethingDetails } from "@/constant";
import { LaptopMinimal } from "lucide-react";
import React from "react";

const NeedSomething = () => {
	return (
		<div className="container py-16">
			<div className="space-y-2">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Need a space?
				</h2>
				<p className="text-sm text-gray-700">
					Most viewed and all-time top-selling buildings and spaces
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
				{needSomethingDetails.map(
					({ icon, title, description }, index) => {
						const Icon = icon;

						return (
							<div className="space-y-4" key={index}>
								<Icon
									className="w-9 h-9 text-green-700"
									absoluteStrokeWidth
								/>
								<h4 className="font-medium text-lg text-gray-900">
									{title}
								</h4>
								<p className="text-gray-700 text-sm leading-loose">
									{description}
								</p>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
};

export default NeedSomething;
