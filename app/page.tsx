import BrowserCategories from "@/components/BrowserCategories";
import FindBuildings from "@/components/FindBuildings";
import NeedSomething from "@/components/NeedSomething";
import { PartneringCompanies } from "@/components/PartneringCompanies";
import PopularServices from "@/components/PopularServices";
import Showcase from "@/components/shared/Showcase";
import { Testimonials } from "@/components/Testimonials";

const page = () => {
	return (
		<div>
			<Showcase />
			<NeedSomething />
			<PopularServices />
			<FindBuildings />
			<PartneringCompanies />
			<BrowserCategories />
			<Testimonials />
		</div>
	);
};

export default page;
