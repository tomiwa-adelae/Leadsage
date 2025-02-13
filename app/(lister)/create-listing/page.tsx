import { CreateApartmentForm } from "@/components/forms/CreateApartmentForm";
import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import UploadApartmentImages from "@/components/UploadApartmentImages";
import { MoveUpRight } from "lucide-react";
import React from "react";

const page = () => {
	return (
		<div className="pb-12">
			<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
				<SectionTitle
					title="Create Apartment"
					subTitle="Lorem ipsum dolor sit amet, consectetur."
				/>
				<Button size={"lg"}>
					Save & Publish <MoveUpRight />
				</Button>
			</div>
			<CreateApartmentForm />
			<UploadApartmentImages />
		</div>
	);
};

export default page;
