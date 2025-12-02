const STEPS = [
  { number: "1", title: "Sign In", desc: "Sign in securely with your Google account" },
  { number: "2", title: "Create Keys", desc: "Generate unique API keys for your projects" },
  { number: "3", title: "Analyze Repos", desc: "Use your keys to analyze GitHub repositories" },
  { number: "4", title: "Track Analytics", desc: "Monitor usage and view detailed reports" },
];

export function HowItWorksSection() {
  return (
    <section id="works" className="w-full py-12 md:py-20 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          How It Works
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-purple-600 text-white font-bold mx-auto mb-3 md:mb-4">
                {step.number}
              </div>
              <h3 className="font-bold text-sm md:text-base mb-1 md:mb-2">{step.title}</h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

