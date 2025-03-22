"use client";
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
import React, { useState } from "react";
import { apartmentDurations } from "@/constant";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { OpenEditModal } from "./shared/OpenEditModal";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import { OpenDeleteModal } from "./shared/OpenDeleteModal";
import { OpenPublishModal } from "./shared/OpenPublishModal";
import { ConfirmBookListingModal } from "./shared/ConfirmBookListingModal";
import { EditUserDetailsModal } from "./shared/EditUserDetailsModal";

const ApartmentDetails = ({
	details,
	isRenter,
	user,
	isComplete,
}: {
	details: any;
	isRenter: boolean;
	user: any;
	isComplete: boolean;
}) => {
	const [openModal, setOpenModal] = useState(false);
	const [editField, setEditField] = useState({ name: "", value: "" });
	const [isNumber, setIsNumber] = useState(false);
	const [isDate, setIsDate] = React.useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] =
		React.useState<boolean>(false);
	const [openPublishModal, setOpenPublishModal] =
		React.useState<boolean>(false);
	const [openConfirmListing, setOpenConfirmListing] =
		React.useState<boolean>(false);
	const [openEditDetails, setOpenEditDetails] =
		React.useState<boolean>(false);

	const handleOpenModal = (
		fieldName: string,
		fieldValue: string | { address: string; city: string; state: string }
	) => {
		// @ts-ignore
		setEditField({ name: fieldName, value: fieldValue });
		setOpenModal(true);
	};

	const features = [
		"4 bed(s)",
		"Shared space",
		"Ensuite bathroom",
		"24 hrs power",
		"Furnished",
	];
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 py-8">
			<div className="col-span-2 lg:col-span-3 space-y-4 border-b">
				<h1 className="text-3xl font-bold leading-relaxed text-green-400 flex items-center justify-start gap-4">
					{details?.name}
					{isRenter && (
						<Image
							src={"/assets/icons/edit.svg"}
							alt={"Edit Icon"}
							width={24}
							height={24}
							className="cursor-pointer"
							onClick={() =>
								handleOpenModal("name", details?.name)
							}
						/>
					)}
				</h1>
				<div className="text-xs space-y-4 text-gray-700 font-medium">
					<p className="flex items-center justify-start gap-4 leading-loose">
						Address: {details?.address}
						{isRenter && (
							<Image
								src={"/assets/icons/edit.svg"}
								alt={"Edit Icon"}
								width={24}
								height={24}
								className="cursor-pointer"
								onClick={() =>
									handleOpenModal("address", details?.address)
								}
							/>
						)}
					</p>
					<p className="flex items-center justify-start gap-4 leading-loose">
						City: {details?.city}
						{isRenter && (
							<Image
								src={"/assets/icons/edit.svg"}
								alt={"Edit Icon"}
								width={24}
								height={24}
								className="cursor-pointer"
								onClick={() =>
									handleOpenModal("city", details?.city)
								}
							/>
						)}
					</p>
					<p className="flex items-center justify-start gap-4 leading-loose">
						State: {details?.state}
						{isRenter && (
							<Image
								src={"/assets/icons/edit.svg"}
								alt={"Edit Icon"}
								width={24}
								height={24}
								className="cursor-pointer"
								onClick={() =>
									handleOpenModal("state", details?.state)
								}
							/>
						)}
					</p>
				</div>
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
				<div className="font-semibold text-sm flex items-center justify-start gap-2 py-2">
					<p className="text-gray-700">APARTMENT AVAILABLE FROM:</p>
					<p className="text-green-400 flex items-center justify-start gap-4">
						{details?.availabilityDate &&
							formatDate(details?.availabilityDate)}{" "}
						{isRenter && (
							<Image
								src={"/assets/icons/edit.svg"}
								alt={"Edit Icon"}
								width={24}
								height={24}
								className="cursor-pointer"
								onClick={() => {
									handleOpenModal(
										"availabilityDate",
										details?.availabilityDate
									);
									setIsDate(true);
								}}
							/>
						)}
					</p>
				</div>
				<div>
					<Separator />
				</div>
				<p className="text-sm py-4 leading-loose flex items-start justify-start gap-4">
					{details?.description}
					{isRenter && (
						<Image
							src={"/assets/icons/edit.svg"}
							alt={"Edit Icon"}
							width={24}
							height={24}
							className="cursor-pointer"
							onClick={() =>
								handleOpenModal(
									"description",
									details?.description
								)
							}
						/>
					)}
				</p>
			</div>
			<div className="col-span-2 border rounded-xl p-8">
				<h5 className="font-semibold text-sm">Rent price</h5>
				<h2 className="text-2xl font-semibold my-2 text-green-400 flex items-center justify-start gap-2">
					{isRenter && (
						<Image
							src={"/assets/icons/edit.svg"}
							alt={"Edit Icon"}
							width={24}
							height={24}
							className="cursor-pointer"
							onClick={() => {
								handleOpenModal(
									"rentPrice",
									details?.rentPrice
								);
								setIsNumber(true);
							}}
						/>
					)}
					<div>
						NGN{" "}
						{details?.rentPrice &&
							formatMoneyInput(details?.rentPrice)}{" "}
						<small className="text-sm font-medium text-gray-700">
							/ Year
						</small>
					</div>
				</h2>
				<div className="space-y-6 mt-8 text-xs">
					<Separator />
					<div className="flex gap-4 justify-between items-center">
						<p className="font-semibold text-green-400">Total</p>
						<p className="text-gray-700 text-lg font-bold text-right">
							NGN{" "}
							{details?.rentPrice &&
								formatMoneyInput(details?.rentPrice)}
						</p>
					</div>
					<div className="grid gap-4">
						{user ? (
							user.isRenter || user.isAdmin ? (
								<>
									<Button
										disabled={!isComplete}
										size={"md"}
										className="w-full"
										onClick={() =>
											setOpenPublishModal(true)
										}
										variant={
											details?.isPublished
												? "warning"
												: "default"
										}
									>
										{details?.isPublished
											? "unpublish listing"
											: "Publish listing"}
									</Button>
									<Button
										variant={"destructive"}
										size={"md"}
										className="w-full"
										onClick={() => {
											setOpenDeleteModal(true);
										}}
									>
										Delete Listing
									</Button>
								</>
							) : (
								<Button
									onClick={() => {
										if (
											!user?.phoneNumber ||
											!user?.address ||
											!user?.city ||
											!user?.state
										) {
											setOpenEditDetails(true);
										} else {
											setOpenConfirmListing(true);
										}
									}}
									size={"md"}
									className="w-full"
								>
									Book space
								</Button>
							)
						) : (
							<Button size={"md"} className="w-full" asChild>
								<Link href="/login">Login</Link>
							</Button>
						)}
						{!user.isRenter && (
							<Button
								size={"md"}
								className="w-full"
								variant={"outline"}
								asChild
							>
								<Link href="/apartments">
									Not what you're looking for? Click here
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>

			{openModal && (
				<OpenEditModal
					id={details?._id}
					open={openModal}
					closeModal={() => {
						setOpenModal(false);
						setIsDate(false);
						setIsNumber(false);
					}}
					type={editField.name}
					editValue={editField.value}
					userId={details?.user}
					isNumber={isNumber}
					isDate={isDate}
				/>
			)}

			{openDeleteModal && (
				<OpenDeleteModal
					id={details?._id}
					open={openDeleteModal}
					closeModal={() => {
						setOpenDeleteModal(false);
					}}
					userId={details?.user}
				/>
			)}

			{openPublishModal && (
				<OpenPublishModal
					id={details?._id}
					open={openPublishModal}
					closeModal={() => {
						setOpenPublishModal(false);
					}}
					userId={details?.user}
				/>
			)}

			{openConfirmListing && (
				<ConfirmBookListingModal
					id={details?._id}
					open={openConfirmListing}
					closeModal={() => {
						setOpenConfirmListing(false);
					}}
					userId={user?._id}
				/>
			)}

			{openEditDetails && (
				<EditUserDetailsModal
					user={user}
					open={openEditDetails}
					closeModal={() => {
						setOpenEditDetails(false);
						setOpenConfirmListing(true);
					}}
				/>
			)}
		</div>
	);
};

export default ApartmentDetails;
