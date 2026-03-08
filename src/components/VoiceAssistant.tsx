import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, MicOff, Volume2, Globe, MessageSquare, Sparkles, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

type Language = { code: string; label: string; bcp47: string };

const languages: Language[] = [
  { code: "en", label: "English", bcp47: "en-IN" },
  { code: "hi", label: "हिन्दी (Hindi)", bcp47: "hi-IN" },
  { code: "te", label: "తెలుగు (Telugu)", bcp47: "te-IN" },
  { code: "ta", label: "தமிழ் (Tamil)", bcp47: "ta-IN" },
  { code: "bn", label: "বাংলা (Bengali)", bcp47: "bn-IN" },
  { code: "mr", label: "मराठी (Marathi)", bcp47: "mr-IN" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)", bcp47: "kn-IN" },
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  fever: "You may have a viral fever. Please drink plenty of fluids, rest, and monitor your temperature. If fever persists for more than 3 days or exceeds 103°F (39.4°C), please visit the nearest health center immediately.",
  headache: "Headaches can be caused by dehydration, stress, or infections. Drink water, rest in a cool place, and take paracetamol if needed. If headaches are severe or recurring, consult a doctor.",
  cough: "A persistent cough may indicate a respiratory infection. Stay hydrated, avoid cold drinks, and use steam inhalation. If you have difficulty breathing or cough with blood, seek emergency care.",
  pain: "Please describe where you feel pain. In the meantime, rest the affected area. If pain is severe, sudden, or in the chest, seek immediate medical attention.",
  breathing: "Breathing difficulty is a serious symptom. Sit upright, try to stay calm, and get fresh air. If oxygen levels drop below 94%, go to the nearest hospital immediately or call 108.",
  default: "I understand your concern. Based on what you've described, I recommend consulting with a healthcare provider for a proper evaluation. Would you like me to help you find the nearest health center?",
};

const getAIResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(mockResponses)) {
    if (key !== "default" && lower.includes(key)) return response;
  }
  return mockResponses.default;
};

const VoiceAssistant = () => {
  const [lang, setLang] = useState<Language>(languages[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Namaste! 🙏 I'm your AI health assistant. You can speak or type your symptoms in your preferred language. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!SpeechRecognitionAPI) {
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = lang.bcp47;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let t = "";
      for (let i = 0; i < event.results.length; i++) {
        t += event.results[i][0].transcript;
      }
      setTranscript(t);
      if (event.results[0].isFinal) {
        handleSendMessage(t);
        setTranscript("");
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, [lang]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const speakText = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang.bcp47;
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [lang]);

  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", text: text.trim(), timestamp: new Date() };
    const response = getAIResponse(text);
    const assistantMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: "assistant", text: response, timestamp: new Date() };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputText("");
    speakText(response);
  }, [speakText]);

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-primary shadow-glow">
          <Mic className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Voice Health Assistant</h2>
          <p className="text-xs text-muted-foreground">Speak symptoms in your language — AI-powered multilingual support</p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <Languages className="w-4 h-4 text-muted-foreground" />
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              lang.code === l.code
                ? "gradient-primary text-primary-foreground shadow-glow"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chat Panel */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card border border-border flex flex-col" style={{ height: "480px" }}>
          <div className="p-4 border-b border-border flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-card-foreground">Consultation Chat</span>
            {isSpeaking && (
              <span className="ml-auto flex items-center gap-1 text-[10px] text-primary font-medium">
                <Volume2 className="w-3 h-3 animate-pulse" /> Speaking...
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "gradient-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-card-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {transcript && (
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-xl px-4 py-2.5 text-xs bg-primary/10 text-primary border border-primary/20 rounded-br-sm italic">
                  {transcript}...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
              placeholder="Type your symptoms..."
              className="flex-1 text-xs bg-muted rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button size="sm" onClick={() => handleSendMessage(inputText)} disabled={!inputText.trim()} className="gradient-primary text-primary-foreground">
              <Sparkles className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Voice Control Panel */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border text-center">
            <h3 className="text-sm font-semibold text-card-foreground mb-4">Voice Input</h3>
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={!speechSupported}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all ${
                isListening
                  ? "bg-destructive text-destructive-foreground animate-pulse-glow"
                  : "gradient-primary text-primary-foreground shadow-glow hover:scale-105"
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
            <p className="text-xs text-muted-foreground mt-3">
              {!speechSupported ? "Speech not supported in this browser" : isListening ? "Listening... Speak now" : "Tap to speak"}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              <Globe className="w-3 h-3 inline mr-1" />
              {lang.label}
            </p>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <h3 className="text-sm font-semibold text-card-foreground mb-3">How it works</h3>
            <div className="space-y-2">
              {[
                { step: "1", text: "Select your language" },
                { step: "2", text: "Tap mic & describe symptoms" },
                { step: "3", text: "AI analyzes & responds" },
                { step: "4", text: "Get voice + text guidance" },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">
                    {s.step}
                  </span>
                  <span className="text-xs text-muted-foreground">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
