import { motion } from "framer-motion";
import { Shield, Zap, Target, Cpu } from "lucide-react";

const marqueeItems = [
  { icon: Cpu, text: "AI-POWERED PRECISION" },
  { icon: Shield, text: "MILITARY-GRADE DURABILITY" },
  { icon: Zap, text: "NEXT-GEN AUTONOMY" },
  { icon: Target, text: "PINPOINT ACCURACY" },
];

export const MarqueeSection = () => {
  return (
    <section className="py-8 overflow-hidden bg-gradient-to-r from-background via-primary/5 to-background border-y border-primary/20">
      <div className="flex">
        {/* Create two sets for seamless loop */}
        {[...Array(2)].map((_, setIndex) => (
          <motion.div
            key={setIndex}
            className="flex gap-16 px-8"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {marqueeItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 whitespace-nowrap"
              >
                <item.icon className="w-6 h-6 text-primary" />
                <span className="font-orbitron font-bold text-2xl italic tracking-wider text-foreground/90">
                  {item.text}
                </span>
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
