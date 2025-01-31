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
				title={"About"}
				description={
					"Give your visitor a smooth online experience with a solid UX design"
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
