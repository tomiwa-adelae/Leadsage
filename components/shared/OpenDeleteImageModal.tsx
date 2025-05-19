"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
// import { deleteListing, deleteListingImage } from "@/lib/actions/list.actions";
import { toast } from "@/hooks/use-toast";

import { useState } from "react";

export function OpenDeleteImageModal({
	image,
	open,
	closeModal,
	userId,
	listingId,
}: {
	image: string;
	open: boolean;
	closeModal: () => void;
	userId: string;
	listingId: string;
}) {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			// const res = await deleteListingImage({ userId, image, listingId });

			// if (res?.status == 400)
			// 	return toast({
			// 		title: "Error!",
			// 		description: res?.message,
			// 		variant: "destructive",
			// 	});

			// toast({
			// 	title: "Success!",
			// 	description: res?.message,
			// });
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
					<h4 className="text-sm uppercase font-medium">
						🛑 Confirm Deletion
					</h4>
					<p className="text-xs leading-loose mt-2 mb-4">
						Are you sure you want to delete this image? This action
						cannot be undone. Once deleted, all associated data will
						be permanently removed.
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
							variant={"destructive"}
							size={"lg"}
							onClick={handleSubmit}
							disabled={loading}
							className="w-full md:w-auto"
						>
							{loading ? "Deleting..." : "Delete"}
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
