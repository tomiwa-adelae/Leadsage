"use client";
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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { addListingPolicies } from "@/lib/actions/list.actions";

type FormValues = z.infer<typeof PolicyFormSchema>;

interface AmenitiesProps {
	userId: string;
	listingId: string;
	petPolicy: boolean;
	smokingPolicy: boolean;
}

const PolicyForm: React.FC<AmenitiesProps> = ({
	userId,
	listingId,
	petPolicy,
	smokingPolicy,
}) => {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(PolicyFormSchema),
		defaultValues: {
			petPolicy: petPolicy === true ? "yes" : "no",
			smokingPolicy: smokingPolicy === true ? "yes" : "no",
		},
	});

	async function onSubmit(data: z.infer<typeof PolicyFormSchema>) {
		try {
			const res = await addListingPolicies({
				userId,
				listingId,
				...data,
			});
			if (res.status === 400)
				return toast({ title: res.message, variant: "destructive" });
			toast({
				title: res.message,
			});
			return router.push(`/create-listing/${res?.listing?._id}/cost`);
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
									<FormLabel>Are pets allowed?</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
										}}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select policy" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={"yes"}>
												Yes
											</SelectItem>
											<SelectItem value={"no"}>
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
									<FormLabel>Is smoking allowed?</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
										}}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select policy" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={"yes"}>
												Yes
											</SelectItem>
											<SelectItem value={"no"}>
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
						<Button asChild size="lg" variant="outline">
							<Link
								href={`/create-listing/${listingId}/amenities`}
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

export default PolicyForm;
