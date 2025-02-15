"use client";
import SectionTitle from "@/components/shared/SectionTitle";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getListings } from "@/lib/actions/list.actions";

const page = () => {
	const [user, setUser] = useState<any>();
	const [lists, setLists] = useState<[]>();

	useEffect(() => {
		const authenticatedUser = localStorage.getItem("user");
		if (!authenticatedUser) return; // Prevent errors

		const parsedUser = JSON.parse(authenticatedUser);
		setUser(parsedUser);
		console.log(parsedUser);

		const fetchLists = async () => {
			if (parsedUser?._id) {
				// Ensure user ID exists before fetching
				const lists = await getListings(parsedUser._id);
				setLists(lists);
			}
		};

		fetchLists();
	}, []);

	return (
		<div className="pb-12">
			<SectionTitle
				title={`Good morning, ${user?.firstName || ""}`}
				subTitle="Welcome to your Leadsage dashboard."
			/>
			<div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-10">
				<div className="py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] col-span-3">
					<h3 className="font-semibold text-lg">Overview</h3>
					<p className="text-gray-700 font-medium text-sm mt-2 leading-relaxed">
						Here is a quick overview of your listings.
					</p>
					<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
						<div className="rounded-md p-8 border space-y-4">
							<Image
								src={"/assets/icons/house-two.svg"}
								alt={"House icon"}
								width={1000}
								height={1000}
								className="w-[40px] h-[40px]"
							/>
							<p className="uppercase text-xs font-medium text-gray-700">
								Spaces listed
							</p>
							<h3 className="font-bold text-3xl">
								{lists?.length}
							</h3>
							<div>
								<Separator className="my-6" />
							</div>
							<div className="flex items-center justify-start gap-4">
								<Image
									src={"/assets/icons/house.svg"}
									alt={"House icon"}
									width={1000}
									height={1000}
									className="w-[20px] h-[20px]"
								/>
								<p className="font-medium text-xs leading-loose uppercase">
									{lists?.length} Apartment Available
								</p>
							</div>
						</div>
						<div className="rounded-md p-8 border space-y-3">
							<p className="uppercase text-xs text-gray-700">
								Earnings
							</p>
							<h2 className="text-3xl font-bold">₦0.00</h2>
							<p className="font-medium text-xs uppercase">
								This month
							</p>
							<div>
								<Separator className="my-4" />
							</div>
							<p className="uppercase text-xs text-gray-700">
								Active Subscription
							</p>
							<h2 className="text-3xl font-bold">0</h2>
							<p className="font-medium uppercase text-xs">
								This month
							</p>
						</div>
					</div>
				</div>
				<div className="py-10 px-6 rounded-md bg-white col-span-3 md:col-span-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-semibold text-lg">Help Centre</h3>
					<p className="text-gray-700 font-medium text-sm mt-2 leading-relaxed">
						Need help? Our support team has you covered
					</p>
					<div className="mt-6 grid gap-4">
						<Link
							href="/about/#faqs"
							className="border rounded-md p-4 flex items-center justify-start gap-4"
						>
							<Image
								src={"/assets/icons/shield.svg"}
								alt={"Shield icon"}
								width={1000}
								height={1000}
								className="w-[30px] h-[30px]"
							/>
							<h5 className="font-semibold text-sm">
								Read our FAQs
							</h5>
						</Link>
						<Link
							href="/contact"
							className="border rounded-md p-4 flex items-center justify-start gap-4"
						>
							<Image
								src={"/assets/icons/email.svg"}
								alt={"Email icon"}
								width={1000}
								height={1000}
								className="w-[30px] h-[30px]"
							/>
							<h5 className="font-semibold text-sm">
								Contact Leadsage Support
							</h5>
						</Link>
					</div>
				</div>
			</div>
			<div className="mt-10 py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] col-span-2">
				<h3 className="font-semibold text-lg">Recent Bookings</h3>
				<p className="text-gray-700 font-medium text-sm mt-2 leading-relaxed">
					Here’a a breakdown of your recent bookings
				</p>
				<div className="border rounded-lg mt-6 pb-8 pt-2">
					<Table className="bg-white rounded-md">
						<TableHeader>
							<TableRow>
								<TableHead>Tenant</TableHead>
								<TableHead>Email address</TableHead>
								<TableHead>Phone number</TableHead>
								<TableHead className="text-right">
									Booking date
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody></TableBody>
					</Table>
					<p className="italic text-center pt-8 text-sm text-gray-700">
						No recent bookings
					</p>
				</div>
			</div>
		</div>
	);
};

export default page;
