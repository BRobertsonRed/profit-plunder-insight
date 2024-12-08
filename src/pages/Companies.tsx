import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "../components/Navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin, DollarSign, AlertTriangle, Building2 } from "lucide-react";

// Placeholder data for the profit chart
const profitData = [
  { year: '2019', amount: 4000 },
  { year: '2020', amount: 3000 },
  { year: '2021', amount: 5000 },
  { year: '2022', amount: 7000 },
  { year: '2023', amount: 6000 },
];

const Companies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto pt-24 px-6">
        {/* Company Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="heading-xl mb-4">MegaCorp Industries</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Building2 className="w-4 h-4 text-muted mr-2" />
                <CardTitle className="text-sm font-medium">Industry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Technology</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <MapPin className="w-4 h-4 text-muted mr-2" />
                <CardTitle className="text-sm font-medium">Headquarters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Silicon Valley</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <DollarSign className="w-4 h-4 text-muted mr-2" />
                <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$500B</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <AlertTriangle className="w-4 h-4 text-muted mr-2" />
                <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">High</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="financials" className="space-y-4">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="wage-theft">Wage Theft</TabsTrigger>
            <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
            <TabsTrigger value="executive">Executive Compensation</TabsTrigger>
          </TabsList>

          <TabsContent value="financials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profit Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#8B0000" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wage-theft" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Wage Theft Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle className="text-lg">Case #{i}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="mt-2 text-sm">
                          <span className="font-bold">Amount: </span>
                          <span className="text-red-600">$100,000</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Violations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle className="text-lg">Violation #{i}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Environmental violation description. Location and impact details.
                        </p>
                        <div className="mt-2 text-sm">
                          <span className="font-bold">Fine: </span>
                          <span className="text-red-600">$500,000</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="executive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Executive Compensation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle className="text-lg">Executive #{i}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <span className="font-bold">Base Salary: </span>
                            <span>$1,000,000</span>
                          </div>
                          <div>
                            <span className="font-bold">Bonus: </span>
                            <span>$500,000</span>
                          </div>
                          <div>
                            <span className="font-bold">Stock Options: </span>
                            <span>$2,000,000</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Companies;