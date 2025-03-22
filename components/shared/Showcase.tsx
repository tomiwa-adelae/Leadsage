import { Inknut_Antiqua } from "next/font/google";
import { Button } from "../ui/button";
import Link from "next/link";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const Showcase = ({
	image,
	title,
	description,
	cta = [],
}: {
	image: string;
	title: string;
	description: string;
	cta?: { slug: string; title: string }[];
}) => {
	return (
		<div className="py-14">
			<div
				className="rounded-3xl bg-blend-overlay bg-scroll bg-no-repeat bg-cover bg-center h-80"
				style={{
					backgroundImage: `url(${image})`,
				}}
			>
				<div className="container text-white flex flex-col items-start justify-center h-full gap-4">
					<h1
						className={`text-2xl md:text-3xl lg:text-4xl font-bold ${inknut.className}`}
					>
						{title}
					</h1>
					<p className="hidden lg:block text-sm md:text-base leading-loose font-medium lg:max-w-lg">
						{description}
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-start gap-4 w-full">
						{cta.map((action, index) => (
							<Button
								key={index}
								variant={index === 0 ? "default" : "secondary"}
								asChild
								size="lg"
								className="w-full sm:w-auto"
							>
								<Link href={action.slug}>{action.title}</Link>
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Showcase;
