import { useState } from "react";
import { Brain, AlertTriangle, CheckCircle, Clock, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type TriageLevel = "emergency" | "urgent" | "routine" | null;

interface DiagnosisResult {
  triage: TriageLevel;
  confidence: number;
  conditions: { name: string; probability: number }[];
  explanation: string;
  recommendations: string[];
}

const mockDiagnose = (symptoms: string): DiagnosisResult => {
  const lower = symptoms.toLowerCase();
  if (lower.includes("chest pain") || lower.includes("breathing difficulty") || lower.includes("unconscious")) {
    return {
      triage: "emergency",
      confidence: 92,
      conditions: [
        { name: "Acute Coronary Syndrome", probability: 68 },
        { name: "Pulmonary Embolism", probability: 22 },
        { name: "Pneumothorax", probability: 10 },
      ],
      explanation:
        "Chest pain with breathing difficulty indicates potential cardiac or pulmonary emergency. The combination of symptoms triggers high-priority classification based on WHO emergency triage guidelines.",
      recommendations: [
        "Immediate ECG and cardiac biomarkers",
        "Continuous vitals monitoring",
        "Emergency physician consult within 10 minutes",
        "Prepare for potential catheterization",
      ],
    };
  }
  if (lower.includes("fever") || lower.includes("cough") || lower.includes("headache")) {
    return {
      triage: "urgent",
      confidence: 78,
      conditions: [
        { name: "Upper Respiratory Infection", probability: 55 },
        { name: "Influenza", probability: 30 },
        { name: "COVID-19", probability: 15 },
      ],
      explanation:
        "Fever combined with respiratory symptoms suggests infectious etiology. Duration and severity determine urgency. AI model weighs symptom combinations against regional disease prevalence data.",
      recommendations: [
        "Rapid antigen / PCR test",
        "Antipyretic medication",
        "Telehealth follow-up in 24-48 hours",
        "Monitor for worsening symptoms",
      ],
    };
  }
  return {
    triage: "routine",
    confidence: 85,
    conditions: [
      { name: "General Consultation", probability: 60 },
      { name: "Stress-Related Symptoms", probability: 25 },
      { name: "Minor Ailment", probability: 15 },
    ],
    explanation:
      "Symptoms do not indicate immediate risk factors. Classified as routine based on absence of red-flag indicators. Standard care pathway recommended.",
    recommendations: [
      "Schedule routine appointment",
      "Complete health history questionnaire",
      "Basic vitals check",
      "Lifestyle assessment",
    ],
  };
};

const triageConfig = {
  emergency: { label: "EMERGENCY", icon: AlertTriangle, className: "triage-emergency" },
  urgent: { label: "URGENT", icon: Clock, className: "triage-urgent" },
  routine: { label: "ROUTINE", icon: CheckCircle, className: "triage-routine" },
};

const AIDiagnostics = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDiagnose = () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(mockDiagnose(symptoms));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-primary shadow-glow">
          <Brain className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Diagnostic Engine</h2>
          <p className="text-xs text-muted-foreground">Explainable AI-powered triage classification</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-medium">
          <Shield className="w-3 h-3" /> HIPAA Compliant
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
          <h3 className="text-sm font-semibold text-card-foreground">Patient Symptom Input</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Patient Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <Input placeholder="Patient ID (optional)" />
          </div>
          <Textarea
            placeholder="Describe symptoms in detail... (e.g., chest pain, fever with cough, headache for 3 days)"
            rows={5}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleDiagnose} disabled={loading || !symptoms.trim()} className="gradient-primary text-primary-foreground shadow-glow">
              <Sparkles className="w-4 h-4 mr-2" />
              {loading ? "Analyzing..." : "Run AI Diagnosis"}
            </Button>
            <Button variant="outline" onClick={() => { setResult(null); setSymptoms(""); setAge(""); }}>
              Clear
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">
            ⚠ AI-assisted triage is advisory. Final diagnosis requires clinical validation.
          </p>
        </div>

        {/* Result Panel */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-12">
              <Brain className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">Enter symptoms and run diagnosis</p>
              <p className="text-xs mt-1">AI will classify and explain the triage level</p>
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Analyzing symptoms with AI model...</p>
            </div>
          )}
          {result && !loading && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {result.triage && (() => {
                  const config = triageConfig[result.triage];
                  const Icon = config.icon;
                  return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${config.className}`}>
                      <Icon className="w-3.5 h-3.5" /> {config.label}
                    </span>
                  );
                })()}
                <span className="text-xs text-muted-foreground">
                  Confidence: <span className="font-semibold text-card-foreground">{result.confidence}%</span>
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Possible Conditions</h4>
                <div className="space-y-2">
                  {result.conditions.map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-card-foreground font-medium">{c.name}</span>
                          <span className="text-muted-foreground">{c.probability}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full gradient-primary transition-all duration-700" style={{ width: `${c.probability}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3 inline mr-1" />AI Explanation
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-3">{result.explanation}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recommendations</h4>
                <ul className="space-y-1.5">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-xs text-card-foreground flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-success mt-0.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDiagnostics;
