import { useState } from "react";
import PortalSelector from "@/components/PortalSelector";
import HospitalSidebar from "@/components/HospitalSidebar";
import PatientSidebar from "@/components/PatientSidebar";
import GovtHeader from "@/components/GovtHeader";
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
import VideoConsultation from "@/components/portal/VideoConsultation";
import PatientChat from "@/components/portal/PatientChat";
import { Bell, Search, User, Building2, Landmark } from "lucide-react";

type PortalType = "selector" | "hospital" | "patient";

const Index = () => {
  const [portal, setPortal] = useState<PortalType>("selector");
  const [hospitalTab, setHospitalTab] = useState("dashboard");
  const [patientTab, setPatientTab] = useState("overview");

  if (portal === "selector") {
    return <PortalSelector onSelect={(p) => setPortal(p)} />;
  }

  // Hospital Portal
  if (portal === "hospital") {
    const renderHospitalContent = () => {
      switch (hospitalTab) {
        case "dashboard": return <DashboardOverview />;
        case "diagnostics": return <AIDiagnostics />;
        case "voice": return <VoiceAssistant />;
        case "predictive": return <PredictiveRisk />;
        case "monitoring": return <PatientMonitoring />;
        case "emergency": return <EmergencyAlerts />;
        case "reports": return <MedicalReportGen />;
        case "workflow": return <WorkflowDashboard />;
        case "community": return <CommunityHealth />;
        case "privacy": return <PrivacyPanel />;
        default: return <DashboardOverview />;
      }
    };

    const hospitalTitles: Record<string, string> = {
      dashboard: "Hospital Dashboard",
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
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        <GovtHeader />
        <div className="flex flex-1 min-h-0">
          <HospitalSidebar activeTab={hospitalTab} onTabChange={setHospitalTab} onSwitchPortal={() => setPortal("selector")} />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
              <div>
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-primary" />
                  <h1 className="text-sm font-semibold text-foreground">{hospitalTitles[hospitalTab] || "Dashboard"}</h1>
                </div>
                <p className="text-[11px] text-muted-foreground">Digital Health Mission · Hospital Administration</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground">
                  <Search className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
                </button>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                  <div className="w-6 h-6 rounded-full gradient-hero flex items-center justify-center">
                    <User className="w-3 h-3 text-sidebar-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-foreground">Dr. Sharma</p>
                    <p className="text-[8px] text-muted-foreground">Admin</p>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-6">
              {renderHospitalContent()}
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Patient Portal
  const renderPatientContent = () => {
    switch (patientTab) {
      case "voice": return <VoiceAssistant />;
      case "emergency": return <EmergencyAlerts />;
      case "video": return <VideoConsultation />;
      case "chat": return <PatientChat />;
      default: return <PatientPortal key={patientTab} initialTab={patientTab} />;
    }
  };

  const patientTitles: Record<string, string> = {
    overview: "My Dashboard",
    reports: "Medical Reports",
    prescriptions: "Prescriptions",
    appointments: "Appointments",
    health: "Health Monitor",
    records: "Health Records",
    family: "Family Management",
    chat: "Secure Messages",
    video: "Video Consultation",
    voice: "Voice Health Assistant",
    emergency: "Emergency",
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <GovtHeader />
      <div className="flex flex-1 min-h-0">
        <PatientSidebar activeTab={patientTab} onTabChange={setPatientTab} onSwitchPortal={() => setPortal("selector")} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
            <div>
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-secondary" />
                <h1 className="text-sm font-semibold text-foreground">{patientTitles[patientTab] || "My Dashboard"}</h1>
              </div>
              <p className="text-[11px] text-muted-foreground">Digital Health Mission · Patient Portal</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-3 h-3 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-foreground">Ravi Kumar</p>
                  <p className="text-[8px] text-muted-foreground">Patient</p>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {renderPatientContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
