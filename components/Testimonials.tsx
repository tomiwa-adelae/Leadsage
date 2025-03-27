import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { testimonials } from "@/constant";

export function Testimonials() {
	return (
		<div>
			<div className="space-y-2 container mb-8">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Trusted By Many, Loved By All
				</h2>
				<p className="hidden lg:block text-sm text-gray-700">
					Discover what renters and landlords have to say about their
					experience with us. Real stories, genuine feedback!
				</p>
			</div>
			<AnimatedTestimonials testimonials={testimonials} />
		</div>
	);
}
