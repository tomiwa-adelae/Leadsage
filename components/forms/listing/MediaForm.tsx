import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import React from "react";

interface RentDetailsProps {
	nextStep: () => void;
	prevStep: () => void;
}

const MediaForm: React.FC<RentDetailsProps> = ({ nextStep, prevStep }) => {
	return (
		<div className="py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
			<div className="mb-6">
				<h3 className="text-lg uppercase mb-1 font-semibold text-primary">
					Add photos
				</h3>
				<p className="text-base text-muted-foreground">
					Upload high-quality images that highlight your apartment’s
					best features. Great photos attract more renters!
				</p>
			</div>
			<FileUpload
				showTitle={false}
				loading={false}
				onChange={(files) => {
					const reader = new FileReader();
					reader.readAsDataURL(files[0]);
					reader.onload = async () => {
						try {
							const binaryString = reader.result;

							// setLoading(true);

							// setImage(binaryString);
						} catch (error) {
							// setLoading(false);
						} finally {
							// setLoading(false);
						}
					};
				}}
			/>
			<div className="flex justify-between mt-6">
				<Button size="lg" onClick={prevStep} variant="outline">
					Back
				</Button>
				<Button
					// disabled={loading}
					size="lg"
					className="ml-2"
				>
					{/* {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin transition-all" />
                                            </>
                                        ) : (
                                            "Continue"
                                        )} */}
					continue
				</Button>
			</div>
		</div>
	);
};

export default MediaForm;
