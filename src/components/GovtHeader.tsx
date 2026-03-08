import { useState, useEffect } from "react";
import { Globe, Accessibility, Minus, Plus, RotateCcw, Menu, X, Eye } from "lucide-react";

const languages = ["English", "हिंदी", "తెలుగు", "தமிழ்", "বাংলা", "ಕನ್ನಡ"];

const GovtHeader = () => {
  const [fontSize, setFontSize] = useState(100);
  const [activeLang, setActiveLang] = useState("English");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(() => {
    return document.documentElement.classList.contains("high-contrast");
  });

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  const changeFontSize = (delta: number) => {
    const next = Math.max(80, Math.min(120, fontSize + delta));
    setFontSize(next);
    document.documentElement.style.fontSize = `${next}%`;
  };

  const toggleHighContrast = () => setHighContrast((prev) => !prev);

  return (
    <>
      {/* Tricolor strip */}
      <div className="h-1 w-full flex" role="presentation" aria-hidden="true">
        <div className="flex-1 bg-govt-saffron" />
        <div className="flex-1 bg-card" />
        <div className="flex-1 bg-govt-green" />
      </div>

      {/* Top utility bar */}
      <div className="govt-top-bar px-4 py-1.5 flex items-center justify-between text-[10px]" role="banner" aria-label="Government utility bar">
        <div className="flex items-center gap-3">
          <span className="text-primary-foreground/80 font-body">Government of India</span>
          <span className="text-primary-foreground/40 hidden sm:inline" aria-hidden="true">|</span>
          <span className="text-primary-foreground/80 font-body hidden sm:inline">Ministry of Health & Family Welfare</span>
        </div>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-3" role="toolbar" aria-label="Accessibility controls">
          <a href="#main-content" className="text-primary-foreground/70 hover:text-primary-foreground underline font-body">
            Skip to Main Content
          </a>
          <span className="text-primary-foreground/30" aria-hidden="true">|</span>
          <div className="flex items-center gap-1" role="group" aria-label="Font size controls">
            <button onClick={() => changeFontSize(-10)} className="text-primary-foreground/70 hover:text-primary-foreground p-0.5" aria-label="Decrease font size">
              <Minus className="w-3 h-3" aria-hidden="true" />
            </button>
            <span className="text-primary-foreground/70" aria-hidden="true">A</span>
            <button onClick={() => changeFontSize(10)} className="text-primary-foreground/70 hover:text-primary-foreground p-0.5" aria-label="Increase font size">
              <Plus className="w-3 h-3" aria-hidden="true" />
            </button>
            <button onClick={() => { setFontSize(100); document.documentElement.style.fontSize = "100%"; }} className="text-primary-foreground/70 hover:text-primary-foreground p-0.5" aria-label="Reset font size">
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
          <span className="text-primary-foreground/30" aria-hidden="true">|</span>
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded font-body transition-colors ${
              highContrast
                ? "bg-primary text-primary-foreground"
                : "text-primary-foreground/70 hover:text-primary-foreground"
            }`}
            aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
            aria-pressed={highContrast}
          >
            <Eye className="w-3 h-3" aria-hidden="true" />
            <span className="hidden lg:inline">High Contrast</span>
          </button>
          <span className="text-primary-foreground/30" aria-hidden="true">|</span>
          <button className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground" aria-label="Screen reader mode">
            <Accessibility className="w-3 h-3" aria-hidden="true" />
          </button>
          <span className="text-primary-foreground/30" aria-hidden="true">|</span>
          <div className="flex items-center gap-1.5" role="group" aria-label="Language selection">
            <Globe className="w-3 h-3 text-primary-foreground/70" aria-hidden="true" />
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-1.5 py-0.5 rounded font-body transition-colors ${
                  activeLang === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
                aria-label={`Switch language to ${lang}`}
                aria-pressed={activeLang === lang}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-primary-foreground/70 hover:text-primary-foreground p-1" aria-label="Toggle accessibility settings" aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="md:hidden govt-top-bar px-4 py-3 space-y-3 text-[10px] border-t border-primary-foreground/10" role="region" aria-label="Mobile accessibility controls">
          <p className="text-primary-foreground/80 font-body">Ministry of Health & Family Welfare</p>
          <div className="flex items-center gap-2">
            <span className="text-primary-foreground/70">Font:</span>
            <button onClick={() => changeFontSize(-10)} className="text-primary-foreground/70 hover:text-primary-foreground p-1 border border-primary-foreground/20 rounded" aria-label="Decrease font size">
              <Minus className="w-3 h-3" aria-hidden="true" />
            </button>
            <button onClick={() => changeFontSize(10)} className="text-primary-foreground/70 hover:text-primary-foreground p-1 border border-primary-foreground/20 rounded" aria-label="Increase font size">
              <Plus className="w-3 h-3" aria-hidden="true" />
            </button>
            <button onClick={() => { setFontSize(100); document.documentElement.style.fontSize = "100%"; }} className="text-primary-foreground/70 hover:text-primary-foreground p-1 border border-primary-foreground/20 rounded" aria-label="Reset font size">
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
            </button>
            <button
              onClick={toggleHighContrast}
              className={`p-1 border rounded ml-1 transition-colors ${
                highContrast
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-primary-foreground/70 hover:text-primary-foreground border-primary-foreground/20"
              }`}
              aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
              aria-pressed={highContrast}
            >
              <Eye className="w-3 h-3" aria-hidden="true" />
            </button>
            <button className="text-primary-foreground/70 hover:text-primary-foreground p-1 border border-primary-foreground/20 rounded ml-auto" aria-label="Screen reader mode">
              <Accessibility className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Language selection">
            <Globe className="w-3 h-3 text-primary-foreground/70 mt-0.5" aria-hidden="true" />
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-2 py-1 rounded font-body transition-colors ${
                  activeLang === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground border border-primary-foreground/20"
                }`}
                aria-label={`Switch language to ${lang}`}
                aria-pressed={activeLang === lang}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GovtHeader;
