"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Use textarea for descriptions
import { updateListing } from "@/lib/actions/list.actions";
import { toast } from "@/hooks/use-toast";
import {
	formatMoneyInput,
	formattedApartmentTypes,
	removeCommas,
} from "@/lib/utils";

export function OpenEditModal({
	id,
	open,
	type,
	closeModal,
	editValue,
	userId,
	isNumber,
}: {
	id: string;
	open: boolean;
	closeModal: () => void;
	type: string;
	editValue: string;
	userId: string;
	isNumber?: boolean;
}) {
	const [loading, setLoading] = React.useState(false);
	const [value, setValue] = React.useState(editValue);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (isNumber) {
			if (
				event.key === "e" ||
				event.key === "E" ||
				event.key === "-" ||
				event.key === "+"
			) {
				event.preventDefault();
			}
		}
	};

	const handleChange = (e: any) => {
		if (isNumber) {
			let inputValue = e.target.value;

			// If the input starts with a "0" and is followed by another number, remove the "0"
			if (
				inputValue.startsWith("0") &&
				inputValue.length > 1 &&
				inputValue[1] !== "."
			) {
				inputValue = inputValue.slice(1);
			}

			// Prevent the input from starting with a period
			if (inputValue.startsWith(".")) {
				return;
			}

			inputValue = inputValue.replace(/[^0-9.]/g, "");
			const parts = inputValue.split(".");
			if (parts.length > 2) {
				inputValue = parts.shift() + "." + parts.join("");
			}
			if (parts[1]) {
				parts[1] = parts[1].substring(0, 2);
				inputValue = parts.join(".");
			}
			const formattedValue = formatMoneyInput(inputValue);
			setValue(formattedValue);
		} else {
			setValue(e.target.value);
		}
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const res = await updateListing({
				type,
				value: isNumber ? removeCommas(value) : value,
				userId,
				listingId: id,
			});

			if (res?.status == 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			toast({
				title: "Success!",
				description: res?.message,
			});
			closeModal();
		} catch (error) {
			setLoading(false);
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Drawer open={open} onClose={closeModal}>
			<DrawerContent>
				<div className="mx-auto w-full sm:max-w-sm lg:max-w-lg py-10 container">
					<h4 className="text-sm uppercase font-medium">
						Edit {formattedApartmentTypes[type]}
					</h4>
					<div className="mt-2">
						{type === "description" ? (
							<Textarea
								value={value}
								onChange={(e) => setValue(e.target.value)}
								placeholder={`Edit ${formattedApartmentTypes[type]}`}
								rows={4}
							/>
						) : (
							<Input
								onKeyDown={handleKeyDown}
								value={value}
								onChange={handleChange}
								placeholder={`Edit ${formattedApartmentTypes[type]}`}
							/>
						)}
					</div>
					<div className="flex items-center justify-between gap-4 mt-4 flex-col md:flex-row w-full">
						<DrawerClose asChild>
							<Button
								size={"lg"}
								onClick={closeModal}
								variant="outline"
							>
								Cancel
							</Button>
						</DrawerClose>
						<Button
							size={"lg"}
							onClick={handleSubmit}
							disabled={loading}
						>
							{loading ? "Submitting..." : "Submit"}
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
