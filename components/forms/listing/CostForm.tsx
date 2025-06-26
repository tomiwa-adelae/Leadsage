"use client";
import { CostFormSchema } from "@/lib/validations";
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
import React, { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { addListingCost } from "@/lib/actions/list.actions";

type FormValues = z.infer<typeof CostFormSchema>;

interface PropertyInformationProps {
	userId: string;
	listingId: string;
	securityDeposit?: string;
	rent?: string;
	rentNegotiable?: boolean;
}

export const CostForm: React.FC<PropertyInformationProps> = ({
	userId,
	listingId,
	rent,
	securityDeposit,
	rentNegotiable,
}) => {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(CostFormSchema),
		defaultValues: {
			rent: rent || "",
			securityDeposit: securityDeposit || "",
		},
	});

	async function onSubmit(data: z.infer<typeof CostFormSchema>) {
		try {
			const res = await addListingCost({
				userId,
				listingId,
				...data,
			});
			if (res.status === 400)
				return toast({ title: res.message, variant: "destructive" });
			toast({
				title: res.message,
			});
			return router.push(
				`/create-listing/${res?.listing?._id}/final-details`
			);
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
					Set Your Rent & Additional Costs
				</h3>
				<p className="text-base text-muted-foreground">
					Provide details about the rent and any other fees associated
					with your property. Being transparent about costs builds
					trust with potential renters and reduces back-and-forth
					inquiries.
				</p>
			</div>
			<Form {...form}>
				<form
					// @ts-ignore
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="rent"
						render={({ field }) => (
							<FormItem className="col-span-2 md:col-span-1">
								<FormLabel>Yearly rent amount</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g., ₦500,000 per year"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="securityDeposit"
						render={({ field }) => (
							<FormItem className="col-span-2 md:col-span-1">
								<FormLabel>Security deposit</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g., ₦10,000 per year"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="rentNegotiable"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Negotiable rent?</FormLabel>
								<Select
									onValueChange={(value) => {
										field.onChange(value);
									}}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select options" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={"yes"}>
											Yes
										</SelectItem>
										<SelectItem value={"yo"}>No</SelectItem>
									</SelectContent>
								</Select>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-between mt-6">
						<Button asChild size="lg" variant="outline">
							<Link
								href={`/create-listing/${listingId}/policies`}
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
