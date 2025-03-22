"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { updateListing } from "@/lib/actions/list.actions";
import { toast } from "@/hooks/use-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { bookListing } from "@/lib/actions/booking.actions";

export function ConfirmBookListingModal({
	open,
	id,
	userId,
	closeModal,
}: {
	open: boolean;
	id: any;
	userId: any;
	closeModal: () => void;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const res: any = await bookListing({
				user: userId,
				listing: id,
			});
			if (res?.status == 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			toast({
				title: "Success!",
				description: res?.message,
			});
			closeModal();
			router.push(`/success-booking?id=${res?.booking?._id}`);
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

	return (
		<Drawer open={open} onClose={closeModal}>
			<DrawerContent>
				<div className="mx-auto w-full sm:max-w-sm lg:max-w-lg py-10 container">
					<h4 className="text-sm uppercase font-medium">
						✅ Confirm booking
					</h4>
					<p className="text-xs leading-loose mt-2 mb-4">
						Are you sure you want to book this listing? Once you
						book it, the renter and our team would reach out to you.
						Ensure all details are accurate before proceeding.
					</p>
					<div className="flex items-center justify-between gap-4 mt-4 flex-col md:flex-row w-full">
						<DrawerClose asChild>
							<Button
								size={"lg"}
								onClick={closeModal}
								variant="outline"
								className="w-full md:w-auto"
							>
								Cancel
							</Button>
						</DrawerClose>
						<Button
							size={"lg"}
							onClick={handleSubmit}
							disabled={loading}
							className="w-full md:w-auto"
						>
							{loading ? "Booking..." : "Confirm"}
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
