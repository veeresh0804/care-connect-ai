import { useState, useEffect } from "react";
import {
  Heart, Building2, User, ArrowRight, Shield, Globe, Brain, Stethoscope,
  FileText, Video, Pill, MapPin, Megaphone, BookOpen, Download, Phone,
  Star, Activity, Users, Calendar, TrendingUp, Search, ChevronRight,
  Smartphone, MessageSquare, BarChart3, Clock, Award, ExternalLink,
  Siren, HelpCircle, Scale, Eye, Landmark
} from "lucide-react";
import GovtHeader from "./GovtHeader";

interface PortalSelectorProps {
  onSelect: (portal: "hospital" | "patient") => void;
}

/* ── Animated counter ── */
const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [end]);

  const formatted = count >= 100000
    ? `${(count / 100000).toFixed(1)}L`
    : count >= 1000
      ? `${(count / 1000).toFixed(1)}K`
      : count.toLocaleString("en-IN");

  return <span className="animate-count-up">{formatted}{suffix}</span>;
};

/* ── Service Card ── */
const ServiceCard = ({ icon: Icon, title, desc, onClick }: { icon: React.ElementType; title: string; desc: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="group bg-card rounded-lg p-5 shadow-card border border-border hover:border-primary/40 hover:shadow-elevated transition-all text-left w-full"
  >
    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-3">
      <Icon className="w-5 h-5 text-primary-foreground" />
    </div>
    <h3 className="text-sm font-semibold text-card-foreground mb-1">{title}</h3>
    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
      Access <ChevronRight className="w-3 h-3" />
    </div>
  </button>
);

/* ── Doctor Card ── */
const DoctorCard = ({ name, spec, hospital, exp }: { name: string; spec: string; hospital: string; exp: string }) => (
  <div className="bg-card rounded-lg p-4 shadow-card border border-border">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
        <User className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <p className="text-sm font-semibold text-card-foreground">{name}</p>
        <p className="text-xs text-primary">{spec}</p>
      </div>
    </div>
    <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
      <span>{hospital}</span>
      <span>{exp}</span>
    </div>
  </div>
);

/* ── Section Heading ── */
const SectionHeading = ({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: React.ElementType }) => (
  <div className="text-center mb-8">
    {Icon && (
      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-3">
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
    )}
    <h2 className="text-xl font-bold text-foreground">{title}</h2>
    {subtitle && <p className="text-sm text-muted-foreground mt-1 max-w-lg mx-auto">{subtitle}</p>}
    <div className="w-16 h-1 gradient-primary rounded-full mx-auto mt-3" />
  </div>
);

const PortalSelector = ({ onSelect }: PortalSelectorProps) => {
  const announcements = [
    "🏥 New AI Telemedicine Services launched across 200 rural districts",
    "💉 Free diabetes screening camp on March 25 — Register now",
    "📢 Vaccination drive starting next week in all PHCs",
    "🤖 AI-powered symptom checker now available in 6 languages",
    "📋 New maternal care program enrollment open for eligible beneficiaries",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GovtHeader />

      {/* Main Header with Emblem */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center bg-accent">
              <Landmark className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Digital Health Portal</h1>
              <p className="text-[11px] text-muted-foreground">Ayushman Bharat Digital Mission · Government of India</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-secondary" />
              <span>HIPAA & DPDP Compliant</span>
            </div>
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
              Citizen Login
            </button>
            <button className="px-4 py-2 rounded-md border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
              Register
            </button>
          </div>
        </div>

        {/* Mega Nav */}
        <nav className="border-t border-border bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-0.5 overflow-x-auto">
            {["Home", "Patient Services", "Doctor Services", "Health Records", "Telemedicine", "Health Programs", "Help & Support"].map((item, i) => (
              <button
                key={item}
                className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  i === 0 ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary hover:bg-accent/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Announcements Ticker */}
      <div className="bg-accent border-b border-border overflow-hidden">
        <div className="flex items-center">
          <div className="bg-primary px-3 py-1.5 text-[10px] font-semibold text-primary-foreground shrink-0 flex items-center gap-1">
            <Megaphone className="w-3 h-3" /> LATEST
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="animate-ticker whitespace-nowrap py-1.5 text-[11px] text-accent-foreground font-medium">
              {announcements.join("   •   ")}
            </div>
          </div>
        </div>
      </div>

      {/* Main scrollable content */}
      <main id="main-content" className="flex-1 overflow-y-auto">
        {/* ── Hero ── */}
        <section className="gradient-hero py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground/90 text-[10px] font-medium mb-5 border border-primary/30">
              <Brain className="w-3 h-3" /> Powered by Explainable AI · Made in India
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              Digital Health Services for Citizens
            </h2>
            <p className="text-sm text-primary-foreground/70 max-w-xl mx-auto mb-8">
              AI-powered healthcare platform serving rural & urban India.
              Access telemedicine, health records, diagnostics, and government health programs — all in one place.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => onSelect("patient")}
                className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-glow flex items-center gap-2"
              >
                <Stethoscope className="w-4 h-4" /> Check Symptoms
              </button>
              <button
                onClick={() => onSelect("patient")}
                className="px-6 py-2.5 rounded-md bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book Appointment
              </button>
              <button
                onClick={() => onSelect("hospital")}
                className="px-6 py-2.5 rounded-md border border-primary-foreground/30 text-primary-foreground text-sm font-medium hover:bg-primary-foreground/10 transition-colors flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" /> Hospital Login
              </button>
            </div>
          </div>
        </section>

        {/* ── Service Cards (#4) ── */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="Our Services" subtitle="Access comprehensive digital health services" icon={Heart} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Calendar, title: "Book Appointment", desc: "Schedule doctor visits online" },
                { icon: FileText, title: "View Reports", desc: "Access medical test results" },
                { icon: Brain, title: "AI Symptom Checker", desc: "Get instant health assessment" },
                { icon: Video, title: "Telemedicine", desc: "Video consult with doctors" },
                { icon: Pill, title: "Prescriptions", desc: "Digital prescriptions & reminders" },
                { icon: Siren, title: "Emergency Help", desc: "24/7 emergency assistance" },
              ].map((s) => (
                <ServiceCard key={s.title} {...s} onClick={() => onSelect("patient")} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Portal Selection ── */}
        <section className="py-12 px-4 bg-muted/50">
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Select Your Portal" subtitle="Choose your role to access personalized healthcare services" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hospital */}
              <button
                onClick={() => onSelect("hospital")}
                className="group relative bg-card rounded-lg p-7 shadow-card border-2 border-border hover:border-primary/40 hover:shadow-elevated transition-all text-left"
              >
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:gradient-primary group-hover:text-primary-foreground transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-sidebar-primary" />
                </div>
                <h3 className="text-base font-bold text-card-foreground mb-1">Hospital Portal</h3>
                <p className="text-xs text-muted-foreground mb-4">For doctors, administrators & healthcare workers</p>
                <div className="space-y-1.5">
                  {["AI Diagnostics & Triage", "Patient Monitoring", "Emergency Alert System", "Workflow Optimization", "Community Health Worker", "Report Generation"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </button>

              {/* Patient */}
              <button
                onClick={() => onSelect("patient")}
                className="group relative bg-card rounded-lg p-7 shadow-card border-2 border-border hover:border-secondary/40 hover:shadow-elevated transition-all text-left"
              >
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-base font-bold text-card-foreground mb-1">Patient Portal</h3>
                <p className="text-xs text-muted-foreground mb-4">For patients & family members</p>
                <div className="space-y-1.5">
                  {["View Medical Reports & AI Summaries", "Digital Prescriptions", "Book & Manage Appointments", "Health Monitoring", "Personal Health Records", "Family Health Management"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ── Statistics (#5) ── */}
        <section className="py-12 px-4 gradient-hero">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-primary-foreground">Public Health Statistics</h2>
              <div className="w-16 h-1 gradient-primary rounded-full mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Patients Served", value: 235000, suffix: "+", icon: Users },
                { label: "Hospitals Connected", value: 850, suffix: "", icon: Building2 },
                { label: "Doctors Available", value: 3200, suffix: "+", icon: Stethoscope },
                { label: "Teleconsultations", value: 145000, suffix: "+", icon: Video },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-primary-foreground/5 rounded-lg p-5 border border-primary-foreground/10">
                  <stat.icon className="w-6 h-6 text-sidebar-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary-foreground">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[11px] text-primary-foreground/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Facility Locator (#6) ── */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="Find Healthcare Services Near You" subtitle="Locate hospitals, clinics, pharmacies, and diagnostic labs" icon={MapPin} />
            <div className="bg-card rounded-lg border border-border shadow-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by District, PIN Code, or City..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <button className="px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
                  Search
                </button>
              </div>
              <div className="bg-muted rounded-lg h-48 flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Interactive Map</p>
                  <p className="text-[10px] text-muted-foreground">Enter location to find nearby healthcare facilities</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4">
                {[
                  { icon: Building2, label: "Hospitals", count: "850+" },
                  { icon: Stethoscope, label: "Clinics", count: "2,400+" },
                  { icon: Pill, label: "Pharmacies", count: "5,100+" },
                  { icon: Activity, label: "Labs", count: "1,200+" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-2 p-3 rounded-md bg-muted/50 border border-border">
                    <f.icon className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-foreground">{f.label}</p>
                      <p className="text-[10px] text-muted-foreground">{f.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Government Health Programs (#7) ── */}
        <section className="py-12 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="Government Health Programs" subtitle="National public health initiatives for all citizens" icon={Award} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Maternal Care Initiative", desc: "Free antenatal & postnatal care for expectant mothers", color: "bg-secondary" },
                { title: "TB Control Program", desc: "Free diagnosis, treatment & monitoring for tuberculosis", color: "bg-primary" },
                { title: "National Vaccination", desc: "Universal immunization program for children & adults", color: "bg-govt-saffron" },
                { title: "Rural Telemedicine", desc: "AI-powered teleconsultation in 200+ districts", color: "bg-info" },
              ].map((prog) => (
                <div key={prog.title} className="bg-card rounded-lg p-5 shadow-card border border-border hover:shadow-elevated transition-all">
                  <div className={`w-2 h-2 rounded-full ${prog.color} mb-3`} />
                  <h3 className="text-sm font-semibold text-card-foreground mb-1">{prog.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{prog.desc}</p>
                  <button className="flex items-center gap-1 text-xs text-primary font-medium mt-3 hover:underline">
                    Learn More <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Health Awareness (#9) ── */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="Health Awareness Resources" subtitle="Educational content for better public health" icon={BookOpen} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Preventing Diabetes", icon: TrendingUp },
                { title: "Heart Health Tips", icon: Heart },
                { title: "Maternal Care Guide", icon: Users },
                { title: "Nutrition for Children", icon: Activity },
              ].map((guide) => (
                <div key={guide.title} className="bg-card rounded-lg p-5 shadow-card border border-border text-center hover:shadow-elevated transition-all cursor-pointer">
                  <guide.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium text-card-foreground">{guide.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Read Guide →</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Download Center (#10) ── */}
        <section className="py-12 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="Download Center" subtitle="Access official forms and documents" icon={Download} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Patient Registration Form",
                "Medical Report Format",
                "Teleconsultation Guide",
                "Insurance Claim Form",
              ].map((doc) => (
                <div key={doc} className="bg-card rounded-lg p-4 shadow-card border border-border flex items-center gap-3 hover:shadow-elevated transition-all cursor-pointer">
                  <FileText className="w-5 h-5 text-destructive shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-card-foreground">{doc}</p>
                    <p className="text-[10px] text-muted-foreground">PDF Download</p>
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trusted Doctors (#18) ── */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="Trusted Doctors" subtitle="Verified healthcare professionals" icon={Stethoscope} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DoctorCard name="Dr. Meena Sharma" spec="Cardiologist" hospital="AIIMS Delhi" exp="12 years" />
              <DoctorCard name="Dr. Rajesh Verma" spec="Pulmonologist" hospital="Safdarjung Hospital" exp="15 years" />
              <DoctorCard name="Dr. Priya Nair" spec="Dermatologist" hospital="CMC Vellore" exp="8 years" />
              <DoctorCard name="Dr. Amit Patel" spec="General Physician" hospital="KEM Mumbai" exp="10 years" />
            </div>
          </div>
        </section>

        {/* ── District Coverage Map (#20) ── */}
        <section className="py-12 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="District Telemedicine Coverage" subtitle="Nationwide deployment status" icon={Globe} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { state: "Andhra Pradesh", status: "Active", color: "bg-secondary" },
                { state: "Telangana", status: "Active", color: "bg-secondary" },
                { state: "Tamil Nadu", status: "Active", color: "bg-secondary" },
                { state: "Karnataka", status: "Active", color: "bg-secondary" },
                { state: "Maharashtra", status: "Active", color: "bg-secondary" },
                { state: "Uttar Pradesh", status: "Expanding", color: "bg-warning" },
                { state: "Bihar", status: "Expanding", color: "bg-warning" },
                { state: "Rajasthan", status: "Expanding", color: "bg-warning" },
                { state: "West Bengal", status: "Pilot", color: "bg-info" },
                { state: "Odisha", status: "Pilot", color: "bg-info" },
              ].map((s) => (
                <div key={s.state} className="bg-card rounded-lg p-3 shadow-card border border-border flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${s.color} shrink-0`} />
                  <div>
                    <p className="text-xs font-medium text-card-foreground">{s.state}</p>
                    <p className="text-[10px] text-muted-foreground">{s.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Public Feedback (#19) ── */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Public Feedback" subtitle="Rate and review healthcare services" icon={Star} />
            <div className="bg-card rounded-lg p-6 shadow-card border border-border text-center">
              <p className="text-sm text-card-foreground mb-3">Overall Platform Rating</p>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-6 h-6 ${s <= 4 ? "text-warning fill-warning" : "text-muted-foreground"}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">4.2/5 based on 12,450 citizen reviews</p>
              <button className="mt-4 px-4 py-2 rounded-md border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
                Submit Your Feedback
              </button>
            </div>
          </div>
        </section>

        {/* ── Helpdesk (#11) ── */}
        <section className="py-12 px-4 gradient-hero">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-primary-foreground">24/7 Citizen Helpdesk</h2>
              <div className="w-16 h-1 gradient-primary rounded-full mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-foreground/5 rounded-lg p-5 border border-primary-foreground/10 text-center">
                <Phone className="w-6 h-6 text-sidebar-primary mx-auto mb-2" />
                <p className="text-sm font-semibold text-primary-foreground">Health Helpline</p>
                <p className="text-lg font-bold text-sidebar-primary mt-1">1800-XXX-XXXX</p>
                <p className="text-[10px] text-primary-foreground/60 mt-1">Toll-Free · 24/7 Available</p>
              </div>
              <div className="bg-primary-foreground/5 rounded-lg p-5 border border-primary-foreground/10 text-center">
                <MessageSquare className="w-6 h-6 text-sidebar-primary mx-auto mb-2" />
                <p className="text-sm font-semibold text-primary-foreground">AI Health Chatbot</p>
                <p className="text-xs text-primary-foreground/70 mt-1">Instant answers to your health queries</p>
                <button className="mt-3 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">Start Chat</button>
              </div>
              <div className="bg-primary-foreground/5 rounded-lg p-5 border border-primary-foreground/10 text-center">
                <HelpCircle className="w-6 h-6 text-sidebar-primary mx-auto mb-2" />
                <p className="text-sm font-semibold text-primary-foreground">FAQ & Support</p>
                <p className="text-xs text-primary-foreground/70 mt-1">support@healthportal.gov.in</p>
                <button className="mt-3 px-4 py-1.5 rounded-md border border-primary-foreground/30 text-primary-foreground text-xs font-medium">View FAQ</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mobile App Promotion (#16) ── */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-8 shadow-card border border-border flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                <Smartphone className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-base font-bold text-card-foreground">Download Digital Health App</h3>
                <p className="text-xs text-muted-foreground mt-1">Access healthcare services on the go. Available in 6 languages.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-md bg-foreground text-background text-xs font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" /> Android
                </button>
                <button className="px-4 py-2 rounded-md bg-foreground text-background text-xs font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" /> iOS
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Transparency Footer (#12) ── */}
        <footer className="bg-foreground text-background">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <h4 className="text-xs font-semibold mb-3 text-background/90">Quick Links</h4>
                <div className="space-y-1.5">
                  {["Home", "About Us", "Contact", "Sitemap"].map((l) => (
                    <p key={l} className="text-[11px] text-background/60 hover:text-background cursor-pointer">{l}</p>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold mb-3 text-background/90">Services</h4>
                <div className="space-y-1.5">
                  {["Telemedicine", "AI Diagnostics", "Health Records", "Appointments"].map((l) => (
                    <p key={l} className="text-[11px] text-background/60 hover:text-background cursor-pointer">{l}</p>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold mb-3 text-background/90">Policies</h4>
                <div className="space-y-1.5">
                  {["Privacy Policy", "Terms of Service", "Data Protection (DPDP)", "RTI Information"].map((l) => (
                    <p key={l} className="text-[11px] text-background/60 hover:text-background cursor-pointer">{l}</p>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold mb-3 text-background/90">Grievance</h4>
                <div className="space-y-1.5">
                  {["Public Grievance Portal", "Feedback", "Report an Issue", "Accessibility Statement"].map((l) => (
                    <p key={l} className="text-[11px] text-background/60 hover:text-background cursor-pointer">{l}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-background/20 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5 text-background/60" />
                <div>
                  <p className="text-[11px] text-background/80 font-medium">Digital Health Portal · Government of India</p>
                  <p className="text-[10px] text-background/50">Ayushman Bharat Digital Mission · National Digital Health Mission</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-background/50">
                <span>© 2026 Ministry of Health & Family Welfare</span>
                <span>|</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> Last Updated: March 2026</span>
                <span>|</span>
                <span className="flex items-center gap-1"><Scale className="w-3 h-3" /> Designed per GIGW Guidelines</span>
              </div>
            </div>
          </div>
          {/* Bottom tricolor */}
          <div className="h-1 w-full flex">
            <div className="flex-1 bg-govt-saffron" />
            <div className="flex-1 bg-card" />
            <div className="flex-1 bg-govt-green" />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PortalSelector;
