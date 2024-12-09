import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { BillionaireProfile } from "@/components/billionaires/BillionaireProfile";

const Billionaires = () => {
  const { id } = useParams();

  if (!id) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 lg:px-6">
          <h1 className="heading-xl mb-6 text-center lg:text-left">Billionaires</h1>
          <p className="body-text mb-8 text-center lg:text-left">
            Select a billionaire to view their detailed profile.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 lg:px-6">
        <BillionaireProfile id={id} />
      </main>
    </div>
  );
};

export default Billionaires;