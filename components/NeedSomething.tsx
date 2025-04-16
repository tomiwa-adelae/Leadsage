import { needSomethingDetails } from "@/constant";
import Image from "next/image";

const NeedSomething = () => {
	return (
		<div className="container py-16">
			<div className="space-y-2">
				<h2 className="font-medium text-3xl md:text-4xl">
					Looking for the Perfect Space?
				</h2>
				<p className="hidden lg:block text-base text-muted-foreground leading-relaxed lg:max-w-lg">
					Explore our most popular and top-rated buildings and
					properties that have captured the attention of tenants and
					landlords alike.
				</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10">
				{needSomethingDetails.map(
					({ icon, title, description }, index) => {
						return (
							<div className="space-y-2" key={index}>
								<Image
									src={icon}
									alt={title}
									width={1000}
									height={1000}
									className="w-[50px] lg:w-[70px] lg:h-[70px] h-[50px]"
								/>
								<h4 className="font-medium text-base md:text-lg text-gray-900 lg:text-xl">
									{title}
								</h4>
								<p className="text-muted-foreground leading-relaxed text-base hidden lg:block">
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
