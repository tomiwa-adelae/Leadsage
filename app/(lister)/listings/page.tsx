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
import Link from "next/link";
import { getMyListings } from "@/lib/actions/list.actions";
import { LISTING_LIMIT } from "@/constant";
import { auth } from "@clerk/nextjs";
import { getUserInfo } from "@/lib/actions/user.actions";
import { formatMoneyInput } from "@/lib/utils";
import Image from "next/image";
import { OpenDeleteModal } from "@/components/shared/OpenDeleteModal";
import { redirect } from "next/navigation";

const page = async ({ searchParams }: SearchParamProps) => {
	const { userId } = auth();

	const page = Number(searchParams?.page) || 1;
	const query = (searchParams?.query as string) || "";

	const user = await getUserInfo(userId!);

	const lists = await getMyListings({
		page,
		query,
		limit: LISTING_LIMIT,
		userId: user?._id,
	});

	if (lists.status === 400) redirect("/not-found");

	return (
		<div className="pb-12">
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
			{lists.data.length === 0 && <NoListingBox />}
			{lists.data.length !== 0 && (
				<Table className="mt-10 bg-white rounded-md">
					<TableHeader>
						<TableRow>
							<TableHead>Listing name</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead className="text-center">
								Status
							</TableHead>
							<TableHead className="text-right">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{lists.data?.map((list: any) => (
							<TableRow
								key={list?.name}
								className="hover:bg-green-100"
							>
								<TableCell className="font-medium">
									<Link href={`/apartments/${list?._id}`}>
										{list?.name}
									</Link>
								</TableCell>
								<TableCell>
									{list?.address}, {list?.city}
								</TableCell>
								<TableCell>
									₦{formatMoneyInput(list?.rentPrice)}
								</TableCell>
								<TableCell>
									<div className="flex items-center justify-center capitalize font-semibold">
										<Dot
											className={`w-8 h-8 ${
												list?.status === "pending"
													? "text-yellow-400"
													: list?.status === "success"
													? "text-green-400"
													: "text-red-400"
											}`}
										/>
										{list?.status}
									</div>
								</TableCell>
								<TableCell className="font-medium uppercase text-xs flex items-center justify-end gap-4">
									<Button
										size={"icon"}
										variant="ghost"
										asChild
										className="rounded-md"
									>
										<Link href={`/apartments/${list?._id}`}>
											<Image
												src={"/assets/icons/edit.svg"}
												alt={"Edit icon"}
												width={1000}
												height={1000}
												className="w-5 h-5"
											/>
										</Link>
									</Button>
									{/* <OpenDeleteModal
										id={list?._id}
										userId={user._id}
									/> */}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
};

export default page;
