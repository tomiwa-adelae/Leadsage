import { ContactForm } from "@/components/forms/ContactForm";
import { contactDetails } from "@/constant";
import Image from "next/image";
import React from "react";

const ContactDetails = () => {
	return (
		<div className="bg-white relative pt-4 pb-28">
			<div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="flex flex-col items-start justify-center">
					<h2 className="font-medium text-3xl md:text-4xl">
						Keep in Touch With Us.
					</h2>
					<p className="hidden lg:block text-base text-gray-700 leading-relaxed my-4">
						We’re here to assist you! Whether you have questions or
						need support, feel free to reach out. Our team is always
						ready to help.
					</p>
					<div className="mt-8 grid gap-8">
						{contactDetails.map(
							({ title, description, icon }, index) => {
								return (
									<div
										className="flex items-start justify-start gap-8"
										key={index}
									>
										<Image
											src={icon}
											alt={title}
											width={1000}
											height={1000}
											className="w-[50px] h-[50px] mt-1"
										/>
										<div className="space-y-0.5">
											<h4 className="font-medium text-lg">
												{title}
											</h4>
											<p className="text-base leading-relaxed text-gray-700">
												{description}
											</p>
										</div>
									</div>
								);
							}
						)}
					</div>
				</div>
				<div>
					<ContactForm />
				</div>
			</div>
		</div>
	);
};

export default ContactDetails;
