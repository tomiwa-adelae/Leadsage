import { Input } from "@/components/ui/input";
import { BellRing, Heart, Mail, Search } from "lucide-react";
import { Inknut_Antiqua } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MobileNavbar } from "./MobileNavbar";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});
const Header = () => {
	return (
		<header
			className={`py-4 container flex items-center justify-between gap-10`}
		>
			<h3
				className={`uppercase font-bold text-xl lg:text-2xl hover:text-green-400 transition ease-out ${inknut.className}`}
			>
				<Link href={"/"}>Leadsage</Link>
			</h3>
			<div className="flex-1 hidden lg:block">
				<div className="relative max-w-lg">
					<Input
						type="text"
						placeholder="What are you looking for today?"
						className="pl-8 w-full"
					/>
					<Search className="absolute text-gray-600 top-[50%] right-[3%] translate-x-[-3%] translate-y-[-50%] w-5 h-5" />
				</div>
			</div>
			<div className="flex items-center justify-center gap-4 text-gray-600">
				<div className="hidden md:flex items-center justify-center gap-8 mr-4">
					<Link href="/">
						<BellRing absoluteStrokeWidth className="w-5 h-5" />
					</Link>
					<Link href="/">
						<Mail absoluteStrokeWidth className="w-5 h-5" />{" "}
					</Link>
					<Link href="/">
						<Heart absoluteStrokeWidth className="w-5 h-5" />{" "}
					</Link>
				</div>
				<Image
					src={"/assets/images/user.jpg"}
					alt={"Profile picture"}
					width={1000}
					height={1000}
					className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-cover rounded-full"
				/>
				<div className="lg:hidden">
					<MobileNavbar />
				</div>
			</div>
		</header>
	);
};

export default Header;
