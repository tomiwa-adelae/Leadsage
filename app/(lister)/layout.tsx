"use client";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const pathname = usePathname();
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const authenticatedUser = localStorage.getItem("user");

		if (!authenticatedUser) {
			router.push("/login");
			return;
		}

		const parsedUser = JSON.parse(authenticatedUser);
		setUser(parsedUser);

		// Define access control based on `isRenter` status
		const renterOnlyPages = ["/listings", "create-listing"];
		const memberOnlyPages = ["/browse-properties", "/saved-listings"];

		if (parsedUser.isRenter) {
			// If a renter tries to access member-only pages, redirect them
			if (memberOnlyPages.includes(pathname)) {
				router.push("/not-authorized");
			}
		} else {
			// If a member tries to access renter-only pages, redirect them
			if (renterOnlyPages.includes(pathname)) {
				router.push("/not-authorized");
			}
		}
	}, [router, pathname]);

	return (
		<div className="bg-gray-100">
			<Sidebar user={user} />
			<div className="lg:ml-[300px]">
				<TopNavbar user={user} />
				<div className="min-h-screen pt-8">
					<div className="container">{children}</div>
					<Footer />
				</div>
			</div>
		</div>
	);
}
