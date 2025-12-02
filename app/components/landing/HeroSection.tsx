import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  isAuthenticated: boolean;
  onDashboard: () => void;
  onSignIn: () => void;
}

export function HeroSection({ isAuthenticated, onDashboard, onSignIn }: HeroSectionProps) {
  return (
    <section className="w-full py-12 md:py-20 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 md:space-y-6 text-center">
          {/* Badge */}
          <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs md:text-sm font-medium text-purple-600 dark:bg-purple-950 dark:text-purple-400">
            Secure API Key Management
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
            Manage APIs with Confidence
          </h1>

          {/* Description */}
          <p className="max-w-[600px] text-sm md:text-base text-gray-600 dark:text-gray-400">
            Secure API key management, GitHub repository analysis, and comprehensive analytics in one powerful platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            {isAuthenticated ? (
              <button
                onClick={onDashboard}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white text-sm md:text-base font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={onSignIn}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white text-sm md:text-base font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  href="#features"
                  className="flex items-center justify-center px-6 py-3 border-2 border-purple-200 text-purple-600 text-sm md:text-base font-medium rounded-lg hover:bg-purple-50 transition-colors dark:border-purple-800 dark:hover:bg-purple-950"
                >
                  Learn More
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

