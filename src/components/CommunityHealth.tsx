import { useState } from "react";
import { Users, Baby, Syringe, Heart, ClipboardList, Plus, MapPin, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Villager {
  id: string;
  name: string;
  age: number;
  gender: string;
  village: string;
  phone: string;
  conditions: string[];
  lastVisit: string;
  vaccinations: number;
  pregnant?: boolean;
  childrenUnder5?: number;
}

const mockVillagers: Villager[] = [
  { id: "V-001", name: "Lakshmi Devi", age: 28, gender: "F", village: "Rampur", phone: "+91-9876XXXXX", conditions: ["Anemia"], lastVisit: "2 days ago", vaccinations: 3, pregnant: true },
  { id: "V-002", name: "Ramesh Yadav", age: 55, gender: "M", village: "Rampur", phone: "+91-9845XXXXX", conditions: ["Diabetes", "Hypertension"], lastVisit: "1 week ago", vaccinations: 2 },
  { id: "V-003", name: "Sunita Kumari", age: 32, gender: "F", village: "Khanpur", phone: "+91-9912XXXXX", conditions: [], lastVisit: "3 days ago", vaccinations: 5, childrenUnder5: 2 },
  { id: "V-004", name: "Mohan Lal", age: 67, gender: "M", village: "Rampur", phone: "+91-9765XXXXX", conditions: ["COPD", "Heart Disease"], lastVisit: "2 weeks ago", vaccinations: 1 },
  { id: "V-005", name: "Fatima Begum", age: 24, gender: "F", village: "Khanpur", phone: "+91-9834XXXXX", conditions: ["Malnutrition"], lastVisit: "5 days ago", vaccinations: 4, pregnant: true, childrenUnder5: 1 },
];

const stats = [
  { label: "Registered Villagers", value: "342", icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Pregnant Women", value: "18", icon: Baby, color: "bg-warning/10 text-warning" },
  { label: "Children < 5 yrs", value: "47", icon: Heart, color: "bg-destructive/10 text-destructive" },
  { label: "Vaccinations Due", value: "23", icon: Syringe, color: "bg-info/10 text-info" },
];

const CommunityHealth = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = mockVillagers.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) || v.village.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-primary shadow-glow">
          <Users className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Community Health Worker (ASHA) Mode</h2>
          <p className="text-xs text-muted-foreground">Register villagers, track vitals, monitor pregnancies & vaccinations</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-2`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold text-card-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Register */}
      <div className="flex gap-3">
        <Input
          placeholder="Search by name or village..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground shadow-glow">
          <Plus className="w-4 h-4 mr-1" /> Register
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <h3 className="text-sm font-semibold text-card-foreground mb-3">Register New Villager</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Input placeholder="Full Name" />
            <Input placeholder="Age" />
            <Input placeholder="Village" />
            <Input placeholder="Phone" />
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="gradient-primary text-primary-foreground">Save Record</Button>
            <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Villager List */}
      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-primary" /> Registered Villagers
          </h3>
          <span className="text-[10px] text-muted-foreground">{filtered.length} records</span>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((v) => (
            <div key={v.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-medium text-card-foreground">{v.name}</h4>
                    <span className="text-[10px] text-muted-foreground">{v.id}</span>
                    {v.pregnant && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-warning/10 text-warning border border-warning/20">
                        Pregnant
                      </span>
                    )}
                    {v.childrenUnder5 && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-info/10 text-info border border-info/20">
                        {v.childrenUnder5} child{v.childrenUnder5 > 1 ? "ren" : ""} &lt;5
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-[11px] text-muted-foreground">
                    <span>Age {v.age} · {v.gender}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {v.village}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {v.phone}</span>
                  </div>
                  {v.conditions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {v.conditions.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-destructive/10 text-destructive">{c}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <CheckCircle className="w-3 h-3 text-success" /> Last: {v.lastVisit}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                    <Syringe className="w-3 h-3" /> {v.vaccinations} vaccines
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityHealth;
