import { PolicyFormSchema } from "@/lib/validations";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type FormValues = z.infer<typeof PolicyFormSchema>;

interface AmenitiesProps {
	nextStep: () => void;
	prevStep: () => void;
	handleChange: (
		input: keyof FormValues
	) => (e: string | React.ChangeEvent<HTMLInputElement>) => void;
	values: FormValues;
}

const PolicyForm: React.FC<AmenitiesProps> = ({
	nextStep,
	prevStep,
	handleChange,
	values,
}) => {
	const [loading, setLoading] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(PolicyFormSchema),
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
					Set Your Property Policies
				</h3>
				<p className="text-base text-muted-foreground">
					Define the house rules and expectations for your property.
					Clear policies help you attract the right renters, prevent
					misunderstandings, and ensure a smooth rental experience for
					both parties.
				</p>
			</div>
			<Form {...form}>
				<form
					// @ts-ignore
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="petPolicy"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Pet policy</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											handleChange("petPolicy")(value);
										}}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select your pet policy" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={"Yes"}>
												Yes
											</SelectItem>
											<SelectItem value={"No"}>
												No
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="smokingPolicy"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Smoking Policy</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											handleChange("smokingPolicy")(
												value
											);
										}}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select your smoking policy" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={"Yes"}>
												Yes
											</SelectItem>
											<SelectItem value={"No"}>
												No
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
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

export default PolicyForm;
