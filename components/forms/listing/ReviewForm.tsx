"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { IList } from "@/lib/database/models/list.model";
import Link from "next/link";
import { useState } from "react";
import { addListingPublish } from "@/lib/actions/list.actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DEFAULT_LISTING_IMAGE } from "@/constant";
import { formatDate } from "@/lib/utils";

interface ReviewFormProps {
	userId: string;
	listingId: string;
	user: any;
	listing: IList;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
	userId,
	listingId,
	user,
	listing,
}) => {
	const { toast } = useToast();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const res = await addListingPublish({
				userId,
				listingId,
			});
			if (res.status === 400)
				return toast({ title: res.message, variant: "destructive" });
			toast({
				title: res.message,
			});
			setLoading(false);
			return router.push(`/listings/${res?.listing?._id}?success=true`);
		} catch (error) {
			setLoading(false);
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	console.log(listing.images);

	return (
		<div className="py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
			<div className="mb-6">
				<h3 className="text-lg uppercase mb-1 font-semibold text-primary">
					Review Your Listing
				</h3>
				<p className="text-base text-muted-foreground">
					Take a final look at the details of your listing to make
					sure everything is accurate. You’ll be able to make edits
					before submitting. Once you're satisfied, hit Publish to
					make your property live on Leadsage.
				</p>
			</div>
			<div>
				<div>
					<div className="flex items-center justify-between gap-4">
						<h3 className="font-semibold uppercase text-lg mb-2">
							Basic Information
						</h3>
						<Button variant="ghost">Edit</Button>
					</div>
					<div className="space-y-2 text-muted-foreground font-medium text-sm leading-relaxed">
						<p>Listing name: {listing?.name}</p>
						{/* @ts-ignore */}
						<p>Category: {listing?.category?.name!}</p>
						<p>Address: {listing?.address}</p>
						<p>City: {listing?.city}</p>
						<p>State: {listing?.state}</p>
					</div>
				</div>
				<Separator className="my-8" />
				<div>
					<div className="flex items-center justify-between gap-4">
						<h3 className="font-semibold uppercase text-lg mb-2">
							Rent Information
						</h3>
						<Button variant="ghost">Edit</Button>
					</div>
					<div className="space-y-2 text-muted-foreground font-medium text-sm leading-relaxed">
						<p>Square meter: {listing?.squareMeters}</p>
						<p>
							Availability Date:{" "}
							{listing?.availabilityDate &&
								formatDate(listing?.availabilityDate)}
						</p>
						<p>Number of Bedrooms: {listing?.bedrooms}</p>
						<p>Number of Bathrooms: {listing?.bathrooms}</p>
						<p>Description: {listing?.description}</p>
					</div>
				</div>
				<Separator className="my-8" />
				<div>
					<div className="flex items-center justify-between gap-4">
						<h3 className="font-semibold uppercase text-lg mb-2">
							Images
						</h3>
						<Button variant="ghost">Edit</Button>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{listing.images?.map((image, index) => (
							<Image
								key={index}
								src={image.src || DEFAULT_LISTING_IMAGE}
								alt={listing.name || "Apartment image"}
								width={1000}
								height={1000}
								className="aspect-video size-full object-cover rounded-md"
							/>
						))}
					</div>
				</div>
				<Separator className="my-8" />
				<div>
					<div className="flex items-center justify-between gap-4">
						<h3 className="font-semibold uppercase text-lg mb-2">
							Amenities
						</h3>
						<Button variant="ghost">Edit</Button>
					</div>
					<div className="flex flex-wrap gap-4">
						{listing?.amenities?.map((amenity, index) => (
							<Badge
								key={index}
								className="rounded-md"
								variant="outline"
							>
								{amenity.name}
							</Badge>
						))}
					</div>
				</div>
				<Separator className="my-8" />
				<div>
					<div className="flex items-center justify-between gap-4">
						<h3 className="font-semibold uppercase text-lg mb-2">
							Policies
						</h3>
						<Button variant="ghost">Edit</Button>
					</div>
					<div className="space-y-2 text-muted-foreground font-medium text-sm leading-relaxed">
						<p>
							Are pet allowed? {listing?.petPolicy ? "Yes" : "No"}
						</p>
						<p>
							Is smoking allowed?{" "}
							{listing?.smokingPolicy ? "Yes" : "No"}
						</p>
					</div>
				</div>
				<Separator className="my-8" />
				<div>
					<div className="flex items-center justify-between gap-4">
						<h3 className="font-semibold uppercase text-lg mb-2">
							Cost
						</h3>
						<Button variant="ghost">Edit</Button>
					</div>
					<div className="space-y-2 text-muted-foreground font-medium text-sm leading-relaxed">
						<p>Rent Amount: ₦{listing?.rent}</p>
						<p>Security Deposit: ₦{listing?.securityDeposit}</p>
						<p>
							Is rent negotiable?{" "}
							{listing?.rentNegotiable ? "Yes" : "No"}
						</p>
					</div>
				</div>
				<Separator className="my-8" />
				<div>
					<div className="flex items-center justify-between gap-4">
						<h3 className="font-semibold uppercase text-lg mb-2">
							Final details
						</h3>
						<Button variant="ghost">Edit</Button>
					</div>
					<div className="space-y-2 text-muted-foreground font-medium text-sm leading-relaxed">
						<p>Who is listing this propery? {listing?.listedBy}</p>
						<p>
							What's your full name? {user?.firstName}{" "}
							{user?.lastName}
						</p>
						<p>What's your email? {user?.email}</p>
						<p>What's your phone number? {user?.phoneNumber}</p>
					</div>
				</div>
				{/* <Separator className="my-8" /> */}
			</div>
			<div className="flex justify-between mt-6">
				<Button asChild size="lg" variant="outline">
					<Link href={`/create-listing/${listingId}/final-details`}>
						Back
					</Link>
				</Button>
				<Button
					disabled={loading}
					size="lg"
					type="submit"
					className="ml-2"
					onClick={handleSubmit}
				>
					{loading ? "Creating..." : "Create listing"}
				</Button>
			</div>
		</div>
	);
};
