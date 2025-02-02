import FAQs from "@/components/shared/FAQs";
import Header from "@/components/shared/Header";
import Showcase from "@/components/shared/Showcase";
import ContactDetails from "./components/ContactDetails";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap.tsx"), {
	ssr: false,
});

const page = () => {
	return (
		<div>
			<Header color="black" />
			<Showcase
				image={"/assets/images/contact-showcase-bg.jpg"}
				title={"📞 Get in Touch with Leadsage Africa"}
				description={"Have questions or need assistance? We're here to help! Reach out to us for inquiries, property listings, or support, and let’s make your housing journey seamless."}
			/>
			<ContactDetails />
			<LeafletMap />
			<FAQs />
		</div>
	);
};

export default page;
