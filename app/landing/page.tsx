"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import {
  Shield,
  Zap,
  Lock,
  Code,
  Check,
  ArrowRight,
} from "lucide-react";
import { LandingHeader } from "./components/LandingHeader";
import { LandingFooter } from "./components/LandingFooter";
import { ApiKeyDemo } from "./components/ApiKeyDemo";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <LandingHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center space-y-6 md:space-y-8 text-center">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Secure API Key
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Management Made Simple
                  </span>
                </h1>
                <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-400">
                  Generate, manage, and monitor API keys with ease. Secure authentication,
                  real-time tracking, and complete control over your API access.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                {session?.user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 px-6 py-3 text-sm md:text-base font-semibold text-white transition-colors"
                    >
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/api-playground"
                      className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900 px-6 py-3 text-sm md:text-base font-semibold text-gray-900 dark:text-white transition-colors"
                    >
                      Try Playground
                      <Code className="h-4 w-4" />
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => signIn("google")}
                      className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 px-6 py-3 text-sm md:text-base font-semibold text-white transition-colors w-full sm:w-auto"
                    >
                      Get Started Free
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <Link
                      href="#demo"
                      className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900 px-6 py-3 text-sm md:text-base font-semibold text-gray-900 dark:text-white transition-colors w-full sm:w-auto"
                    >
                      See Demo
                    </Link>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 pt-8 md:pt-12 border-t border-gray-200 dark:border-gray-700 w-full">
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    10K+
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Active Users
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    99.9%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Uptime SLA
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    1M+
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Keys Generated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800/50 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8 md:space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  Powerful Features
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Everything you need to manage API keys securely and efficiently
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Feature 1 */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                  <div className="rounded-lg bg-purple-100 dark:bg-purple-900 p-3 w-fit mb-4">
                    <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Secure Generation
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Generate cryptographically secure API keys with automatic validation and
                    uniqueness checks.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                  <div className="rounded-lg bg-blue-100 dark:bg-blue-900 p-3 w-fit mb-4">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Real-Time Tracking
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Monitor API key usage in real-time with detailed analytics and usage
                    statistics.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                  <div className="rounded-lg bg-green-100 dark:bg-green-900 p-3 w-fit mb-4">
                    <Lock className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Advanced Permissions
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Control key scopes, permissions, and access levels with granular
                    configuration options.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                  <div className="rounded-lg bg-pink-100 dark:bg-pink-900 p-3 w-fit mb-4">
                    <Code className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    API Playground
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Test your API keys with our interactive playground and code examples in
                    multiple languages.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                  <div className="rounded-lg bg-orange-100 dark:bg-orange-900 p-3 w-fit mb-4">
                    <Check className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Key Management
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Create, edit, delete, and manage unlimited API keys with full audit trail
                    support.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                  <div className="rounded-lg bg-cyan-100 dark:bg-cyan-900 p-3 w-fit mb-4">
                    <Shield className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Security First
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Enterprise-grade security with encryption, RBAC, and compliance
                    certifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="w-full py-12 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8 md:space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  Try It Out
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Test the API with our interactive demo. See how easy it is to create and
                  manage API keys.
                </p>
              </div>

              <ApiKeyDemo />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800/50 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8 md:space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  Simple Pricing
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Choose the plan that works best for you. Always flexible, no lock-in
                  contracts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Free Plan */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Free
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    For individuals and small projects
                  </p>
                  <div className="mb-6">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      $0
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">per month</p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Up to 5 API keys
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Basic usage tracking
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Community support
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        API playground access
                      </span>
                    </li>
                  </ul>
                  <button
                    onClick={() => signIn("google")}
                    className="w-full rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 px-4 py-3 text-sm font-semibold transition-colors"
                  >
                    Get Started
                  </button>
                </div>

                {/* Pro Plan */}
                <div className="rounded-lg border-2 border-purple-600 p-6 md:p-8 flex flex-col relative md:scale-105">
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Pro
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    For growing applications
                  </p>
                  <div className="mb-6">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      $29
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">per month</p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Unlimited API keys
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Advanced analytics
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Priority support
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Team collaboration
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Webhook support
                      </span>
                    </li>
                  </ul>
                  <button
                    onClick={() => signIn("google")}
                    className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 text-sm font-semibold transition-colors"
                  >
                    Start Free Trial
                  </button>
                </div>

                {/* Enterprise Plan */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Enterprise
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    For large-scale operations
                  </p>
                  <div className="mb-6">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      Custom
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">contact sales</p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Everything in Pro
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        SLA guarantee
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Dedicated support
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Custom integration
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Advanced security
                      </span>
                    </li>
                  </ul>
                  <Link
                    href="#"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 px-4 py-3 text-sm font-semibold transition-colors text-center"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Ready to Get Started?
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join thousands of developers managing their API keys securely. No credit card
                required.
              </p>
              <button
                onClick={() => signIn("google")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 px-8 py-4 text-base font-semibold text-white transition-colors"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
