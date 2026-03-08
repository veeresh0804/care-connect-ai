import { useState } from "react";
import { Globe, Accessibility, Minus, Plus, RotateCcw } from "lucide-react";

const languages = ["English", "हिंदी", "తెలుగు", "தமிழ்", "বাংলা", "ಕನ್ನಡ"];

const GovtHeader = () => {
  const [fontSize, setFontSize] = useState(100);
  const [activeLang, setActiveLang] = useState("English");

  const changeFontSize = (delta: number) => {
    const next = Math.max(80, Math.min(120, fontSize + delta));
    setFontSize(next);
    document.documentElement.style.fontSize = `${next}%`;
  };

  return (
    <>
      {/* Tricolor strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-govt-saffron" />
        <div className="flex-1 bg-card" />
        <div className="flex-1 bg-govt-green" />
      </div>

      {/* Top utility bar */}
      <div className="govt-top-bar px-4 py-1.5 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-3">
          <span className="text-primary-foreground/80 font-body">Government of India</span>
          <span className="text-primary-foreground/40">|</span>
          <span className="text-primary-foreground/80 font-body">Ministry of Health & Family Welfare</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Skip to content */}
          <a href="#main-content" className="text-primary-foreground/70 hover:text-primary-foreground underline font-body">
            Skip to Main Content
          </a>
          <span className="text-primary-foreground/30">|</span>

          {/* Font size */}
          <div className="flex items-center gap-1">
            <button onClick={() => changeFontSize(-10)} className="text-primary-foreground/70 hover:text-primary-foreground p-0.5" aria-label="Decrease font size">
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-primary-foreground/70">A</span>
            <button onClick={() => changeFontSize(10)} className="text-primary-foreground/70 hover:text-primary-foreground p-0.5" aria-label="Increase font size">
              <Plus className="w-3 h-3" />
            </button>
            <button onClick={() => { setFontSize(100); document.documentElement.style.fontSize = "100%"; }} className="text-primary-foreground/70 hover:text-primary-foreground p-0.5" aria-label="Reset font size">
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
          <span className="text-primary-foreground/30">|</span>

          {/* Accessibility */}
          <button className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground">
            <Accessibility className="w-3 h-3" />
          </button>
          <span className="text-primary-foreground/30">|</span>

          {/* Languages */}
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-primary-foreground/70" />
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-1.5 py-0.5 rounded font-body transition-colors ${
                  activeLang === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GovtHeader;
