import { useState } from "react";
import { AlertTriangle, Activity, Clock, Stethoscope, Sparkles, Save, Loader2, CheckCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface TriageResult {
  category: "Emergency" | "Urgent" | "Routine";
  acuity_score: number;
  confidence: number;
  reasoning: string;
  red_flags: string[];
  recommended_actions: string[];
  suggested_department: string;
  estimated_wait_minutes: number;
}

const categoryStyles: Record<string, { bg: string; text: string; border: string; icon: any }> = {
  Emergency: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/40", icon: ShieldAlert },
  Urgent: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/40", icon: AlertTriangle },
  Routine: { bg: "bg-success/10", text: "text-success", border: "border-success/40", icon: CheckCircle },
};

const AITriage = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [history, setHistory] = useState("");
  const [vitals, setVitals] = useState({
    heart_rate: "",
    bp_systolic: "",
    bp_diastolic: "",
    spo2: "",
    temperature: "",
    respiratory_rate: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [saved, setSaved] = useState(false);

  const runTriage = async () => {
    if (symptoms.trim().length < 3) {
      toast({ title: "Add more detail", description: "Please describe the symptoms.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setResult(null);
    setSaved(false);
    try {
      const { data, error } = await supabase.functions.invoke("triage-classify", {
        body: {
          symptoms,
          age: age ? Number(age) : undefined,
          sex,
          history,
          vitals: {
            heart_rate: vitals.heart_rate ? Number(vitals.heart_rate) : undefined,
            bp_systolic: vitals.bp_systolic ? Number(vitals.bp_systolic) : undefined,
            bp_diastolic: vitals.bp_diastolic ? Number(vitals.bp_diastolic) : undefined,
            spo2: vitals.spo2 ? Number(vitals.spo2) : undefined,
            temperature: vitals.temperature ? Number(vitals.temperature) : undefined,
            respiratory_rate: vitals.respiratory_rate ? Number(vitals.respiratory_rate) : undefined,
          },
        },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResult((data as any).result);
    } catch (e: any) {
      toast({ title: "Triage failed", description: e.message ?? "Try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const saveToRecords = async () => {
    if (!result) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("health_records").insert({
        record_type: "ai_triage",
        vital_signs: {
          ...vitals,
          symptoms,
          age: age || null,
          sex: sex || null,
          history: history || null,
          triage: result,
          assessed_at: new Date().toISOString(),
        } as any,
        notes: `AI Triage: ${result.category} (acuity ${result.acuity_score}). ${result.reasoning}`,
      });
      if (error) throw error;
      setSaved(true);
      toast({ title: "Saved", description: "Triage assessment stored in health records." });
    } catch (e: any) {
      toast({ title: "Save failed", description: e.message ?? "Try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const style = result ? categoryStyles[result.category] : null;
  const CategoryIcon = style?.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" /> AI Triage Workflow
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Symptoms + vitals → AI classification (Emergency / Urgent / Routine). Decision support only.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input form */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border space-y-4">
          <h3 className="text-sm font-semibold text-card-foreground">Patient Intake</h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="age" className="text-xs">Age</Label>
              <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="42" />
            </div>
            <div>
              <Label htmlFor="sex" className="text-xs">Sex</Label>
              <Input id="sex" value={sex} onChange={(e) => setSex(e.target.value)} placeholder="M / F / Other" />
            </div>
          </div>

          <div>
            <Label htmlFor="symptoms" className="text-xs">Symptoms / Chief Complaint *</Label>
            <Textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Crushing chest pain radiating to left arm for 30 minutes, sweating, nausea..."
              rows={4}
              maxLength={2000}
            />
          </div>

          <div>
            <Label htmlFor="history" className="text-xs">Relevant History</Label>
            <Textarea
              id="history"
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              placeholder="Diabetes, hypertension, prior MI, allergies..."
              rows={2}
              maxLength={1000}
            />
          </div>

          <div>
            <Label className="text-xs flex items-center gap-1 mb-2"><Activity className="w-3 h-3" /> Vitals</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input placeholder="HR (bpm)" type="number" value={vitals.heart_rate} onChange={(e) => setVitals({ ...vitals, heart_rate: e.target.value })} />
              <Input placeholder="BP sys" type="number" value={vitals.bp_systolic} onChange={(e) => setVitals({ ...vitals, bp_systolic: e.target.value })} />
              <Input placeholder="BP dia" type="number" value={vitals.bp_diastolic} onChange={(e) => setVitals({ ...vitals, bp_diastolic: e.target.value })} />
              <Input placeholder="SpO2 %" type="number" value={vitals.spo2} onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })} />
              <Input placeholder="Temp °C" type="number" step="0.1" value={vitals.temperature} onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })} />
              <Input placeholder="RR /min" type="number" value={vitals.respiratory_rate} onChange={(e) => setVitals({ ...vitals, respiratory_rate: e.target.value })} />
            </div>
          </div>

          <Button onClick={runTriage} disabled={loading} className="w-full gradient-primary text-primary-foreground">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Classifying...</> : <><Sparkles className="w-4 h-4 mr-2" /> Run AI Triage</>}
          </Button>
        </div>

        {/* Result */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <h3 className="text-sm font-semibold text-card-foreground mb-3">Triage Assessment</h3>

          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
              <Stethoscope className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-xs">Enter intake details and run triage to see classification.</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
              <Loader2 className="w-10 h-10 mb-2 animate-spin text-primary" />
              <p className="text-xs">AI analyzing symptoms and vitals...</p>
            </div>
          )}

          {result && style && CategoryIcon && (
            <div className="space-y-4">
              <div className={`rounded-lg border-2 ${style.border} ${style.bg} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className={`w-6 h-6 ${style.text}`} />
                    <div>
                      <p className={`text-base font-bold ${style.text}`}>{result.category}</p>
                      <p className="text-[10px] text-muted-foreground">ESI Acuity {result.acuity_score} · {Math.round(result.confidence * 100)}% confidence</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Est. wait</p>
                    <p className={`text-sm font-semibold ${style.text} flex items-center gap-1`}>
                      <Clock className="w-3 h-3" /> {result.estimated_wait_minutes} min
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Reasoning</p>
                <p className="text-xs text-card-foreground leading-relaxed">{result.reasoning}</p>
              </div>

              {result.red_flags.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-destructive uppercase mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Red Flags
                  </p>
                  <ul className="space-y-1">
                    {result.red_flags.map((f, i) => (
                      <li key={i} className="text-xs text-card-foreground bg-destructive/5 rounded px-2 py-1">• {f}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Recommended Actions</p>
                <ul className="space-y-1">
                  {result.recommended_actions.map((a, i) => (
                    <li key={i} className="text-xs text-card-foreground bg-muted/50 rounded px-2 py-1">→ {a}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">Suggested Department</p>
                  <p className="text-xs font-medium text-card-foreground">{result.suggested_department}</p>
                </div>
                <Button onClick={saveToRecords} disabled={saving || saved} size="sm" variant={saved ? "outline" : "default"}>
                  {saving ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Saving</> : saved ? <><CheckCircle className="w-3 h-3 mr-1" /> Saved</> : <><Save className="w-3 h-3 mr-1" /> Save to Records</>}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground text-center italic">
        ⚠ AI triage is decision support only. Always confirm with a qualified clinician before treatment decisions.
      </p>
    </div>
  );
};

export default AITriage;
