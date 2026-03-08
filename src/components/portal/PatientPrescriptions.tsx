import { Pill, Bell, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const prescriptions = [
  {
    id: "RX-001",
    doctor: "Dr. Ramesh Patel",
    date: "05 Mar 2026",
    diagnosis: "Type 2 Diabetes + Hypertension",
    medicines: [
      { name: "Metformin 500mg", dosage: "Twice daily (morning & evening)", duration: "90 days", taken: true },
      { name: "Amlodipine 5mg", dosage: "Once daily (morning)", duration: "90 days", taken: true },
      { name: "Vitamin D3 60K", dosage: "Once weekly (Sunday)", duration: "8 weeks", taken: false },
    ],
    warnings: ["Avoid alcohol with Metformin", "Amlodipine may cause mild dizziness"],
  },
  {
    id: "RX-002",
    doctor: "Dr. Anita Sharma",
    date: "20 Feb 2026",
    diagnosis: "Upper Respiratory Infection",
    medicines: [
      { name: "Azithromycin 500mg", dosage: "Once daily", duration: "5 days", taken: true },
      { name: "Paracetamol 500mg", dosage: "As needed (max 3/day)", duration: "5 days", taken: true },
      { name: "Cetirizine 10mg", dosage: "Once daily (night)", duration: "5 days", taken: true },
    ],
    warnings: ["Complete full antibiotic course even if feeling better"],
  },
];

const reminders = [
  { medicine: "Metformin 500mg", time: "8:00 PM", status: "upcoming" },
  { medicine: "Amlodipine 5mg", time: "8:00 AM tomorrow", status: "scheduled" },
  { medicine: "Vitamin D3 60K", time: "Sunday morning", status: "scheduled" },
];

const PatientPrescriptions = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">Prescriptions & Medications</h2>

      {/* Medicine Reminders */}
      <div className="bg-card rounded-xl p-5 shadow-card border border-border">
        <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-warning" /> Medication Reminders
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {reminders.map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-warning/5 border border-warning/10">
              <Clock className="w-4 h-4 text-warning shrink-0" />
              <div>
                <p className="text-xs font-medium text-card-foreground">{r.medicine}</p>
                <p className="text-[10px] text-warning font-medium">{r.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prescriptions */}
      {prescriptions.map((rx) => (
        <div key={rx.id} className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-card-foreground">{rx.doctor}</h3>
                <p className="text-[10px] text-muted-foreground">{rx.id} · {rx.date}</p>
                <p className="text-xs text-primary font-medium mt-1">{rx.diagnosis}</p>
              </div>
              <Button size="sm" variant="outline" className="text-[10px] h-7">
                <Pill className="w-3 h-3 mr-1" /> Order Medicines
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Medicine</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Dosage</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Duration</th>
                    <th className="text-center py-2 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rx.medicines.map((m) => (
                    <tr key={m.name} className="border-b border-border/50">
                      <td className="py-2.5 font-medium text-card-foreground">{m.name}</td>
                      <td className="py-2.5 text-muted-foreground">{m.dosage}</td>
                      <td className="py-2.5 text-muted-foreground">{m.duration}</td>
                      <td className="py-2.5 text-center">
                        {m.taken ? (
                          <span className="text-[9px] text-success flex items-center justify-center gap-1"><CheckCircle className="w-3 h-3" /> Active</span>
                        ) : (
                          <span className="text-[9px] text-warning flex items-center justify-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {rx.warnings.length > 0 && (
              <div className="mt-3 space-y-1">
                {rx.warnings.map((w, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-warning bg-warning/5 rounded-lg p-2">
                    <AlertTriangle className="w-3 h-3 shrink-0" /> {w}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientPrescriptions;
