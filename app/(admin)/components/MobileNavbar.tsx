"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Inknut_Antiqua } from "next/font/google";
import { dashboardLinks, navLinks } from "@/constant";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

export function MobileNavbar() {
	const pathname = usePathname();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={"ghost"} className="hover:bg-green-600">
					<Image
						src="/assets/images/icons/menu-icon.svg"
						alt="Menu Icon"
						width={1000}
						height={1000}
						className="w-auto h-auto invert"
					/>
				</Button>
			</SheetTrigger>
			<SheetContent side={"left"}>
				<ScrollArea className="h-full">
					<SheetHeader className="border-green-400 border-b">
						<SheetClose asChild>
							<Link href="/">
								<h3
									className={`uppercase font-bold text-green-400 text-xl hover:text-green-500 transition ease-out ${inknut.className}`}
								>
									Leadsage
								</h3>
							</Link>
						</SheetClose>
					</SheetHeader>
					<nav className="flex flex-col font-semibold gap-0.5 p-4 text-xs uppercase">
						{navLinks.map(({ title, route }, index) => {
							const isActive =
								pathname === route ||
								pathname.startsWith(`${route}/`);

							return (
								<SheetClose
									asChild
									key={index}
									className="p-3.5 hover:bg-gray-100 transition ease-out"
								>
									<Link
										href={route}
										className={`${
											isActive && "text-green-400"
										}`}
									>
										{title}
									</Link>
								</SheetClose>
							);
						})}
					</nav>
					<div className="flex flex-col px-4 gap-4">
						<div className="relative">
							<Input
								type="text"
								placeholder="Search houses, categories..."
								className="pl-8"
							/>
							<Search className="absolute text-gray-400 top-[50%] left-[3%] translate-x-[-3%] translate-y-[-50%] w-4 h-4" />
						</div>
					</div>
					<div className="px-4">
						<Separator className="mt-8" />
					</div>
					<nav className="flex flex-col font-semibold gap-0.5 p-4 text-xs uppercase">
						{dashboardLinks.map(({ title, route }, index) => {
							const isActive =
								pathname === route ||
								pathname.startsWith(`${route}/`);

							return (
								<SheetClose
									asChild
									key={index}
									className="p-3.5 hover:bg-gray-100 transition ease-out"
								>
									<Link
										href={route}
										className={`${
											isActive && "text-green-400"
										}`}
									>
										{title}
									</Link>
								</SheetClose>
							);
						})}
					</nav>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
