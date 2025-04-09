import Link from "next/link";
import { Button } from "../ui/button";

const NewDashboard = () => {
	return (
		<div className="mt-10 py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] col-span-3">
			<h2 className="text-2xl md:text-3xl font-medium text-primary">
				Welcome to Leadsage!
			</h2>
			<p className="text-base text-muted-foreground mt-1.5 mb-6">
				Are you looking for a place to stay? Browse listings and book an
				apartment that fits your style and budget.
			</p>
			<Button asChild size={"lg"}>
				<Link href="/new-cardio">Browse Listings</Link>
			</Button>
		</div>
	);
};

export default NewDashboard;
