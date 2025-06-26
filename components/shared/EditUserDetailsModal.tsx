"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
// import { updateListing } from "@/lib/actions/list.actions";
import { toast } from "@/hooks/use-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { EditUserDetailsSchema } from "@/lib/validations";
import { updateUser } from "@/lib/actions/user.actions";

export function EditUserDetailsModal({
	open,
	closeModal,
	user,
}: {
	open: boolean;
	closeModal: () => void;
	user: any;
}) {
	const form = useForm<z.infer<typeof EditUserDetailsSchema>>({
		resolver: zodResolver(EditUserDetailsSchema),
		defaultValues: {
			phoneNumber: user?.phoneNumber || "",
			city: user?.city || "",
			state: user?.state || "",
			address: user?.address || "",
		},
	});

	async function onSubmit(data: z.infer<typeof EditUserDetailsSchema>) {
		try {
			const payload = {
				userId: user?._id,
				details: {
					phoneNumber: data.phoneNumber || user?.phoneNumber,
					address: data.address || user?.address,
					city: data.city || user?.city,
					state: data.state || user?.state,
				},
			};
			// const res = await updateUser(payload);
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
		}
	}
	return (
		<Drawer open={open} onClose={closeModal}>
			<DrawerContent>
				<div className="mx-auto w-full sm:max-w-sm lg:max-w-lg py-10 container">
					<h4 className="text-sm font-medium">
						Kindly fill in the following basic information to
						proceed
					</h4>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone number</FormLabel>
										<FormControl>
											<PhoneInput
												placeholder="Enter phone number"
												value={field.value}
												onChange={(phone: any) => {
													field.onChange(phone);
												}}
												defaultCountry="NG"
												className="flex h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your address"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your city"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem>
										<FormLabel>State</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your state"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
									disabled={form.formState.isSubmitting}
									type="submit"
									className="w-full md:w-auto"
								>
									{form.formState.isSubmitting
										? "Submitting..."
										: "Submit"}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
