import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardOverview from "@/components/DashboardOverview";
import AIDiagnostics from "@/components/AIDiagnostics";
import PatientMonitoring from "@/components/PatientMonitoring";
import WorkflowDashboard from "@/components/WorkflowDashboard";
import PrivacyPanel from "@/components/PrivacyPanel";
import VoiceAssistant from "@/components/VoiceAssistant";
import PredictiveRisk from "@/components/PredictiveRisk";
import EmergencyAlerts from "@/components/EmergencyAlerts";
import MedicalReportGen from "@/components/MedicalReportGen";
import CommunityHealth from "@/components/CommunityHealth";
import PatientPortal from "@/components/PatientPortal";
import { Bell, Search, User } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardOverview />;
      case "diagnostics": return <AIDiagnostics />;
      case "voice": return <VoiceAssistant />;
      case "predictive": return <PredictiveRisk />;
      case "monitoring": return <PatientMonitoring />;
      case "emergency": return <EmergencyAlerts />;
      case "reports": return <MedicalReportGen />;
      case "workflow": return <WorkflowDashboard />;
      case "community": return <CommunityHealth />;
      case "portal": return <PatientPortal />;
      case "privacy": return <PrivacyPanel />;
      default: return <DashboardOverview />;
    }
  };

  const tabTitles: Record<string, string> = {
    dashboard: "Dashboard",
    diagnostics: "AI Diagnostics",
    voice: "Voice Health Assistant",
    predictive: "Predictive Risk Engine",
    monitoring: "Patient Monitoring",
    emergency: "Emergency Alerts",
    reports: "Medical Report Generator",
    workflow: "Workflow Automation",
    community: "Community Health Worker",
    privacy: "Privacy & Security",
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
          <div>
            <h1 className="text-sm font-semibold text-foreground">{tabTitles[activeTab] || "Dashboard"}</h1>
            <p className="text-[11px] text-muted-foreground">MedAI HealthTech Platform</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
            </button>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
