import NeedSomething from "@/components/NeedSomething";
import PopularServices from "@/components/PopularServices";
import Showcase from "@/components/shared/Showcase";

const page = () => {
	return (
		<div>
			<Showcase />
			<NeedSomething />
			<PopularServices />
		</div>
	);
};

export default page;
