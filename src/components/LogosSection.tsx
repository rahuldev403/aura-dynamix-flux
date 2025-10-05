import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const logos = [
  { name: "TechCorp", url: "https://placehold.co/200x80/1a1a1a/666666?text=TechCorp" },
  { name: "Innovation Labs", url: "https://placehold.co/200x80/1a1a1a/666666?text=Innovation" },
  { name: "Future Systems", url: "https://placehold.co/200x80/1a1a1a/666666?text=Future+Sys" },
  { name: "Global Dynamics", url: "https://placehold.co/200x80/1a1a1a/666666?text=Global+Dyn" },
  { name: "Quantum Industries", url: "https://placehold.co/200x80/1a1a1a/666666?text=Quantum" },
  { name: "Precision Tech", url: "https://placehold.co/200x80/1a1a1a/666666?text=Precision" },
];

export const LogosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-black mb-4 gradient-text">
            TRUSTED PARTNERS
          </h2>
          <p className="text-foreground/60 font-inter">
            Collaborating with industry leaders worldwide
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <motion.img
                src={logo.url}
                alt={logo.name}
                className="w-full h-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
