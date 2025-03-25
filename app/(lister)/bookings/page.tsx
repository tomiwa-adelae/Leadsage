import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { Dot, FileSearch } from "lucide-react";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getBookings } from "@/lib/actions/booking.actions";
import { BOOKING_LIMIT } from "@/constant";
import { auth } from "@clerk/nextjs";
import { getUserInfo } from "@/lib/actions/user.actions";
import NoBookingBox from "@/components/NoBookingBox";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import { BookingsActions } from "@/components/shared/BookingsActions";

const BookingStatus = ({ status }: { status: string }) => {
	const statusColor =
		status === "approved"
			? "text-green-400"
			: status === "inactive"
			? "text-yellow-400"
			: "text-red-400";

	return (
		<div className="uppercase flex items-center font-medium">
			<Dot className={`w-8 h-8 ${statusColor}`} />
			{status}
		</div>
	);
};

const BookingTable = ({
	bookings,
	user,
	isRenter,
}: {
	bookings: any[];
	user: any;
	isRenter: boolean;
}) => {
	return (
		<Table className="mt-10 bg-white rounded-md">
			<TableHeader>
				<TableRow>
					{isRenter ? (
						<>
							<TableHead>Renter's Name</TableHead>
							<TableHead>Listing Name</TableHead>
							<TableHead>Rent Price</TableHead>
						</>
					) : (
						<>
							<TableHead>Listing Name</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Amount</TableHead>
						</>
					)}
					<TableHead>Booked On</TableHead>
					<TableHead className="text-center">Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{bookings.map((booking) => (
					<TableRow key={booking._id} className="hover:bg-green-100">
						{isRenter ? (
							<TableCell className="font-medium">
								{booking?.user.firstName}{" "}
								{booking?.user.lastName}
							</TableCell>
						) : null}
						<TableCell className="font-medium">
							<Link href={`/apartments/${booking?.listing._id}`}>
								{booking?.listing.name}
							</Link>
						</TableCell>
						{!isRenter && (
							<TableCell>
								{booking?.listing.address},{" "}
								{booking?.listing.city}
							</TableCell>
						)}
						<TableCell>
							₦{formatMoneyInput(booking?.listing.rentPrice)}
						</TableCell>
						<TableCell>{formatDate(booking?.createdAt)}</TableCell>
						<TableCell>
							<BookingStatus status={booking?.status} />
						</TableCell>
						<TableCell className="text-right">
							<BookingsActions user={user} id={booking?._id} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

const page = async ({ searchParams }: SearchParamProps) => {
	const { userId } = auth();

	const page = Number(searchParams?.page) || 1;
	const query = (searchParams?.query as string) || "";

	const user = await getUserInfo(userId!);

	const bookings = await getBookings({
		query,
		page,
		limit: BOOKING_LIMIT,
		userId: user?._id,
	});

	return (
		<div className="pb-12">
			<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
				<SectionTitle
					title={"My Bookings"}
					subTitle="Lorem ipsum dolor sit amet, consectetur."
				/>
				<Button asChild size={"lg"}>
					<Link href="/apartments">
						Browse apartments <FileSearch />
					</Link>
				</Button>
			</div>
			{bookings?.data?.length === 0 ? (
				<NoBookingBox isRenter={user?.isRenter} />
			) : (
				<BookingTable
					bookings={bookings.data}
					user={user}
					isRenter={user?.isRenter}
				/>
			)}
		</div>
	);
};

export default page;
