import { Heart, Thermometer, Wind, Droplets, AlertTriangle, Wifi } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

interface Patient {
  id: string;
  name: string;
  age: number;
  location: string;
  riskScore: number;
  vitals: {
    heartRate: number;
    temperature: number;
    spO2: number;
    bloodPressure: string;
  };
  trend: { v: number }[];
  status: "stable" | "warning" | "critical";
  connected: boolean;
}

const patients: Patient[] = [
  {
    id: "P-2847",
    name: "Aisha Patel",
    age: 62,
    location: "Rural Clinic – Rajpur",
    riskScore: 82,
    vitals: { heartRate: 98, temperature: 38.2, spO2: 93, bloodPressure: "150/95" },
    trend: [{ v: 72 }, { v: 78 }, { v: 85 }, { v: 90 }, { v: 88 }, { v: 95 }, { v: 98 }],
    status: "critical",
    connected: true,
  },
  {
    id: "P-1923",
    name: "James Okonkwo",
    age: 45,
    location: "Mobile Unit – Sector 7",
    riskScore: 54,
    vitals: { heartRate: 76, temperature: 37.1, spO2: 97, bloodPressure: "130/85" },
    trend: [{ v: 80 }, { v: 78 }, { v: 75 }, { v: 77 }, { v: 76 }, { v: 74 }, { v: 76 }],
    status: "warning",
    connected: true,
  },
  {
    id: "P-3156",
    name: "Maria Santos",
    age: 34,
    location: "Telehealth – Home",
    riskScore: 18,
    vitals: { heartRate: 68, temperature: 36.8, spO2: 99, bloodPressure: "120/80" },
    trend: [{ v: 70 }, { v: 68 }, { v: 69 }, { v: 67 }, { v: 68 }, { v: 68 }, { v: 68 }],
    status: "stable",
    connected: true,
  },
  {
    id: "P-4201",
    name: "Chen Wei",
    age: 71,
    location: "Rural Clinic – Hunan",
    riskScore: 67,
    vitals: { heartRate: 84, temperature: 37.5, spO2: 95, bloodPressure: "145/90" },
    trend: [{ v: 78 }, { v: 80 }, { v: 82 }, { v: 85 }, { v: 83 }, { v: 84 }, { v: 84 }],
    status: "warning",
    connected: false,
  },
];

const statusStyles = {
  stable: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  critical: "bg-destructive/10 text-destructive border-destructive/20",
};

const trendColors = {
  stable: "hsl(152, 60%, 40%)",
  warning: "hsl(38, 92%, 50%)",
  critical: "hsl(0, 72%, 55%)",
};

const PatientMonitoring = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Remote Patient Monitoring</h2>
          <p className="text-xs text-muted-foreground">Real-time vitals from IoT devices & telehealth sessions</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-success font-medium">
          <Wifi className="w-3.5 h-3.5" /> {patients.filter((p) => p.connected).length}/{patients.length} Connected
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-card-foreground">{patient.name}</h3>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusStyles[patient.status]}`}>
                    {patient.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {patient.id} · Age {patient.age} · {patient.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Risk Score</p>
                <p className={`text-xl font-bold ${
                  patient.riskScore >= 70 ? "text-destructive" : patient.riskScore >= 40 ? "text-warning" : "text-success"
                }`}>
                  {patient.riskScore}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <Heart className="w-3.5 h-3.5 mx-auto mb-1 text-destructive" />
                <p className="text-xs font-semibold text-card-foreground">{patient.vitals.heartRate}</p>
                <p className="text-[9px] text-muted-foreground">BPM</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <Thermometer className="w-3.5 h-3.5 mx-auto mb-1 text-warning" />
                <p className="text-xs font-semibold text-card-foreground">{patient.vitals.temperature}°</p>
                <p className="text-[9px] text-muted-foreground">Temp</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <Wind className="w-3.5 h-3.5 mx-auto mb-1 text-info" />
                <p className="text-xs font-semibold text-card-foreground">{patient.vitals.spO2}%</p>
                <p className="text-[9px] text-muted-foreground">SpO₂</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <Droplets className="w-3.5 h-3.5 mx-auto mb-1 text-primary" />
                <p className="text-xs font-semibold text-card-foreground">{patient.vitals.bloodPressure}</p>
                <p className="text-[9px] text-muted-foreground">BP</p>
              </div>
            </div>

            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patient.trend}>
                  <Line type="monotone" dataKey="v" stroke={trendColors[patient.status]} strokeWidth={2} dot={false} />
                  <Tooltip contentStyle={{ display: "none" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {patient.status === "critical" && (
              <div className="mt-3 flex items-center gap-2 text-[11px] text-destructive bg-destructive/5 rounded-lg p-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Predictive model indicates elevated risk — immediate review recommended
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientMonitoring;
