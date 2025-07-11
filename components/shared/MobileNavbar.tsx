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
import { dashboardLinks, dashboardMemberLinks, navLinks } from "@/constant";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

export function MobileNavbar({ userDetails }: any) {
	const { user } = useUser();

	const pathname = usePathname();

	const { signOut } = useClerk();

	const router = useRouter();

	const handleLogout = async () => {
		await signOut();
		router.push("/sign-in"); // Redirect to sign-in page after logout
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="rounded-sm" size={"icon"} variant={"ghost"}>
					<Image
						src="/assets/icons/menu.svg"
						alt="Menu Icon"
						width={1000}
						height={1000}
						className={`w-[30px] h-[30px] invert`}
					/>
				</Button>
			</SheetTrigger>
			<SheetContent className="h-screen" side={"left"}>
				<ScrollArea className="h-full">
					<SheetHeader className="border-green-400 border-b">
						<SheetClose asChild>
							<Link
								href={"/"}
								className="flex items-center justify-start gap-2"
							>
								<Image
									src={"/assets/images/opengraph.png"}
									alt={"Leadsage Logo"}
									width={1000}
									height={1000}
									className="size-14 object-cover"
								/>
								<h3 className="font-semibold text-xl">
									LeadSage Africa
								</h3>
							</Link>
						</SheetClose>
					</SheetHeader>
					<nav className="flex flex-col font-semibold gap-0.5 p-4 text-sm">
						<SheetClose
							asChild
							className="p-3.5 hover:bg-gray-100 transition ease-out"
						>
							<Link
								href={"/"}
								className={`flex items-center gap-3 justify-start ${
									pathname.startsWith("/") && "text-green-400"
								}`}
							>
								<Image
									src={"/assets/icons/house.svg"}
									alt={"Home icon"}
									width={1000}
									height={1000}
									className="w-[20px] h-[20px]"
								/>
								<p>Home</p>
							</Link>
						</SheetClose>
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
						{/* <div className="relative">
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
						</div> */}

						<SignedOut>
							<Button asChild variant={"ghost"}>
								<Link href="/sign-in">Sign in</Link>
							</Button>
							<Button asChild>
								<Link href="/sign-up">Join us</Link>
							</Button>
						</SignedOut>
					</div>
					<SignedIn>
						<>
							<div>
								<Separator className="my-4" />
								<nav className="flex flex-col font-semibold gap-4 p-4 text-sm">
									{(userDetails?.isRenter
										? dashboardLinks
										: dashboardMemberLinks
									).map(({ title, links }, index) => (
										<div key={index}>
											<h4 className="text-sm font-medium text-gray-400 container">
												{title}
											</h4>
											<div className="grid gap-2 mt-4">
												{links.map(
													(
														{ slug, title, icon },
														index
													) => {
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
																		src={
																			icon
																		}
																		alt={
																			title
																		}
																		width={
																			1000
																		}
																		height={
																			1000
																		}
																		className="w-[20px] h-[20px]"
																	/>
																	<p>
																		{title}
																	</p>
																</Link>
															</SheetClose>
														);
													}
												)}
											</div>
										</div>
									))}
									<SheetClose
										asChild
										className="p-3.5 hover:bg-gray-100 transition ease-out cursor-pointer"
										onClick={handleLogout}
									>
										<div
											className={`flex items-center gap-3 justify-start`}
										>
											<Image
												src={"/assets/icons/logout.svg"}
												alt={"Logout"}
												width={1000}
												height={1000}
												className="w-[20px] h-[20px]"
											/>
											<p>Logout</p>
										</div>
									</SheetClose>
								</nav>
							</div>
							<div className="flex items-center justify-start gap-2 container pb-4">
								<Image
									src={user?.imageUrl!}
									alt={`${user?.firstName} ${user?.lastName}`}
									width={1000}
									height={1000}
									className="w-11 h-11 object-cover rounded-full"
								/>
								<div>
									<h4 className="font-semibold text-[16px]">
										{`${user?.firstName} ${user?.lastName}`}
									</h4>
									<small className="text-xs text-gray-700 font-medium">
										{user?.emailAddresses[0].emailAddress}
									</small>
								</div>
							</div>
						</>
					</SignedIn>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
