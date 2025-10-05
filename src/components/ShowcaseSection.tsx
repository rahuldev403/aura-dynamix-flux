import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Play } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Arctic Surveyor X1",
    category: "Environmental Monitoring",
    thumbnail: "https://placehold.co/1200x675/0a0a0a/00f2ff?text=Arctic+Mission",
  },
  {
    id: 2,
    title: "Urban Guardian Series",
    category: "Security & Surveillance",
    thumbnail: "https://placehold.co/1200x675/0a0a0a/00f2ff?text=Urban+Security",
  },
  {
    id: 3,
    title: "AgriBot Precision",
    category: "Agricultural Automation",
    thumbnail: "https://placehold.co/1200x675/0a0a0a/00f2ff?text=Agriculture",
  },
  {
    id: 4,
    title: "Deepwater Explorer",
    category: "Marine Research",
    thumbnail: "https://placehold.co/1200x675/0a0a0a/00f2ff?text=Marine+Explorer",
  },
];

export const ShowcaseSection = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="showcase" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-4 gradient-text">
            FLAGSHIP PROJECTS
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto font-inter text-lg">
            Explore our cutting-edge deployments across diverse industries and environments.
          </p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-3 gap-8">
          {/* Main display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group glass-strong rounded-lg overflow-hidden aspect-video"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={activeProject.thumbnail}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer glow-strong"
                >
                  <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
                </motion.div>
              </div>

              {/* Project info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-primary text-sm font-orbitron font-semibold mb-1">
                  {activeProject.category}
                </p>
                <h3 className="text-2xl font-orbitron font-bold text-foreground">
                  {activeProject.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>

          {/* Project list */}
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveProject(project)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeProject.id === project.id
                    ? "glass-strong border-2 border-primary"
                    : "glass border border-primary/20 hover:border-primary/50"
                }`}
                whileHover={{ x: 5 }}
              >
                <p className="text-primary text-xs font-orbitron font-semibold mb-1">
                  {project.category}
                </p>
                <h4 className="font-orbitron font-bold text-foreground">
                  {project.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
