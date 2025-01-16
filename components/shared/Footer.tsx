import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import { footerLinks } from "@/constant";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="bg-green-700 text-white">
			<div className="container">
				<div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between py-8">
					<div className="flex items-center justify-start gap-4 font-semibold text-sm">
						<Link href="/terms-of-services">Terms of Services</Link>
						<Link href="/privacy-policy">Privacy Policy</Link>
						<Link href="/site-map">Site Map</Link>
					</div>
					<div className="flex items-center justify-end gap-4">
						<p className="font-semibold text-sm">Follow us</p>
						<div className="flex items-center justify-end gap-4 text-white">
							<Link href="/facebook.com">
								<Facebook className="w-4 h-4" />
							</Link>
							<Link href="/facebook.com">
								<Twitter className="w-4 h-4" />
							</Link>
							<Link href="/facebook.com">
								<Instagram className="w-4 h-4" />
							</Link>
							<Link href="/facebook.com">
								<Linkedin className="w-4 h-4" />
							</Link>
						</div>
					</div>
				</div>
				<Separator className="bg-gray-400" />
				<div className="py-8 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
					{footerLinks.map(({ title, links }, index) => (
						<div key={index}>
							<h4 className="font-semibold text-base text-white">
								{title}
							</h4>
							<ul className="space-y-6 text-xs mt-6 text-gray-200">
								{links.map(({ title, route }, index) => (
									<li key={index}>
										<Link href={route}>{title}</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<Separator className="bg-gray-400" />
				<div className="py-8">
					<p className="text-sm font-medium text-gray-300">
						&copy; {year} Leadsage. All Rights Reserved
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
