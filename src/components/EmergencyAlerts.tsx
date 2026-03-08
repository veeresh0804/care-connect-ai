import { useState } from "react";
import { Activity } from "lucide-react";
import { AlertTriangle, Phone, MapPin, Siren, Heart, Wind, Thermometer, Bell, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyPatient {
  id: string;
  name: string;
  vitals: { heartRate: number; spO2: number; bp: string; temp: number };
  severity: "critical" | "warning";
  location: string;
  alertTime: string;
  actions: string[];
}

const emergencyPatients: EmergencyPatient[] = [
  {
    id: "P-2847",
    name: "Aisha Patel",
    vitals: { heartRate: 140, spO2: 82, bp: "180/110", temp: 39.5 },
    severity: "critical",
    location: "Rural Clinic – Rajpur, Dist. Varanasi",
    alertTime: "2 min ago",
    actions: ["Nearest hospital alerted (12 km)", "Family notified via SMS", "Ambulance 108 dispatched", "Emergency doctor on standby"],
  },
  {
    id: "P-4201",
    name: "Chen Wei",
    vitals: { heartRate: 110, spO2: 88, bp: "160/100", temp: 38.8 },
    severity: "critical",
    location: "Rural Clinic – Hunan Village",
    alertTime: "8 min ago",
    actions: ["Hospital notified", "Oxygen support requested", "Telemedicine call initiated"],
  },
  {
    id: "P-1923",
    name: "James Okonkwo",
    vitals: { heartRate: 98, spO2: 93, bp: "145/95", temp: 37.8 },
    severity: "warning",
    location: "Mobile Unit – Sector 7",
    alertTime: "15 min ago",
    actions: ["Doctor alerted for review", "Monitoring escalated to 5-min intervals"],
  },
];

const EmergencyAlerts = () => {
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set());

  const handleAcknowledge = (id: string) => {
    setAcknowledged((prev) => new Set(prev).add(id));
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-destructive shadow-glow">
          <Siren className="w-5 h-5 text-destructive-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Emergency Auto-Alert System</h2>
          <p className="text-xs text-muted-foreground">AI-triggered alerts with automatic hospital, family & ambulance notification</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-semibold animate-pulse">
          <Bell className="w-3.5 h-3.5" /> {emergencyPatients.filter((p) => p.severity === "critical").length} Active
        </div>
      </div>

      {/* Alert Protocol */}
      <div className="bg-card rounded-xl p-5 shadow-card border border-border">
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Automated Emergency Protocol</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { step: "1", label: "AI Detects Danger", desc: "Vitals cross thresholds", icon: AlertTriangle, color: "bg-destructive/10 text-destructive" },
            { step: "2", label: "Hospital Alerted", desc: "Nearest facility notified", icon: MapPin, color: "bg-warning/10 text-warning" },
            { step: "3", label: "Family Notified", desc: "SMS/call to emergency contacts", icon: Phone, color: "bg-info/10 text-info" },
            { step: "4", label: "Ambulance Dispatched", desc: "108 service integration", icon: Siren, color: "bg-success/10 text-success" },
          ].map((s) => (
            <div key={s.step} className={`p-3 rounded-lg ${s.color}`}>
              <s.icon className="w-5 h-5 mb-2" />
              <p className="text-xs font-semibold">{s.label}</p>
              <p className="text-[10px] opacity-75">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Alerts */}
      <div className="space-y-4">
        {emergencyPatients.map((patient) => {
          const isAck = acknowledged.has(patient.id);
          return (
            <div
              key={patient.id}
              className={`bg-card rounded-xl p-5 shadow-card border-2 transition-all ${
                patient.severity === "critical" && !isAck
                  ? "border-destructive/50 shadow-[0_0_20px_hsl(0,72%,55%,0.1)]"
                  : "border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    patient.severity === "critical" ? "triage-emergency" : "triage-urgent"
                  }`}>
                    {patient.severity.toUpperCase()}
                  </span>
                  <h3 className="text-sm font-semibold text-card-foreground">{patient.name}</h3>
                  <span className="text-[10px] text-muted-foreground">{patient.id}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3" /> {patient.alertTime}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className={`text-center p-2 rounded-lg ${patient.vitals.heartRate > 120 ? "bg-destructive/10" : "bg-muted/50"}`}>
                  <Heart className={`w-3.5 h-3.5 mx-auto mb-1 ${patient.vitals.heartRate > 120 ? "text-destructive" : "text-muted-foreground"}`} />
                  <p className={`text-sm font-bold ${patient.vitals.heartRate > 120 ? "text-destructive" : "text-card-foreground"}`}>{patient.vitals.heartRate}</p>
                  <p className="text-[9px] text-muted-foreground">BPM</p>
                </div>
                <div className={`text-center p-2 rounded-lg ${patient.vitals.spO2 < 90 ? "bg-destructive/10" : "bg-muted/50"}`}>
                  <Wind className={`w-3.5 h-3.5 mx-auto mb-1 ${patient.vitals.spO2 < 90 ? "text-destructive" : "text-muted-foreground"}`} />
                  <p className={`text-sm font-bold ${patient.vitals.spO2 < 90 ? "text-destructive" : "text-card-foreground"}`}>{patient.vitals.spO2}%</p>
                  <p className="text-[9px] text-muted-foreground">SpO₂</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <Activity className="w-3.5 h-3.5 mx-auto mb-1 text-warning" />
                  <p className="text-sm font-bold text-card-foreground">{patient.vitals.bp}</p>
                  <p className="text-[9px] text-muted-foreground">BP</p>
                </div>
                <div className={`text-center p-2 rounded-lg ${patient.vitals.temp > 39 ? "bg-destructive/10" : "bg-muted/50"}`}>
                  <Thermometer className={`w-3.5 h-3.5 mx-auto mb-1 ${patient.vitals.temp > 39 ? "text-destructive" : "text-warning"}`} />
                  <p className={`text-sm font-bold ${patient.vitals.temp > 39 ? "text-destructive" : "text-card-foreground"}`}>{patient.vitals.temp}°</p>
                  <p className="text-[9px] text-muted-foreground">Temp</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-muted-foreground mb-3">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                {patient.location}
              </div>

              <div className="bg-muted/30 rounded-lg p-3 mb-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Auto-Triggered Actions</p>
                <div className="space-y-1">
                  {patient.actions.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-card-foreground">
                      <CheckCircle className="w-3 h-3 text-success shrink-0" /> {a}
                    </div>
                  ))}
                </div>
              </div>

              {!isAck && (
                <Button size="sm" onClick={() => handleAcknowledge(patient.id)} variant="outline" className="text-xs">
                  Acknowledge Alert
                </Button>
              )}
              {isAck && (
                <span className="text-[10px] text-success font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Acknowledged — Response team notified
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmergencyAlerts;
