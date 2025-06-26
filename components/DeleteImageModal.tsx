"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { deleteListingImage } from "@/lib/actions/list.actions";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
	open: boolean;
	closeModal: () => void;
	userId: string;
	listingId: string;
	imageId: string;
}

export function DeleteImageModal({
	open,
	closeModal,
	userId,
	imageId,
	listingId,
}: Props) {
	const [loading, setLoading] = useState(false);

	const deletePhoto = async () => {
		try {
			setLoading(true);
			if (!listingId || !userId || !imageId)
				return toast({ title: "An error occurred!" });

			const res = await deleteListingImage({
				userId,
				listingId,
				imageId,
			});
			if (res.status === 400)
				return toast({ title: res.message, variant: "destructive" });

			closeModal();
			toast({ title: "Photo successfully deleted!" });
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			toast({
				title: error.message || "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open}>
			<form>
				<DialogContent className="sm:max-w-[425px] p-0">
					<div className="border-b py-4 text-center md:block">
						<p className="font-semibold text-lg">
							Delete this photo
						</p>
					</div>
					<div className="text-center py-6">
						<p className="font-semibold text-sm">
							Once you delete it, you can't get it back
						</p>
					</div>
					<div className="px-6 py-4 flex items-center justify-between gap-4 border-t">
						<Button
							onClick={() => {
								closeModal();
							}}
							size="md"
							variant={"ghost"}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button
							disabled={loading}
							onClick={deletePhoto}
							size="md"
							variant="destructive"
						>
							{loading ? (
								<Loader2 className="animate-spin size-4" />
							) : (
								"Yes, delete it"
							)}
						</Button>
					</div>
				</DialogContent>
			</form>
		</Dialog>
	);
}
