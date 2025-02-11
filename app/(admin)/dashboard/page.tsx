import React from "react";
import DashboardBox from "../components/DashboardBox";
import { dashboardBoxesDetails } from "@/constant";

const page = () => {
	return (
		<div>
			<h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
				Dashboard
			</h1>
			<p className="font-medium text-sm mt-3">
				Lorem ipsum dolor sit amet, consectetur.
			</p>
			<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
				{dashboardBoxesDetails.map(
					(
						{ title, number, subTitle, subTitleNumber, icon },
						index
					) => (
						<DashboardBox
							key={index}
							title={title}
							subTitle={subTitle}
							subTitleNumber={subTitleNumber}
							number={number}
							icon={icon}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default page;
