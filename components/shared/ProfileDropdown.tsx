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
import { dashboardLinks } from "@/constant";
import Link from "next/link";
import React from "react";

export function ProfileDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"} size={"icon"}>
					<Image
						alt={"User profile picture"}
						src={"/assets/images/tomiwa-adelae.jfif"}
						width={1000}
						height={1000}
						className="w-10 h-10 rounded-full object-cover mr-2"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				{dashboardLinks.map((link, index) => (
					<React.Fragment key={index}>
						<DropdownMenuLabel className="uppercase font-medium text-xs text-gray-400">
							{link.title}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{link.links.map(({ title, slug, icon }, index) => (
							<DropdownMenuGroup key={index}>
								<Link href={slug}>
									<DropdownMenuItem className="cursor-pointer">
										<Image
											src={icon}
											alt={title}
											width={1000}
											height={1000}
											className="w-[20px] h-[20px]"
										/>
										<span className="uppercase text-xs font-medium">
											{title}
										</span>
									</DropdownMenuItem>
								</Link>
								<DropdownMenuSeparator />
							</DropdownMenuGroup>
						))}
					</React.Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
