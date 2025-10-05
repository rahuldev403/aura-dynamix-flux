import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Aura Dynamics transformed our operations. Their autonomous systems delivered a 40% increase in efficiency while reducing operational costs significantly.",
    author: "Dr. Sarah Chen",
    company: "Global Logistics Corp",
    role: "Chief Technology Officer",
  },
  {
    id: 2,
    quote:
      "The precision and reliability of their drone fleet is unmatched. We've achieved mission success rates we never thought possible.",
    author: "Marcus Rodriguez",
    company: "Environmental Research Institute",
    role: "Head of Field Operations",
  },
  {
    id: 3,
    quote:
      "Outstanding support and cutting-edge technology. Aura Dynamics is our trusted partner for all autonomous solutions.",
    author: "Jennifer Park",
    company: "Defense Systems Alliance",
    role: "Senior Program Director",
  },
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const next = () =>
    setActiveIndex((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  // Auto-slide every 7s, pause when isPaused or when user interacts
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPaused) {
      intervalRef.current = setInterval(next, 7000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, activeIndex]);

  // Handle touch swipe for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prev(); // Swipe right → previous
    else if (diff < -50) next(); // Swipe left → next
    // resume autoplay after short delay to avoid immediate slide
    setTimeout(() => setIsPaused(false), 800);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16 opacity-0 translate-y-5 animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black mb-4 gradient-text">
            TRUSTED BY INDUSTRY LEADERS
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto font-inter text-base md:text-lg">
            Hear from our partners who are shaping the future with Aura Dynamics.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-4xl mx-auto flex justify-center items-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Left Button */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 glass p-3 rounded-full hover:glass-strong transition-all duration-300 z-20 flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="min-w-full glass-strong p-8 sm:p-10 md:p-12 flex flex-col items-center justify-center text-center"
                >
                  <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-primary/40 mb-6" />
                  <p className="text-foreground/90 font-inter text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto">
                    "{t.quote}"
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-orbitron font-bold text-primary text-lg">
                        {t.author.charAt(0)}
                      </span>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="font-orbitron font-bold text-foreground text-base md:text-lg">
                        {t.author}
                      </p>
                      <p className="text-sm text-foreground/60 font-inter leading-snug">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 glass p-3 rounded-full hover:glass-strong transition-all duration-300 z-20 flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to testimonial ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 ${
                idx === activeIndex
                  ? "bg-primary w-6 sm:w-8 h-1.5 sm:h-2 rounded-full"
                  : "bg-primary/30 w-2 h-2 rounded-full"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

