import { useState } from "react";
import { FileText, Download, Printer, User, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Report {
  patientName: string;
  age: string;
  date: string;
  symptoms: string;
  diagnosis: string;
  severity: string;
  tests: string[];
  treatment: string[];
  followUp: string;
  doctorNotes: string;
}

const MedicalReportGen = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateReport = () => {
    if (!name || !symptoms) return;
    setGenerating(true);
    setTimeout(() => {
      const lower = symptoms.toLowerCase();
      let diagnosis = "General Consultation";
      let severity = "Mild";
      let tests = ["Complete Blood Count (CBC)", "Basic Metabolic Panel"];
      let treatment = ["Rest and adequate hydration", "Paracetamol 500mg if needed"];
      let followUp = "Follow-up in 7 days if symptoms persist";

      if (lower.includes("chest") || lower.includes("heart")) {
        diagnosis = "Suspected Cardiac Event — requires urgent evaluation";
        severity = "Critical";
        tests = ["ECG (12-lead)", "Troponin I & T", "Chest X-ray", "D-Dimer"];
        treatment = ["Immediate cardiac monitoring", "Aspirin 325mg stat", "Nitroglycerin sublingual PRN", "Emergency cardiology consult"];
        followUp = "Immediate hospitalization recommended";
      } else if (lower.includes("fever") || lower.includes("cough")) {
        diagnosis = "Upper Respiratory Tract Infection (URTI)";
        severity = "Moderate";
        tests = ["CBC with Differential", "Rapid Antigen Test", "Chest X-ray if cough persists"];
        treatment = ["Tab. Paracetamol 500mg TDS", "Tab. Cetirizine 10mg OD", "Steam inhalation 3x daily", "Warm fluids, rest"];
        followUp = "Telehealth follow-up in 48 hours; visit clinic if symptoms worsen";
      } else if (lower.includes("diabetes") || lower.includes("sugar")) {
        diagnosis = "Type 2 Diabetes Mellitus — monitoring required";
        severity = "Moderate";
        tests = ["HbA1c", "Fasting Blood Glucose", "Lipid Profile", "Renal Function Test"];
        treatment = ["Tab. Metformin 500mg BD", "Dietary counseling", "30min daily walk", "Blood sugar monitoring"];
        followUp = "Monthly glucose monitoring; HbA1c every 3 months";
      }

      setReport({
        patientName: name,
        age,
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }),
        symptoms,
        diagnosis,
        severity,
        tests,
        treatment,
        followUp,
        doctorNotes: "AI-generated preliminary report. Requires clinical validation by attending physician.",
      });
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-primary shadow-glow">
          <FileText className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Medical Report Generator</h2>
          <p className="text-xs text-muted-foreground">Auto-generate patient summaries, diagnosis & prescriptions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
          <h3 className="text-sm font-semibold text-card-foreground">Patient Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Patient Name</label>
              <Input placeholder="e.g. Ravi Kumar" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Age</label>
              <Input placeholder="e.g. 45" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Symptoms & Complaints</label>
            <Textarea
              placeholder="Describe symptoms... (e.g., fever for 3 days, dry cough, body pain)"
              rows={4}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>
          <Button onClick={generateReport} disabled={generating || !name || !symptoms} className="w-full gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="w-4 h-4 mr-2" />
            {generating ? "Generating Report..." : "Generate AI Report"}
          </Button>
        </div>

        {/* Report Preview */}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          {!report ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-16">
              <FileText className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">Fill patient details to generate report</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="border-b border-border pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-card-foreground">MEDICAL REPORT</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-[10px] h-7">
                      <Printer className="w-3 h-3 mr-1" /> Print
                    </Button>
                    <Button size="sm" variant="outline" className="text-[10px] h-7">
                      <Download className="w-3 h-3 mr-1" /> PDF
                    </Button>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">Generated: {report.date} · AI-Assisted</p>
              </div>

              {/* Patient Info */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-card-foreground">{report.patientName}</span></div>
                <div><span className="text-muted-foreground">Age:</span> <span className="font-medium text-card-foreground">{report.age}</span></div>
                <div><span className="text-muted-foreground">Severity:</span> <span className={`font-bold ${
                  report.severity === "Critical" ? "text-destructive" : report.severity === "Moderate" ? "text-warning" : "text-success"
                }`}>{report.severity}</span></div>
              </div>

              <div>
                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Presenting Symptoms</h4>
                <p className="text-xs text-card-foreground bg-muted/30 rounded-lg p-2">{report.symptoms}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Diagnosis</h4>
                <p className="text-xs font-medium text-card-foreground">{report.diagnosis}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Recommended Tests</h4>
                <ul className="space-y-1">{report.tests.map((t, i) => (
                  <li key={i} className="text-xs text-card-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-info shrink-0" />{t}
                  </li>
                ))}</ul>
              </div>

              <div>
                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Treatment Plan</h4>
                <ul className="space-y-1">{report.treatment.map((t, i) => (
                  <li key={i} className="text-xs text-card-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-success shrink-0" />{t}
                  </li>
                ))}</ul>
              </div>

              <div className="bg-accent/50 rounded-lg p-3">
                <h4 className="text-[10px] font-semibold text-accent-foreground mb-1">Follow-Up</h4>
                <p className="text-xs text-accent-foreground">{report.followUp}</p>
              </div>

              <p className="text-[9px] text-muted-foreground italic">⚠ {report.doctorNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalReportGen;
