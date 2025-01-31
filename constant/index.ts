import {
	Building,
	CircleDollarSign,
	CreditCard,
	HandHelping,
	LaptopMinimal,
	Medal,
	ShieldCheck,
} from "lucide-react";

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

export const footerLinks = [
	{
		title: "About",
		links: [
			{
				title: "Careers",
				route: "/careers",
			},
			{
				title: "Press & News",
				route: "/news",
			},
			{
				title: "Partnership",
				route: "/partnership",
			},
			{
				title: "Privacy Policy",
				route: "/privacy-policy",
			},
			{
				title: "Terms of Service",
				route: "/terms-of-service",
			},
			{
				title: "Investor Relations",
				route: "/investor-relations",
			},
		],
	},
	{
		title: "Categories",
		links: [
			{
				title: "Apartments/Flats",
				route: "/apartments",
			},
			{
				title: "Houses",
				route: "/houses",
			},
			{
				title: "Villas",
				route: "/villas",
			},
			{
				title: "Townhouses",
				route: "/townhouses",
			},
			{
				title: "Shared Housing",
				route: "/shared-housing",
			},
			{
				title: "Office Spaces",
				route: "/office-spaces",
			},
			{
				title: "Retail Spaces",
				route: "/retail-spaces",
			},
			{
				title: "Industrial properties",
				route: "/industrial-properties",
			},
			{
				title: "Land",
				route: "/land",
			},
		],
	},
	{
		title: "Support",
		links: [
			{
				title: "Help & Support",
				route: "/help",
			},
			{
				title: "Trust & Safety",
				route: "/trust-safety",
			},
			{
				title: "Here as a Landlord",
				route: "/landlord",
			},
			{
				title: "Here as a tenant",
				route: "/tenant",
			},
		],
	},
];

export const companies = [
	{
		logo: "/assets/images/icons/amazon.webp",
		name: "Amazon",
	},
	{
		logo: "/assets/images/icons/amd.webp",
		name: "AMD",
	},
	{
		logo: "/assets/images/icons/cisco.webp",
		name: "Cisco",
	},
	{
		logo: "/assets/images/icons/dropcam.webp",
		name: "Dropcam",
	},
	{
		logo: "/assets/images/icons/logitech.webp",
		name: "Logitech",
	},
	{
		logo: "/assets/images/icons/spotify.webp",
		name: "Spotify",
	},
];

export const aboutWorkersBenefits = [
	"Connect to freelancers with proven business experience",
	"Get matched with the perfect talent by a customer success manager",
	"Unmatched quality of remote, hybrid, and flexible jobs",
];

export const yourFingerTipsDetails = [
	{
		icon: Medal,
		title: "Proof of quality",
		description:
			"Check any pro’s work samples, client reviews, and identity verification client reviews, and identity verification.",
	},
	{
		icon: CircleDollarSign,
		title: "No cost until you hire",
		description:
			"Interview potential fits for your job, negotiate rates, and only pay for work you approve",
	},
	{
		icon: ShieldCheck,
		title: "Safe and secure",
		description:
			"Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 support if you need it.",
	},
];

export const aboutStats = [
	{
		stats: "4.9/5",
		title: "Clients rate professionals on Leadsage",
	},
	{
		stats: "96%",
		title: "95% of customers are satisfied through to see their freelancers",
	},
	{
		stats: "Award",
		title: "G2’s 2021 Best Software Awards",
	},
];

export const aboutTestimonies = [
	{
		image: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "Albert Cole",
		portfolio: "Designer",
	},
	{
		image: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "Alison Dawn",
		portfolio: "WP Developer",
	},
	{
		image: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "Daniel Parker",
		portfolio: "Front-end Developer",
	},
];

export const faqs = [
	{
		question: "Is it accessible?",
		answer: "Yes. It adheres to the WAI-ARIA design pattern.",
	},
	{
		question: "Is it animated?",
		answer: "Yes. It's animated by default, but you can disable it if you prefer.",
	},
	{
		question: "Is it styled?",
		answer: "Yes. It comes with default styles that matches the other components aesthetic.",
	},
];
