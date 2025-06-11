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
			<div className="flex gap-4 items-center justify-between">
				<SectionTitle title={"My Listings"} />
				<Button asChild size={"lg"}>
					<Link href="/create-listing">
						<span className="hidden md:inline">New listing</span>{" "}
						<Plus />
					</Link>
				</Button>
			</div>
			{lists.data.length === 0 && <NoListingBox />}
			{lists.data.length !== 0 && (
				<>
					<Table className="mt-10 bg-white rounded-md hidden md:block">
						<TableHeader className="bg-red-300">
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
										₦{formatMoneyInput(list?.rent)}
									</TableCell>
									<TableCell>
										<div className="flex items-center justify-center capitalize font-semibold">
											<Dot
												className={`w-8 h-8 ${
													list?.isPublished &&
													list?.status === "pending"
														? "text-yellow-400"
														: list?.status ===
														  "success"
														? "text-green-400"
														: "text-red-400"
												} ${
													!list?.isPublished &&
													"text-yellow-400"
												}`}
											/>
											{list?.isPublished
												? list?.status
												: "Not published"}
										</div>
									</TableCell>
									<TableCell className="font-medium uppercase text-xs flex items-center justify-end gap-4">
										<Button
											size={"icon"}
											variant="ghost"
											asChild
											className="rounded-md"
										>
											<Link
												href={`/apartments/${list?._id}`}
											>
												<Image
													src={
														"/assets/icons/edit.svg"
													}
													alt={"Edit icon"}
													width={1000}
													height={1000}
													className="w-5 h-5"
												/>
											</Link>
										</Button>
										<Button
											className="rounded-md"
											size={"icon"}
											variant="ghost"
										>
											<Image
												src={"/assets/icons/delete.svg"}
												alt={"Delete icon"}
												width={1000}
												height={1000}
												className="w-5 h-5"
											/>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className="md:hidden mt-4">
						{lists.data?.map((list: any, index: string) => (
							<div
								key={index}
								className="rounded-xl bg-white p-2 flex items-center justify-start gap-2"
							>
								<Image
									src={list.images[0].src}
									alt={"Name"}
									width={1000}
									height={1000}
									className="size-[70px] object-cover rounded-xl"
								/>
								<div>
									<h3 className="font-medium text-base line-clamp-1">
										{list.name}
									</h3>
									<p className="text-muted-foreground text-sm line-clamp-1">
										{list.city}, {list?.state}
									</p>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default page;
