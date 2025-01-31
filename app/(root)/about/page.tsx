import Header from "@/components/shared/Header";
import Showcase from "./components/Showcase";
import JoinMarketplace from "./components/JoinMarketplace";
import YourFingertips from "./components/YourFingertips";
import FindYourBuilding from "./components/FindYourBuilding";
import { PartneringCompanies } from "@/components/PartneringCompanies";
import Testimonies from "./components/Testimonies";
import FAQs from "@/components/shared/FAQs";

const page = () => {
	return (
		<div>
			<Header color="black" />
			<Showcase />
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
