"use client";
import { Inknut_Antiqua } from "next/font/google";
import { Button } from "../ui/button";
import Link from "next/link";
import { NavigationDropdowns } from "./NavigationDropdowns";
import { MobileNavbar } from "./MobileNavbar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ProfileDropdown } from "./ProfileDropdown";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const Header = ({ color = "white" }: { color?: string }) => {
	const pathname = usePathname();

	return (
		<div
			className={`${
				color === "black" ? "text-green-400 border-b" : "text-white"
			}`}
		>
			<header
				className={`py-4 container flex items-center justify-between`}
			>
				<h3
					className={`uppercase font-bold text-xl lg:text-2xl hover:text-green-400 transition ease-out ${inknut.className}`}
				>
					<Link href={"/"}>Leadsage</Link>
				</h3>
				<NavigationDropdowns color={color} />
				<div className={`gap-4 hidden md:flex`}>
					<Button variant={"ghost"} size={"icon"}>
						<Image
							src={"/assets/icons/search.svg"}
							alt={"Search Icon"}
							width={1000}
							height={1000}
							className={`w-[20px] h-[20px] ${
								pathname === "/" && "invert"
							}`}
						/>
					</Button>

					<SignedIn>
						<ProfileDropdown />
					</SignedIn>
					<SignedOut>
						<Button variant={"ghost"} asChild>
							<Link href="/sign-in">Login</Link>
						</Button>
						<Button asChild>
							<Link href="/sign-up">Join us</Link>
						</Button>
					</SignedOut>
				</div>
				<div className="flex gap-3 md:hidden">
					<SignedIn>
						<ProfileDropdown />
					</SignedIn>
					<SignedOut>
						<Button asChild>
							<Link href="/sign-in">Login</Link>
						</Button>
						<Button
							asChild
							variant={"ghost"}
							className={`${
								color === "black" ? "text-black" : "text-white"
							}`}
						>
							<Link href="/sign-up">Join us</Link>
						</Button>
					</SignedOut>
					<MobileNavbar />
				</div>
			</header>
		</div>
	);
};

export default Header;
