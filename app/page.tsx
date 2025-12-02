"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LandingHeader } from "./components/landing/LandingHeader";
import { HeroSection } from "./components/landing/HeroSection";
import { FeaturesSection } from "./components/landing/FeaturesSection";
import { HowItWorksSection } from "./components/landing/HowItWorksSection";
import { ApiDemoSection } from "./components/landing/ApiDemoSection";
import { PricingSection } from "./components/landing/PricingSection";
import { CTASection } from "./components/landing/CTASection";
import { LandingFooter } from "./components/landing/LandingFooter";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleDashboard = () => router.push("/dashboard");
  const handleSignIn = () => signIn("google");
  const isAuthenticated = status === "authenticated" && !!session;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <LandingHeader
        isAuthenticated={isAuthenticated}
        onDashboard={handleDashboard}
        onSignIn={handleSignIn}
      />
      <main className="flex-1">
        <HeroSection
          isAuthenticated={isAuthenticated}
          onDashboard={handleDashboard}
          onSignIn={handleSignIn}
        />
        <FeaturesSection />
        <HowItWorksSection />
        <ApiDemoSection />
        <PricingSection
          isAuthenticated={isAuthenticated}
          onDashboard={handleDashboard}
          onSignIn={handleSignIn}
        />
        <CTASection
          isAuthenticated={isAuthenticated}
          onDashboard={handleDashboard}
          onSignIn={handleSignIn}
        />
      </main>
      <LandingFooter />
    </div>
  );
}
