"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Inknut_Antiqua } from "next/font/google";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";
import { useEffect, useState } from "react";
import { MobileNavbar } from "@/components/shared/MobileNavbar";
import { dashboardLinks, dashboardMemberLinks } from "@/constant";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const TopNavbar = ({ user }: any) => {
	return (
		<nav className="py-4 lg:left-[300px] w-full bg-white shadow-[0px_2px_10px_-2px_rgba(0,0,0,0.1)] z-50">
			<div className="container flex items-center justify-between">
				<Link href={"/"}>
					<Image
						src={"/assets/images/logo.png"}
						alt={"Leadsage Logo"}
						width={1000}
						height={1000}
						className="w-40 lg:w-52 object-cover invert md:hidden"
					/>
				</Link>
				<div className="flex-1">
					<div className="hidden lg:block relative">
						<Input
							type="text"
							placeholder="Search houses, categories..."
							className="pl-4 w-full"
						/>
						<Search className="absolute text-gray-400 top-[50%] right-[3%] translate-x-[-3%] translate-y-[-50%] w-4 h-4" />
					</div>
				</div>
				<div className="flex-1 flex gap-4 items-center justify-end">
					<div className="hidden lg:flex items-center justify-center gap-8 mr-4">
						<Link href="/">
							<Image
								src={"/assets/icons/bell.svg"}
								alt={"Bell icon"}
								width={1000}
								height={1000}
								className="w-[25px] h-[25px]"
							/>
						</Link>
						<Link href="/">
							<Image
								src={"/assets/icons/email.svg"}
								alt={"Email icon"}
								width={1000}
								height={1000}
								className="w-[25px] h-[25px]"
							/>
						</Link>
						<Link href="/">
							<Image
								src={"/assets/icons/heart.svg"}
								alt={"Heart icon"}
								width={1000}
								height={1000}
								className="w-[25px] h-[25px]"
							/>
						</Link>
					</div>
					<ProfileDropdown userDetails={user} />
					<div className="lg:hidden">
						<MobileNavbar userDetails={user} />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default TopNavbar;
