import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { year: "2020", demand: 42, technology: 35 },
  { year: "2021", demand: 58, technology: 48 },
  { year: "2022", demand: 73, technology: 62 },
  { year: "2023", demand: 91, technology: 79 },
  { year: "2024", demand: 112, technology: 98 },
  { year: "2025", demand: 138, technology: 121 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong p-4 rounded-lg border border-primary/50">
        <p className="font-orbitron font-bold text-primary mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-foreground/80 font-inter">
            {entry.name === 'demand' ? 'Drone Demand' : 'AI Integration'}: <span className="text-primary font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const GraphSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-4 gradient-text">
            MARKET DEMAND & CORE TECHNOLOGIES
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto font-inter text-lg">
            Exponential growth in autonomous systems adoption across industries worldwide.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-strong p-8 rounded-lg"
        >
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(185, 100%, 50%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(185, 100%, 50%)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTechnology" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(185, 100%, 70%)" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="hsl(185, 100%, 70%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 15%)" />
              <XAxis 
                dataKey="year" 
                stroke="hsl(0, 0%, 60%)"
                style={{ fontFamily: 'Inter', fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(0, 0%, 60%)"
                style={{ fontFamily: 'Inter', fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Area
                type="monotone"
                dataKey="demand"
                stroke="hsl(185, 100%, 50%)"
                strokeWidth={3}
                fill="url(#colorDemand)"
                animationDuration={2000}
                className="neon-glow"
              />
              <Area
                type="monotone"
                dataKey="technology"
                stroke="hsl(185, 100%, 70%)"
                strokeWidth={2}
                fill="url(#colorTechnology)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded" />
              <span className="text-foreground/80 font-inter text-sm">Autonomous Drone Demand</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/60 rounded" />
              <span className="text-foreground/80 font-inter text-sm">AI Technology Integration</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
