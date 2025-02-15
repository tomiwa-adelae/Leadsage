import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { dashboardLinks, dashboardMemberLinks } from "@/constant";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";

export function ProfileDropdown() {
	const { user } = useUser();
	const { signOut } = useClerk();

	const router = useRouter();

	const handleLogout = async () => {
		await signOut();
		router.push("/sign-in"); // Redirect to sign-in page after logout
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Image
					src={user?.imageUrl!}
					alt={`${user?.firstName} ${user?.lastName}`}
					width={1000}
					height={1000}
					className="w-10 h-10 rounded-full cursor-pointer hover:border border-green-400 object-cover mr-2"
				/>
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
				<DropdownMenuItem
					onClick={handleLogout}
					className="cursor-pointer"
				>
					<Image
						src={"/assets/icons/logout.svg"}
						alt={"Logout"}
						width={1000}
						height={1000}
						className="w-[20px] h-[20px]"
					/>
					<span className="uppercase text-xs font-medium">
						Logout
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
