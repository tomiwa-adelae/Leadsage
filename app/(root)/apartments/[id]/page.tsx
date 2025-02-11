import ApartmentDetails from "@/components/ApartmentDetails";
import { ApartmentImages } from "@/components/ApartmentImages";
import Header from "@/components/shared/Header";
import { images } from "@/constant";
import dynamic from "next/dynamic";

const ApartmentLocation = dynamic(
	() => import("@/components/ApartmentLocation.tsx"),
	{
		ssr: false,
	}
);

const page = () => {
	return (
		<div>
			<Header color="black" />
			<div className="container">
				<ApartmentImages images={images} />
				<ApartmentDetails />
				<ApartmentLocation />
			</div>
		</div>
	);
};

export default page;
