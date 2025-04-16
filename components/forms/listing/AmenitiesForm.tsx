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

type FormValues = z.infer<typeof AmenitiesFormSchema>;

interface AmenitiesProps {
	nextStep: () => void;
	prevStep: () => void;
	handleChange: (
		input: keyof FormValues
	) => (e: string | React.ChangeEvent<HTMLInputElement>) => void;
	values: FormValues;
}

const AmenitiesForm: React.FC<AmenitiesProps> = ({
	nextStep,
	prevStep,
	handleChange,
	values,
}) => {
	const [loading, setLoading] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(AmenitiesFormSchema),
		defaultValues: values, // ✅ Pre-fill values when going back
	});

	const onSubmit = form.handleSubmit(
		(data) => {
			// nextStep();
			console.log(data);
		},
		(errors) => {}
	);

	return (
		<div className="py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
			<div className="mb-6">
				<h3 className="text-lg uppercase mb-1 font-semibold text-primary">
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
																				handleChange(
																					"amenities"
																				)(
																					// @ts-ignore
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
						<Button size="lg" onClick={prevStep} variant="outline">
							Back
						</Button>
						<Button
							disabled={loading}
							size="lg"
							type="submit"
							className="ml-2"
						>
							{loading ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin transition-all" />
								</>
							) : (
								"Continue"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AmenitiesForm;
