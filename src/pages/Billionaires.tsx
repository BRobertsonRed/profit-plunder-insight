import Navigation from "../components/Navigation";

const Billionaires = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto pt-24 px-6">
        <h1 className="heading-xl mb-6">Billionaires</h1>
        <p className="body-text mb-8">
          Discover profiles of billionaires and their connections to corporate wealth and practices.
        </p>
        {/* Billionaire listing and filtering will be implemented in future iterations */}
      </main>
    </div>
  );
};

export default Billionaires;