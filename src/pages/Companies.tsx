import Navigation from "../components/Navigation";

const Companies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto pt-24 px-6">
        <h1 className="heading-xl mb-6">Companies</h1>
        <p className="body-text mb-8">
          Explore detailed profiles of companies, including financial data, environmental impact, and ethical practices.
        </p>
        {/* Company listing and filtering will be implemented in future iterations */}
      </main>
    </div>
  );
};

export default Companies;