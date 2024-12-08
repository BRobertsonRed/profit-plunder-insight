import { ArrowRight } from "lucide-react";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 px-6">
        {/* Hero Section */}
        <section className="container mx-auto text-center py-20">
          <h1 className="heading-xl mb-6 animate-fade-up">
            Exposing Corporate Greed
          </h1>
          <p className="body-text max-w-2xl mx-auto mb-12 text-muted animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Uncovering the truth about corporate wealth, unethical practices, and their impact on society.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/companies" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors inline-flex items-center">
              Explore Companies <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="container mx-auto py-20">
          <h2 className="heading-lg text-center mb-12">Key Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stat-card">
              <h3 className="text-4xl font-bold text-primary mb-2">$3.65T</h3>
              <p className="text-muted">Total CEO Compensation</p>
            </div>
            <div className="stat-card">
              <h3 className="text-4xl font-bold text-primary mb-2">287x</h3>
              <p className="text-muted">Average CEO-to-Worker Pay Ratio</p>
            </div>
            <div className="stat-card">
              <h3 className="text-4xl font-bold text-primary mb-2">$8.9B</h3>
              <p className="text-muted">Wage Theft Settlements</p>
            </div>
          </div>
        </section>

        {/* Latest Investigations */}
        <section className="container mx-auto py-20">
          <h2 className="heading-lg text-center mb-12">Latest Investigations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-secondary"></div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-2">Investigation Title {i}</h3>
                  <p className="text-muted mb-4">
                    A brief description of the investigation and its findings...
                  </p>
                  <Link to={`/investigation/${i}`} className="text-primary hover:text-accent transition-colors inline-flex items-center">
                    Read More <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

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