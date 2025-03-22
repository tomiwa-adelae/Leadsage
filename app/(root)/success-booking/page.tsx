import Header from "@/components/shared/Header";
import Showcase from "@/components/shared/Showcase";
import { getBookingDetails } from "@/lib/actions/booking.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface PageProps {
	searchParams: { id?: string };
}

const page = async ({ searchParams }: PageProps) => {
	const id = searchParams?.id; // ✅ Extract 'id' from searchParams

	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in"); // Redirect if user is not authenticated
	}

	if (!id) {
		return (
			<p className="text-center text-red-500">Invalid Application ID</p>
		);
	}

	const booking = await getBookingDetails(id, userId);

	if (booking.status === 400) redirect("/not-found");

	return (
		<div>
			<Header color="black" />
			<Showcase
				image={"/assets/images/about-showcase-bg.jpg"}
				title={"🎉 Booking Successful!"}
				description={
					"Your booking has been confirmed. Check your email for details."
				}
				cta={[
					{ title: "Go to Dashboard", slug: "/dashboard" },
					{ title: "Go back home", slug: "/" },
				]}
			/>
		</div>
	);
};

export default page;
