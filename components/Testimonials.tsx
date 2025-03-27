import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { testimonials } from "@/constant";

export function Testimonials() {
	return (
		<div className="bg-green-700 py-16 text-white">
			<div className="space-y-3 container mb-8">
				<h4 className="font-medium text-sm lg:text-base text-gray-200 mb-4">
					Testimonials
				</h4>
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Trusted By Many, Loved By All
				</h2>
				<p className="hidden lg:block text-sm text-gray-200">
					Discover what renters and landlords have to say about their
					experience with us. Real stories, genuine feedback!
				</p>
			</div>
			<AnimatedTestimonials testimonials={testimonials} />
		</div>
	);
}
