import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Demo = () => {
  const [adapted, setAdapted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              See the difference
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Toggle between a standard website and one transformed by AdaptiveUI. Experience accessibility in action.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <span className={`text-sm font-medium ${!adapted ? "text-foreground" : "text-muted-foreground"}`}>
              Standard View
            </span>
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
            <span className={`text-sm font-medium ${adapted ? "text-foreground" : "text-muted-foreground"}`}>
              Adapted View
            </span>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            className="rounded-2xl border-2 border-border overflow-hidden shadow-elevated"
          >
            {/* Mock browser bar */}
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

            {/* Mock website content */}
            <div
              className="transition-all duration-700 ease-in-out"
              style={{
                background: adapted ? "hsl(222 47% 6%)" : "hsl(0 0% 100%)",
                color: adapted ? "hsl(210 40% 96%)" : "hsl(222 47% 11%)",
              }}
            >
              {/* Mock header */}
              <div
                className="px-6 md:px-10 py-4 flex items-center justify-between border-b transition-all duration-700"
                style={{
                  borderColor: adapted ? "hsl(217 33% 20%)" : "hsl(220 16% 90%)",
                }}
              >
                <div
                  className="font-bold transition-all duration-700"
                  style={{ fontSize: adapted ? "1.3rem" : "1rem" }}
                >
                  📰 DailyNews
                </div>
                <div className="flex gap-4">
                  {["Home", "World", "Tech", "Sports"].map((item) => (
                    <span
                      key={item}
                      className="hidden sm:block transition-all duration-700 cursor-pointer"
                      style={{
                        fontSize: adapted ? "1.05rem" : "0.875rem",
                        padding: adapted ? "8px 16px" : "4px 8px",
                        borderRadius: adapted ? "8px" : "4px",
                        background: adapted ? "hsl(217 33% 15%)" : "transparent",
                        textDecoration: adapted ? "none" : "none",
                        fontWeight: adapted ? 600 : 400,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mock article */}
              <div className="px-6 md:px-10 py-8 max-w-3xl">
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
                    fontSize: adapted ? "2.2rem" : "1.5rem",
                    lineHeight: adapted ? "1.3" : "1.25",
                    letterSpacing: adapted ? "-0.01em" : "normal",
                  }}
                >
                  New Browser Extension Makes Web Accessible for Millions
                </h2>

                <p
                  className="transition-all duration-700 mb-6"
                  style={{
                    fontSize: adapted ? "1.2rem" : "0.95rem",
                    lineHeight: adapted ? "2" : "1.6",
                    letterSpacing: adapted ? "0.02em" : "normal",
                    color: adapted ? "hsl(210 20% 80%)" : "hsl(220 10% 46%)",
                    maxWidth: adapted ? "65ch" : "none",
                  }}
                >
                  A revolutionary browser extension is changing how people with disabilities experience the internet. AdaptiveUI automatically transforms website layouts, typography, and interactions to match individual accessibility needs.
                </p>

                <p
                  className="transition-all duration-700"
                  style={{
                    fontSize: adapted ? "1.2rem" : "0.95rem",
                    lineHeight: adapted ? "2" : "1.6",
                    letterSpacing: adapted ? "0.02em" : "normal",
                    color: adapted ? "hsl(210 20% 80%)" : "hsl(220 10% 46%)",
                    maxWidth: adapted ? "65ch" : "none",
                  }}
                >
                  The tool supports visual impairments, motor disabilities, and cognitive differences — adapting everything from font sizes and contrast ratios to button sizes and page complexity.
                </p>

                {/* Mock button */}
                <div className="mt-8">
                  <span
                    className="inline-block transition-all duration-700 cursor-pointer font-medium"
                    style={{
                      padding: adapted ? "14px 28px" : "8px 16px",
                      borderRadius: adapted ? "12px" : "6px",
                      fontSize: adapted ? "1.1rem" : "0.875rem",
                      background: adapted ? "hsl(12 80% 62%)" : "hsl(222 60% 18%)",
                      color: adapted ? "hsl(0 0% 100%)" : "hsl(210 40% 98%)",
                      boxShadow: adapted ? "0 0 30px hsl(12 80% 62% / 0.3)" : "none",
                    }}
                  >
                    Read Full Article →
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Annotations */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 grid sm:grid-cols-3 gap-6"
          >
            {[
              { title: "Enhanced Typography", desc: "Larger text, better spacing, improved readability for all users.", active: adapted },
              { title: "Smart Contrast", desc: "Dark mode with optimized contrast ratios that reduce eye strain.", active: adapted },
              { title: "Bigger Targets", desc: "Larger buttons and navigation elements for easier interaction.", active: adapted },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-5 rounded-xl border-2 transition-all duration-500 ${
                  item.active
                    ? "border-accent bg-accent/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {item.active ? (
                    <ToggleRight className="w-5 h-5 text-accent" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="font-semibold text-foreground">{item.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-16"
          >
            <Link to="/onboarding">
              <Button variant="hero" size="lg" className="rounded-xl px-8 py-6 text-base">
                Set Up Your Profile <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
