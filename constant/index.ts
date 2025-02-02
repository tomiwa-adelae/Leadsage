import {
	Building,
	CircleDollarSign,
	CreditCard,
	HandHelping,
	Heart,
	House,
	LaptopMinimal,
	Mail,
	MapPin,
	Medal,
	MessageSquareText,
	MessagesSquare,
	NotebookText,
	Phone,
	Receipt,
	ScrollText,
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
		number: 20,
		suffix: "+",
		title: "Total houses",
	},
	{
		number: 50,
		suffix: "+",
		title: "Apartments",
	},
	{
		number: 3,
		suffix: "+",
		title: "Estates",
	},
	{
		number: 10,
		suffix: "+",
		title: "Completed projects",
	},
];

export const needSomethingDetails = [
	{
		icon: LaptopMinimal,
		title: "Post a Property",
		description:
			"Listing your building is simple and free. Just add a title, description, and property details, and you're all set to reach potential tenants.",
	},
	{
		icon: CreditCard,
		title: "Pay Safely",
		description:
			"Enjoy secure and easy payment options when renting or purchasing properties through our platform, ensuring peace of mind for both tenants and landlords.",
	},
	{
		icon: Building,
		title: "Choose the Right Space",
		description:
			"Find the ideal property that fits your needs—whether you're looking to rent, buy, or invest. Our listings cater to all budgets and preferences.",
	},
	{
		icon: HandHelping,
		title: "We're Here to Help",
		description:
			"Need assistance? Our team is always available to guide you through the process, whether you're posting a listing, making a payment, or choosing the perfect home.",
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
	"Explore a wide range of homes, apartments, and commercial spaces",
	"Find properties that match your budget and payment preferences",
	"Enjoy secure transactions, flexible payment plans, and expert support",
];

export const yourFingerTipsDetails = [
	{
		icon: Medal,
		title: "Verified Listings",
		description:
			"Browse through high-quality properties with verified details, real images, and trusted landlords.",
	},
	{
		icon: CircleDollarSign,
		title: "No Hidden Costs",
		description:
			"Explore, inquire, and negotiate with property owners—pay only when you secure your ideal home.",
	},
	{
		icon: ShieldCheck,
		title: "Safe & Secure",
		description:
			"Enjoy a seamless and secure experience with protected transactions, data privacy, and 24/7 support.",
	},
];

export const aboutStats = [
	{
		stats: "4.8/5",
		title: "Average rating from satisfied tenants and property owners.",
	},
	{
		stats: "96%",
		title: "Of users successfully find their ideal home or tenant through Leadsage.",
	},
	{
		stats: "Excellence",
		title: "Proudly rated as a top real estate platform for seamless property rentals and listings.",
	},
];

export const testimonials = [
	{
		quote: "Leadsage made finding our dream home a breeze! The platform was easy to navigate, and we found a place that perfectly fit our budget and needs. Highly recommend!",
		name: "Jessica & John",
		designation: "New Tenants",
		src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		quote: "As a landlord, listing my property on Leadsage was simple and quick. I received inquiries almost immediately, and the whole process was smooth and professional.",
		name: "Michael",
		designation: "Landlord",
		src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		quote: "I was struggling to find an affordable space for my business until I found Leadsage. The wide range of options and filters made it easy to choose the right commercial space.",
		name: "Victor",
		designation: "Small Business Owner",
		src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		quote: "Leadsage's verified listings and secure payment system gave me the confidence to rent my first apartment. I had all my questions answered quickly by their support team.",
		name: "Ahmed",
		designation: "Tenant",
		src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

export const aboutTestimonies = [
	{
		image: "/assets/images/israel-ibitoye.jpg",
		alt: "Israel Ibitoye wearing a black shirt and an ash pant trousers",
		name: "Israel Ibitoye",
		portfolio: "Chief Executive Officer",
	},
	{
		image: "/assets/images/tomiwa-adelae.jfif",
		alt: "Tomiwa Adelae wearing a blue native shirt and a beautiful smile",
		name: "Tomiwa Adelae",
		portfolio: "Chief Technical Officer",
	},
];

export const faqs = [
	{
		question: "How does Leadsage Africa work?",
		answer: "Leadsage Africa connects tenants with verified property listings and helps landlords manage their rentals. Simply search for properties, filter by location and price, and contact the property owner or agent directly.",
	},
	{
		question: "Are all property listings verified?",
		answer: "Yes, we prioritize transparency by verifying listings to ensure they are legitimate and accurately represented. Properties with a verification badge have been reviewed for authenticity.",
	},
	{
		question: "Can I list my property on Leadsage?",
		answer: "Absolutely! If you're a landlord or agent, you can create an account and list your property with details, images, and pricing. Our platform also provides tools to track inquiries and manage rent collection.",
	},
	{
		question: "Does Leadsage offer flexible payment plans?",
		answer: "Yes, some properties offer flexible payment options, including monthly, quarterly, and annual payment plans. You can use filters to find listings that match your preferred payment structure.",
	},
	{
		question: "Is it free to browse properties?",
		answer: "Yes! Browsing properties on Leadsage is completely free. You only pay when you decide to rent or buy a property through the platform.",
	},
	{
		question: "How can I contact customer support?",
		answer: "You can reach our support team via live chat, email, or phone. We’re available 24/7 to assist with any inquiries, disputes, or technical issues.",
	},
];

export const contactDetails = [
	{
		icon: MapPin,
		title: "Address",
		description:
			"51A, Agboola Ajumobi, Magodo GRA, Phase 1, Shangisha, Lagos State, Nigeria.",
	},
	{
		icon: Phone,
		title: "Phone",
		description: "(+234) 802 2425 763",
	},
	{
		icon: Mail,
		title: "Email",
		description: "hello@leadsage.com",
	},
];

export const dashboardLinks = [
	{
		title: "Dashboard",
		route: "/dashboard",
		icon: House,
	},
	{
		title: "My Proposal",
		route: "/proposal",
		icon: NotebookText,
	},
	{
		title: "Saved",
		route: "/saved",
		icon: Heart,
	},
	{
		title: "Messages",
		route: "/messages",
		icon: MessagesSquare,
	},
	{
		title: "Reviews",
		route: "/reviews",
		icon: MessageSquareText,
	},
	{
		title: "Payouts",
		route: "/payouts",
		icon: Receipt,
	},
	{
		title: "Statements",
		route: "/statements",
		icon: ScrollText,
	},
];

export const popularProperties = [
	{
		title: "Maila",
		image: "https://res.cloudinary.com/spleetng/image/upload/q_20/v1729581280/rnzbp2rmxcdxpsog6d2v.jpg",
		location: "Shomolu, Lagos",
		price: "750,000",
	},
	{
		title: "WOLS",
		image: "https://res.cloudinary.com/spleetng/image/upload/q_20/v1734418121/ydrh14s3vxvbpamxd7rr.jpg",
		location: "Lagos",
		price: "600,000",
	},
	{
		title: "VHA",
		image: "https://res.cloudinary.com/spleetng/image/upload/q_20/v1727690576/yekwmi6mfrlaqpm06thl.jpg",
		location: "Oniru, VI, Lagos",
		price: "3,750,000",
	},
	{
		title: "Lily",
		image: "https://res.cloudinary.com/spleetng/image/upload/q_20/v1727435596/d5muum4wbnlwihciv4pu.jpg",
		location: "Lekki Phase 1, Lagos",
		price: "1,8050,000",
	},
	{
		title: "AURURA A",
		image: "https://res.cloudinary.com/spleetng/image/upload/q_20/v1708693119/lrnciug7fref3oumapam.jpg",
		location: "Lagos",
		price: "1,450,000",
	},
	{
		title: "Frisco 2",
		image: "https://res.cloudinary.com/spleetng/image/upload/q_20/v1730974308/jlnnomttdfm0akwepywo.jpg",
		location: "Lekki, Lagos",
		price: "540,000",
	},
	{
		title: "Richard House",
		image: "https://res.cloudinary.com/spleetng/image/upload/q_20/v1727082180/l5lz2bsug4mglwasrhtj.jpg",
		location: "Abraham Estate, Ajah, Lagos",
		price: "750,000",
	},
	{
		title: "5 Bedroom Flat",
		image: "https://pictures-nigeria.jijistatic.net/165430816_MzAwLTUzMy02OTg4Y2RjOGU0.webp",
		location: "Ajah, Lagos",
		price: "25,000,000",
	},
	{
		title: "4 Bedroom Townhouse",
		image: "https://pictures-nigeria.jijistatic.net/161698331_MzAwLTIyNS02OTcyZjE0MGI0.webp",
		location: "Banana Island, Ikoyi, Lagos",
		price: "60,000,000",
	},
];
