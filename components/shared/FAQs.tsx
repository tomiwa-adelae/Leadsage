import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constant";
const FAQs = () => {
	return (
		<div className="bg-white py-20">
			<div className="container">
				<h3 className="text-gray-900 font-bold text-2xl md:text-3xl leading-normal text-center">
					Frequently Asked Questions
				</h3>
				<p className="text-gray-700 text-sm leading-loose my-4  text-center">
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
