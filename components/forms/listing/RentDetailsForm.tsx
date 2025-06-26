"use client";
import { RentDetailsFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React from "react";
import { CalendarIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import RequiredAsterisk from "@/components/shared/RequiredAsterisk";
import Link from "next/link";
import { addListingRentDetails } from "@/lib/actions/list.actions";

type FormValues = z.infer<typeof RentDetailsFormSchema>;

interface RentDetailsProps {
	userId: string;
	listingId: string;
	bathrooms?: string;
	bedrooms?: string;
	description?: string;
	squareMeters?: string;
}

export const RentDetailsForm: React.FC<RentDetailsProps> = ({
	userId,
	listingId,
	description,
	squareMeters,
	bedrooms,
	bathrooms,
}) => {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(RentDetailsFormSchema),
		defaultValues: {
			description,
			bedrooms,
			// squareMeters,
			bathrooms,
		},
	});

	async function onSubmit(data: z.infer<typeof RentDetailsFormSchema>) {
		try {
			const res = await addListingRentDetails({
				userId,
				listingId,
				...data,
			});
			if (res.status === 400)
				return toast({ title: res.message, variant: "destructive" });
			toast({
				title: res.message,
			});
			return router.push(`/create-listing/${res?.listing?._id}/media`);
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	}

	return (
		<div className="py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
			<div className="mb-6">
				<h3 className="text-lg mb-1 font-semibold text-primary">
					Let’s Talk About the Property
				</h3>
				<p className="text-base text-muted-foreground">
					Provide key rental details to help renters understand the
					size, features, and availability of your property.
				</p>
			</div>
			<Form {...form}>
				<form
					// @ts-ignore
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					{/* <FormField
						control={form.control}
						name="squareMeters"
						render={({ field }) => (
							<FormItem className="col-span-2 md:col-span-1">
								<FormLabel>Square meters</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											placeholder="Enter the total size of the property."
											{...field}
										/>
										<span className="absolute text-gray-400 top-[50%] right-[2%] translate-y-[-50%] text-muted-foreground">
											sq. ft
										</span>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					<FormField
						control={form.control}
						name="availabilityDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>
									Available from <RequiredAsterisk />
								</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full rounded-md h-14 justify-start text-base normal-case pl-3 text-left font-medium",
													!field.value &&
														"text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											// @ts-ignore
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date: any) =>
												date < new Date()
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="bedrooms"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Total bedrooms <RequiredAsterisk />
									</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
										}}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="How many bedrooms does the apartment have?" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Array.from(
												{ length: 15 },
												(_, index) => (
													<SelectItem
														key={index + 1}
														value={`${index + 1}`}
													>
														{index + 1}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="bathrooms"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Total bathrooms <RequiredAsterisk />
									</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
										}}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="How many bathrooms does the apartment have?" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Array.from(
												{ length: 15 },
												(_, index) => (
													<SelectItem
														key={index + 1}
														value={`${index + 1}`}
													>
														{index + 1}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Description <RequiredAsterisk />
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Include anything you'd want renters to know (e.g., furnishing, nearby landmarks, or rules)."
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-between mt-6">
						<Button asChild size="lg" variant="outline">
							<Link
								href={`/create-listing/${listingId}/property-information`}
							>
								Back
							</Link>
						</Button>
						<Button
							disabled={form.formState.isSubmitting}
							size="lg"
							type="submit"
							className="ml-2"
						>
							{form.formState.isSubmitting
								? "Saving..."
								: "Continue"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
