import { Building, CreditCard, HandHelping, LaptopMinimal } from "lucide-react";

export const categories: {
	title: string;
	href: string;
}[] = [
	{
		title: "Apartments",
		href: "/categories/apartments",
	},
	{
		title: "Villas",
		href: "/categories/villas",
	},
	{
		title: "Commercial spaces",
		href: "/categories/commercial-spaces",
	},
	{
		title: "Shared housing",
		href: "/categories/shared-housing",
	},
];

export const navLinks = [
	{
		title: "Home",
		route: "/",
	},
	{
		title: "About us",
		route: "/about",
	},
	{
		title: "Contact us",
		route: "/contact",
	},
	{
		title: "Our categories",
		route: "/categories",
	},
];

export const homeStats = [
	{
		number: 834,
		suffix: "M",
		title: "Total houses",
	},
	{
		number: 4,
		suffix: "M",
		title: "Apartments",
	},
	{
		number: 20,
		suffix: "+",
		title: "Estates",
	},
	{
		number: 400,
		suffix: "M",
		title: "Completed projects",
	},
];

export const needSomethingDetails = [
	{
		icon: LaptopMinimal,
		title: "Post a Building",
		description:
			"It’s free and easy to post a job. Simply fill in a title, description.",
	},
	{
		icon: CreditCard,
		title: "Pay safely",
		description:
			"It’s free and easy to post a job. Simply fill in a title, description.",
	},
	{
		icon: Building,
		title: "Choose a Building",
		description:
			"It’s free and easy to post a job. Simply fill in a title, description.",
	},
	{
		icon: HandHelping,
		title: "We're here to help",
		description:
			"It’s free and easy to post a job. Simply fill in a title, description.",
	},
];
