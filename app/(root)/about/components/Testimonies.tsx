import { aboutTestimonies } from "@/constant";
import { Quote } from "lucide-react";
import Image from "next/image";
import React from "react";

const Testimonies = () => {
	return (
		<div className="bg-white py-24">
			<div className="container">
				<h3 className="text-gray-900 font-bold text-xl md:text-3xl leading-normal text-center">
					What Our Clients Have to Say
				</h3>
				<p className="hidden lg:block text-gray-700 text-sm leading-loose my-4  text-center">
					Find your perfect home with Leadsage—trusted by tenants and
					landlords alike.
				</p>
				<div>
					{/* <Quote
						absoluteStrokeWidth
						className="text-green-400 w-14 h-14 mx-auto my-10"
					/> */}
					<Image
						src={"/assets/icons/quote.svg"}
						alt={"Quote icon"}
						width={1000}
						height={1000}
						className="w-[70px] h-[70px] mx-auto my-10"
					/>
					<h4 className="font-semibold text-lg md:text-2xl leading-loose md:leading-loose mt-4 md:w-8/12 mx-auto text-center">
						"Leadsage made finding our dream home effortless! The
						verified listings and smooth rental process gave us
						peace of mind. Highly recommended!"
					</h4>
				</div>
				<div className="flex flex-wrap gap-8 items-center justify-center mt-14">
					{aboutTestimonies.map(
						({ image, name, alt, portfolio }, index) => (
							<div
								className="border rounded-full p-2 inline-flex min-w-72 items-center justify-start gap-2 md:gap-4"
								key={index}
							>
								<Image
									src={image}
									alt={alt}
									width={1000}
									height={1000}
									className="rounded-full w-12 h-12 md:w-16 md:h-16 object-cover"
								/>
								<div>
									<h4 className="text-gray-900 font-medium text-sm md:text-base">
										{name}
									</h4>
									<p className="text-gray-700 text-xs md:text-sm">
										{portfolio}
									</p>
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default Testimonies;
