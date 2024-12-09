import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Companies from "./pages/Companies";
import Billionaires from "./pages/Billionaires";
import Trackers from "./pages/Trackers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Search from "./pages/Search";
import Filter from "./pages/Filter";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Rankings from "./pages/Rankings";
import DailyMovers from "./pages/DailyMovers";
import IndustryRankings from "./pages/IndustryRankings";
import CountryRankings from "./pages/CountryRankings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Index />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/billionaires" element={<Billionaires />} />
          <Route path="/billionaires/:id" element={<Billionaires />} />
          <Route path="/trackers" element={<Trackers />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/daily-movers" element={<DailyMovers />} />
          <Route path="/industry-rankings" element={<IndustryRankings />} />
          <Route path="/country-rankings" element={<CountryRankings />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/search" element={<Search />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;