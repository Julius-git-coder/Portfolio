

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
      <div className="fixed bottom-0 left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] pointer-events-none z-50">
        <div className="w-full h-full pointer-events-auto">
          <iframe
            src="https://my.spline.design/charactertutorialinteraction-029873c89e242ce7b078902df32b5f40/"
            frameBorder="0"
            width="100%"
            height="100%"
            title="3D Avatar"
          />
        </div>
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