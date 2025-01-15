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
import { Search } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constant";
import { Separator } from "../ui/separator";

const FormSchema = z.object({
	keyword: z.string().min(2, {
		message: "Search must be at least 2 characters.",
	}),
	category: z.string().min(2, {
		message: "Category must be at least 2 characters.",
	}),
});

export function ShowcaseSearchForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			keyword: "",
			category: "",
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
		<div className="bg-white text-black rounded-sm md:rounded-full p-6 py-5 mt-8">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col items-center justify-between md:flex-row gap-4"
				>
					<FormField
						control={form.control}
						name="keyword"
						render={({ field }) => (
							<FormItem className="flex-1 w-full">
								<FormControl>
									<div className="relative">
										<Input
											placeholder="What are you looking for?"
											{...field}
											className="pl-7 border-none"
										/>
										<Search className="absolute text-gray-400 top-[50%] left-[0%] translate-y-[-50%] w-4 h-4" />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem className="flex-1 md:border-l md:pl-8 w-full">
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="border-none">
											<SelectValue placeholder="Choose Category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categories.map((category, index) => (
											<SelectItem value={category.title}>
												{category.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className="w-full md:w-auto"
						size={"lg"}
						type="submit"
					>
						Search
					</Button>
				</form>
			</Form>
		</div>
	);
}
