import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="bg-gray-100">
			<Sidebar />
			<div className="lg:ml-[300px]">
				<TopNavbar />
				<div className="min-h-screen pt-8">
					<div className="container">{children}</div>
					<Footer />
				</div>
			</div>
		</div>
	);
}
