import { motion, useInView, useDragControls, PanInfo } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Aura Dynamics transformed our operations. Their autonomous systems delivered a 40% increase in efficiency while reducing operational costs significantly.",
    author: "Dr. Sarah Chen",
    company: "Global Logistics Corp",
    role: "Chief Technology Officer",
  },
  {
    id: 2,
    quote: "The precision and reliability of their drone fleet is unmatched. We've achieved mission success rates we never thought possible.",
    author: "Marcus Rodriguez",
    company: "Environmental Research Institute",
    role: "Head of Field Operations",
  },
  {
    id: 3,
    quote: "Outstanding support and cutting-edge technology. Aura Dynamics is our trusted partner for all autonomous solutions.",
    author: "Jennifer Park",
    company: "Defense Systems Alliance",
    role: "Senior Program Director",
  },
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prev();
    } else if (info.offset.x < -threshold) {
      next();
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-4 gradient-text">
            TRUSTED BY INDUSTRY LEADERS
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto font-inter text-lg">
            Hear from our partners who are shaping the future with Aura Dynamics.
          </p>
        </motion.div>

        <div ref={ref} className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {/* Navigation buttons */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="glass p-3 rounded-full hover:glass-strong transition-all duration-300 hidden md:block"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </motion.button>

            {/* Testimonials carousel */}
            <div className="flex items-center gap-4 overflow-hidden w-full max-w-4xl">
              {testimonials.map((testimonial, index) => {
                const offset = index - activeIndex;
                const isActive = index === activeIndex;
                
                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isActive ? 1 : 0.3,
                      scale: isActive ? 1 : 0.8,
                      x: `${offset * 100}%`,
                      zIndex: isActive ? 10 : 0,
                    }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    transition={{ 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    className={`absolute left-0 right-0 mx-auto glass-strong p-8 rounded-lg max-w-2xl ${
                      !isActive && "pointer-events-none"
                    }`}
                  >
                    <Quote className="w-12 h-12 text-primary/30 mb-4" />
                    
                    <p className="text-foreground/90 font-inter text-lg mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-orbitron font-bold text-primary">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      
                      <div>
                        <p className="font-orbitron font-bold text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-foreground/60 font-inter">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="glass p-3 rounded-full hover:glass-strong transition-all duration-300 hidden md:block"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-40 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary w-8" : "bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
