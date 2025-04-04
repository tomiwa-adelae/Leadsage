import BrowserCategories from "@/components/BrowserCategories";
import FindBuildings from "@/components/FindBuildings";
import NeedSomething from "@/components/NeedSomething";
import { PartneringCompanies } from "@/components/PartneringCompanies";
import PopularServices from "@/components/PopularServices";
import Showcase from "@/app/(root)/(home)/components/Showcase";
import { Testimonials } from "@/components/Testimonials";
import FAQs from "@/components/shared/FAQs";

const page = () => {
	return (
		<div>
			<Showcase />
			<BrowserCategories />
			<NeedSomething />
			<PopularServices />
			<FindBuildings />
			<PartneringCompanies />
			<Testimonials />
			<FAQs />
		</div>
	);
};

export default page;
