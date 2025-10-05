import { motion, useInView } from "framer-motion";
import { Cpu, Shield, Zap, Workflow, Radio, Globe } from "lucide-react";
import { useRef, useState } from "react";

const features = [
  {
    icon: Cpu,
    title: "Precision Engineering",
    description: "Built with aerospace-grade materials and cutting-edge manufacturing processes for unmatched reliability.",
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Advanced machine learning algorithms enable autonomous decision-making and real-time adaptation.",
  },
  {
    icon: Shield,
    title: "Rugged Durability",
    description: "Military-grade construction withstands extreme conditions from arctic cold to desert heat.",
  },
  {
    icon: Workflow,
    title: "Seamless Automation",
    description: "Plug-and-play integration with existing systems for rapid deployment and minimal training.",
  },
  {
    icon: Radio,
    title: "Long-Range Connectivity",
    description: "Advanced communication systems maintain reliable links over vast distances.",
  },
  {
    icon: Globe,
    title: "Global Support",
    description: "24/7 technical assistance and maintenance networks across six continents.",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-4 gradient-text">
            PIONEERING ROBOTIC EXCELLENCE
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto font-inter text-lg">
            Pushing the boundaries of autonomous technology with innovative solutions
            that redefine what's possible.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                scale: { type: "spring", stiffness: 200 }
              }}
              whileHover={{ y: -10, scale: 1.05 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="glass p-6 rounded-lg group hover:glass-strong transition-all duration-300 border border-primary/20 hover:border-primary/50 tilt-3d"
              style={{
                transform: hoveredCard === index 
                  ? 'perspective(1000px) rotateX(2deg) rotateY(2deg)' 
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
              }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20"
              >
                <feature.icon className="w-8 h-8 text-primary" />
              </motion.div>

              <h3 className="text-xl font-orbitron font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-foreground/60 font-inter leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-0.5 bg-gradient-to-r from-primary to-transparent mt-4"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
