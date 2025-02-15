"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dashboardLinks, dashboardMemberLinks } from "@/constant";
import { Inknut_Antiqua } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<div className="hidden bg-white fixed left-0 top-0 h-screen lg:flex w-[300px] flex-col z-50">
			<ScrollArea>
				<div className="py-6">
					<h3
						className={`container uppercase font-bold text-xl lg:text-2xl hover:text-green-400 transition ease-out ${inknut.className}`}
					>
						<Link href={"/"}>Leadsage</Link>
					</h3>
					<div className="grid gap-4 mt-8">
						{dashboardLinks.map(({ title, links }, index) => (
							<div key={index}>
								<h4 className="uppercase text-sm font-medium text-gray-400 container">
									{title}
								</h4>
								<div className="grid gap-2 mt-4 mr-8">
									{links.map(
										({ slug, icon, title }, index) => {
											const isActive =
												pathname === slug ||
												pathname.startsWith(`${slug}/`);
											return (
												<Link
													className={`flex items-center gap-3 justify-start py-4 px-4 rounded-r-sm ${
														isActive &&
														"text-white font-semibold bg-green-400"
													} hover:bg-green-400 hover:text-white  transition-all text-xs uppercase font-medium`}
													href={slug}
													key={index}
												>
													<Image
														src={icon}
														alt={title}
														width={1000}
														height={1000}
														className="w-[25px] h-[25px]"
													/>
													<p>{title}</p>
												</Link>
											);
										}
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};

export default Sidebar;
