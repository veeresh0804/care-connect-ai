import { useState } from "react";
import { Calendar, FileText, Pill, Heart, Clock, Bell, TrendingUp, Download, ChevronRight, Shield, Star, AlertTriangle } from "lucide-react";
import PatientReports from "./portal/PatientReports";
import PatientPrescriptions from "./portal/PatientPrescriptions";
import PatientAppointments from "./portal/PatientAppointments";
import PatientHealthMonitor from "./portal/PatientHealthMonitor";
import PatientRecords from "./portal/PatientRecords";
import PatientFamilyManager from "./portal/PatientFamilyManager";

type PortalTab = "overview" | "reports" | "prescriptions" | "appointments" | "health" | "records" | "family";

const portalTabs: { id: PortalTab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: Heart },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "prescriptions", label: "Prescriptions", icon: Pill },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "health", label: "Health Monitor", icon: TrendingUp },
  { id: "records", label: "Health Records", icon: Shield },
  { id: "family", label: "Family", icon: Star },
];

const upcomingAppointments = [
  { doctor: "Dr. Anita Sharma", specialty: "Cardiologist", date: "12 Mar 2026", time: "10:00 AM" },
  { doctor: "Dr. Ramesh Patel", specialty: "General Physician", date: "18 Mar 2026", time: "02:30 PM" },
];

const recentReports = [
  { name: "Complete Blood Count", date: "02 Mar 2026", status: "ready" },
  { name: "Lipid Profile", date: "28 Feb 2026", status: "ready" },
  { name: "Chest X-Ray", date: "20 Feb 2026", status: "ready" },
];

const medications = [
  { name: "Metformin 500mg", schedule: "Twice daily", nextDose: "8:00 PM today" },
  { name: "Amlodipine 5mg", schedule: "Once daily", nextDose: "8:00 AM tomorrow" },
];

const alerts = [
  { text: "Blood pressure trending up 15% this month — consider reducing salt intake", type: "warning" },
  { text: "Vaccination due: Influenza booster — schedule by end of March", type: "info" },
];

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState<PortalTab>("overview");

  if (activeTab === "reports") return <PortalWrapper tab={activeTab} onTabChange={setActiveTab}><PatientReports /></PortalWrapper>;
  if (activeTab === "prescriptions") return <PortalWrapper tab={activeTab} onTabChange={setActiveTab}><PatientPrescriptions /></PortalWrapper>;
  if (activeTab === "appointments") return <PortalWrapper tab={activeTab} onTabChange={setActiveTab}><PatientAppointments /></PortalWrapper>;
  if (activeTab === "health") return <PortalWrapper tab={activeTab} onTabChange={setActiveTab}><PatientHealthMonitor /></PortalWrapper>;
  if (activeTab === "records") return <PortalWrapper tab={activeTab} onTabChange={setActiveTab}><PatientRecords /></PortalWrapper>;
  if (activeTab === "family") return <PortalWrapper tab={activeTab} onTabChange={setActiveTab}><PatientFamilyManager /></PortalWrapper>;

  return (
    <PortalWrapper tab={activeTab} onTabChange={setActiveTab}>
      {/* Welcome Banner */}
      <div className="gradient-hero rounded-xl p-6 text-primary-foreground mb-6">
        <h2 className="text-lg font-bold">Welcome back, Ravi Kumar 👋</h2>
        <p className="text-xs opacity-80 mt-1">Health ID: ABHA-1234-5678-9012 · Last login: Today, 9:15 AM</p>
        <div className="flex gap-3 mt-4">
          <div className="bg-primary/20 backdrop-blur rounded-lg px-4 py-2">
            <p className="text-[10px] opacity-70">Risk Score</p>
            <p className="text-xl font-bold">23%</p>
            <p className="text-[9px] opacity-60">Low Risk</p>
          </div>
          <div className="bg-primary/20 backdrop-blur rounded-lg px-4 py-2">
            <p className="text-[10px] opacity-70">Next Appointment</p>
            <p className="text-sm font-semibold mt-1">12 Mar · Dr. Sharma</p>
            <p className="text-[9px] opacity-60">Cardiology</p>
          </div>
          <div className="bg-primary/20 backdrop-blur rounded-lg px-4 py-2">
            <p className="text-[10px] opacity-70">Active Medicines</p>
            <p className="text-xl font-bold">4</p>
            <p className="text-[9px] opacity-60">Next dose: 8 PM</p>
          </div>
        </div>
      </div>

      {/* AI Alerts */}
      {alerts.map((alert, i) => (
        <div key={i} className={`flex items-start gap-3 rounded-xl p-4 mb-3 ${
          alert.type === "warning" ? "bg-warning/10 border border-warning/20" : "bg-info/10 border border-info/20"
        }`}>
          {alert.type === "warning" ? <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" /> : <Bell className="w-4 h-4 text-info shrink-0 mt-0.5" />}
          <p className="text-xs text-foreground">{alert.text}</p>
        </div>
      ))}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Upcoming Appointments */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Appointments
            </h3>
            <button onClick={() => setActiveTab("appointments")} className="text-[10px] text-primary font-medium flex items-center">View All <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((apt, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-card-foreground">{apt.doctor}</p>
                <p className="text-[10px] text-muted-foreground">{apt.specialty}</p>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3" /> {apt.date} · {apt.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Recent Reports
            </h3>
            <button onClick={() => setActiveTab("reports")} className="text-[10px] text-primary font-medium flex items-center">View All <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-2">
            {recentReports.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-xs font-medium text-card-foreground">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground">{r.date}</p>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-accent transition-colors text-primary">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Medication Reminders */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
              <Pill className="w-4 h-4 text-primary" /> Medications
            </h3>
            <button onClick={() => setActiveTab("prescriptions")} className="text-[10px] text-primary font-medium flex items-center">View All <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-3">
            {medications.map((m, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-card-foreground">{m.name}</p>
                <p className="text-[10px] text-muted-foreground">{m.schedule}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Bell className="w-3 h-3 text-warning" />
                  <span className="text-[10px] text-warning font-medium">Next: {m.nextDose}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalWrapper>
  );
};

const PortalWrapper = ({ tab, onTabChange, children }: { tab: PortalTab; onTabChange: (t: PortalTab) => void; children: React.ReactNode }) => (
  <div className="space-y-4 animate-slide-up">
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {portalTabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onTabChange(t.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            tab === t.id
              ? "gradient-primary text-primary-foreground shadow-glow"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          <t.icon className="w-3.5 h-3.5" /> {t.label}
        </button>
      ))}
    </div>
    {children}
  </div>
);

export default PatientPortal;
