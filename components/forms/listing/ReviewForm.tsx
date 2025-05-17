import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ReviewFormProps {
	nextStep: () => void;
	prevStep: () => void;
	formData: any;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
	nextStep,
	prevStep,
	formData,
}) => {
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
						<p>Listing name: The Trio Duplex</p>
						<p>Category: The Trio Duplex</p>
						<p>Address: The Trio Duplex</p>
						<p>City: The Trio Duplex</p>
						<p>State: The Trio Duplex</p>
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
						<p>Square meter: The Trio Duplex</p>
						<p>Availability Date: The Trio Duplex</p>
						<p>Address: The Trio Duplex</p>
						<p>Number of Bedrooms: The Trio Duplex</p>
						<p>Number of Bathrooms: The Trio Duplex</p>
						<p>Description: The Trio Duplex</p>
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
						<Image
							src={"/assets/images/apartment-1.jpg"}
							alt={"Apartment"}
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover rounded-md"
						/>
						<Image
							src={"/assets/images/apartment-1.jpg"}
							alt={"Apartment"}
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover rounded-md"
						/>
						<Image
							src={"/assets/images/apartment-1.jpg"}
							alt={"Apartment"}
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover rounded-md"
						/>
						<Image
							src={"/assets/images/apartment-1.jpg"}
							alt={"Apartment"}
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover rounded-md"
						/>
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
					<div className="flex flex-wrap">
						<Badge className="rounded-md" variant="outline">
							Badge
						</Badge>
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
						<p>Are pet allowed? Yes</p>
						<p>Is smoking allowed? Yes</p>
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
						<p>Rent Amount: #200,000.77</p>
						<p>Security Deposit: #20,000.77</p>
						<p>Is rent negotiable? Yes</p>
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
						<p>Who is listing this propery? Owner</p>
						<p>What's your full name? Tomiwa Adelae</p>
						<p>What's your email? adelaetomiwa6@gmail.com</p>
						<p>What's your phone number? +23409088557733</p>
						<p>
							What dates are you available for touring? Mondays,
							Tuesdays & Thursdays
						</p>
					</div>
				</div>
				{/* <Separator className="my-8" /> */}
			</div>
			<div className="flex justify-between mt-6">
				<Button size="lg" onClick={prevStep} variant="outline">
					Back
				</Button>
				<Button
					// disabled={loading}
					size="lg"
					type="submit"
					className="ml-2"
				>
					{/* {loading ? "Saving..." : "Continue"} */}
					Continue
				</Button>
			</div>
		</div>
	);
};

export default ReviewForm;
