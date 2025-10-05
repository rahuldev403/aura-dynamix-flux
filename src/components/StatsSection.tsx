import { motion, useInView } from "framer-motion";
import { Target, Users, Clock, Award } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const stats = [
  { icon: Target, value: 99.8, suffix: "%", label: "Mission Success Rate" },
  { icon: Users, value: 40, suffix: "+", label: "Global Partners" },
  { icon: Clock, value: 1.2, suffix: "M+", label: "Flight Hours Logged" },
  { icon: Award, value: 15, suffix: "+", label: "Industry Awards" },
];

const Counter = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref} className="font-orbitron text-5xl md:text-6xl font-black gradient-text">
      {count.toFixed(1)}
      {suffix}
    </span>
  );
};

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-lg text-center group hover:glass-strong transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block mb-4"
              >
                <stat.icon className="w-12 h-12 text-primary glow" />
              </motion.div>
              
              <div className="mb-2">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              
              <p className="text-foreground/60 font-inter font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
