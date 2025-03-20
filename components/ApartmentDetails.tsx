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
import { formatMoneyInput } from "@/lib/utils";

const ApartmentDetails = ({
	details,
	isRental,
	user,
}: {
	details: any;
	isRental: boolean;
	user: any;
}) => {
	const [openModal, setOpenModal] = useState(false);
	const [editField, setEditField] = useState({ name: "", value: "" });
	const [isNumber, setIsNumber] = useState(false);

	const handleOpenModal = (fieldName: string, fieldValue: string) => {
		setEditField({ name: fieldName, value: fieldValue });
		setOpenModal(true);
	};

	console.log(user);

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
					{isRental && (
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
				<p className="text-gray-700 text-sm uppercase font-medium">
					{details?.address}, {details?.city}, {details?.state}
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
				<p className="text-sm py-4 leading-loose flex items-start justify-start gap-4">
					{details?.description}
					{isRental && (
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
					{isRental && (
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
							<Button size={"md"} className="w-full">
								Book space
							</Button>
						) : (
							<Button size={"md"} className="w-full" asChild>
								<Link href="/login">Login</Link>
							</Button>
						)}
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
					</div>
				</div>
			</div>
			{openModal && (
				<OpenEditModal
					id={details?._id}
					open={openModal}
					closeModal={() => setOpenModal(false)}
					type={editField.name}
					editValue={editField.value}
					userId={details?.user}
					isNumber={isNumber}
				/>
			)}
		</div>
	);
};

export default ApartmentDetails;
