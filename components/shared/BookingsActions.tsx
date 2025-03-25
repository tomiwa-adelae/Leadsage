import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export function BookingsActions({ user, id }: { user: any; id: string }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={"icon"} variant="ghost" className="rounded-md">
					<Image
						src={"/assets/icons/menu-vertical.svg"}
						alt={"Menu icon"}
						width={1000}
						height={1000}
						className="w-5 h-5"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 font-medium uppercase">
				<Link href={`/bookings/${id}`}>
					<DropdownMenuItem className="cursor-pointer">
						<Image
							src={"/assets/icons/open-folder.svg"}
							alt={"Open folder icon"}
							width={1000}
							height={1000}
							className="w-5 h-5"
						/>
						<span className="text-xs">Visit</span>
					</DropdownMenuItem>
				</Link>
				{!user?.isRenter && (
					<DropdownMenuItem>
						<Image
							src={"/assets/icons/cancel.svg"}
							alt={"Cancel icon"}
							width={1000}
							height={1000}
							className="w-5 h-5"
						/>
						<span className="text-xs">Cancel booking</span>
					</DropdownMenuItem>
				)}
				{user?.isRenter && (
					<>
						<DropdownMenuItem>
							<Image
								src={"/assets/icons/thumbs-up.svg"}
								alt={"Thumbs up icon"}
								width={1000}
								height={1000}
								className="w-5 h-5"
							/>
							<span className="text-xs">Approve booking</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Image
								src={"/assets/icons/thumbs-down.svg"}
								alt={"Thumbs down icon"}
								width={1000}
								height={1000}
								className="w-5 h-5"
							/>
							<span className="text-xs">Reject booking</span>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
