"use client";
import { Inknut_Antiqua } from "next/font/google";
import { Button } from "../ui/button";
import Link from "next/link";
import { NavigationDropdowns } from "./NavigationDropdowns";
import { MobileNavbar } from "./MobileNavbar";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
					<Button asChild>
						<Link href="/register">Join us</Link>
					</Button>
				</div>
				<div className="flex gap-0.5 md:hidden">
					<Button
						asChild
						variant={"ghost"}
						className={`${
							color === "black" ? "text-black" : "text-white"
						}`}
					>
						<Link href="/register">Join us</Link>
					</Button>
					<MobileNavbar />
				</div>
			</header>
		</div>
	);
};

export default Header;
