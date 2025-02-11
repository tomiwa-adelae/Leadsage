import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Inknut_Antiqua } from "next/font/google";
import { MobileNavbar } from "./MobileNavbar";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const TopNavbar = () => {
	return (
		<nav className="py-4 fixed top-0 left-0 lg:left-[270px] w-full lg:w-[calc(100vw-270px)] bg-white shadow-[0px_2px_10px_-2px_rgba(0,0,0,0.1)]">
			<div className="max-w-full px-4 flex items-center justify-between">
				<h3
					className={`lg:hidden uppercase font-bold text-xl lg:text-2xl hover:text-green-400 transition ease-out ${inknut.className}`}
				>
					<Link href={"/"}>Leadsage</Link>
				</h3>
				<div className="flex-1">
					<div className="hidden lg:block relative bg-yellow-300">
						<Input
							type="text"
							placeholder="Search houses, categories..."
							className="pl-8 w-full"
						/>
						<Search className="absolute text-gray-400 top-[50%] right-[3%] translate-x-[-3%] translate-y-[-50%] w-4 h-4" />
					</div>
				</div>
				<div className="flex-1 flex gap-4 items-center justify-end">
					<div className="hidden lg:flex items-center justify-center gap-8">
						<Link href="/">
							<Image
								src={"/assets/icons/house.svg"}
								alt={"House"}
								width={1000}
								height={1000}
								className="w-[25px] h-[25px]"
							/>
						</Link>
						<Link href="/">
							<Image
								src={"/assets/icons/house.svg"}
								alt={"House"}
								width={1000}
								height={1000}
								className="w-[25px] h-[25px]"
							/>
						</Link>
						<Link href="/">
							<Image
								src={"/assets/icons/house.svg"}
								alt={"House"}
								width={1000}
								height={1000}
								className="w-[25px] h-[25px]"
							/>
						</Link>
					</div>
					<Image
						src={"/assets/images/tomiwa-adelae.jfif"}
						alt={"Tomiwa Adelae"}
						width={1000}
						height={1000}
						className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
					/>
					<div className="lg:hidden">
						<MobileNavbar />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default TopNavbar;
