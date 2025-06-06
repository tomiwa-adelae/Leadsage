import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
	console.log(error);
};

export const formatMoneyInput = (inputValue: any) => {
	let value = inputValue?.replace(/[^0-9.]/g, "");
	let [whole, decimal] = value?.split(".");
	whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return decimal !== undefined ? `${whole}.${decimal}` : whole;
};

export function removeCommas(value: any) {
	return value.replace(/,/g, "");
}

export const formattedApartmentTypes: Record<string, string> = {
	name: "name",
	description: "description",
	rentPrice: "monthly price",
	availabilityDate: "availability date",
	address: "address",
	city: "city",
	state: "state",
};

export function formatDate(dateString: string): string {
	const date = new Date(dateString);

	// Get the day, month and year
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	// Function to get the ordinal suffix
	const getOrdinalSuffix = (num: number): string => {
		const suffixes = ["th", "st", "nd", "rd"];
		const modulo100 = num % 100;
		const modulo10 = num % 10;
		const suffix =
			modulo10 <= 3 && modulo10 > 0 && modulo100 !== 11
				? suffixes[modulo10]
				: suffixes[0];
		return `${num}${suffix}`;
	};

	// Format the date
	return `${getOrdinalSuffix(day)} of ${month}, ${year}`;
}

export const getGreeting = () => {
	const currentHour = new Date().getHours();

	if (currentHour >= 5 && currentHour < 12) {
		return "Good morning";
	} else if (currentHour >= 12 && currentHour < 18) {
		return "Good afternoon";
	} else {
		return "Good evening";
	}
};
