import React, { useState, Suspense, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useSpring, useMotionValue } from "framer-motion";
import Navbar from "./Navbar";
import HomeContent from "./HomeContent";
import AboutMe from "./AboutMe";
import Project from "./Project";
import Experience from "./Experience";
import Skills from "./Skills";
import Contact from "./Contact";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Home");

  // Mouse tracking for interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  // Smooth springs for fluid movement - optimized for speed
  const springConfig = { damping: 15, stiffness: 400 };
  const robotX = useSpring(mouseX, springConfig);
  const robotY = useSpring(mouseY, springConfig);
  const robotRotateX = useSpring(rotateX, springConfig);
  const robotRotateY = useSpring(rotateY, springConfig);
  const robotRotateZ = useSpring(rotateZ, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Robot is positioned at bottom-right
      const robotCenterX = window.innerWidth - 96;
      const robotCenterY = window.innerHeight - 96;

      // Calculate vector from robot to cursor
      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;

      // Calculate angle using atan2 for full 360° rotation
      const angleRad = Math.atan2(deltaX, -deltaY);
      const angleDeg = angleRad * (180 / Math.PI);

      // Set Z rotation for 360° head turn
      rotateZ.set(angleDeg);

      // Calculate tilt based on vertical distance
      const maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);
      const tiltX = -(deltaY / maxDistance) * 30;

      rotateX.set(tiltX);
      rotateY.set(0); // Reset Y rotation since we're using Z for turning

      // Minimal translation movement
      mouseX.set((deltaX / window.innerWidth) * 10);
      mouseY.set((deltaY / window.innerHeight) * 10);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, rotateX, rotateY, rotateZ]);

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeContent setActiveTab={setActiveTab} />;
      case "About Me":
        return <AboutMe />;
      case "Project":
        return <Project />;
      case "Experience":
        return <Experience />;
      case "Skills":
        return (
          <Skills
            onSwitchToContact={() => setActiveTab("Contact")}
            onSwitchToProjects={() => setActiveTab("Project")}
          />
        );
      case "Contact":
        return <Contact />;
      default:
        return <HomeContent setActiveTab={setActiveTab} />;
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gray-50">
      <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* AI Robot Vector Art - Fixed at the bottom-right with full 360° rotation */}
      <div className="fixed bottom-2 right-2 w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 z-[9999] pointer-events-none select-none flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            x: robotX,
            y: robotY,
            rotateX: robotRotateX,
            rotateY: robotRotateY,
            rotateZ: robotRotateZ,
            perspective: 1200,
            transformStyle: "preserve-3d"
          }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full h-full relative"
        >
          {/* Subtle glow effect behind the robot */}
          <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full -z-10 animate-pulse"></div>

          <img
            src="/Ai Robot Vector Art.gif"
            alt="AI Robot"
            className="w-full h-full object-contain"
            style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }}
            loading="lazy"
          />
        </motion.div>
      </div>

      <div className="pt-[3.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;