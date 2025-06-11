import SectionTitle from "@/components/shared/SectionTitle";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { getUserInfo } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { getBookings } from "@/lib/actions/booking.actions";
import { formatDate, formatMoneyInput, getGreeting } from "@/lib/utils";
import { BookingsActions } from "@/components/shared/BookingsActions";
import NoBookingBox from "@/components/NoBookingBox";
import { Dot } from "lucide-react";
import NewDashboard from "@/components/shared/NewDashboard";
import { getMyListings } from "@/lib/actions/list.actions";

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
		<Table className="bg-white rounded-md">
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
	const page = Number(searchParams?.page) || 1;
	const query = (searchParams?.query as string) || "";

	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in"); // Redirect if user is not authenticated
	}

	const user = await getUserInfo(userId!);
	const greeting = getGreeting(); // Get appropriate greeting

	const bookings = await getBookings({
		query,
		page,
		limit: 3,
		userId: user?._id,
	});

	const listings = await getMyListings({ userId: user?._id });

	if (bookings.status === 400) redirect("/not-found");

	const pendingBookings = bookings.data.filter(
		(booking: any) => booking.status === "inactive"
	).length;

	return (
		<div className="pb-12">
			<SectionTitle
				title={`${greeting}, ${user.firstName}`}
				subTitle="Welcome to your Leadsage dashboard."
			/>
			{/* <NewDashboard /> */}
			<div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-10">
				<div className="py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] col-span-3">
					<h3 className="font-semibold text-lg">Overview</h3>
					<p className="text-muted-foreground font-medium text-sm mt-2 leading-relaxed">
						{user?.isRenter &&
							"Here is a quick overview of your listings."}
					</p>
					{user?.isRenter ? (
						<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
							<div className="rounded-md p-8 border space-y-4">
								<Image
									src={"/assets/icons/house-two.svg"}
									alt={"House icon"}
									width={1000}
									height={1000}
									className="w-20 h-20"
								/>
								<p className="uppercase text-xs font-medium text-gray-700">
									Total Properties
								</p>
								<h3 className="font-bold text-3xl">
									{listings?.data?.length}
								</h3>
								<div>
									<Separator className="my-6" />
								</div>
								<div className="flex items-center justify-center gap-4">
									<Image
										src={"/assets/icons/people.svg"}
										alt={"People icon"}
										width={1000}
										height={1000}
										className="w-14 h-14"
									/>
									<p className="font-medium text-xs leading-loose uppercase">
										1 Active Tenants
									</p>
								</div>
							</div>
							<div className="rounded-md p-8 border space-y-3">
								<p className="uppercase text-xs text-gray-700">
									Total Earnings
								</p>
								<h2 className="text-3xl font-bold">₦0.00</h2>
								<Image
									src={"/assets/icons/money-bag.svg"}
									alt={"Money-bag icon"}
									width={1000}
									height={1000}
									className="w-20 h-20"
								/>
								<div>
									<Separator className="my-4" />
								</div>
								<p className="uppercase text-xs text-gray-700">
									Pending Booking
								</p>
								<h2 className="text-3xl font-bold">
									{pendingBookings}
								</h2>
							</div>
						</div>
					) : (
						<div className="col-span-2 mt-6 space-y-4 flex items-center justify-start gap-8">
							<Image
								src={"/assets/icons/house-two.svg"}
								alt={"House icon"}
								width={1000}
								height={1000}
								className="w-24 h-24"
							/>
							<div>
								<p className="uppercase text-xs font-medium text-gray-700">
									Total Active Bookings
								</p>
								<h3 className="mt-4 font-bold text-4xl">
									{bookings.data.length}
								</h3>
							</div>
						</div>
					)}
				</div>
				<div className="py-10 px-6 rounded-md bg-white col-span-3 md:col-span-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-semibold text-lg">Help Centre</h3>
					<p className="text-gray-700 font-medium text-sm mt-2 leading-relaxed">
						Need help? Our support team has you covered
					</p>
					<div className="mt-6 grid gap-4">
						<Link
							href="/about/#faqs"
							className="border rounded-md p-4 flex items-center justify-start gap-4"
						>
							<Image
								src={"/assets/icons/shield.svg"}
								alt={"Shield icon"}
								width={1000}
								height={1000}
								className="w-[30px] h-[30px]"
							/>
							<h5 className="font-semibold text-sm">
								Read our FAQs
							</h5>
						</Link>
						<Link
							href="/contact"
							className="border rounded-md p-4 flex items-center justify-start gap-4"
						>
							<Image
								src={"/assets/icons/email.svg"}
								alt={"Email icon"}
								width={1000}
								height={1000}
								className="w-[30px] h-[30px]"
							/>
							<h5 className="font-semibold text-sm">
								Contact Leadsage Support
							</h5>
						</Link>
					</div>
				</div>
			</div>
			<div className="mt-10 py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] col-span-2">
				<h3 className="font-semibold text-lg">Recent Bookings</h3>
				<p className="text-gray-700 font-medium text-sm mt-2 leading-relaxed">
					Here’a a breakdown of your recent bookings
				</p>
				<div className="border rounded-lg mt-6 pt-2">
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
			</div>
		</div>
	);
};

export default page;
