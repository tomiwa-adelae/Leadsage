"use client";
import { Inknut_Antiqua } from "next/font/google";
import { Button } from "../ui/button";
import Link from "next/link";
import { NavigationDropdowns } from "./NavigationDropdowns";
import { MobileNavbar } from "./MobileNavbar";
import { ProfileDropdown } from "./ProfileDropdown";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { getUserInfo } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const Header = ({ color = "white" }: { color?: string }) => {
	const { userId } = useAuth();

	const [user, setUser] = useState<any>();

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUserInfo(userId!);

			setUser(user);
		};

		fetchUser();
	}, []);

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
					<SignedIn>
						<ProfileDropdown userDetails={user} />
					</SignedIn>
					<SignedOut>
						<Button variant={"ghost"} asChild>
							<Link href="/sign-up?type=landlord">
								Become a Landlord
							</Link>
						</Button>
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
						<ProfileDropdown userDetails={user} />
					</SignedIn>
					<SignedOut>
						<Button className="hidden sm:flex" asChild>
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
					<MobileNavbar userDetails={user} />
				</div>
			</header>
		</div>
	);
};

export default Header;
