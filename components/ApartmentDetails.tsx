// "use client";
// import { Dot } from "lucide-react";
// import { Separator } from "./ui/separator";
// import {
// 	Select,
// 	SelectContent,
// 	SelectGroup,
// 	SelectItem,
// 	SelectLabel,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import React, { useState } from "react";
// import { apartmentDurations } from "@/constant";
// import { Button } from "./ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import { OpenEditModal } from "./shared/OpenEditModal";
// import { formatDate, formatMoneyInput } from "@/lib/utils";
// import { OpenDeleteModal } from "./shared/OpenDeleteModal";
// import { OpenPublishModal } from "./shared/OpenPublishModal";
// import { ConfirmBookListingModal } from "./shared/ConfirmBookListingModal";
// import { EditUserDetailsModal } from "./shared/EditUserDetailsModal";

// const ApartmentDetails = ({
// 	details,
// 	isRenter,
// 	user,
// 	isComplete,
// }: {
// 	details: any;
// 	isRenter: boolean;
// 	user: any;
// 	isComplete: boolean;
// }) => {
// 	const [openModal, setOpenModal] = useState(false);
// 	const [editField, setEditField] = useState({ name: "", value: "" });
// 	const [isNumber, setIsNumber] = useState(false);
// 	const [isDate, setIsDate] = React.useState<boolean>(false);
// 	const [openDeleteModal, setOpenDeleteModal] =
// 		React.useState<boolean>(false);
// 	const [openPublishModal, setOpenPublishModal] =
// 		React.useState<boolean>(false);
// 	const [openConfirmListing, setOpenConfirmListing] =
// 		React.useState<boolean>(false);
// 	const [openEditDetails, setOpenEditDetails] =
// 		React.useState<boolean>(false);

// 	const handleOpenModal = (
// 		fieldName: string,
// 		fieldValue: string | { address: string; city: string; state: string }
// 	) => {
// 		// @ts-ignore
// 		setEditField({ name: fieldName, value: fieldValue });
// 		setOpenModal(true);
// 	};

