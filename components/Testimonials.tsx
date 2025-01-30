import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "John Doe",
    role: "Health Enthusiast",
    quote: "This tool helped me verify the claims of my favorite influencer. Highly recommended!",
  },
  {
    name: "Jane Smith",
    role: "Nutritionist",
    quote: "A must-have for anyone who wants to separate fact from fiction in health claims.",
  },
];

export default function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20"
      id="testimonials"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-12">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <p className="mt-4 text-blue-900 font-semibold">{testimonial.name}</p>
              <p className="text-gray-600">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}