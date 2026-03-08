import { Shield, AlertTriangle, Syringe, Heart, FileText, Clock } from "lucide-react";

const allergies = [
  { name: "Penicillin", severity: "Severe", reaction: "Anaphylaxis" },
  { name: "Sulfa Drugs", severity: "Moderate", reaction: "Skin rash" },
];

const conditions = [
  { name: "Type 2 Diabetes", since: "2020", status: "Managed", medications: "Metformin 500mg" },
  { name: "Hypertension", since: "2021", status: "Monitoring", medications: "Amlodipine 5mg" },
];

const surgeries = [
  { name: "Appendectomy", date: "March 2019", hospital: "City General Hospital" },
];

const vaccinations = [
  { name: "COVID-19 (Covishield)", date: "Aug 2021", dose: "Dose 1 & 2 + Booster" },
  { name: "Influenza", date: "Oct 2025", dose: "Annual" },
  { name: "Tetanus (TT)", date: "Jan 2023", dose: "Booster" },
  { name: "Hepatitis B", date: "2015", dose: "3-dose series" },
];

const familyHistory = [
  { relation: "Father", conditions: ["Heart Disease", "Diabetes"] },
  { relation: "Mother", conditions: ["Hypertension"] },
  { relation: "Sibling", conditions: ["None reported"] },
];

const PatientRecords = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Personal Health Records</h2>
        <div className="flex items-center gap-1 text-[10px] text-success font-medium">
          <Shield className="w-3 h-3" /> Encrypted & Secure
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Allergies */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-destructive" /> Allergies
          </h3>
          <div className="space-y-2">
            {allergies.map((a) => (
              <div key={a.name} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                <div>
                  <p className="text-xs font-medium text-card-foreground">{a.name}</p>
                  <p className="text-[10px] text-muted-foreground">Reaction: {a.reaction}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  a.severity === "Severe" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                }`}>{a.severity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-primary" /> Chronic Conditions
          </h3>
          <div className="space-y-2">
            {conditions.map((c) => (
              <div key={c.name} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-card-foreground">{c.name}</p>
                  <span className="text-[9px] font-medium text-primary">{c.status}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">Since {c.since} · {c.medications}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vaccinations */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2 mb-3">
            <Syringe className="w-4 h-4 text-success" /> Vaccination Records
          </h3>
          <div className="space-y-2">
            {vaccinations.map((v) => (
              <div key={v.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-xs font-medium text-card-foreground">{v.name}</p>
                  <p className="text-[10px] text-muted-foreground">{v.dose}</p>
                </div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {v.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Surgeries */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-info" /> Surgical History
          </h3>
          {surgeries.map((s) => (
            <div key={s.name} className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs font-medium text-card-foreground">{s.name}</p>
              <p className="text-[10px] text-muted-foreground">{s.date} · {s.hospital}</p>
            </div>
          ))}

          <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2 mt-5 mb-3">
            Family History
          </h3>
          <div className="space-y-2">
            {familyHistory.map((f) => (
              <div key={f.relation} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <span className="text-xs font-medium text-card-foreground w-16">{f.relation}</span>
                <div className="flex gap-1 flex-wrap">
                  {f.conditions.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-muted text-muted-foreground">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
