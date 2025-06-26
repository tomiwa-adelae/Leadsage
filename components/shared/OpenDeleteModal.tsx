"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
// import { deleteListing } from "@/lib/actions/list.actions";
import { toast } from "@/hooks/use-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function OpenDeleteModal({
	open,
	id,
	userId,
}: // closeModal,
{
	open: boolean;
	id: any;
	userId: any;
	// closeModal: () => void;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			// const res: any = await deleteListing({ userId, listingId: id });
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
			router.push("/listings");
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
		<Drawer open={open} onClose={() => {}}>
			{/* {" "}
			<DrawerTrigger asChild>
				<Button className="rounded-md" size={"icon"} variant="ghost">
					<Image
						src={"/assets/icons/delete.svg"}
						alt={"Delete icon"}
						width={1000}
						height={1000}
						className="w-5 h-5"
					/>
				</Button>
			</DrawerTrigger> */}
			<DrawerContent>
				<div className="mx-auto w-full sm:max-w-sm lg:max-w-lg py-10 container">
					<h4 className="text-sm font-medium">🛑 Confirm Deletion</h4>
					<p className="text-xs leading-loose mt-2 mb-4">
						Are you sure you want to delete this listing? This
						action cannot be undone. Once deleted, all associated
						data will be permanently removed.
					</p>
					<div className="flex items-center justify-between gap-4 mt-4 flex-col md:flex-row w-full">
						<DrawerClose asChild>
							<Button
								size={"lg"}
								// onClick={closeModal}
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
