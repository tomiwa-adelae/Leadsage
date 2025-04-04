import { aboutTestimonies } from "@/constant";
import Image from "next/image";
import React from "react";

const Testimonies = () => {
	return (
		<div className="bg-white py-16">
			<div className="container">
				<h2 className="font-medium text-center text-3xl md:text-4xl mb-4">
					What Our Clients Have to Say
				</h2>
				<p className="hidden lg:block text-base text-gray-700 leading-relaxed mb-8 text-center">
					Find your perfect home with Leadsage—trusted by tenants and
					landlords alike.
				</p>
				<div>
					<Image
						src={"/assets/icons/quote.svg"}
						alt={"Quote icon"}
						width={1000}
						height={1000}
						className="w-[100px] h-[100px] mx-auto my-10"
					/>
					<h4 className="text-green-400 font-medium text-xl md:text-2xl lg:text-3xl leading-relaxed mt-4 md:w-8/12 mx-auto text-center">
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
									className="rounded-full w-16 h-16 md:w-20 md:h-20 object-cover"
								/>
								<div>
									<h4 className="text-gray-900 font-medium text-base md:text-lg lg:text-xl">
										{name}
									</h4>
									<p className="text-gray-700 text-sm md:text-base">
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
