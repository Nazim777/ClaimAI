'use client'
import { motion } from 'framer-motion';

const steps = [
  {
    title: "Enter Influencer Name",
    description: "Input the name of the influencer you want to analyze.",
  },
  {
    title: "Analyze Claims",
    description: "Our system identifies and categorizes health claims made by the influencer.",
  },
  {
    title: "View Results",
    description: "See verified results with supporting or debunking scientific studies.",
  },
];

export default function HowItWorks() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-50 py-20"
      id="how-it-works"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}