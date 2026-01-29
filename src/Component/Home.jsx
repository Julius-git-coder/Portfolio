import React, { useState, Suspense, Component } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import Navbar from "./Navbar";
import HomeContent from "./HomeContent";
import AboutMe from "./AboutMe";
import Project from "./Project";
import Experience from "./Experience";
import Skills from "./Skills";
import Contact from "./Contact";

// Simple Error Boundary to catch Spline runtime crashes
class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Spline 3D Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

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

  const FallbackUI = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-md rounded-2xl border border-blue-100 shadow-xl overflow-hidden group">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4 rounded-full overflow-hidden border-4 border-blue-500/30 group-hover:border-blue-500 transition-all duration-500">
        <img
          src="/Codetrain.png"
          alt="Julius Dagana"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-blue-600 font-semibold text-sm sm:text-base px-4 text-center">Interactive Model Offline</p>
      <p className="text-gray-400 text-xs mt-1">Showing profile fallback</p>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gray-50">
      <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Persistent 3D Avatar - Fixed on all screens */}
      <div className="fixed bottom-4 left-4 w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 z-[9999] pointer-events-auto">
        <SplineErrorBoundary fallback={<FallbackUI />}>
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-100 animate-pulse">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-blue-600 font-medium">Loading 3D...</p>
              </div>
            </div>
          }>
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              {/* Background shadow/glow */}
              <div className="absolute inset-4 bg-blue-400/10 blur-3xl rounded-full -z-10"></div>
              <Spline
                scene="https://prod.spline.design/Kz69S6A89Xl0H-fB/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
                onLoad={() => console.log("Eye Spline loaded successfully")}
                onError={() => console.error("Eye Spline failed to load")}
              />
            </div>
          </Suspense>
        </SplineErrorBoundary>
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