import Navigation from "../components/Navigation";
import MissionSection from "../components/about/MissionSection";
import KeyValuesSection from "../components/about/KeyValuesSection";
import GoalsSection from "../components/about/GoalsSection";
import ImpactSection from "../components/about/ImpactSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-secondary py-24 px-6">
        <div className="container mx-auto text-center">
          <h1 className="heading-xl text-white mb-6 animate-fade-up">
            About ProfitandPlunder.org
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Exposing corporate wealth, unethical practices, and their societal impacts.
          </p>
        </div>
      </section>

      <MissionSection />
      <KeyValuesSection />
      <GoalsSection />
      <ImpactSection />

      {/* Contact Section */}
      <section className="py-16 px-6 bg-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="heading-lg mb-8">Get in Touch</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a href="mailto:contact@profitandplunder.org" className="text-white hover:text-accent transition-colors">
              contact@profitandplunder.org
            </a>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-accent transition-colors">Twitter</a>
              <a href="#" className="text-white hover:text-accent transition-colors">LinkedIn</a>
              <a href="#" className="text-white hover:text-accent transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;