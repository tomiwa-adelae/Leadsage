"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

const FormSchema = z.object({
	newPassword: z.string().min(6, {
		message: "New password must be at least 6 characters.",
	}),
	confirmPassword: z.string().min(6, {
		message: "Confirm password must be at least 6 characters.",
	}),
});

export function ResetPasswordForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			),
		});
	}

	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] border-green-400 p-12 rounded-xl w-full lg:max-w-lg mx-auto bg-white mt-20">
			<div className="mb-6">
				<h3 className="text-gray-900 font-semibold text-xl leading-normal">
					We're glad to help you!
				</h3>
				<p className="text-gray-700 text-sm leading-loose my-4">
					Create a new password for your account
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your new password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your new password again"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full" size={"lg"} type="submit">
						Continue <MoveUpRight />
					</Button>
				</form>
			</Form>
		</div>
	);
}
