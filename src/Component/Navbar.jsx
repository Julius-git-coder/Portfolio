import React, { useState, useEffect, useCallback } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdRoundaboutRight } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { MdRateReview } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { IoMdContacts } from "react-icons/io";

const Navbar = ({ setActiveTab, activeTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const tabs = [
    { icon: <IoHomeOutline />, name: "Home" },
    { icon: <MdRoundaboutRight />, name: "About Me" },
    { icon: <GrProjects />, name: "Project" },
    { icon: <MdRateReview />, name: "Experience" },
    { icon: <GiSkills />, name: "Skills" },
    { icon: <IoMdContacts />, name: "Contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMenuVisible(false);
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 400);
    } else {
      setIsMenuOpen(true);
      setIsMenuVisible(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    }
  }, [isMenuOpen]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu-container") && !event.target.closest(".hamburger-button")) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <>
      {/* Desktop & Main Navbar Container */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-4 py-4 sm:px-6 md:px-12 flex justify-center ${isScrolled ? "sm:py-4" : "sm:py-8"
          }`}
      >
        <div
          className={`flex justify-between items-center w-full max-w-7xl px-6 py-3 rounded-2xl transition-all duration-500 shadow-2xl ${isScrolled
            ? "bg-white/80 backdrop-blur-xl border border-white/20 shadow-blue-500/10"
            : "bg-white/40 backdrop-blur-md border border-white/10"
            }`}
        >
          {/* Logo / Branding */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab("Home")}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <img src="/Codetrain.jpg" alt="Julius" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              Julius
            </span>
          </div>

          {/* Desktop Navigation Link */}
          <div className="hidden md:flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap overflow-hidden group ${activeTab === tab.name
                  ? "text-blue-600 bg-blue-50/50"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                  }`}
              >
                <div className="flex items-center gap-2 relative z-10">
                  <span className={`transition-transform duration-300 ${activeTab === tab.name ? "scale-110" : "group-hover:scale-110"}`}>
                    {tab.icon}
                  </span>
                  {tab.name}
                </div>
                {activeTab === tab.name && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden hamburger-button w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2 bg-blue-600" : ""}`} />
            <span className={`w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2 bg-blue-600" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuVisible && (
        <div className="md:hidden fixed inset-0 z-40 overflow-hidden">
          {/* Blur Background */}
          <div
            className={`absolute inset-0 bg-white/60 backdrop-blur-xl transition-opacity duration-500 ${isAnimating && isMenuOpen ? "opacity-100" : "opacity-0"
              }`}
            onClick={toggleMenu}
          />

          {/* Side Drawer */}
          <div
            className={`mobile-menu-container absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl border-l border-gray-100 transition-transform duration-500 ease-in-out pt-24 px-8 ${isAnimating && isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Navigation Node</span>
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab.name)}
                  className={`flex items-center gap-4 py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 whitespace-nowrap group ${activeTab === tab.name
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 translate-x-2"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  style={{
                    transitionDelay: isAnimating && isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <span className={`text-lg ${activeTab === tab.name ? "text-white" : "text-blue-600"}`}>
                    {tab.icon}
                  </span>
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="mt-20 pt-8 border-t border-gray-100">
              <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">Current Status</p>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-gray-900">Available for Hire</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;