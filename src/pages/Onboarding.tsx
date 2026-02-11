import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, Hand, Brain, Check, ArrowRight, ArrowLeft,
  ToggleLeft, ToggleRight, Download, Chrome, Pin, Rocket,
} from "lucide-react";
import Navbar from "@/components/Navbar";

type DisabilityType = "visual" | "motor" | "cognitive";

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

const extensionSteps = [
  { icon: Download, title: "Download Extension", desc: "Click the button below to get the Chrome extension." },
  { icon: Chrome, title: "Add to Chrome", desc: "Click \"Add to Chrome\" in the Chrome Web Store." },
  { icon: Pin, title: "Pin the Extension", desc: "Pin AdaptiveUI to your toolbar for quick access." },
  { icon: Rocket, title: "Start Browsing", desc: "Visit any website — it adapts automatically!" },
];

const fadeSlide = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<DisabilityType[]>([]);
  const [adapted, setAdapted] = useState(false);
  const navigate = useNavigate();

  const toggleType = (type: DisabilityType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-4">
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
          <p className="text-sm text-muted-foreground mb-10 text-right">
            Step {step + 1} of 3
          </p>

          <AnimatePresence mode="wait">
            {/* ── Step 1: Disability Selection ── */}
            {step === 0 && (
              <motion.div key="step0" variants={fadeSlide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Select your accessibility need
                </h1>
                <p className="text-muted-foreground text-lg mb-10">
                  Choose the areas where you'd like web accessibility support. You can choose more than one.
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

            {/* ── Step 2: Demo Preview ── */}
            {step === 1 && (
              <motion.div key="step1" variants={fadeSlide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  See how it works
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  Toggle between a standard website and one transformed by AdaptiveUI.
                </p>

                {/* Toggle */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className={`text-sm font-medium ${!adapted ? "text-foreground" : "text-muted-foreground"}`}>Standard</span>
                  <button
                    onClick={() => setAdapted(!adapted)}
                    className="relative w-16 h-8 rounded-full transition-colors duration-300"
                    style={{ background: adapted ? "hsl(var(--accent))" : "hsl(var(--muted))" }}
                  >
                    <motion.div
                      className="absolute top-1 w-6 h-6 rounded-full bg-card shadow-soft"
                      animate={{ left: adapted ? 34 : 4 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                  <span className={`text-sm font-medium ${adapted ? "text-foreground" : "text-muted-foreground"}`}>Adapted</span>
                </div>

                {/* Mini demo */}
                <div className="rounded-2xl border-2 border-border overflow-hidden shadow-elevated">
                  <div className="bg-muted px-4 py-3 flex items-center gap-3 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-accent/60" />
                      <div className="w-3 h-3 rounded-full bg-teal/60" />
                    </div>
                    <div className="flex-1 bg-background rounded-lg px-4 py-1.5 text-sm text-muted-foreground">
                      https://example-news.com
                    </div>
                  </div>

                  <div
                    className="px-6 md:px-10 py-8 transition-all duration-700"
                    style={{
                      background: adapted ? "hsl(222 47% 6%)" : "hsl(0 0% 100%)",
                      color: adapted ? "hsl(210 40% 96%)" : "hsl(222 47% 11%)",
                    }}
                  >
                    <div
                      className="transition-all duration-700 mb-2"
                      style={{
                        fontSize: adapted ? "0.95rem" : "0.75rem",
                        color: adapted ? "hsl(12 80% 62%)" : "hsl(220 10% 46%)",
                        fontWeight: adapted ? 700 : 400,
                        letterSpacing: adapted ? "0.05em" : "normal",
                      }}
                    >
                      TECHNOLOGY
                    </div>
                    <h2
                      className="font-bold transition-all duration-700 mb-4"
                      style={{
                        fontSize: adapted ? "2rem" : "1.5rem",
                        lineHeight: adapted ? "1.3" : "1.25",
                      }}
                    >
                      New Browser Extension Makes Web Accessible for Millions
                    </h2>
                    <p
                      className="transition-all duration-700"
                      style={{
                        fontSize: adapted ? "1.15rem" : "0.95rem",
                        lineHeight: adapted ? "2" : "1.6",
                        color: adapted ? "hsl(210 20% 80%)" : "hsl(220 10% 46%)",
                        maxWidth: adapted ? "65ch" : "none",
                      }}
                    >
                      AdaptiveUI automatically transforms website layouts, typography, and interactions to match individual accessibility needs.
                    </p>

                    <span
                      className="inline-block mt-6 transition-all duration-700 cursor-pointer font-medium"
                      style={{
                        padding: adapted ? "14px 28px" : "8px 16px",
                        borderRadius: adapted ? "12px" : "6px",
                        fontSize: adapted ? "1.05rem" : "0.875rem",
                        background: adapted ? "hsl(12 80% 62%)" : "hsl(222 60% 18%)",
                        color: "hsl(210 40% 98%)",
                        boxShadow: adapted ? "0 0 30px hsl(12 80% 62% / 0.3)" : "none",
                      }}
                    >
                      Read Full Article →
                    </span>
                  </div>
                </div>

                {/* Annotations */}
                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  {[
                    { title: "Enhanced Typography", desc: "Larger text, better spacing." },
                    { title: "Smart Contrast", desc: "Dark mode, optimized ratios." },
                    { title: "Bigger Targets", desc: "Larger buttons and links." },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                        adapted ? "border-accent bg-accent/5" : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {adapted ? <ToggleRight className="w-4 h-4 text-accent" /> : <ToggleLeft className="w-4 h-4 text-muted-foreground" />}
                        <span className="font-semibold text-foreground text-sm">{item.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex justify-between">
                  <Button variant="ghost" size="lg" onClick={() => setStep(0)}>
                    <ArrowLeft className="w-5 h-5 mr-1" /> Back
                  </Button>
                  <Button variant="hero" size="lg" className="rounded-xl px-8" onClick={() => setStep(2)}>
                    Continue <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Chrome Extension Download ── */}
            {step === 2 && (
              <motion.div key="step2" variants={fadeSlide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full gradient-coral mx-auto flex items-center justify-center mb-6 shadow-glow"
                  >
                    <Chrome className="w-10 h-10 text-accent-foreground" />
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Install Our Chrome Extension
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    Get AdaptiveUI running in your browser in four simple steps.
                  </p>
                </div>

                {/* Setup Steps */}
                <div className="grid gap-4 mb-10">
                  {extensionSteps.map((s, i) => (
                    <motion.div
                      key={s.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-5 p-5 rounded-2xl border-2 border-border bg-card"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 font-bold text-lg">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">{s.title}</div>
                        <div className="text-sm text-muted-foreground">{s.desc}</div>
                      </div>
                      <s.icon className="w-6 h-6 text-muted-foreground shrink-0" />
                    </motion.div>
                  ))}
                </div>

                {/* Download Button */}
                <div className="text-center">
                  <Button
                    variant="hero"
                    size="lg"
                    className="rounded-xl px-10 py-7 text-lg shadow-glow"
                    onClick={() => window.open("https://chrome.google.com/webstore", "_blank")}
                  >
                    <Download className="w-5 h-5 mr-2" /> Download Chrome Extension
                  </Button>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <Button variant="ghost" size="lg" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-5 h-5 mr-1" /> Back
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => navigate("/")}
                  >
                    Skip for now
                  </Button>
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
