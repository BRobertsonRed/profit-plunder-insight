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
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Mission */}
            <div className="text-center">
              <h2 className="heading-lg text-secondary mb-6">Our Mission</h2>
              <p className="body-text text-gray-700">
                ProfitandPlunder.org is dedicated to transparency and accountability by exposing corporate wealth, unethical practices, and their societal impacts.
              </p>
            </div>

            {/* Key Values */}
            <div>
              <h3 className="heading-md text-secondary mb-6 text-center">Key Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {["Transparency", "Accountability", "Advocacy for change", "Empowerment of individuals through data"].map((value, index) => (
                  <Card key={index} className="bg-gray-50 border-none hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <p className="text-gray-700 font-medium">{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div>
              <h3 className="heading-md text-secondary mb-6 text-center">Goals</h3>
              <div className="space-y-4">
                {[
                  "Bring transparency to corporate practices by exposing wage theft, labor violations, and unethical behaviors globally.",
                  "Leverage data to reveal the impact of corporate lobbying, tax avoidance, and environmental exploitation on workers and communities.",
                  "Empower individuals, organizations, and communities with actionable insights to hold corporations accountable and drive systemic change.",
                  "Inspire policy reform and corporate responsibility by exposing critical data to inform public and governmental action.",
                  "Educate the public about the societal and economic impacts of corporate wealth concentration and unethical practices."
                ].map((goal, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-primary font-bold">{index + 1}.</span>
                    <p className="text-gray-700">{goal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Intended Impact */}
            <div className="bg-secondary text-white p-8 rounded-lg text-center">
              <h3 className="heading-md mb-4">Intended Impact</h3>
              <p className="text-lg">
                By providing detailed data, we aim to shed light on corporate practices and inspire informed actions toward fairness and justice.
              </p>
            </div>
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