import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto text-center py-24 px-4">
        <h1 className="heading-xl mb-6 animate-fade-up">
          Exposing Corporate Wealth and Unethical Practices
        </h1>
        <p className="body-text max-w-2xl mx-auto mb-12 text-muted animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Uncovering the truth about corporate greed and its impact on society.
        </p>
        <Link 
          to="/companies" 
          className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Explore Our Database <ArrowRight className="ml-2" size={20} />
        </Link>
      </section>

      {/* Quick Stats Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="heading-lg text-center mb-12">Corporate Impact Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">$8.9B</CardTitle>
              <CardDescription>Total Wage Theft</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted">Documented cases of wage theft across major corporations</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">$12.3B</CardTitle>
              <CardDescription>Environmental Fines</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted">Penalties for environmental violations</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">287x</CardTitle>
              <CardDescription>CEO Pay Gap</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted">Average CEO-to-worker pay ratio</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Offenders Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="heading-lg text-center mb-12">Top Corporate Offenders</h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {[
              {
                name: "MegaCorp Industries",
                violations: "Environmental Disasters",
                amount: "$2.3B in Fines"
              },
              {
                name: "Global Tech Giants",
                violations: "Worker Exploitation",
                amount: "$1.8B in Wage Theft"
              },
              {
                name: "Finance Holdings Ltd",
                violations: "Tax Evasion",
                amount: "$3.1B Avoided"
              }
            ].map((company, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription>{company.violations}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{company.amount}</p>
                    <Link 
                      to={`/companies/${index + 1}`} 
                      className="mt-4 inline-flex items-center text-sm text-primary hover:text-primary/80"
                    >
                      View Details <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-xl mb-4">Profit & Plunder</h3>
              <p className="text-sm text-gray-400">
                Exposing corporate greed and promoting transparency.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/methodology" className="text-gray-400 hover:text-white transition-colors">
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">
                Stay updated with our latest investigations.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Profit & Plunder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;