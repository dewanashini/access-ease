import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Accessibility, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(222_60%_24%),transparent_60%)]" />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-teal/10 blur-3xl animate-float" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mb-8">
            <Accessibility className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            The web, adapted for you.
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Join thousands of users who browse the web with comfort and confidence using AdaptiveUI.
          </p>

          <div className="mt-12 flex gap-6">
            {[
              { value: "50K+", label: "Users" },
              { value: "98%", label: "Satisfaction" },
              { value: "200+", label: "Sites supported" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-primary-foreground/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
              <Accessibility className="w-5 h-5 text-primary-foreground" />
            </div>
            AdaptiveUI
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isSignUp
              ? "Set up your account to save your accessibility preferences."
              : "Sign in to access your personalized browsing experience."}
          </p>

          <form onSubmit={(e) => { e.preventDefault(); navigate("/onboarding"); }} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="h-12 rounded-xl bg-secondary border-border focus:border-accent focus:ring-accent/20"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 pl-11 rounded-xl bg-secondary border-border focus:border-accent focus:ring-accent/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pl-11 pr-11 rounded-xl bg-secondary border-border focus:border-accent focus:ring-accent/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <button className="text-sm text-accent hover:underline">Forgot password?</button>
              </div>
            )}

            <Button variant="hero" size="lg" className="w-full rounded-xl h-12 text-base" type="submit">
              {isSignUp ? "Create Account" : "Sign In"} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-accent font-medium hover:underline"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
