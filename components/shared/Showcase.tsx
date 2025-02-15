import { Inknut_Antiqua } from "next/font/google";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const Showcase = ({
	image,
	title,
	description,
}: {
	image: string;
	title: string;
	description: string;
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
				</div>
			</div>
		</div>
	);
};

export default Showcase;