// 	return (
// 		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 py-4 md:py-8">
// 			<div className="col-span-2 lg:col-span-3 space-y-4">
// 				<h1 className="text-4xl font-medium leading-relaxed text-green-400 flex items-center justify-start gap-4">
// 					{details?.name}
// 					{isRenter && (
// 						<Image
// 							src={"/assets/icons/edit.svg"}
// 							alt={"Edit Icon"}
// 							width={24}
// 							height={24}
// 							className="cursor-pointer"
// 							onClick={() =>
// 								handleOpenModal("name", details?.name)
// 							}
// 						/>
// 					)}
// 				</h1>
// 				<div className="text-base space-y-3 text-muted-foreground">
// 					<p className="flex items-center justify-start gap-4 leading-loose">
// 						Address: {details?.address}
// 						{isRenter && (
// 							<Image
// 								src={"/assets/icons/edit.svg"}
// 								alt={"Edit Icon"}
// 								width={24}
// 								height={24}
// 								className="cursor-pointer"
// 								onClick={() =>
// 									handleOpenModal("address", details?.address)
// 								}
// 							/>
// 						)}
// 					</p>
// 					<p className="flex items-center justify-start gap-4 leading-loose">
// 						City: {details?.city}
// 						{isRenter && (
// 							<Image
// 								src={"/assets/icons/edit.svg"}
// 								alt={"Edit Icon"}
// 								width={24}
// 								height={24}
// 								className="cursor-pointer"
// 								onClick={() =>
// 									handleOpenModal("city", details?.city)
// 								}
// 							/>
// 						)}
// 					</p>
// 					<p className="flex items-center justify-start gap-4 leading-loose">
// 						State: {details?.state}
// 						{isRenter && (
// 							<Image
// 								src={"/assets/icons/edit.svg"}
// 								alt={"Edit Icon"}
// 								width={24}
// 								height={24}
// 								className="cursor-pointer"
// 								onClick={() =>
// 									handleOpenModal("state", details?.state)
// 								}
// 							/>
// 						)}
// 					</p>
// 				</div>
// 				<div>
// 					<Separator />
// 				</div>
// 				<div className="font-medium uppercase text-base flex items-center justify-start gap-2 py-2">
// 					<p className="text-muted-foreground">
// 						Apartment Available from:
// 					</p>
// 					<p className="text-green-400 flex items-center justify-start gap-4">
// 						{details?.availabilityDate &&
// 							formatDate(details?.availabilityDate)}{" "}
// 						{isRenter && (
// 							<Image
// 								src={"/assets/icons/edit.svg"}
// 								alt={"Edit Icon"}
// 								width={24}
// 								height={24}
// 								className="cursor-pointer"
// 								onClick={() => {
// 									handleOpenModal(
// 										"bathroomNumber",
// 										details?.bathroomNumber
// 									);
// 									setIsDate(true);
// 								}}
// 							/>
// 						)}
// 					</p>
// 				</div>
// 				<div>
// 					<Separator />
// 				</div>
// 				<div className="font-medium uppercase text-base flex items-center justify-start gap-2 py-2">
// 					<p className="text-muted-foreground">
// 						Number of bedrooms Available:
// 					</p>
// 					<p className="text-green-400 flex items-center justify-start gap-4">
// 						{details?.bedroomNumber &&
// 							formatDate(details?.bedroomNumber)}{" "}
// 						{isRenter && (
// 							<Image
// 								src={"/assets/icons/edit.svg"}
// 								alt={"Edit Icon"}
// 								width={24}
// 								height={24}
// 								className="cursor-pointer"
// 								onClick={() => {
// 									handleOpenModal(
// 										"bedroomNumber",
// 										details?.bedroomNumber
// 									);
// 									setIsDate(true);
// 								}}
// 							/>
// 						)}
// 					</p>
// 				</div>
// 				<div>
// 					<Separator />
// 				</div>
// 				<div className="font-medium uppercase text-base flex items-center justify-start gap-2 py-2">
// 					<p className="text-muted-foreground">
// 						Number of bathrooms Available:
// 					</p>
// 					<p className="text-green-400 flex items-center justify-start gap-4">
// 						{details?.bathroomNumber &&
// 							formatDate(details?.bathroomNumber)}{" "}
// 						{isRenter && (
// 							<Image
// 								src={"/assets/icons/edit.svg"}
// 								alt={"Edit Icon"}
// 								width={24}
// 								height={24}
// 								className="cursor-pointer"
// 								onClick={() => {
// 									handleOpenModal(
// 										"bathroomNumber",
// 										details?.bathroomNumber
// 									);
// 									setIsDate(true);
// 								}}
// 							/>
// 						)}
// 					</p>
// 				</div>
// 				<div>
// 					<Separator />
// 				</div>
// 				<p className="text-base text-muted-foreground py-4 flex items-start justify-start gap-4">
// 					{details?.description}
// 					{isRenter && (
// 						<Image
// 							src={"/assets/icons/edit.svg"}
// 							alt={"Edit Icon"}
// 							width={24}
// 							height={24}
// 							className="cursor-pointer"
// 							onClick={() =>
// 								handleOpenModal(
// 									"description",
// 									details?.description
// 								)
// 							}
// 						/>
// 					)}
// 				</p>
// 			</div>
// 			<div className="col-span-2 border rounded-xl p-8">
// 				<h5 className="font-medium text-base uppercase text-muted-foreground">
// 					Rent price
// 				</h5>
// 				<h2 className="text-2xl font-semibold my-2 text-green-400 flex items-center justify-start gap-2">
// 					{isRenter && (
// 						<Image
// 							src={"/assets/icons/edit.svg"}
// 							alt={"Edit Icon"}
// 							width={24}
// 							height={24}
// 							className="cursor-pointer"
// 							onClick={() => {
// 								handleOpenModal(
// 									"rent",
// 									details?.rent
// 								);
// 								setIsNumber(true);
// 							}}
// 						/>
// 					)}
// 					<div>
// 						NGN{" "}
// 						{details?.rent &&
// 							formatMoneyInput(details?.rent)}{" "}
// 						<small className="text-base font-medium text-muted-foreground">
// 							/ Year
// 						</small>
// 					</div>
// 				</h2>
// 				<div className="space-y-6 mt-8 text-base">
// 					<Separator />
// 					<div className="flex gap-4 justify-between items-center">
// 						<p className="font-medium text-muted-foreground uppercase">
// 							Total
// 						</p>
// 						<p className="text-green-400 text-2xl font-semibold text-right">
// 							NGN{" "}
// 							{details?.rent &&
// 								formatMoneyInput(details?.rent)}
// 						</p>
// 					</div>
// 					<div className="grid gap-4">
// 						{user ? (
// 							user.isRenter || user.isAdmin ? (
// 								<>
// 									<Button
// 										disabled={!isComplete}
// 										size={"md"}
// 										className="w-full"
// 										onClick={() =>
// 											setOpenPublishModal(true)
// 										}
// 										variant={
// 											details?.isPublished
// 												? "warning"
// 												: "default"
// 										}
// 									>
// 										{details?.isPublished
// 											? "unpublish listing"
// 											: "Publish listing"}
// 									</Button>
// 									<Button
// 										variant={"destructive"}
// 										size={"md"}
// 										className="w-full"
// 										onClick={() => {
// 											setOpenDeleteModal(true);
// 										}}
// 									>
// 										Delete Listing
// 									</Button>
// 								</>
// 							) : (
// 								<Button
// 									onClick={() => {
// 										if (
// 											!user?.phoneNumber ||
// 											!user?.address ||
// 											!user?.city ||
// 											!user?.state
// 										) {
// 											setOpenEditDetails(true);
// 										} else {
// 											setOpenConfirmListing(true);
// 										}
// 									}}
// 									size={"md"}
// 									className="w-full"
// 								>
// 									Book space
// 								</Button>
// 							)
// 						) : (
// 							<Button size={"md"} className="w-full" asChild>
// 								<Link href="/login">Login</Link>
// 							</Button>
// 						)}
// 						{!user.isRenter && (
// 							<Button
// 								size={"md"}
// 								className="w-full"
// 								variant={"outline"}
// 								asChild
// 							>
// 								<Link href="/apartments">
// 									Not what you're looking for? Click here
// 								</Link>
// 							</Button>
// 						)}
// 					</div>
// 				</div>
// 			</div>

