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
import { LoaderCircle, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { authenticateUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { LoginFormSchema } from "@/lib/validations";
import { useEffect } from "react";

export function LoginForm() {
	const router = useRouter();

	useEffect(() => {
		const authenticatedUser = localStorage.getItem("user");

		if (authenticatedUser) {
			router.push("/");
		}
	}, [router]);

	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
		try {
			const res = await authenticateUser({ ...data });
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

			// Save user information to database
			localStorage.setItem("user", JSON.stringify(res?.user));

			router.push("/");
		} catch (error: any) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	}

	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] border-green-400 p-12 rounded-xl w-full lg:max-w-lg mx-auto bg-white mt-20">
			<div className="mb-6">
				<h3 className="text-gray-900 font-semibold text-xl leading-normal">
					We're glad to see you again!
				</h3>
				<p className="text-gray-700 text-sm leading-loose my-4">
					Don't have an account?{" "}
					<Link
						className="hover:underline text-green-400 font-medium"
						href="/register"
					>
						Sign Up!
					</Link>
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Link
						className="inline-block text-sm font-semibold text-green-400 text-right w-full hover:underline"
						href="/forgot-password"
					>
						Lost your password?
					</Link>
					<Button
						disabled={form.formState.isSubmitting}
						className="w-full"
						size={"lg"}
						type="submit"
					>
						{form.formState.isSubmitting
							? "Logging in..."
							: "Log in"}{" "}
						{form.formState.isSubmitting ? (
							<LoaderCircle className="animate-spin" />
						) : (
							<MoveUpRight />
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
