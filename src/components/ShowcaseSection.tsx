import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

// Define a type for video sources with potential fallbacks and different formats
interface VideoSource {
  src: string;
  type?: string;
}

// Define our project type
interface Project {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoSources: VideoSource[]; // Array of video sources for fallbacks
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Arctic Surveyor X1",
    category: "Environmental Monitoring",
    thumbnail:
      "https://placehold.co/1200x675/0a0a0a/00f2ff?text=Arctic+Mission",
    videoSources: [
      { src: "/src/assets/1.mp4", type: "video/mp4" },
      // Add alternative formats if needed, like WebM
      // { src: "/src/assets/1.webm", type: "video/webm" }
    ],
    description:
      "Advanced drone designed for polar monitoring and data collection in extreme cold conditions.",
  },
  {
    id: 2,
    title: "Urban Guardian Series",
    category: "Security & Surveillance",
    thumbnail:
      "https://placehold.co/1200x675/0a0a0a/00f2ff?text=Urban+Security",
    videoSources: [
      { src: "/src/assets/2.mp4", type: "video/mp4" },
      // Fallback to first video if 2.mp4 doesn't exist
      { src: "/src/assets/1.mp4", type: "video/mp4" }
    ],
    description:
      "Automated surveillance system with AI-powered threat detection for urban environments.",
  },
  {
    id: 3,
    title: "AgriBot Precision",
    category: "Agricultural Automation",
    thumbnail: "https://placehold.co/1200x675/0a0a0a/00f2ff?text=Agriculture",
    videoSources: [
      { src: "/src/assets/3.mp4", type: "video/mp4" },
      // Fallback to first video if 3.mp4 doesn't exist
      { src: "/src/assets/1.mp4", type: "video/mp4" }
    ],
    description:
      "Precision agriculture drone for crop monitoring, soil analysis, and targeted treatment application.",
  },
  {
    id: 4,
    title: "Deepwater Explorer",
    category: "Marine Research",
    thumbnail:
      "https://placehold.co/1200x675/0a0a0a/00f2ff?text=Marine+Explorer",
    videoSources: [
      { src: "/src/assets/4.mp4", type: "video/mp4" },
      // Fallback to first video if 4.mp4 doesn't exist
      { src: "/src/assets/1.mp4", type: "video/mp4" }
    ],
    description:
      "Submersible ROV designed for deep ocean exploration and environmental monitoring.",
  },
];

