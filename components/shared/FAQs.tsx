import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constant";
import { Spotlight } from "../ui/spotlight-new";
const FAQs = () => {
	return (
		<div id="faqs" className="bg-white py-20 overflow-hidden relative">
			<Spotlight />
			<div className="container">
				<h2 className="font-medium text-center text-3xl md:text-4xl mb-4">
					Frequently Asked Questions
				</h2>
				<p className="hidden lg:block text-base text-gray-700 leading-relaxed mb-8 text-center">
					Have questions? We're here to help! Browse through our most
					common inquiries and find the answers you need.
				</p>
				<div className="mt-8">
					<Accordion type="single" collapsible className="w-full">
						{faqs.map(({ question, answer }, index) => (
							<AccordionItem value={`${index}`} key={index}>
								<AccordionTrigger>{question}</AccordionTrigger>
								<AccordionContent>
									{answer} to the WAI-ARIA design pattern.
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
};

export default FAQs;
