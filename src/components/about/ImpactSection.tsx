import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ImpactSection = () => {
  return (
    <section className="py-16 px-6 bg-secondary text-white">
      <div className="container mx-auto text-center max-w-4xl">
        <h3 className="heading-md mb-6">Intended Impact</h3>
        <p className="text-xl leading-relaxed mb-8">
          By providing detailed data, we aim to shed light on corporate practices and inspire informed actions toward fairness and justice.
        </p>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          Get Started <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </section>
  );
};

export default ImpactSection;