"use client";
import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { formatMoneyInput } from "@/lib/utils";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { amenities } from "@/constant";
import { IAmenity } from "@/lib/database/models/list.model";
import { toast } from "@/hooks/use-toast";
import { bookListing } from "@/lib/actions/booking.actions";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { NairaIcon } from "@/components/shared/NairaIcon";
import { Button } from "@/components/ui/button";
import { AmenityBox } from "@/components/shared/AmenityBox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { suspendListing, unSuspendListing } from "@/lib/actions/list.actions";

const ApartmentDetails = ({
	rent,
	securityDeposit,
	petPolicy,
	smokingPolicy,
	description,
	amenities,
	listId,
	userId,
	status,
}: {
	rent: string;
	securityDeposit: string;
	description: string;
	petPolicy: boolean;
	smokingPolicy: boolean;
	amenities: any;
	listId: string;
	userId: string;
	status: string;
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const [openSuspendModal, setOpenSuspendModal] = useState(false);
	const [openUnSuspendModal, setOpenUnSuspendModal] = useState(false);

	const suspendHandler = async () => {
		try {
			setLoading(true);
			const res = await suspendListing({ listingId: listId, userId });
			toast({
				title: "Your listing has been successfully suspended",
			});
			setOpenSuspendModal(false);
		} catch (error) {
			toast({
				title: "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	const unSuspendHandler = async () => {
		try {
			setLoading(true);
			const res = await unSuspendListing({ listingId: listId, userId });
			toast({
				title: "Your listing is active now",
			});
			setOpenUnSuspendModal(false);
		} catch (error) {
			toast({
				title: "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-8 gap-8 lg:gap-4 mt-8">
			<div className="col-span-7 lg:col-span-5">
				<div>
					<p className="text-base mt-2 leading-relaxed">
						{description}
					</p>
				</div>
				<Separator className="my-4 md:my-6" />
				<div>
					<h4 className="text-xl md:text-2xl font-medium">
						Amenities
					</h4>
					<div className="grid md:grid-cols-2 gap-6 mt-4">
						{amenities?.map(({ name }: any, index: any) => {
							return (
								<AmenityBox
									key={index}
									name={name!}
									icon={Check}
								/>
							);
						})}
					</div>
				</div>
				<Separator className="my-4 md:my-6" />
				<div>
					<h4 className="text-xl md:text-2xl font-medium">
						Policies
					</h4>
					<div className="grid gap-6 mt-4 text-sm md:text-base text-muted-foreground">
						<p>
							<Check className="mr-2 size-5 inline-block" />
							Are pets allowed?{" "}
							<span className="text-black">
								{petPolicy === true ? "yes" : "no"}
							</span>
						</p>
						<p>
							<Check className="mr-2 size-5 inline-block" />
							Is smoking allowed?{" "}
							<span className="text-black">
								{smokingPolicy === true ? "yes" : "no"}
							</span>
						</p>
					</div>
				</div>
				{/* <Separator className="my-4 md:my-6" /> */}
			</div>
			<div className="col-span-6 lg:col-span-3">
				<div className="sticky top-25 rounded-lg p-4 lg:p-8 border shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
					<h4 className="text-xl md:text-2xl font-medium">
						<NairaIcon />
						{formatMoneyInput(rent)}{" "}
						<span className="text-muted-foreground text-sm">
							/ year
						</span>
					</h4>
					<div className="grid gap-6 text-sm md:text-base text-muted-foreground mt-4">
						<p className="flex items-center justify-between gap-4">
							<span>Rent</span>
							<span className="text-black">
								<NairaIcon />
								{formatMoneyInput(rent)} yearly
							</span>
						</p>
						<p className="flex items-center justify-between gap-4">
							<span>Security deposit</span>
							<span className="text-black">
								<NairaIcon />
								{formatMoneyInput(securityDeposit)}
							</span>
						</p>
						<Separator />
						<p className="flex items-center justify-between gap-4">
							<span>Total</span>
							<span className="text-black">
								<NairaIcon />
								{formatMoneyInput(
									Number(rent) + Number(securityDeposit)
								)}
							</span>
						</p>
					</div>
					<div className="mt-4 space-y-2">
						{status === "completed" || status === "active" ? (
							<Button
								onClick={() => setOpenSuspendModal(true)}
								className="w-full"
								size="md"
								disabled={loading}
								variant={"destructive"}
							>
								{loading ? (
									<Loader2 className="size-4 animate-spin" />
								) : (
									"Suspend listing"
								)}
							</Button>
						) : (
							<Button
								onClick={() => setOpenUnSuspendModal(true)}
								className="w-full"
								size="md"
								disabled={loading}
							>
								{loading ? (
									<Loader2 className="size-4 animate-spin" />
								) : (
									"Unsuspend listing"
								)}
							</Button>
						)}
						{/* <Button
							className="w-full"
							variant={"outline"}
							size="md"
							asChild
						>
							<Link href="/apartments">
								Not what you're looking for? Click here
							</Link>
						</Button> */}
					</div>
				</div>
			</div>
			{openSuspendModal && (
				<div>
					<Dialog open={openSuspendModal}>
						<form>
							<DialogContent className="sm:max-w-[425px] p-0">
								<div className="border-b py-4 text-center md:block">
									<p className="font-semibold text-lg">
										Suspend this listing
									</p>
								</div>
								<div className="text-center py-6 mx-4">
									<p className="font-semibold text-sm">
										Are you sure you want to suspend this
										listing? Once you do, no one would see
										the listing again
									</p>
								</div>
								<div className="px-6 py-4 flex items-center justify-between gap-4 border-t">
									<Button
										onClick={() => {
											setOpenSuspendModal(false);
										}}
										size="md"
										variant={"ghost"}
										disabled={loading}
									>
										Cancel
									</Button>
									<Button
										disabled={loading}
										onClick={suspendHandler}
										size="md"
										variant="destructive"
									>
										{loading ? (
											<Loader2 className="animate-spin size-4" />
										) : (
											"Yes, suspend it"
										)}
									</Button>
								</div>
							</DialogContent>
						</form>
					</Dialog>
				</div>
			)}
			{openUnSuspendModal && (
				<div>
					<Dialog open={openUnSuspendModal}>
						<form>
							<DialogContent className="sm:max-w-[425px] p-0">
								<div className="border-b py-4 text-center md:block">
									<p className="font-semibold text-lg">
										Unsuspend this listing
									</p>
								</div>
								<div className="text-center py-6 mx-4">
									<p className="font-semibold text-sm">
										Are you sure you want to unsuspend this
										listing? Once you do, people would see
										the listing again
									</p>
								</div>
								<div className="px-6 py-4 flex items-center justify-between gap-4 border-t">
									<Button
										onClick={() => {
											setOpenUnSuspendModal(false);
										}}
										size="md"
										variant={"ghost"}
										disabled={loading}
									>
										Cancel
									</Button>
									<Button
										disabled={loading}
										onClick={unSuspendHandler}
										size="md"
									>
										{loading ? (
											<Loader2 className="animate-spin size-4" />
										) : (
											"Yes, unsuspend it"
										)}
									</Button>
								</div>
							</DialogContent>
						</form>
					</Dialog>
				</div>
			)}
		</div>
	);
};

export default ApartmentDetails;
