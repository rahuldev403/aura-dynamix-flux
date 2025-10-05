import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const assemblySteps = [
  {
    progress: 0,
    title: "Frame Assembly",
    description:
      "Carbon fiber chassis provides unmatched strength-to-weight ratio",
  },
  {
    progress: 0.25,
    title: "Power Integration",
    description: "High-density battery cells with intelligent power management",
  },
  {
    progress: 0.5,
    title: "Sensor Array",
    description:
      "Multi-spectral cameras and LiDAR for 360° environmental awareness",
  },
  {
    progress: 0.75,
    title: "Flight System",
    description: "Precision motors with adaptive flight control algorithms",
  },
  {
    progress: 1,
    title: "Final Assembly",
    description: "Fully autonomous drone ready for deployment",
  },
];

export const ProductAssemblySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const annotationsRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const assemblyTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !progressRef.current || !annotationsRef.current)
      return;

    // compute a dynamic scroll length based on viewport height so it's not an
    // unreasonably large hard-coded value which can feel like "infinite" scroll
    const totalScroll = Math.round(window.innerHeight * 1.8);

    // Get all step elements (skip the h2 title which is first child)
    const stepElements = Array.from(annotationsRef.current.children).filter(
      (_, i) => i > 0
    ) as HTMLElement[];

    // Hide all steps initially
    gsap.set(stepElements, { opacity: 0, x: -50 });

    // Make sure assembly text is visible
    if (assemblyTextRef.current) {
      gsap.set(assemblyTextRef.current, { opacity: 1 });
    }

    const ctx = gsap.context(() => {
      // Pin the section for the duration of totalScroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        // For debugging
        // markers: true,
      });

      // Animate progress bar across the computed scroll length
      gsap.to(progressRef.current, {
        scaleX: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          scrub: 1,
        },
      });

      // Set up a master timeline for the step animations
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          scrub: 1,
        },
      });

      // Add each step to the timeline at its progress point
      stepElements.forEach((element, index) => {
        const step = assemblySteps[index];

        timeline.to(
          element,
          {
            opacity: 1,
            x: 0,
            duration: 0.2, // Duration within the timeline
            ease: "power2.out",
          },
          step.progress
        ); // Position in the timeline (0-1)
      });

      // Animate the boxes
      if (box1Ref.current && box2Ref.current && box3Ref.current) {
        // Box animations along the timeline
        timeline
          .to(
            box1Ref.current,
            {
              rotate: 90,
              borderColor: "rgba(var(--primary), 0.6)",
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.1
          )
          .to(
            box2Ref.current,
            {
              rotate: 180,
              borderColor: "rgba(var(--primary), 0.5)",
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.3
          )
          .to(
            box3Ref.current,
            {
              rotate: 360,
              borderColor: "rgba(var(--primary), 0.8)",
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.5
          );
      }

      // Animate the center box to pulse more intensely as progress increases
      if (boxRef.current) {
        timeline.to(
          boxRef.current,
          {
            scale: 1.2,
            boxShadow: "0 0 30px var(--primary)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.8
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen py-8 flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

      <div className="container mx-auto px-4 z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Annotations */}
          <div ref={annotationsRef} className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-6 pt-2">
              PRECISION ENGINEERING
            </h2>
            {assemblySteps.map((step, index) => (
              <div
                key={index}
                className="glass p-4 rounded-lg opacity-0 transition-all duration-500"
                data-step-index={index}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                    <span className="text-primary font-orbitron font-bold text-xs">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-orbitron font-bold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted-foreground ml-8 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Assembly Animation Placeholder */}
          <div className="relative">
            {/* Progress indicator - MOVED TO TOP */}
            <div className="mb-4">
              <p className="text-sm text-primary font-orbitron mb-2 text-center font-semibold animate-pulse">
                SCROLL TO ASSEMBLE
              </p>
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
                <div
                  ref={progressRef}
                  className="h-full bg-primary glow origin-left transform scale-x-0"
                />
              </div>
            </div>

            <div className="aspect-square glass-strong rounded-lg p-8 flex items-center justify-center">
              {/* Placeholder for 3D model or animation */}
              <div className="relative w-full h-full">
                <div
                  ref={box1Ref}
                  className="absolute inset-0 border-4 border-primary/30 rounded-lg animate-pulse-glow transition-all duration-500"
                />
                <div
                  ref={box2Ref}
                  className="absolute inset-8 border-2 border-primary/20 rounded-lg rotate-45 transition-all duration-500"
                />
                <div
                  ref={box3Ref}
                  className="absolute inset-16 border-2 border-primary/10 rounded-lg transition-all duration-500"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div
                    ref={boxRef}
                    className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg glow transition-all duration-500"
                  />
                  <div
                    ref={assemblyTextRef}
                    className="opacity-100 bg-background/30 p-2 rounded-lg backdrop-blur-sm"
                  >
                    <p className="text-primary font-orbitron text-xs font-bold">
                      ASSEMBLY IN PROGRESS
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {assemblySteps.find(
                        (step, i) =>
                          i ===
                          Math.floor(
                            ((progressRef.current?.offsetWidth || 0) /
                              (progressRef.current?.parentElement
                                ?.offsetWidth || 100)) *
                              5
                          )
                      )?.title || "Initializing..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
