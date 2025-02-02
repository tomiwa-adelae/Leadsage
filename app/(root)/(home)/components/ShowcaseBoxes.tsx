import { House, ShieldCheck } from "lucide-react";
import Image from "next/image";

const ShowcaseBoxes = () => {
	return (
		<div>
			<div className="rounded-2xl bg-white p-4 text-black inline-flex items-center justify-start gap-4 absolute top-[-8%] left-[20%] translate-x-[-20%] translate-y-[8%] animate-bounce">
				<div className="rounded-full p-3 bg-[#E6F5EB] inline-block text-green-400">
					<House absoluteStrokeWidth className="w-6 h-6" />
				</div>
				<div className="space-y-1">
					<h5 className="font-semibold text-sm text-gray-900">
						Proof of Quality
					</h5>
					<p className="text-xs text-gray-700">
						We prioritize excellence & reliability
					</p>
				</div>
			</div>
			<div className="rounded-2xl bg-white p-4 text-black inline-flex items-center justify-start gap-4 absolute top-[45%] right-[-5%] translate-x-[5%] translate-y-[-45%] animate-bounce">
				<div className="rounded-full p-3 bg-[#E6F5EB] inline-block text-green-400">
					<ShieldCheck absoluteStrokeWidth className="w-6 h-6" />
				</div>
				<div className="space-y-1">
					<h5 className="font-semibold text-sm text-gray-900">
						Safe and secure
					</h5>
					<p className="text-xs text-gray-700">
						Your privacy is our top concerns.
					</p>
				</div>
			</div>
			<div className="rounded-2xl bg-white p-4 text-black inline-flex items-center justify-start gap-4 absolute bottom-[-2%] left-[-10%] translate-x-[10%] translate-y-[2%] animate-bounce">
				<h3 className="font-semibold text-gray-900 text-sm">
					50+ Happy Customers
				</h3>
				<Image
					src={"/assets/images/icons/people.webp"}
					alt={"Happy Customer"}
					width={1000}
					height={1000}
					className="w-auto h-auto"
				/>
			</div>
		</div>
	);
};

export default ShowcaseBoxes;
