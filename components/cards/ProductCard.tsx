import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";

const ProductCard = () => {
	return (
		<div className="inline-block border rounded-xl overflow-hidden cursor-pointer group">
			<div className="overflow-hidden">
				<Image
					src={"/assets/images/services-1.png"}
					alt={"Service one"}
					width={1000}
					height={1000}
					className="group-hover:scale-[1.1] w-full h-[300px] object-cover transition ease-out"
				/>
			</div>
			<div className="px-6 pt-6 pb-10 space-y-5">
				<h4 className="text-gray-900 text-lg font-semibold hover:text-green-400 transition ease-in-out">
					3 bedroom apartment
				</h4>
				<p className="text-gray-700 text-sm">
					<MapPin className="inline-block w-4 h-4 mr-2" />
					Gbagada
				</p>
				<Separator />
				<p className="text-gray-700 text-base">
					From <b className="text-gray-900">&#8358;305,000</b>{" "}
					annually
				</p>
			</div>
		</div>
	);
};

export default ProductCard;
