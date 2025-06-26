"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { toast } from "@/hooks/use-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBookingStatus } from "@/lib/actions/booking.actions";
import { Loader2 } from "lucide-react";

export function OpenUpdateBookingStatusModal({
	open,
	bookingId,
	userId,
	closeModal,
	updateStatus,
}: {
	open: boolean;
	bookingId: string;
	userId: string;
	updateStatus: "approved" | "rejected" | "cancelled";
	closeModal: () => void;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const statusIcons: Record<string, string> = {
		cancelled: "🛑",
		approved: "✅",
		rejected: "❌",
	};

	const statusLabels: Record<string, string> = {
		cancelled: "Cancellation",
		approved: "Approval",
		rejected: "Rejection",
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const res: any = await updateBookingStatus({
				userId,
				bookingId,
				updateStatus,
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
					<h4 className="text-lg font-medium">
						{statusIcons[updateStatus]} Confirm{" "}
						{statusLabels[updateStatus]}
					</h4>
					<p className="text-sm leading-loose mt-2 mb-4">
						Are you sure you want to {updateStatus} this booking?
						This action cannot be undone.
					</p>
					<div className="flex items-center justify-between gap-4 mt-4 flex-col md:flex-row w-full">
						<DrawerClose asChild>
							<Button
								size={"lg"}
								variant="outline"
								className="w-full md:w-auto"
							>
								Close
							</Button>
						</DrawerClose>
						<Button
							variant={
								updateStatus === "cancelled"
									? "destructive"
									: updateStatus === "approved"
									? "default"
									: "warning"
							}
							size={"lg"}
							onClick={handleSubmit}
							disabled={loading}
							className="w-full md:w-auto"
						>
							{loading ? (
								<Loader2 className="animate-spin size-4" />
							) : (
								`${
									updateStatus === "rejected"
										? "Yes, reject"
										: updateStatus === "approved"
										? "Yes, approve"
										: "Yes, cancel"
								}`
							)}
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
