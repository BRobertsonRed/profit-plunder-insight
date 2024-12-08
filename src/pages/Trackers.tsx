import Navigation from "../components/Navigation";

const Trackers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto pt-24 px-6">
        <h1 className="heading-xl mb-6">Trackers</h1>
        <p className="body-text mb-8">
          Monitor real-time data on wage theft, lobbying expenditures, and environmental impact.
        </p>
        {/* Interactive dashboards will be implemented in future iterations */}
      </main>
    </div>
  );
};

export default Trackers;