const SectionTitle = ({
	title,
	subTitle,
}: {
	title: string;
	subTitle: string;
}) => {
	return (
		<div>
			<h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
				{title}
			</h1>
			<p className="font-medium text-sm mt-3">{subTitle}</p>
		</div>
	);
};

export default SectionTitle;
