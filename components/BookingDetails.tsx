"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import { OpenUpdateBookingStatusModal } from "./shared/OpenUpdateBookingStatusModal";
import { useState } from "react";
import { NairaIcon } from "./shared/NairaIcon";

interface BookingDetailsProps {
	name: string;
	address: string;
	city: string;
	state: string;
	description: string;
	rent: string;
	bookedDate: string;
	availabilityDate: string;
	bookingStatus: string;
	bookingID: string;
	landlordName: string;
	landlordEmail: string;
	landlordPhoneNumber: string;
	renterName: string;
	renterEmail: string;
	renterPhoneNumber: string;
	user: any;
}

// Reusable component for displaying a detail row
const DetailRow = ({
	label,
	value,
	isTel,
	isEmail,
	isLast,
}: {
	label: string;
	value: string;
	isTel?: boolean;
	isEmail?: boolean;
	isLast?: boolean;
}) => (
	<div className="font-medium text-sm md:text-base">
		<span className="text-muted-foreground">{label}:</span>
		{isTel ? (
			<a href={`tel:${value}`} className="ml-1  lowercase underline">
				{value}
			</a>
		) : isEmail ? (
			<a href={`tel:${value}`} className="ml-1  lowercase underline">
				{value}
			</a>
		) : (
			<span className="ml-1  capitalize">{value}</span>
		)}
		{!isLast && <Separator className="mb-4 mt-2" />}
	</div>
);

const BookingDetails = ({
	name,
	address,
	city,
	state,
	description,
	rent,
	bookedDate,
	availabilityDate,
	bookingStatus,
	bookingID,
	landlordName,
	landlordEmail,
	landlordPhoneNumber,
	renterName,
	renterEmail,
	renterPhoneNumber,
	user,
}: BookingDetailsProps) => {
	const [openBookingStatusModal, setOpenBookingStatusModal] =
		useState<boolean>(false);
	const [updateStatus, setUpdateStatus] = useState<any>("");

	const isRenter = user?.isRenter;
	const contactName = isRenter ? renterName : landlordName;
	const contactEmail = isRenter ? renterEmail : landlordEmail;
	const contactPhone = isRenter ? renterPhoneNumber : landlordPhoneNumber;

	// Define buttons based on conditions
	const actionButtons = [
		bookingStatus !== "cancelled" &&
			isRenter &&
			bookingStatus !== "rejected" && (
				<Button
					key="approve"
					size="md"
					className="w-full"
					onClick={() => {
						setOpenBookingStatusModal(true);
						setUpdateStatus("approved");
					}}
					disabled={bookingStatus === "approved"}
				>
					Approve Booking
				</Button>
			),
		bookingStatus !== "cancelled" &&
			isRenter &&
			bookingStatus !== "approved" && (
				<Button
					key="reject"
					size="md"
					variant="warning"
					className="w-full"
					onClick={() => {
						setOpenBookingStatusModal(true);
						setUpdateStatus("rejected");
					}}
					disabled={bookingStatus === "rejected"}
				>
					Reject Booking
				</Button>
			),
		bookingStatus !== "rejected" &&
			bookingStatus !== "approved" &&
			!isRenter && (
				<Button
					key="cancel"
					size="md"
					className="w-full"
					variant="warning"
					onClick={() => {
						setOpenBookingStatusModal(true);
						setUpdateStatus("cancelled");
					}}
					disabled={bookingStatus === "cancelled"}
				>
					{bookingStatus === "cancelled"
						? "This booking has been cancelled"
						: "Cancel booking"}
				</Button>
			),
		!isRenter && bookingStatus === "approved" && (
			<Button key="approved" size="md" className="w-full" disabled>
				This booking has been approved
			</Button>
		),
		!isRenter && bookingStatus === "rejected" && (
			<Button
				key="rejected"
				size="md"
				variant="warning"
				className="w-full"
				disabled
			>
				This booking has been rejected
			</Button>
		),
		<Button
			key="contact"
			size="md"
			variant="outline"
			className="w-full"
			asChild
		>
			<Link href="/apartments">
				Contact {isRenter ? "customer" : "Landlord"}
			</Link>
		</Button>,
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
			<div className="col-span-2 lg:col-span-3">
				<div className="bg-white p-8 rounded-xl space-y-4 border-b">
					<h1 className="text-3xl font-semibold">{name}</h1>
					<div className="text-sm md:text-base text-muted-foreground font-medium space-y-4">
						<DetailRow label="Address" value={address} />
						<DetailRow label="City" value={city} />
						<DetailRow label="State" value={state} isLast />
					</div>

					<Separator className="mt-4" />
					<div className="font-medium text-sm md:text-base">
						<span className="text-muted-foreground">
							Property available from:
						</span>
						<span className=" ml-1.5">
							{formatDate(availabilityDate)}
						</span>
					</div>
					<Separator />
					<p className="text-sm md:text-base py-2 leading-loose">
						{description}
					</p>
				</div>
			</div>
			<div className="col-span-2 border rounded-xl bg-white p-8">
				<h5 className="font-medium text-sm md:text-base">Rent price</h5>
				<h2 className="text-2xl font-semibold my-2 ">
					<NairaIcon /> {formatMoneyInput(rent)}{" "}
					<small className="text-sm md:text-base font-medium text-muted-foreground">
						/ Year
					</small>
				</h2>

				{/* Booking Information */}
				<Separator />
				<p className="text-muted-foreground font-medium text-sm md:text-base pt-8 pb-6">
					Booking Information
				</p>
				<DetailRow
					label="Booking date"
					value={formatDate(bookedDate)}
				/>
				<DetailRow label="Booking status" value={bookingStatus} />
				<DetailRow label="Booking ID" value={bookingID} isLast />

				{/* Contact Details */}
				<Separator className="mt-8" />
				<p className="text-muted-foreground font-medium text-sm md:text-base pt-8 pb-6">
					{isRenter ? "Customer's" : "Landlord's"} details
				</p>
				<DetailRow label="Name" value={contactName} />
				<DetailRow label="Email" value={contactEmail} isEmail />
				<DetailRow
					label="Phone number"
					value={contactPhone}
					isTel
					isLast
				/>

				{/* Action Buttons */}
				<div className="grid gap-4 mt-8">
					{actionButtons.filter(Boolean)}
				</div>
			</div>

			{openBookingStatusModal && (
				<OpenUpdateBookingStatusModal
					bookingId={bookingID}
					open={openBookingStatusModal}
					closeModal={() => {
						setOpenBookingStatusModal(false);
					}}
					userId={user._id}
					updateStatus={updateStatus}
				/>
			)}
		</div>
	);
};

export default BookingDetails;
