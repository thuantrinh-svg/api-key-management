import { Check } from "lucide-react";

interface PricingSectionProps {
  isAuthenticated: boolean;
  onDashboard: () => void;
  onSignIn: () => void;
}

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    desc: "For individuals",
    features: ["Up to 5 API keys", "100 requests/month", "GitHub analysis", "API playground"],
    badge: null,
  },
  {
    name: "Professional",
    price: "$19",
    desc: "For developers",
    features: ["Unlimited API keys", "10,000 requests/month", "Priority support", "Advanced analytics"],
    badge: "Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For organizations",
    features: ["Custom limits", "Dedicated support", "SSO & security", "SLA guarantee"],
    badge: null,
  },
];

export function PricingSection({ isAuthenticated, onDashboard, onSignIn }: PricingSectionProps) {
  return (
    <section id="pricing" className="w-full py-12 md:py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Simple Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border bg-white p-6 md:p-8 dark:bg-gray-800 ${
                plan.badge ? "border-2 border-purple-600" : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">{plan.desc}</p>

              <p className="text-3xl md:text-4xl font-bold mb-6">
                {plan.price}
                <span className="text-lg md:text-xl text-gray-600 dark:text-gray-400">/mo</span>
              </p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.name === "Professional" ? (
                <button disabled className="w-full px-4 py-2 bg-gray-300 text-gray-600 font-medium rounded-lg cursor-not-allowed text-sm md:text-base">
                  Coming Soon
                </button>
              ) : (
                <button
                  onClick={isAuthenticated ? onDashboard : onSignIn}
                  className="w-full px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

