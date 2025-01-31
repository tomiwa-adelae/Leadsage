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
				title={"Contact"}
				description={"We'd love to talk about how we can help you."}
			/>
			<ContactDetails />
			<LeafletMap />
			<FAQs />
		</div>
	);
};

export default page;
