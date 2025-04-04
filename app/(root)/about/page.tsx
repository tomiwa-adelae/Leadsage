import Header from "@/components/shared/Header";
import JoinMarketplace from "./components/JoinMarketplace";
import YourFingertips from "./components/YourFingertips";
import FindYourBuilding from "./components/FindYourBuilding";
import { PartneringCompanies } from "@/components/PartneringCompanies";
import Testimonies from "./components/Testimonies";
import FAQs from "@/components/shared/FAQs";
import Showcase from "@/components/shared/Showcase";

const page = () => {
	return (
		<div>
			<Header color="black" />
			<Showcase
				image={"/assets/images/about-showcase-bg.jpg"}
				title={"About Leadsage Africa"}
				description={
					"Learn more about our journey to revolutionize housing in Africa. At Leadsage, we connect people with their ideal homes through transparency, trust, and innovation."
				}
			/>
			<JoinMarketplace />
			<YourFingertips />
			<FindYourBuilding />
			<Testimonies />
			<FAQs />
			<PartneringCompanies />
		</div>
	);
};

export default page;
