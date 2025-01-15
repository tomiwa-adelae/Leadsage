import { Inknut_Antiqua } from "next/font/google";
import { Button } from "../ui/button";
import Link from "next/link";
import { NavigationDropdowns } from "./NavigationDropdowns";
import { Search } from "lucide-react";
import { MobileNavbar } from "./MobileNavbar";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const Header = () => {
	return (
		<header className="py-4 container flex items-center justify-between">
			<h3
				className={`uppercase font-bold text-white text-xl lg:text-2xl hover:text-green-400 transition ease-out ${inknut.className}`}
			>
				<Link href={"/"}>Leadsage</Link>
			</h3>
			<NavigationDropdowns />
			<div className="gap-4 hidden md:flex">
				<Button variant={"ghost"} className="text-white" size={"icon"}>
					<Search />
				</Button>
				<Button asChild>
					<Link href="/register">Join us</Link>
				</Button>
			</div>
			<div className="flex gap-0.5 md:hidden">
				<Button asChild variant={"ghost"} className="text-white">
					<Link href="/register">Join us</Link>
				</Button>
				<MobileNavbar />
			</div>
		</header>
	);
};

export default Header;
