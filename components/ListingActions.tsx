import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function ListingActions() {
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
						className="w-[20px] h-[20px]"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem>
					<Image
						src={"/assets/icons/edit.svg"}
						alt={"Edit icon"}
						width={1000}
						height={1000}
						className="w-[20px] h-[20px]"
					/>
					<span>Update</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Image
						src={"/assets/icons/delete.svg"}
						alt={"Delete icon"}
						width={1000}
						height={1000}
						className="w-[20px] h-[20px]"
					/>
					<span>Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
