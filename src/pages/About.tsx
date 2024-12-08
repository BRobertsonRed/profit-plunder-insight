import Navigation from "../components/Navigation";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

      {/* Mission Statement Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg mb-6 text-secondary">Our Mission</h2>
            <p className="body-text text-gray-700 mb-12">
              ProfitandPlunder.org is dedicated to transparency and accountability by exposing corporate wealth, unethical practices, and their societal impacts.
            </p>

            <h3 className="heading-md text-secondary mb-4">Key Values</h3>
            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
              <li>Transparency</li>
              <li>Accountability</li>
              <li>Advocacy for change</li>
              <li>Empowerment of individuals through data</li>
            </ul>

            <h3 className="heading-md text-secondary mb-4">Goals</h3>
            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-3">
              <li>Bring transparency to corporate practices by exposing wage theft, labor violations, and unethical behaviors globally.</li>
              <li>Leverage data to reveal the impact of corporate lobbying, tax avoidance, and environmental exploitation on workers and communities.</li>
              <li>Empower individuals, organizations, and communities with actionable insights to hold corporations accountable and drive systemic change.</li>
              <li>Inspire policy reform and corporate responsibility by exposing critical data to inform public and governmental action.</li>
              <li>Educate the public about the societal and economic impacts of corporate wealth concentration and unethical practices.</li>
            </ul>

            <h3 className="heading-md text-secondary mb-4">Intended Impact</h3>
            <p className="body-text text-gray-700">
              By providing detailed data, we aim to shed light on corporate practices and inspire informed actions toward fairness and justice.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="heading-lg text-center mb-12 text-secondary">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Track Violations",
                description: "Monitor wage theft and labor violations across industries.",
                icon: "📊"
              },
              {
                title: "Explore Wealth",
                description: "Analyze billionaire wealth and corporate influence.",
                icon: "💰"
              },
              {
                title: "Follow Money",
                description: "Track lobbying efforts and their societal impact.",
                icon: "🔍"
              },
              {
                title: "Environmental Impact",
                description: "Uncover environmental violations and fines.",
                icon: "🌍"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:scale-105 transition-transform duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-display font-bold mb-2 text-secondary">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statement Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="heading-lg mb-6 text-secondary">Making a Difference Together</h2>
          <p className="body-text text-gray-700 max-w-2xl mx-auto mb-8">
            Join us in holding corporations accountable and making a difference in our communities 
            and the world.
          </p>
          <Button className="animate-fade-up bg-primary hover:bg-primary/90" style={{ animationDelay: "0.2s" }}>
            Get Started <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </section>

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