"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { OpenDeleteModal } from "./shared/OpenDeleteModal";

export function ListingActions({ id, userId }: { id: string; userId: string }) {
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant={"ghost"}
					size={"icon"}
					className="rounded-sm hover:bg-green-200"
				>
					<Image
						src={"/assets/icons/menu-vertical.svg"}
						alt={"Vertical menu for the action"}
						width={1000}
						height={1000}
						className="w-5 h-5"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<Link href={`/apartments/${id}`}>
					<DropdownMenuItem className="font-medium uppercase text-xs">
						<Image
							src={"/assets/icons/edit.svg"}
							alt={"Edit icon"}
							width={1000}
							height={1000}
							className="w-5 h-5"
						/>
						<span>Update</span>
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="font-medium uppercase text-xs"
					onClick={() => setOpenDeleteModal(true)}
				>
					<Image
						src={"/assets/icons/delete.svg"}
						alt={"Delete icon"}
						width={1000}
						height={1000}
						className="w-5 h-5"
					/>
					<span>Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>

			{openDeleteModal && (
				<OpenDeleteModal
					id={id}
					open={openDeleteModal}
					closeModal={() => {
						setOpenDeleteModal(false);
					}}
					userId={userId}
				/>
			)}
		</DropdownMenu>
	);
}
