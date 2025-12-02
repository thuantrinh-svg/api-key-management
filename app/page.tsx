"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Github,
  Key,
  Zap,
  Shield,
  Code,
  TrendingUp,
  Check,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
            <Key className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:inline">
            API Manager Pro
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#"
          >
            Docs
          </Link>
        </nav>
        <div className="flex items-center gap-4 ml-4">
          {status === "authenticated" && session ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                  Secure API Key Management
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
                  Manage APIs with Confidence
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                  Secure API key management, GitHub repository analysis, and
                  comprehensive analytics in one powerful platform.
                </p>
              </div>
              <div className="space-x-4">
                {status === "authenticated" && session ? (
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-600 text-white text-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => signIn("google")}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-600 text-white text-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                    <Link
                      href="#features"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-purple-200 text-purple-600 text-lg font-medium hover:bg-purple-50 transition-colors dark:border-purple-800 dark:hover:bg-purple-950"
                    >
                      Learn More
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Powerful Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {/* Feature 1 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <Key className="h-12 w-12 mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-2">Secure API Keys</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Generate, manage, and revoke API keys with enterprise-grade
                  security. Monitor usage and control access.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <Github className="h-12 w-12 mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-2">GitHub Analyzer</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Analyze any GitHub repository with AI. Get insights, summaries,
                  and discover interesting facts.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <Zap className="h-12 w-12 mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-2">Interactive Playground</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Test APIs directly with our interactive playground. Generate
                  code and copy-paste into your projects.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <Shield className="h-12 w-12 mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-2">Multi-User Support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Secure Google authentication with role-based access control.
                  Each user sees only their own keys.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <Code className="h-12 w-12 mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-2">Developer Friendly</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Complete API documentation, code examples, and integration
                  guides for all platforms.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <TrendingUp className="h-12 w-12 mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track API usage, monitor key performance, and view detailed
                  analytics and reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-4">
              {/* Step 1 */}
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold mb-2">Sign In</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sign in securely with your Google account
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold mb-2">Create Keys</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Generate unique API keys for your projects
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold mb-2">Analyze Repos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use your keys to analyze GitHub repositories
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold mb-2">Track Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monitor usage and view detailed reports
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Simple Pricing
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {/* Free Plan */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For individuals
                </p>
                <p className="text-4xl font-bold mb-6">
                  $0<span className="text-lg text-gray-600 dark:text-gray-400">/mo</span>
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Up to 5 API keys</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">100 requests/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">GitHub repository analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">API playground</span>
                  </li>
                </ul>
                {status === "authenticated" && session ? (
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className="w-full px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
                  >
                    Get Started
                  </button>
                )}
              </div>

              {/* Pro Plan */}
              <div className="rounded-lg border-2 border-purple-600 bg-white p-6 dark:bg-gray-800 relative">
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For developers
                </p>
                <p className="text-4xl font-bold mb-6">
                  $19<span className="text-lg text-gray-600 dark:text-gray-400">/mo</span>
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Unlimited API keys</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">10,000 requests/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                </ul>
                <button
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-300 text-gray-600 font-medium cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For organizations
                </p>
                <p className="text-4xl font-bold mb-6">
                  Custom<span className="text-lg text-gray-600 dark:text-gray-400">/mo</span>
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Custom limits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">SSO & advanced security</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-sm">SLA guarantee</span>
                  </li>
                </ul>
                <button
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-300 text-gray-600 font-medium cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="max-w-[700px] text-purple-100 md:text-xl mx-auto mb-8">
              Join developers who trust us to manage their API keys and analyze
              GitHub repositories.
            </p>
            {status === "authenticated" && session ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-purple-600 text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-purple-600 text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 bg-white/50 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-sm">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          © 2024 API Manager Pro. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:text-purple-600 transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:text-purple-600 transition-colors"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-xs hover:text-purple-600 transition-colors"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}

