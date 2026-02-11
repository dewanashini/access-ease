import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Hand, Brain, Check, ArrowRight, ArrowLeft, Sun, Moon, Type, MousePointer, Palette, Focus } from "lucide-react";
import Navbar from "@/components/Navbar";

type DisabilityType = "visual" | "motor" | "cognitive";

interface Preference {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const disabilityOptions = [
  {
    type: "visual" as DisabilityType,
    icon: Eye,
    title: "Visual",
    description: "Color blindness, low vision, light sensitivity",
    color: "border-accent bg-accent/5 text-accent",
    activeColor: "border-accent bg-accent/15 text-accent ring-2 ring-accent/30",
  },
  {
    type: "motor" as DisabilityType,
    icon: Hand,
    title: "Motor",
    description: "Limited dexterity, tremors, mobility constraints",
    color: "border-teal bg-teal/5 text-teal",
    activeColor: "border-teal bg-teal/15 text-teal ring-2 ring-teal/30",
  },
  {
    type: "cognitive" as DisabilityType,
    icon: Brain,
    title: "Cognitive",
    description: "ADHD, dyslexia, processing differences",
    color: "border-lavender bg-lavender/5 text-lavender",
    activeColor: "border-lavender bg-lavender/15 text-lavender ring-2 ring-lavender/30",
  },
];

const preferencesByType: Record<DisabilityType, Preference[]> = {
  visual: [
    { id: "high-contrast", label: "High Contrast", icon: Sun, description: "Increase contrast for better visibility" },
    { id: "dark-mode", label: "Dark Mode", icon: Moon, description: "Reduce glare and eye strain" },
    { id: "large-text", label: "Larger Text", icon: Type, description: "Increase font sizes across all sites" },
    { id: "color-adjust", label: "Color Adjustment", icon: Palette, description: "Adapt colors for color blindness" },
  ],
  motor: [
    { id: "large-targets", label: "Larger Click Targets", icon: MousePointer, description: "Increase button and link sizes" },
    { id: "keyboard-nav", label: "Keyboard Navigation", icon: Type, description: "Enhanced keyboard shortcuts" },
    { id: "sticky-hover", label: "Sticky Hover", icon: Hand, description: "Keep tooltips open longer" },
    { id: "reduced-motion", label: "Reduced Motion", icon: Focus, description: "Minimize animations" },
  ],
  cognitive: [
    { id: "focus-mode", label: "Focus Mode", icon: Focus, description: "Reduce distractions on page" },
    { id: "simple-layout", label: "Simplified Layout", icon: Type, description: "Streamline page structure" },
    { id: "reading-guide", label: "Reading Guide", icon: Eye, description: "Line-by-line reading ruler" },
    { id: "highlight-links", label: "Highlight Links", icon: Palette, description: "Make links more visible" },
  ],
};

const fadeSlide = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<DisabilityType[]>([]);
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleType = (type: DisabilityType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const togglePref = (id: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const allPreferences = selectedTypes.flatMap((type) => preferencesByType[type]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-12">
            {[0, 1, 2].map((s) => (
              <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
                <motion.div
                  className="h-full gradient-coral rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: step >= s ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" variants={fadeSlide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Welcome! Let's personalize your experience.
                </h1>
                <p className="text-muted-foreground text-lg mb-10">
                  Select the areas where you'd like web accessibility support. You can choose more than one.
                </p>

                <div className="grid gap-4">
                  {disabilityOptions.map((opt) => {
                    const isActive = selectedTypes.includes(opt.type);
                    return (
                      <button
                        key={opt.type}
                        onClick={() => toggleType(opt.type)}
                        className={`flex items-center gap-5 p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                          isActive ? opt.activeColor : opt.color
                        }`}
                      >
                        <div className="w-14 h-14 rounded-xl bg-current/10 flex items-center justify-center shrink-0">
                          <opt.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-foreground text-lg">{opt.title}</div>
                          <div className="text-muted-foreground text-sm">{opt.description}</div>
                        </div>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 rounded-full gradient-coral flex items-center justify-center shrink-0"
                          >
                            <Check className="w-4 h-4 text-accent-foreground" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-10 flex justify-end">
                  <Button
                    variant="hero"
                    size="lg"
                    className="rounded-xl px-8"
                    disabled={selectedTypes.length === 0}
                    onClick={() => setStep(1)}
                  >
                    Continue <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" variants={fadeSlide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Choose your preferences
                </h1>
                <p className="text-muted-foreground text-lg mb-10">
                  Select the adaptations you'd like enabled. You can always change these later.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {allPreferences.map((pref) => {
                    const isActive = selectedPrefs.includes(pref.id);
                    return (
                      <button
                        key={pref.id}
                        onClick={() => togglePref(pref.id)}
                        className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-200 text-left ${
                          isActive
                            ? "border-accent bg-accent/10 ring-2 ring-accent/20"
                            : "border-border bg-card hover:border-accent/30"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                        }`}>
                          <pref.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{pref.label}</div>
                          <div className="text-sm text-muted-foreground">{pref.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-10 flex justify-between">
                  <Button variant="ghost" size="lg" onClick={() => setStep(0)}>
                    <ArrowLeft className="w-5 h-5 mr-1" /> Back
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    className="rounded-xl px-8"
                    disabled={selectedPrefs.length === 0}
                    onClick={() => setStep(2)}
                  >
                    Continue <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={fadeSlide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full gradient-coral mx-auto flex items-center justify-center mb-8 shadow-glow"
                  >
                    <Check className="w-10 h-10 text-accent-foreground" />
                  </motion.div>

                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    You're all set!
                  </h1>
                  <p className="text-muted-foreground text-lg mb-4 max-w-md mx-auto">
                    Your adaptive profile is ready. The extension will now transform websites based on your preferences.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {selectedPrefs.map((id) => {
                      const pref = allPreferences.find((p) => p.id === id);
                      return pref ? (
                        <span key={id} className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
                          {pref.label}
                        </span>
                      ) : null;
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      variant="hero"
                      size="lg"
                      className="rounded-xl px-8"
                      onClick={() => navigate("/demo")}
                    >
                      See Live Demo <ArrowRight className="w-5 h-5 ml-1" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => { setStep(0); setSelectedPrefs([]); setSelectedTypes([]); }}
                    >
                      Start Over
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
