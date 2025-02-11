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
import { navLinks } from "@/constant";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

export function MobileNavbar() {
	const pathname = usePathname();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={"ghost"}>
					<Image
						src="/assets/icons/menu.svg"
						alt="Menu Icon"
						width={1000}
						height={1000}
						className={`w-[30px] h-[30px]  ${
							pathname === "/" && "invert"
						}`}
					/>
				</Button>
			</SheetTrigger>
			<SheetContent side={"left"}>
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
					{navLinks.map(({ title, slug }, index) => {
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
						<Image
							src={"/assets/icons/search.svg"}
							alt={"Search Icon"}
							width={1000}
							height={1000}
							className={`w-[20px] h-[20px] absolute top-[50%] left-[3%] translate-x-[-3%] translate-y-[-50%]`}
						/>
					</div>
					<Button asChild variant={"ghost"}>
						<Link href="/login">Sign in</Link>
					</Button>
					<Button asChild>
						<Link href="/register">Join us</Link>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
