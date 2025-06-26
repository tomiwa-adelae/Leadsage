"use client";
import { AmenitiesFormSchema } from "@/lib/validations";
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
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import RequiredAsterisk from "@/components/shared/RequiredAsterisk";
import { amenities } from "@/constant";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addListingAmenities } from "@/lib/actions/list.actions";

type FormValues = z.infer<typeof AmenitiesFormSchema>;

interface AmenitiesProps {
	userId: string;
	listingId: string;
}

export const AmenitiesForm: React.FC<AmenitiesProps> = ({
	userId,
	listingId,
}) => {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(AmenitiesFormSchema),
	});

	async function onSubmit(data: z.infer<typeof AmenitiesFormSchema>) {
		try {
			const formatted = data.amenities.map((item) => ({ name: item }));
			const res = await addListingAmenities({
				userId,
				listingId,
				amenities: formatted,
			});
			if (res.status === 400)
				return toast({ title: res.message, variant: "destructive" });
			toast({
				title: res.message,
			});
			return router.push(`/create-listing/${res?.listing?._id}/policies`);
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
					Highlight Your Amenities
				</h3>
				<p className="text-base text-muted-foreground">
					Let renters know what makes your apartment stand out. Select
					the features and facilities your space offers to enhance
					visibility and attract the right audience.
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
						name="amenities"
						render={({ field }) => (
							<FormItem className="grid gap-4">
								{amenities.map((amenities, index) => (
									<div>
										<FormLabel className="mb-4">
											{amenities.title}{" "}
											{amenities.required && (
												<RequiredAsterisk />
											)}
										</FormLabel>
										<div className="flex flex-wrap gap-8">
											{amenities.amenities.map(
												(amenity) => {
													const selectedValues: string[] =
														field.value || [];

													return (
														<FormField
															key={amenity.id}
															control={
																form.control
															}
															name="amenities"
															render={() => (
																<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
																	<FormControl>
																		<Checkbox
																			checked={selectedValues.includes(
																				amenity.label
																			)}
																			onCheckedChange={(
																				checked
																			) => {
																				const updatedLaundry =
																					checked
																						? [
																								...selectedValues,
																								amenity.label,
																						  ]
																						: selectedValues.filter(
																								(
																									value
																								) =>
																									value !==
																									amenity.label
																						  );

																				field.onChange(
																					updatedLaundry
																				);
																			}}
																		/>
																	</FormControl>
																	<FormLabel className="font-normal text-base">
																		{
																			amenity.label
																		}
																	</FormLabel>
																</FormItem>
															)}
														/>
													);
												}
											)}
										</div>
									</div>
								))}
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-between mt-6">
						<Button asChild size="lg" variant="outline">
							<Link href={`/create-listing/${listingId}/media`}>
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
