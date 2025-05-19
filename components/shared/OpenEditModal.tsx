"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { updateListing } from "@/lib/actions/list.actions";
import { toast } from "@/hooks/use-toast";
import {
	formatMoneyInput,
	formattedApartmentTypes,
	removeCommas,
} from "@/lib/utils";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function OpenEditModal({
	id,
	open,
	type,
	closeModal,
	editValue,
	userId,
	isNumber = false,
	isDate = false,
}: {
	id: string;
	open: boolean;
	closeModal: () => void;
	type: string;
	editValue: string | any;
	userId: string;
	isNumber?: boolean;
	isDate?: boolean;
}) {
	const isLocationEdit = type === "location";

	// State
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState(editValue);
	const [date, setDate] = useState<Date>();

	const [updatedAddress, setUpdatedAddress] = useState(
		isLocationEdit ? editValue?.address : ""
	);
	const [updatedCity, setUpdatedCity] = useState(
		isLocationEdit ? editValue?.city : ""
	);
	const [updatedState, setUpdatedState] = useState(
		isLocationEdit ? editValue?.state : ""
	);

	// Handle numeric input restrictions
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (isNumber && ["e", "E", "-", "+"].includes(event.key)) {
			event.preventDefault();
		}
	};

	// Handle input changes (including formatted numbers)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value;

		if (isNumber) {
			// Remove leading zeros (unless followed by a decimal point)
			if (
				inputValue.startsWith("0") &&
				inputValue.length > 1 &&
				inputValue[1] !== "."
			) {
				inputValue = inputValue.slice(1);
			}

			// Restrict input to numbers and a single decimal point
			inputValue = inputValue.replace(/[^0-9.]/g, "");
			const parts = inputValue.split(".");
			if (parts.length > 2)
				inputValue = parts.shift() + "." + parts.join("");
			if (parts[1])
				inputValue = `${parts[0]}.${parts[1].substring(0, 2)}`;

			setValue(formatMoneyInput(inputValue));
		} else {
			setValue(inputValue);
		}
	};

	// Handle form submission
	const handleSubmit = async () => {
		try {
			setLoading(true);

			const payload: any = {
				type,
				userId,
				listingId: id,
			};

			if (isNumber) {
				payload.value = removeCommas(value);
			} else if (isDate) {
				payload.value = date;
			} else if (isLocationEdit) {
				payload.address = updatedAddress;
				payload.city = updatedCity;
				payload.state = updatedState;
			} else {
				payload.value = value;
			}

			// const res = await updateListing(payload);

			// if (res?.status === 400) {
			// 	toast({
			// 		title: "Error!",
			// 		description: res?.message,
			// 		variant: "destructive",
			// 	});
			// 	return;
			// }

			// toast({ title: "Success!", description: res?.message });
			// closeModal();
		} catch (error) {
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
						{/* Textarea for description */}
						{type === "description" && !isDate ? (
							<Textarea
								value={value}
								onChange={(e) => setValue(e.target.value)}
								placeholder={`Edit ${formattedApartmentTypes[type]}`}
								rows={4}
							/>
						) : (
							!isDate && (
								<Input
									onKeyDown={handleKeyDown}
									value={value}
									onChange={handleChange}
									placeholder={`Edit ${formattedApartmentTypes[type]}`}
								/>
							)
						)}

						{/* Date Picker */}
						{isDate && (
							<Popover modal={false}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"w-full rounded-md h-14 justify-start text-left font-normal",
											!date && "text-muted-foreground"
										)}
									>
										<CalendarIcon />
										{date ? (
											format(date, "PPP")
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0 z-50 pointer-events-auto"
									align="start"
									side="bottom"
									sideOffset={8}
								>
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										initialFocus
										className="pointer-events-auto"
									/>
								</PopoverContent>
							</Popover>
						)}
					</div>

					{/* Action Buttons */}
					<div className="flex items-center justify-between gap-4 mt-4 flex-col md:flex-row w-full">
						<DrawerClose asChild>
							<Button
								size="lg"
								onClick={closeModal}
								variant="outline"
								className="w-full md:w-auto"
							>
								Cancel
							</Button>
						</DrawerClose>
						<Button
							size="lg"
							onClick={handleSubmit}
							disabled={loading}
							className="w-full md:w-auto"
						>
							{loading ? "Submitting..." : "Submit"}
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
