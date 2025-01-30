'use client'
import { motion } from 'framer-motion';

const features = [
  {
    title: "Scientific Sources",
    description: "Access original sources and scientific studies for each claim.",
    icon: "🔬",
  },
  {
    title: "Accurate Verification",
    description: "Structured logic flow for precise claim identification and categorization.",
    icon: "✅",
  },
  {
    title: "Reliable Results",
    description: "Thoroughly tested results to ensure trustworthiness.",
    icon: "📊",
  },
];

export default function Features() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20"
      id="features"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}