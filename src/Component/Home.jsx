// import React, { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import Navbar from "./Navbar";
// import HomeContent from "./HomeContent";
// import AboutMe from "./AboutMe";
// import Project from "./Project";
// import Experience from "./Experience";
// import Skills from "./Skills";
// import Contact from "./Contact";

// const Home = () => {
//   const [activeTab, setActiveTab] = useState("Home");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Home":
//         return <HomeContent setActiveTab={setActiveTab} />;
//       case "About Me":
//         return <AboutMe />;
//       case "Project":
//         return <Project />;
//       case "Experience":
//         return <Experience />;
//       case "Skills":
//         return <Skills />;
//       case "Contact":
//         return <Contact />;
//       default:
//         return <HomeContent setActiveTab={setActiveTab} />;
//     }
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeInOut" },
//     },
//     exit: {
//       opacity: 0,
//       y: -20,
//       transition: { duration: 0.3, ease: "easeInOut" },
//     },
//   };

//   return (
//     <div className="min-h-screen 2">
//       <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />
//       <div className="pt-[3.5rem]">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             variants={contentVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             {renderContent()}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <div className="min-h-screen 2">
      <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />
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