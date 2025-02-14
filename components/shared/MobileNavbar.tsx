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
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

export function MobileNavbar() {
	const pathname = usePathname();

	const [user, setUser] = useState<any>();

	useEffect(() => {
		const authenticatedUser = localStorage.getItem("user");
		setUser(authenticatedUser);
	}, []);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="rounded-sm" size={"icon"} variant={"ghost"}>
					<Image
						src="/assets/icons/menu.svg"
						alt="Menu Icon"
						width={1000}
						height={1000}
						className={`w-[30px] h-[30px] ${
							pathname === "/" && "invert"
						}`}
					/>
				</Button>
			</SheetTrigger>
			<SheetContent className="h-screen" side={"left"}>
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
						{navLinks.map(({ title, slug, icon }, index) => {
							const isActive =
								pathname === slug ||
								pathname.startsWith(`${slug}/`);

							return (
								<SheetClose
									asChild
									key={index}
									className="p-3.5 hover:bg-gray-100 transition ease-out"
								>
									<Link
										href={slug}
										className={`flex items-center gap-3 justify-start ${
											isActive && "text-green-400"
										}`}
									>
										<Image
											src={icon}
											alt={title}
											width={1000}
											height={1000}
											className="w-[20px] h-[20px]"
										/>
										<p>{title}</p>
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
							<Image
								src={"/assets/icons/search.svg"}
								alt={"Search Icon"}
								width={1000}
								height={1000}
								className={`w-[20px] h-[20px] absolute top-[50%] left-[3%] translate-x-[-3%] translate-y-[-50%]`}
							/>
						</div>

						{!user && (
							<>
								<Button asChild variant={"ghost"}>
									<Link href="/login">Sign in</Link>
								</Button>
								<Button asChild>
									<Link href="/register">Join us</Link>
								</Button>
							</>
						)}
					</div>
					<div>
						<Separator className="mt-8 mb-4" />
						<nav className="flex flex-col font-semibold gap-4 p-4 text-xs uppercase">
							{dashboardLinks.map(({ title, links }, index) => (
								<div key={index}>
									<h4 className="uppercase text-xs font-medium text-gray-400 container">
										{title}
									</h4>
									<div className="grid gap-2 mt-4">
										{links.map(
											({ slug, title, icon }, index) => {
												const isActive =
													pathname === slug ||
													pathname.startsWith(
														`${slug}/`
													);
												return (
													<SheetClose
														asChild
														key={index}
														className="p-3.5 hover:bg-gray-100 transition ease-out"
													>
														<Link
															href={slug}
															className={`flex items-center gap-3 justify-start ${
																isActive &&
																"text-green-400"
															}`}
														>
															<Image
																src={icon}
																alt={title}
																width={1000}
																height={1000}
																className="w-[20px] h-[20px]"
															/>
															<p>{title}</p>
														</Link>
													</SheetClose>
												);
											}
										)}
									</div>
								</div>
							))}
						</nav>
					</div>
					<div className="flex items-center justify-start gap-2 container pb-4">
						<Image
							src={"/assets/images/tomiwa-adelae.jfif"}
							alt={"Tomiwa Adelae"}
							width={1000}
							height={1000}
							className="w-11 h-11 object-cover rounded-full"
						/>
						<div>
							<h4 className="font-semibold text-[16px]">
								Tomiwa Adelae
							</h4>
							<small className="text-xs text-gray-700 font-medium">
								tomiwaadelae@gmail.com
							</small>
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
