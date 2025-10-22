

import React, { useState, useEffect } from "react";
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

  const tabs = [
    { icon: <IoHomeOutline />, name: "Home" },
    { icon: <MdRoundaboutRight />, name: "About Me" },
    { icon: <GrProjects />, name: "Project" },
    { icon: <MdRateReview />, name: "Experience" },
    { icon: <GiSkills />, name: "Skills" },
    { icon: <IoMdContacts />, name: "Contact" },
  ];

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMenuVisible(false);
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
      setIsMenuVisible(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (isMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMenuVisible(false);
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu-container")) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="fixed top-0 w-full bg-white md:bg-white lg:bg-white sm:bg-blue-500 z-50 shadow-2xl">
        <div className="flex justify-between items-center h-14 px-4 sm:px-6 md:px-8">
          <div className="text-lg sm:text-xl md:text-2xl pr-20 font-bold">
            Portfolio
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black sm:text-white focus:outline-none hover:text-gray-700 sm:hover:text-gray-200 transition-colors duration-1000"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-1000 ${
                  isMenuOpen ? "rotate-90" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex md:space-x-4 lg:space-x-8 overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={`relative flex items-center text-sm sm:text-base md:text-lg font-semibold transition-all duration-1000 transform hover:scale-105 ${
                  activeTab === tab.name
                    ? "text-blue-500"
                    : "text-black hover:text-gray-700"
                } px-3 sm:px-4 py-2 focus:outline-none`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transition-transform duration-1000 ${
                    activeTab === tab.name ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {isMenuVisible && (
        <div className="md:hidden fixed inset-0 z-40 bg-white/5 bg-opacity-50 backdrop">
          <div
            className={`mobile-menu-container fixed top-14 left-0 w-64 bg-white rounded-br-2xl shadow-xl transition-all duration-1000 ease-in-out transform ${
              isAnimating && isMenuOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <div className="flex flex-col py-4">
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab.name)}
                  className={`relative flex items-center text-sm sm:text-base font-semibold transition-all duration-1000 transform hover:scale-105 group ${
                    activeTab === tab.name
                      ? "text-black bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-r-2xl"
                      : "text-black hover:bg-blue-100 rounded-r-lg"
                  } w-full text-left py-3 px-6 focus:outline-none`}
                  style={{
                    transitionDelay:
                      isAnimating && isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span>{tab.name}</span>
                  {activeTab === tab.name && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse group-hover:bg-blue-500" />
                  )}
                  <div
                    className={`absolute left-0 top-0 w-1 h-full bg-blue-800 transition-transform duration-1000 ${
                      activeTab === tab.name ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                </button>
              ))}

              <div className="mt-auto p-6 border-t border-blue-500">
                <p className="text-gray-400 text-xs">
                  Tap anywhere outside to close
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;