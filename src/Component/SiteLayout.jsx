import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useSpring, useMotionValue } from "framer-motion";
import Navbar from "./Navbar";
import Seo from "./Seo";

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

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 400 };
  const robotX = useSpring(mouseX, springConfig);
  const robotY = useSpring(mouseY, springConfig);
  const robotRotateX = useSpring(rotateX, springConfig);
  const robotRotateY = useSpring(rotateY, springConfig);
  const robotRotateZ = useSpring(rotateZ, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const robotCenterX = window.innerWidth - 96;
      const robotCenterY = window.innerHeight - 96;
      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;
      const angleRad = Math.atan2(deltaX, -deltaY);
      const angleDeg = angleRad * (180 / Math.PI);
      rotateZ.set(angleDeg);
      const maxDistance = Math.sqrt(
        window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight
      );
      const tiltX = -(deltaY / maxDistance) * 30;
      rotateX.set(tiltX);
      rotateY.set(0);
      mouseX.set((deltaX / window.innerWidth) * 10);
      mouseY.set((deltaY / window.innerHeight) * 10);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, rotateX, rotateY, rotateZ]);

  return (
    <div className="min-h-screen relative overflow-x-clip bg-gray-50">
      <Seo />
      <Navbar />

      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-5 w-28 h-28 sm:w-36 sm:h-36 lg:w-52 lg:h-52 z-40 pointer-events-none select-none flex items-center justify-center p-2 sm:p-3">
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
            transformStyle: "preserve-3d",
          }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full h-full relative"
        >
          <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
          <img
            src="/Ai Robot Vector Art.gif"
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </motion.div>
      </div>

      <div className="pt-20 md:pt-24 pb-24 sm:pb-28 md:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
