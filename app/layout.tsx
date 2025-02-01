import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
	title: "Leadsage",
	description:
		"Leadsage: Your trusted housing agency to find apartments, houses, and commercial spaces. Explore properties by category, price, and location to discover your perfect home effortlessly.",
};

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${montserrat.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
