import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroDrone from "@/assets/hero-drone.jpg";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const ref = useRef(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100 };
  const parallaxX = useSpring(
    useTransform(mouseX, [-1, 1], [-20, 20]),
    springConfig
  );
  const parallaxY = useSpring(
    useTransform(mouseY, [-1, 1], [-20, 20]),
    springConfig
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) * 2 - 1);
      mouseY.set((clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // GSAP scroll-triggered animations
  useEffect(() => {
    if (!droneRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Shrink and move drone to top-left
      tl.to(droneRef.current, {
        scale: 0.3,
        x: -window.innerWidth * 0.35,
        y: -window.innerHeight * 0.35,
        duration: 1,
      });

      // Shrink headline
      tl.to(
        headlineRef.current,
        {
          scale: 0.7,
          y: -100,
          opacity: 0.5,
          duration: 1,
        },
        0
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Parallax background layers */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      </motion.div>

      {/* Geometric shapes for parallax */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]) }}
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/30 rotate-45 animate-spin-slow"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
        className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-primary/20 rotate-12"
      />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          {/* Animated drone image with mouse parallax */}
          <motion.div
            ref={droneRef}
            style={{
              x: parallaxX,
              y: parallaxY,
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto w-full max-w-3xl mb-12"
          >
            <img
              src={heroDrone}
              alt="Futuristic Drone"
              className="w-full h-auto glow-strong rounded-lg"
            />
            {/* Rotating ring around drone */}
            <motion.div
              className="absolute inset-0 border-2 border-primary/30 rounded-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        {/* Headline with character reveal */}
        <motion.h1
          ref={headlineRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-black mb-6 gradient-text"
        >
          ENGINEERING THE FUTURE
          <br />
          <span className="text-glow">OF AUTONOMY</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-12 font-inter"
        >
          Pioneering robotics, drones, and high-performance hardware that push
          the boundaries of what's possible in autonomous systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button variant="hero" size="lg" className="group">
            Explore Our Fleet
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="glass" size="lg">
            View Capabilities
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
