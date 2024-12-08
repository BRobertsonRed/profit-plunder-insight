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
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Our Mission</h2>
            <p className="body-text text-muted-foreground">
              ProfitandPlunder.org is committed to transparency and accountability. Our platform reveals 
              corporate wealth, wage theft, environmental violations, lobbying efforts, and more, 
              empowering users to demand change.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-secondary/5">
        <div className="container mx-auto">
          <h2 className="heading-lg text-center mb-12">Core Features</h2>
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
              <Card key={index} className="hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statement Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="heading-lg mb-6">Making a Difference Together</h2>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto mb-8">
            Join us in holding corporations accountable and making a difference in our communities 
            and the world.
          </p>
          <Button className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Get Started <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="heading-lg mb-8">Get in Touch</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a href="mailto:contact@profitandplunder.org" className="hover:text-accent transition-colors">
              contact@profitandplunder.org
            </a>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">Twitter</a>
              <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-accent transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;