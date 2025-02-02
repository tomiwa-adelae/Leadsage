import { ContactForm } from "@/components/forms/ContactForm";
import { contactDetails } from "@/constant";
import React from "react";

const ContactDetails = () => {
	return (
		<div className="bg-white relative pt-4 pb-28">
			<div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="flex flex-col items-start justify-center">
					<h3 className="text-gray-900 font-semibold text-xl leading-normal">
						Keep in Touch With Us.
					</h3>
					<p className="text-gray-700 text-sm leading-loose my-4">
						We’re here to assist you! Whether you have questions or
						need support, feel free to reach out. Our team is always
						ready to help.
					</p>
					<div className="mt-8 grid gap-8">
						{contactDetails.map(
							({ title, description, icon }, index) => {
								const Icon = icon;
								return (
									<div
										className="flex items-start justify-start gap-8"
										key={index}
									>
										<Icon
											absoluteStrokeWidth
											className="w-9 h-9 text-green-600 mt-1"
										/>
										<div className="space-y-0.5">
											<h4 className="font-medium text-lg text-gray-900">
												{title}
											</h4>
											<p className="text-sm leading-loose text-gray-700 max-w-xs">
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
