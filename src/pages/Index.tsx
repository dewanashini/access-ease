import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, Hand, Brain, ArrowRight, Sparkles, Shield, Zap, Users, Accessibility } from "lucide-react";
import Navbar from "@/components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm opacity-50" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal/5 blur-3xl" />

        <div className="container mx-auto relative z-10 max-w-4xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Making the web accessible for everyone
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight mb-6"
          >
            Browse the web{" "}
            <span className="text-gradient">your way</span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AdaptiveUI is a browser extension that transforms any website to match your unique accessibility needs — whether visual, motor, or cognitive.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/onboarding">
              <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-xl">
                Get Started Free <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="hero-outline" size="lg" className="text-base px-8 py-6 rounded-xl">
                See Live Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              The web wasn't built for everyone
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Over 1 billion people worldwide live with some form of disability. Most websites still don't accommodate their needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Visual",
                desc: "Color blindness, low vision, and light sensitivity affect how users perceive content.",
                color: "bg-accent/10 text-accent",
              },
              {
                icon: Hand,
                title: "Motor",
                desc: "Limited dexterity or mobility makes standard navigation frustrating or impossible.",
                color: "bg-teal/10 text-teal",
              },
              {
                icon: Brain,
                title: "Cognitive",
                desc: "ADHD, dyslexia, and other conditions impact reading, focus, and comprehension.",
                color: "bg-lavender/10 text-lavender",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i + 1}
                className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-elevated transition-shadow duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact / Stats */}
      <section className="py-24 px-4 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(222_60%_24%),transparent_60%)]" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Real impact, real numbers</h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
              AdaptiveUI is making the web more inclusive every day.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1B+", label: "People with disabilities" },
              { value: "97%", label: "Sites fail accessibility" },
              { value: "3x", label: "Faster browsing" },
              { value: "50+", label: "Adaptations available" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">{stat.value}</div>
                <div className="text-primary-foreground/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Why AdaptiveUI?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Instant Setup", desc: "One-time onboarding, works everywhere." },
              { icon: Shield, title: "Privacy First", desc: "All processing happens locally in your browser." },
              { icon: Sparkles, title: "AI-Powered", desc: "Smart adaptations that learn from your usage." },
              { icon: Users, title: "Community Built", desc: "Shaped by real users with real needs." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-card-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="rounded-3xl gradient-coral p-12 md:p-16 text-center shadow-glow relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(12_80%_72%/0.4),transparent_60%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
                Ready to browse your way?
              </h2>
              <p className="text-accent-foreground/80 text-lg mb-8 max-w-lg mx-auto">
                Set up your preferences in under a minute and experience a web that adapts to you.
              </p>
              <Link to="/onboarding">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 rounded-xl font-semibold">
                  Start Your Setup <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Accessibility className="w-4 h-4 text-primary-foreground" />
            </div>
            AdaptiveUI
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 AdaptiveUI. Making the web inclusive for all.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
