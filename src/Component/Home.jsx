

import React, { useState, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import Navbar from "./Navbar";
import HomeContent from "./HomeContent";
import AboutMe from "./AboutMe";
import Project from "./Project";
import Experience from "./Experience";
import Skills from "./Skills";
import Contact from "./Contact";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Home");

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
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Persistent 3D Avatar - Fixed on all screens */}
      <div className="fixed bottom-4 left-4 w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 z-[9999] pointer-events-auto">
        <div className="absolute top-0 left-0 bg-red-600 text-white p-2 text-xs font-bold z-[10000]">DEPLOYMENT TEST</div>
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-100 animate-pulse">
            <p className="text-blue-600 font-medium">3D Avatar Loading...</p>
          </div>
        }>
          <div className="w-full h-full">
            <Spline
              scene="https://prod.spline.design/6Wq1Q7YGy9Y6O8R8/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Suspense>
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