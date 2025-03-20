import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
	console.log(error);
};

export const formatMoneyInput = (inputValue: any) => {
	let value = inputValue.replace(/[^0-9.]/g, "");
	let [whole, decimal] = value.split(".");
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
};
