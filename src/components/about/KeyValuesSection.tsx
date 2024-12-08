import { Card, CardContent } from "@/components/ui/card";

const KeyValuesSection = () => {
  const values = [
    "Transparency",
    "Accountability",
    "Advocacy for change",
    "Empowerment of individuals through data"
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h3 className="heading-md text-secondary mb-8 text-center">Key Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card key={index} className="transform hover:scale-105 transition-transform duration-300 bg-white border-none shadow-md">
              <CardContent className="p-6 text-center">
                <p className="text-gray-700 font-medium">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyValuesSection;