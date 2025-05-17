"use client";
import { LoaderCircle, User } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { confirmRole } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ChooseAccountForm = () => {
	const { user } = useUser();
	const router = useRouter();

	const { toast } = useToast();

	const [loading, setLoading] = useState<boolean>(false);

	const userId: any = user?.publicMetadata.userId;

	const chooseRole = async (role: string) => {
		try {
			setLoading(true);
			const res = await confirmRole(role, userId);

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
			setLoading(false);

			if (res?.data.isRenter) {
				router.push("/dashboard");
			} else {
				router.push(`/`);
			}
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] border-green-400 p-12 rounded-xl w-full lg:max-w-lg mx-auto bg-white mt-20">
				<div>
					<div className="flex items-center justify-start gap-4">
						<div className="rounded-full p-3 bg-green-400 inline-block">
							<User
								absoluteStrokeWidth
								className="w-6 h-6 text-white"
							/>
						</div>
						<h5 className="text-base font-semibold">
							Join as a member
						</h5>
					</div>
					<p className="text-sm leading-loose my-3 text-gray-700">
						As a Leadsage member, you can view and subscribe to
						spaces listed on Leadsage. You can switch this account
						to access host benefits.
					</p>
					<Button
						disabled={loading}
						onClick={() => chooseRole("member")}
						size={"md"}
						className="mt-2"
					>
						{loading ? (
							<LoaderCircle className="animate-spin" />
						) : (
							"Continue as member"
						)}
					</Button>
				</div>
				<Separator className="my-8" />
				<div>
					<div className="flex items-center justify-start gap-4">
						<div className="rounded-full p-3 bg-blue-400 inline-block">
							<User
								absoluteStrokeWidth
								className="w-6 h-6 text-white"
							/>
						</div>
						<h5 className="text-base font-semibold">
							Join as a landlord
						</h5>
					</div>
					<p className="text-sm leading-loose my-3 text-gray-700">
						As a Leadsage Host, you can list spaces and earn on
						Leadsage. You can switch this account to access member
						benefits.
					</p>
					<Button
						disabled={loading}
						size={"md"}
						className="mt-2 bg-blue-400 hover:bg-blue-400/90"
						onClick={() => chooseRole("host")}
					>
						{loading ? <LoaderCircle /> : "Continue as host"}
					</Button>
				</div>
			</div>
		</>
	);
};

export default ChooseAccountForm;