// 			{openModal && (
// 				<OpenEditModal
// 					id={details?._id}
// 					open={openModal}
// 					closeModal={() => {
// 						setOpenModal(false);
// 						setIsDate(false);
// 						setIsNumber(false);
// 					}}
// 					type={editField.name}
// 					editValue={editField.value}
// 					userId={details?.user}
// 					isNumber={isNumber}
// 					isDate={isDate}
// 				/>
// 			)}

// 			{openDeleteModal && (
// 				<OpenDeleteModal
// 					id={details?._id}
// 					open={openDeleteModal}
// 					closeModal={() => {
// 						setOpenDeleteModal(false);
// 					}}
// 					userId={details?.user}
// 				/>
// 			)}

// 			{openPublishModal && (
// 				<OpenPublishModal
// 					id={details?._id}
// 					open={openPublishModal}
// 					closeModal={() => {
// 						setOpenPublishModal(false);
// 					}}
// 					userId={details?.user}
// 				/>
// 			)}

// 			{openConfirmListing && (
// 				<ConfirmBookListingModal
// 					id={details?._id}
// 					open={openConfirmListing}
// 					closeModal={() => {
// 						setOpenConfirmListing(false);
// 					}}
// 					userId={user?._id}
// 				/>
// 			)}

// 			{openEditDetails && (
// 				<EditUserDetailsModal
// 					user={user}
// 					open={openEditDetails}
// 					closeModal={() => {
// 						setOpenEditDetails(false);
// 						setOpenConfirmListing(true);
// 					}}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default ApartmentDetails;
"use client";
import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { NairaIcon } from "./shared/NairaIcon";
import { Check, Loader2 } from "lucide-react";
import { formatMoneyInput } from "@/lib/utils";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { amenities } from "@/constant";
import { IAmenity } from "@/lib/database/models/list.model";
import { AmenityBox } from "./shared/AmenityBox";
import { toast } from "@/hooks/use-toast";
import { bookListing } from "@/lib/actions/booking.actions";
import { useRouter } from "next/navigation";

const ApartmentDetails = ({
	rent,
	securityDeposit,
	petPolicy,
	smokingPolicy,
	description,
	amenities,
	listId,
	userId,
}: {
	rent: string;
	securityDeposit: string;
	description: string;
	petPolicy: boolean;
	smokingPolicy: boolean;
	amenities: any;
	listId: string;
	userId: string;
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const handleBooking = async () => {
		try {
			setLoading(true);
			const res = await bookListing({ listing: listId, user: userId });
			toast({
				title: "Your booking was successful. You would receive a mail soon and be redirected now",
			});
			router.push(`/my-bookings`);
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
						<p className="flex items-center justify-between gap-4">
							<span>One-time Legal Fee</span>
							<span className="text-black">₦0</span>
						</p>
						<p className="flex items-center justify-between gap-4">
							<span>One-time Agency Fee</span>
							<span className="text-black">₦0</span>
						</p>
						<p className="flex items-center justify-between gap-4">
							<span>VAT</span>
							<span className="text-black">₦0</span>
						</p>
						<Separator />
						<p className="flex items-center justify-between gap-4">
							<span>Total</span>
							<span className="text-black">₦669,500</span>
						</p>
					</div>
					<div className="mt-4 space-y-2">
						<SignedOut>
							<Button className="w-full" size="md">
								Login & Proceed
							</Button>
						</SignedOut>
						<SignedIn>
							<Button
								onClick={handleBooking}
								className="w-full"
								size="md"
								disabled={loading}
							>
								{loading ? (
									<Loader2 className="size-4 animate-spin" />
								) : (
									"Book space"
								)}
							</Button>
						</SignedIn>
						<Button
							className="w-full"
							variant={"outline"}
							size="md"
							asChild
						>
							<Link href="/apartments">
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