export const ShowcaseSection = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false); // For development only
  const [videoCache, setVideoCache] = useState<{[key: string]: boolean}>({}); // Cache to track verified video URLs
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Check if video source exists by making a HEAD request
  const checkVideoSourceExists = async (url: string): Promise<boolean> => {
    // Check cache first
    if (videoCache[url] !== undefined) {
      return videoCache[url];
    }
    
    try {
      const response = await fetch(url, { method: "HEAD" });
      const exists = response.ok;
      
      // Cache the result
      setVideoCache(prev => ({
        ...prev,
        [url]: exists
      }));
      
      return exists;
    } catch (error) {
      console.error(`Error checking video availability for ${url}:`, error);
      return false;
    }
  };
  
  // Check if any of the video sources in the current project can be played
  const checkVideoPlayability = async (): Promise<boolean> => {
    if (!videoRef.current) return false;
    
    // Check each source in order until we find one that works
    for (const source of activeProject.videoSources) {
      const exists = await checkVideoSourceExists(source.src);
      if (exists) return true;
    }
    
    return false;
  };
  
  // Preload videos for better UX when switching between projects
  const preloadProjectVideo = async (project: Project) => {
    // Only preload the first source of each project to save bandwidth
    if (project.videoSources.length > 0) {
      const firstSource = project.videoSources[0];
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = firstSource.src;
      link.as = 'video';
      
      // Only add if the video exists
      const exists = await checkVideoSourceExists(firstSource.src);
      if (exists) {
        document.head.appendChild(link);
        console.log(`Preloaded video: ${firstSource.src}`);
      }
    }
  };

  // Toggle video play/pause
  const toggleVideo = async () => {
    if (!videoRef.current) return;

    // If there was an error, try to reload the video first
    if (hasVideoError) {
      if (videoRef.current) {
        videoRef.current.load();
        setHasVideoError(false);
        setIsVideoLoading(true);

        // Check if any video sources are playable
        const isPlayable = await checkVideoPlayability();
        if (!isPlayable) {
          console.error("No playable video sources found");
          setHasVideoError(true);
          setIsVideoLoading(false);
          return;
        }

        // Attempt to play after reload
        setTimeout(() => {
          if (videoRef.current) {
            const playPromise = videoRef.current.play().catch(err => {
              console.error("Error playing after reload:", err);
              setHasVideoError(true);
              setIsVideoLoading(false);
            });
          }
        }, 300);
        return;
      }
    }

    if (videoRef.current.paused) {
      // Try to play the video and handle any errors
      setIsVideoLoading(true);

      try {
        // Ensure video has sources before playing
        if (videoRef.current.querySelectorAll('source').length === 0) {
          console.error("No video sources available");
          setHasVideoError(true);
          setIsVideoLoading(false);
          return;
        }
        
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsVideoLoading(false);
              console.log("Video is playing");
              
              // Update cache to indicate this video works
              if (videoRef.current && videoRef.current.currentSrc) {
                setVideoCache(prev => ({
                  ...prev,
                  [videoRef.current!.currentSrc]: true
                }));
              }
            })
            .catch((error) => {
              console.error("Error playing video:", error);
              setIsPlaying(false);
              setHasVideoError(true);
              setIsVideoLoading(false);
              
              // Try next source if available
              const sources = Array.from(videoRef.current?.querySelectorAll('source') || []);
              const currentSrc = videoRef.current?.currentSrc;
              
              // Find the index of current source
              const currentIndex = sources.findIndex(src => 
                src.src === currentSrc || currentSrc.endsWith(src.src)
              );
              
              // If we have more sources to try
              if (currentIndex < sources.length - 1) {
                console.log("Trying next video source");
                const nextSource = sources[currentIndex + 1].src;
                
                // Update video element to use this source
                if (videoRef.current) {
                  videoRef.current.src = nextSource;
                  videoRef.current.load();
                  setTimeout(() => toggleVideo(), 300);
                }
              }
            });
        }
      } catch (error) {
        console.error("Exception trying to play video:", error);
        setIsPlaying(false);
        setHasVideoError(true);
        setIsVideoLoading(false);
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Reset video state when changing projects
  useEffect(() => {
    // Stop any currently playing video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to beginning
      
      // Force reload of video element to avoid issues with source switching
      videoRef.current.load();
    }
    
    setIsPlaying(false);
    setIsVideoLoading(true);
    setHasVideoError(false);
    
    // Verify if any of the video sources are playable
    checkVideoPlayability().then(canPlay => {
      if (!canPlay) {
        console.warn('None of the video sources are playable for this project');
        setHasVideoError(true);
      }
    });
  }, [activeProject]);
  
  // Preload videos for adjacent projects for better UX
  useEffect(() => {
    // Find current project index
    const currentIndex = projects.findIndex(p => p.id === activeProject.id);
    
    // Preload next project if exists
    if (currentIndex < projects.length - 1) {
      preloadProjectVideo(projects[currentIndex + 1]);
    }
    
    // Preload previous project if exists
    if (currentIndex > 0) {
      preloadProjectVideo(projects[currentIndex - 1]);
    }
  }, [activeProject]);

  // This useEffect handles video events for loading and errors
  useEffect(() => {
    if (videoRef.current) {
      const handleCanPlay = () => {
        console.log("Video can play now");
        setIsVideoLoading(false);
      };

      const handleError = (e: Event) => {
        console.error("Video error event:", e);
        setIsVideoLoading(false);
        setHasVideoError(true);
        setIsPlaying(false);
      };

      const handleLoadedMetadata = () => {
        console.log("Video metadata loaded");
        setIsVideoLoading(false);
      };

      const handleLoadStart = () => {
        console.log("Video load started");
        setIsVideoLoading(true);
      };

      videoRef.current.addEventListener("canplay", handleCanPlay);
      videoRef.current.addEventListener("error", handleError);
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoRef.current.addEventListener("loadstart", handleLoadStart);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("canplay", handleCanPlay);
          videoRef.current.removeEventListener("error", handleError);
          videoRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          videoRef.current.removeEventListener("loadstart", handleLoadStart);
        }
      };
    }
  }, [activeProject]);

  // Debug key handler - press "D" to toggle debug info
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "d" && e.altKey) {
        setShowDebugInfo((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="showcase" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Debug overlay - only visible in development when Alt+D is pressed */}
      {showDebugInfo && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 p-4 rounded-lg text-xs text-white font-mono max-w-xs overflow-auto max-h-96">
          <h4 className="font-bold text-primary mb-2">Video Debug Info:</h4>
          <p>Current Project: {activeProject.title}</p>
          <p className="text-xs">Video Sources:</p>
          <ul className="pl-4 text-xs mb-2">
            {activeProject.videoSources.map((source, index) => (
              <li key={index} className="truncate">
                {source.src} ({source.type})
              </li>
            ))}
          </ul>
          <p>Playing: {isPlaying ? "Yes" : "No"}</p>
          <p>Loading: {isVideoLoading ? "Yes" : "No"}</p>
          <p>Error: {hasVideoError ? "Yes" : "No"}</p>
          <p>
            Current Time: {videoRef.current?.currentTime.toFixed(2) || "0.00"}
          </p>
          <p>Duration: {videoRef.current?.duration.toFixed(2) || "Unknown"}</p>
          <p>Network State: {videoRef.current?.networkState || "Unknown"}</p>
          <p>Ready State: {videoRef.current?.readyState || "Unknown"}</p>
          <button
            className="mt-2 bg-primary text-white px-2 py-1 rounded text-xs"
            onClick={() => {
              console.log("Video element:", videoRef.current);
              if (videoRef.current) {
                videoRef.current.load();
                console.log("Video reloaded manually");
              }
            }}
          >
            Reload Video
          </button>
        </div>
      )}

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
            Explore our cutting-edge deployments across diverse industries and
            environments.
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
              {/* Video element with multiple sources for better compatibility */}
              <video
                ref={videoRef}
                className={`w-full h-full object-cover ${
                  isPlaying ? "block" : "hidden"
                }`}
                preload="metadata"
                playsInline
                onEnded={() => setIsPlaying(false)}
                onError={(e) => {
                  console.error("Video error event:", e);
                  console.error(
                    "Video error details:",
                    (e.target as HTMLVideoElement).error
                  );
                  setIsPlaying(false);
                  setHasVideoError(true);
                  setIsVideoLoading(false);
                }}
                onStalled={() => {
                  console.warn("Video playback stalled");
                  setIsVideoLoading(true);
                }}
                onWaiting={() => {
                  console.log("Video is waiting/buffering");
                  setIsVideoLoading(true);
                }}
                onPlaying={() => {
                  console.log("Video is playing");
                  setIsVideoLoading(false);
                  setIsPlaying(true);
                }}
              >
                {/* Map through all available video sources */}
                {activeProject.videoSources.map((source, index) => (
                  <source key={index} src={source.src} type={source.type} />
                ))}
                {/* Fallback message for browsers that don't support video */}
                Your browser does not support the video tag.
              </video>

              {/* Thumbnail shown when video is not playing */}
              {!isPlaying && (
                <img
                  src={activeProject.thumbnail}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Thumbnail load error");
                    // Fallback to a solid color if thumbnail fails to load
                    (e.target as HTMLImageElement).style.backgroundColor =
                      "#0a0a0a";
                  }}
                />
              )}

              {/* Loading overlay */}
              {isVideoLoading && isPlaying && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin"></div>
                </div>
              )}

              {/* Error overlay */}
              {hasVideoError && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center flex-col">
                  <svg
                    className="w-16 h-16 text-red-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-white text-center px-4">
                    Unable to play video. Click to retry.
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (videoRef.current) {
                        videoRef.current.load();
                        setHasVideoError(false);
                        setIsVideoLoading(true);
                        toggleVideo();
                      }
                    }}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Play button overlay - only shown when no error and not loading */}
              {!hasVideoError && !isVideoLoading && (
                <div
                  className={`absolute inset-0 bg-black/40 flex items-center justify-center ${
                    isPlaying
                      ? "opacity-0 group-hover:opacity-40"
                      : "opacity-0 group-hover:opacity-100"
                  } transition-opacity duration-300`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleVideo}
                    className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer glow-strong"
                  >
                    {isPlaying ? (
                      <Pause
                        className="w-10 h-10 text-primary-foreground"
                        fill="currentColor"
                      />
                    ) : (
                      <Play
                        className="w-10 h-10 text-primary-foreground ml-1"
                        fill="currentColor"
                      />
                    )}
                  </motion.div>
                </div>
              )}

              {/* Project info overlay */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent ${
                  isPlaying
                    ? "opacity-0 group-hover:opacity-100"
                    : "opacity-100"
                } transition-opacity duration-300`}
              >
                <p className="text-primary text-sm font-orbitron font-semibold mb-1">
                  {activeProject.category}
                </p>
                <h3 className="text-2xl font-orbitron font-bold text-foreground">
                  {activeProject.title}
                </h3>
                <p className="text-sm text-foreground/70 mt-1 font-inter max-w-xl">
                  {activeProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Project list */}
          <div className="space-y-4">
            {projects.map((project, index) => {
              // Check if this project is verified in our cache
              const firstSource = project.videoSources[0]?.src;
              const hasVerifiedVideo = firstSource && videoCache[firstSource] === true;
              
              return (
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
                  <div className="flex justify-between items-start">
                    <p className="text-primary text-xs font-orbitron font-semibold mb-1">
                      {project.category}
                    </p>
                    
                    {/* Video status indicator */}
                    {videoCache[firstSource] !== undefined && (
                      <span 
                        className={`w-2 h-2 rounded-full mt-1 ${
                          hasVerifiedVideo ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        title={hasVerifiedVideo ? 'Video available' : 'Video unavailable'}
                      ></span>
                    )}
                  </div>
                  
                  <h4 className="font-orbitron font-bold text-foreground">
                    {project.title}
                  </h4>
                  <p className="text-xs text-foreground/60 mt-1 line-clamp-2">
                    {project.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
