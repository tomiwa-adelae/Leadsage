"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import { OpenUpdateBookingStatusModal } from "./shared/OpenUpdateBookingStatusModal";
import { useState } from "react";

interface BookingDetailsProps {
	name: string;
	address: string;
	city: string;
	state: string;
	description: string;
	rentPrice: string;
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
	<div className="font-semibold text-xs uppercase">
		<span>{label}:</span>
		{isTel ? (
			<a
				href={`tel:${value}`}
				className="ml-1 text-green-400 lowercase underline"
			>
				{value}
			</a>
		) : isEmail ? (
			<a
				href={`tel:${value}`}
				className="ml-1 text-green-400 lowercase underline"
			>
				{value}
			</a>
		) : (
			<span className="ml-1 text-green-400">{value}</span>
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
	rentPrice,
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
				Contact {isRenter ? "renter" : "Landlord"}
			</Link>
		</Button>,
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
			<div className="bg-white p-8 rounded-xl col-span-2 lg:col-span-3 space-y-4 border-b">
				<h1 className="text-3xl font-bold text-green-400">{name}</h1>
				<div className="text-xs text-gray-700 font-medium space-y-4">
					<DetailRow label="Address" value={address} />
					<DetailRow label="City" value={city} />
					<DetailRow label="State" value={state} isLast />
				</div>

				<div>
					<Separator className="mt-8" />
				</div>
				<div className="font-semibold text-sm py-2">
					<span className="text-gray-700">
						APARTMENT AVAILABLE FROM:
					</span>
					<span className="text-green-400 ml-1.5">
						{formatDate(availabilityDate)}
					</span>
				</div>
				<Separator />
				<p className="text-sm py-4 leading-loose">{description}</p>
			</div>
			<div className="col-span-2 border rounded-xl bg-white p-8">
				<h5 className="font-semibold text-sm">Rent price</h5>
				<h2 className="text-2xl font-semibold my-2 text-green-400">
					NGN {formatMoneyInput(rentPrice)}{" "}
					<small className="text-sm font-medium text-gray-700">
						/ Year
					</small>
				</h2>

				{/* Booking Information */}
				<Separator />
				<p className="text-gray-700 uppercase font-semibold text-sm pt-8 pb-6">
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
				<p className="text-gray-700 uppercase font-semibold text-sm pt-8 pb-6">
					{isRenter ? "Renter's" : "Landlord's"} details
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
