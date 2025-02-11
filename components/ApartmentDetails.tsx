import { Dot } from "lucide-react";
import { Separator } from "./ui/separator";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React from "react";
import { apartmentDurations } from "@/constant";
import { Button } from "./ui/button";
import Link from "next/link";

const ApartmentDetails = () => {
	const features = [
		"4 bed(s)",
		"Shared space",
		"Ensuite bathroom",
		"24 hrs power",
		"Furnished",
	];
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 py-8">
			<div className="lg:col-span-3 space-y-4 border-b">
				<h1 className="text-3xl font-bold leading-relaxed text-green-400">
					HUMMINGBIRD 9D - HUMMINGBIRD 9
				</h1>
				<p className="text-gray-700 text-sm uppercase font-medium">
					Lekki , Lagos, nigeria
				</p>
				<ul className="flex items-center justify-start flex-wrap text-sm text-gray-700 gap-4 pb-4">
					{features.map((feature, index) => (
						<React.Fragment key={index}>
							<li>{feature}</li>
							{index !== features.length - 1 && (
								<Dot className="inline" />
							)}
						</React.Fragment>
					))}
				</ul>
				<div>
					<Separator />
				</div>
				<div className="font-semibold text-sm flex gap-8 py-2">
					<p className="text-gray-700">APARTMENT AVAILABLE FROM</p>
					<p className="text-green-400">07 February 2025</p>
				</div>
				<div>
					<Separator />
				</div>
				<p className="text-sm py-4 leading-loose">
					A cozy, furnished shared apartment in prime water gardens
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Quae velit dolorem similique architecto id. Debitis
					praesentium aut architecto voluptatibus expedita et, nihil
					reiciendis aspernatur molestias ipsa ab magnam repellendus
					esse necessitatibus nobis maxime ut, amet asperiores sit.
					Minus cum saepe facere voluptas accusantium eaque animi
					sunt, laudantium eum veritatis provident?
				</p>
			</div>
			<div className="col-span-2 border rounded-xl p-8">
				<h5 className="font-semibold text-sm">Rent price</h5>
				<h2 className="text-2xl font-semibold my-2 text-green-400">
					NGN 240,000.05{" "}
					<small className="text-sm font-medium text-gray-700">
						/ Month
					</small>
				</h2>
				<div className="mt-4">
					<small className="text-semibold text-xs uppercase mb-2 inline-block">
						Duration
					</small>
					<Select>
						<SelectTrigger className="capitalize border-green-400 h-14">
							<SelectValue
								className="capitalize"
								placeholder="Select duration"
							/>
						</SelectTrigger>
						<SelectContent>
							{apartmentDurations.map((duration, index) => (
								<SelectItem
									key={index}
									className="capitalize"
									value={duration}
								>
									{duration}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-6 mt-8 text-xs">
					<div className="flex gap-4 justify-between items-center">
						<p className="font-semibold text-green-400">Rent</p>
						<p className="text-gray-700 font-medium text-right">
							NGN 240,000.05 monthly
						</p>
					</div>
					<div className="flex gap-4 justify-between items-center">
						<p className="font-semibold text-green-400">
							Service Charge
						</p>
						<p className="text-gray-700 font-medium text-right">
							NGN 0
						</p>
					</div>
					<div className="flex gap-4 justify-between items-center">
						<p className="font-semibold text-green-400">
							Refundable security deposit
						</p>
						<p className="text-gray-700 font-medium text-right">
							NGN 50,000
						</p>
					</div>
					<div className="flex gap-4 justify-between items-center">
						<p className="font-semibold text-green-400">
							One-time booking fee security deposit
						</p>
						<p className="text-gray-700 font-medium text-right">
							NGN 50,000
						</p>
					</div>
					<div className="flex gap-4 justify-between items-center">
						<p className="font-semibold text-green-400">VAT</p>
						<p className="text-gray-700 font-medium text-right">
							NGN 3,750
						</p>
					</div>
					<Separator />
					<div className="flex gap-4 justify-between items-center">
						<p className="font-semibold text-green-400">Total</p>
						<p className="text-gray-700 text-lg font-bold text-right">
							NGN 643,750
						</p>
					</div>
					<div className="grid gap-4">
						<Button size={"md"} className="w-full" asChild>
							<Link href="/login">Login</Link>
						</Button>
						<Button
							size={"md"}
							className="w-full"
							variant={"outline"}
							asChild
						>
							<Link href="/">
								Not what you're looking for? Click here
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApartmentDetails;
