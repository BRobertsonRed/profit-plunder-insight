import { Card, CardContent } from "@/components/ui/card";

const GoalsSection = () => {
  const goals = [
    "Bring transparency to corporate practices by exposing wage theft, labor violations, and unethical behaviors globally.",
    "Leverage data to reveal the impact of corporate lobbying, tax avoidance, and environmental exploitation on workers and communities.",
    "Empower individuals, organizations, and communities with actionable insights to hold corporations accountable and drive systemic change.",
    "Inspire policy reform and corporate responsibility by exposing critical data to inform public and governmental action.",
    "Educate the public about the societal and economic impacts of corporate wealth concentration and unethical practices."
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h3 className="heading-md text-secondary mb-8 text-center">Goals</h3>
        <div className="max-w-4xl mx-auto space-y-4">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-primary font-bold text-xl min-w-[2rem]">{index + 1}.</span>
              <p className="text-gray-700 leading-relaxed">{goal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;