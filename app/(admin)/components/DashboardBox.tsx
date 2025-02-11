import Image from "next/image";
import React from "react";

const DashboardBox = ({
	icon,
	title,
	subTitle,
	subTitleNumber,
	number,
}: {
	icon: string;
	subTitle: string;
	subTitleNumber: number;
	title: string;
	number: number | string;
}) => {
	return (
		<div className="bg-white rounded-md py-9 px-8 flex items-center justify-between gap-4">
			<div className="space-y-4">
				<h5 className="font-normal text-sm text-gray-400">{title}</h5>
				<h4 className="font-semibold text-4xl">{number}</h4>
				<p className="text-sm">
					<span className="text-green-400">{subTitleNumber}</span>{" "}
					{subTitle}
				</p>
			</div>
			<Image
				src={icon}
				alt={title}
				width={1000}
				height={1000}
				className="w-[40px] h-[40px]"
			/>
		</div>
	);
};

export default DashboardBox;
