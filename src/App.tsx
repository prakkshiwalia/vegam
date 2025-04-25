
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AIAssistantPage from "./pages/AIAssistant";
import DashboardsPage from "./pages/Dashboards";
import ArtifactsPage from "./pages/Artifacts";
import ArtifactNew from "./pages/ArtifactNew";
import WorkflowsPage from "./pages/Workflows";
import WorkflowNew from "./pages/WorkflowNew";
import SettingsPage from "./pages/Settings";
import Community from "./pages/Community";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/dashboards" element={<DashboardsPage />} />
          <Route path="/artifacts" element={<ArtifactsPage />} />
          <Route path="/artifacts/new" element={<ArtifactNew />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/workflows/new" element={<WorkflowNew />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
