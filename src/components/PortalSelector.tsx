import { Heart, Building2, User, ArrowRight, Shield, Globe, Brain } from "lucide-react";

interface PortalSelectorProps {
  onSelect: (portal: "hospital" | "patient") => void;
}

const PortalSelector = ({ onSelect }: PortalSelectorProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-8 py-5 border-b border-border">
        <div className="w-9 h-9 rounded-xl gradient-primary shadow-glow flex items-center justify-center">
          <Heart className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground">MedAI HealthTech</h1>
          <p className="text-[10px] text-muted-foreground">AI-Powered Rural Healthcare Platform</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Shield className="w-3 h-3" /> HIPAA Compliant · End-to-End Encrypted
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-medium mb-4">
              <Brain className="w-3 h-3" /> Powered by Explainable AI
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome to MedAI</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              Select your portal to access the AI-powered healthcare ecosystem designed for rural & underserved communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hospital Portal */}
            <button
              onClick={() => onSelect("hospital")}
              className="group relative bg-card rounded-2xl p-8 shadow-card border-2 border-border hover:border-primary/40 hover:shadow-elevated transition-all text-left"
            >
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:gradient-primary group-hover:text-primary-foreground transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-5">
                <Building2 className="w-7 h-7 text-sidebar-primary" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-1">Hospital Portal</h3>
              <p className="text-xs text-muted-foreground mb-4">For doctors, administrators & healthcare workers</p>
              <div className="space-y-2">
                {[
                  "AI Diagnostics & Triage",
                  "Patient Monitoring Dashboard",
                  "Emergency Alert System",
                  "Workflow & Resource Optimization",
                  "Community Health Worker Mode",
                  "Medical Report Generation",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full gradient-hero border-2 border-card flex items-center justify-center">
                        <User className="w-3 h-3 text-sidebar-foreground" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground">12 staff online</span>
                </div>
              </div>
            </button>

            {/* Patient Portal */}
            <button
              onClick={() => onSelect("patient")}
              className="group relative bg-card rounded-2xl p-8 shadow-card border-2 border-border hover:border-primary/40 hover:shadow-elevated transition-all text-left"
            >
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:gradient-primary group-hover:text-primary-foreground transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="w-14 h-14 rounded-2xl gradient-primary shadow-glow flex items-center justify-center mb-5">
                <User className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-1">Patient Portal</h3>
              <p className="text-xs text-muted-foreground mb-4">For patients & family members</p>
              <div className="space-y-2">
                {[
                  "View Medical Reports & AI Summaries",
                  "Digital Prescriptions & Reminders",
                  "Book & Manage Appointments",
                  "Health Monitoring & Trends",
                  "Personal Health Records",
                  "Family Health Management",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] text-muted-foreground">Available in Hindi, Telugu, Tamil, Bengali & more</span>
                </div>
              </div>
            </button>
          </div>

          <p className="text-center text-[10px] text-muted-foreground mt-8">
            Aligned with Ayushman Bharat Digital Mission · National Digital Health Mission
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortalSelector;
