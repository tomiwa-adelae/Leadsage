import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import TopNavbar from "../(lister)/components/TopNavbar";
import Sidebar from "../(lister)/components/Sidebar";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const user = await getUserInfo(userId!);

	return (
		<div className="bg-[#F7F7F7]">
			<Sidebar user={user} />
			<div className="lg:ml-[300px]">
				<TopNavbar user={user} />
				<div className="min-h-screen pt-8">
					<div className="container">{children}</div>
				</div>
			</div>
		</div>
	);
}
