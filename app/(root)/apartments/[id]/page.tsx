import ApartmentDetails from "@/components/ApartmentDetails";
import { ApartmentImages } from "@/components/ApartmentImages";
import Header from "@/components/shared/Header";
import { images } from "@/constant";
import { getListing } from "@/lib/actions/list.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const ApartmentLocation = dynamic(
	() => import("@/components/ApartmentLocation.tsx"),
	{
		ssr: false,
	}
);

const page = async ({
	searchParams,
	params,
}: {
	searchParams: { admin?: string };
	params: { id: string };
}) => {
	const { userId } = auth();

	const user = await getUserInfo(userId!);

	const id = params.id;

	const listing = await getListing(id!);

	if (listing.status === 400) redirect("/not-found.tsx");

	return (
		<div>
			<Header color="black" />
			<div className="container">
				<ApartmentImages
					details={listing}
					isRenter={user?.isRenter}
					user={user}
				/>
				<ApartmentDetails
					user={user}
					details={listing}
					isRenter={user?.isRenter}
				/>
				<ApartmentLocation />
			</div>
		</div>
	);
};

export default page;
