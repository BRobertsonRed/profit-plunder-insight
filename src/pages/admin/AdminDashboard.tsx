import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminOverview from "@/components/admin/AdminOverview";
import CompaniesManager from "@/components/admin/CompaniesManager";
import BillionairesManager from "@/components/admin/BillionairesManager";
import ViolationsManager from "@/components/admin/ViolationsManager";
import ImpactStoriesManager from "@/components/admin/ImpactStoriesManager";
import WebsiteCopyManager from "@/components/admin/WebsiteCopyManager";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="companies" element={<CompaniesManager />} />
        <Route path="billionaires" element={<BillionairesManager />} />
        <Route path="violations" element={<ViolationsManager />} />
        <Route path="impact-stories" element={<ImpactStoriesManager />} />
        <Route path="website-copy" element={<WebsiteCopyManager />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;