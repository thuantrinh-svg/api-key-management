import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  isAuthenticated: boolean;
  onDashboard: () => void;
  onSignIn: () => void;
}

export function CTASection({ isAuthenticated, onDashboard, onSignIn }: CTASectionProps) {
  return (
    <section className="w-full py-12 md:py-20 lg:py-32 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">Ready to Get Started?</h2>
        <p className="max-w-[600px] text-sm md:text-base text-purple-100 mx-auto mb-6 md:mb-8">
          Join developers who trust us to manage their API keys and analyze GitHub repositories.
        </p>
        <button
          onClick={isAuthenticated ? onDashboard : onSignIn}
          className="flex items-center justify-center gap-2 mx-auto px-6 md:px-8 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
        >
          {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

