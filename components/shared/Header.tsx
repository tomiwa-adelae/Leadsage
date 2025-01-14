import { Inknut_Antiqua } from "next/font/google";
import { Button } from "../ui/button";
import Link from "next/link";
import { NavigationDropdowns } from "./NavigationDropdowns";
import { Search } from "lucide-react";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const Header = () => {
	return (
		<header className="py-6 container flex items-center justify-between">
			<h3
				className={`uppercase font-bold text-white text-lg ${inknut.className}`}
			>
				Leadsage
			</h3>
			<NavigationDropdowns />
			<div className="flex gap-4">
				<Button variant={"ghost"} className="text-white" size={"icon"}>
					<Search />
				</Button>
				<Button asChild variant={"ghost"} className="text-white">
					<Link href="/signin">Sign in</Link>
				</Button>
				<Button asChild>
					<Link href="/register">Join</Link>
				</Button>
			</div>
		</header>
	);
};

export default Header;
