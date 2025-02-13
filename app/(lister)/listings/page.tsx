import NoListingBox from "@/components/NoListingBox";
import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { Dot, Plus } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ListingActions } from "@/components/ListingActions";
import Link from "next/link";

const listings = [
	{
		name: "Duplex",
		location: "Lagos, Nigeria",
		amount: "$250.00",
		status: "pending",
	},
	{
		name: "Duplex",
		location: "Lagos, Nigeria",
		amount: "$250.00",
		status: "pending",
	},
	{
		name: "Duplex",
		location: "Lagos, Nigeria",
		amount: "$250.00",
		status: "failed",
	},
	{
		name: "Duplex",
		location: "Ibadan, Nigeria",
		amount: "$250.00",
		status: "failed",
	},
	{
		name: "Duplex",
		location: "Surulere, Nigeria",
		amount: "$400.00",
		status: "success",
	},
	{
		name: "Duplex",
		location: "Lagos, Nigeria",
		amount: "$250.00",
		status: "pending",
	},
];

const page = () => {
	return (
		<div className="pt-8 pb-12">
			<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
				<SectionTitle
					title={"My Listings"}
					subTitle="Lorem ipsum dolor sit amet, consectetur."
				/>
				<Button asChild size={"lg"}>
					<Link href="/create-listing">
						New listing <Plus />
					</Link>
				</Button>
			</div>
			{/* <NoListingBox /> */}

			<Table className="mt-10 bg-white rounded-md">
				<TableHeader>
					<TableRow>
						<TableHead>Space name</TableHead>
						<TableHead>Location</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead className="text-center">Status</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{listings.map((listing) => (
						<TableRow
							key={listing.name}
							className="hover:bg-green-100"
						>
							<TableCell className="font-medium">
								{listing.name}
							</TableCell>
							<TableCell>{listing.location}</TableCell>
							<TableCell>{listing.amount}</TableCell>
							<TableCell>
								<div className="flex items-center justify-center capitalize font-semibold">
									<Dot
										className={`w-8 h-8 ${
											listing.status === "pending"
												? "text-yellow-400"
												: listing.status === "success"
												? "text-green-400"
												: "text-red-400"
										}`}
									/>
									{listing.status}
								</div>
							</TableCell>
							<TableCell className="flex items-center justify-end">
								<ListingActions />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default page;
