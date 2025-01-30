'use client'
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-50 py-20"
    >
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-6">Verify Influencer Health Claims</h1>
        <p className="text-xl text-gray-700 mb-8">
          Analyze and verify health claims made by influencers with scientific evidence.
        </p>
      </div>
    </motion.section>
  );
}