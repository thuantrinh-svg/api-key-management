import { Key, Github, Zap, Shield, Code, TrendingUp } from "lucide-react";

const FEATURES = [
  { icon: Key, title: "Secure API Keys", desc: "Generate, manage, and revoke API keys with enterprise-grade security." },
  { icon: Github, title: "GitHub Analyzer", desc: "Analyze any GitHub repository with AI. Get insights and summaries." },
  { icon: Zap, title: "Interactive Playground", desc: "Test APIs directly and generate code for your projects." },
  { icon: Shield, title: "Multi-User Support", desc: "Secure Google authentication with role-based access control." },
  { icon: Code, title: "Developer Friendly", desc: "Complete API documentation and integration guides for all platforms." },
  { icon: TrendingUp, title: "Analytics Dashboard", desc: "Track API usage, monitor performance, and view detailed reports." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-20 lg:py-32 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 dark:border-gray-700 dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <Icon className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4 text-purple-600" />
                <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

