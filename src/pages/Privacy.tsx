import Navigation from "../components/Navigation";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto pt-24 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="heading-xl mb-4">Privacy Policy</h1>
          <p className="body-text text-muted mb-8">
            Your privacy is important to us. Here's how we protect and use your information.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card className="p-6">
            <h2 className="heading-md mb-4">Introduction</h2>
            <p className="body-text">
              ProfitandPlunder.org is committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, and protect your data when you use our website.
            </p>
          </Card>

          {/* Data Collection */}
          <Card className="p-6">
            <h2 className="heading-md mb-4">Data Collection</h2>
            <p className="body-text">
              We collect personal data such as your name, email address, and any information you provide through forms. Non-personal data such as browser type, IP address, and site usage may also be collected.
            </p>
          </Card>

          {/* Data Usage */}
          <Card className="p-6">
            <h2 className="heading-md mb-4">Data Usage</h2>
            <p className="body-text">
              Your data is used to improve the website, respond to inquiries, and provide a better user experience. We do not sell your data to third parties.
            </p>
          </Card>

          {/* Cookies */}
          <Card className="p-6">
            <h2 className="heading-md mb-4">Cookies</h2>
            <p className="body-text">
              We use cookies to enhance your experience. You can disable cookies in your browser settings.
            </p>
          </Card>

          {/* Third-Party Services */}
          <Card className="p-6">
            <h2 className="heading-md mb-4">Third-Party Services</h2>
            <p className="body-text">
              We may use third-party services like Google Analytics to understand website usage. These services have their own privacy policies.
            </p>
          </Card>

          {/* User Rights */}
          <Card className="p-6">
            <h2 className="heading-md mb-4">User Rights</h2>
            <p className="body-text">
              You have the right to access, update, or delete your data. Contact us at{" "}
              <a href="mailto:privacy@profitandplunder.org" className="text-primary hover:underline">
                privacy@profitandplunder.org
              </a>{" "}
              for assistance.
            </p>
          </Card>

          {/* Contact Section */}
          <Card className="p-6">
            <h2 className="heading-md mb-4">Contact Us</h2>
            <p className="body-text">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@profitandplunder.org" className="text-primary hover:underline">
                privacy@profitandplunder.org
              </a>
            </p>
          </Card>

          {/* Navigation Links */}
          <div className="flex justify-center gap-6 pt-8">
            <Link to="/" className="text-primary hover:underline">
              Home
            </Link>
            <Link to="/about" className="text-primary hover:underline">
              About
            </Link>
            <Link to="/contact" className="text-primary hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;