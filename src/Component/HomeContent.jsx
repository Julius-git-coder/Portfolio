import React from "react";
import { Coffee, Download, Users, Rocket, Code2, Trophy, BookOpen, Briefcase, GraduationCap, Milestone, ArrowRight } from "lucide-react";

const HomeContent = ({ setActiveTab }) => {
  // Array of icons (images and Coffee SVG) and their alt texts for the floating icons
  const techIcons = [
    { type: "image", src: "/CSS.png", alt: "CSS icon" },
    { type: "image", src: "/Firebase.png", alt: "Firebase icon" },
    { type: "image", src: "/Html.png", alt: "HTML icon" },
    { type: "image", src: "/Git.png", alt: "Git icon" },
    { type: "image", src: "/Javascript.png", alt: "JavaScript icon" },
    { type: "image", src: "/MUI.png", alt: "MUI icon" },
    { type: "image", src: "/Tailwind.png", alt: "Tailwind icon" },
    { type: "image", src: "/Mogo.png", alt: "MongoDB icon" },
    { type: "image", src: "/Netli.png", alt: "Netlify icon" },
    { type: "image", src: "/Node.png", alt: "Node.js icon" },
    { type: "image", src: "/Express.png", alt: "Express icon" },
    { type: "image", src: "/Cloudinary.png", alt: "Cloudinary icon" },
    { type: "image", src: "/Nextjs.png", alt: "Next.js icon" },
    { type: "image", src: "/ReactNative.png", alt: "React Native icon" },
    { type: "image", src: "/Render.png", alt: "Render icon" },
    { type: "image", src: "/Expo_Go.png", alt: "Expo Go icon" },
    { type: "image", src: "/Typescript Logo.jpeg", alt: "TypeScript icon" },
    { type: "image", src: "/Python.png", alt: "Python icon" },
  ];

  // Skills data for the enhanced skills section (showing first 8 only)
  const skills = [
    {
      name: "React",
      icon: "/React.png",
      level: "Expert",
      description: "Building dynamic user interfaces",
    },
    {
      name: "JavaScript",
      icon: "/Javascript.png",
      level: "Expert",
      description: "Core programming language",
    },
    {
      name: "HTML",
      icon: "/Html.png",
      level: "Expert",
      description: "Semantic markup structure",
    },
    {
      name: "CSS",
      icon: "/CSS.png",
      level: "Expert",
      description: "Styling and layouts",
    },
    {
      name: "Tailwind CSS",
      icon: "/Tailwind.png",
      level: "Expert",
      description: "Utility-first CSS framework",
    },
    {
      name: "Node.js",
      icon: "/Node.png",
      level: "Expert",
      description: "Server-side JavaScript runtime",
    },
    {
      name: "Express.js",
      icon: "/Express.png",
      level: "Expert",
      description: "Web application framework",
    },
    {
      name: "MongoDB",
      icon: "/Mogo.png",
      level: "Expert",
      description: "NoSQL database management",
    },
    {
      name: "Next.js",
      icon: "/Nextjs.png",
      level: "Expert",
      description: "React framework for production",
    },
    {
      name: "React Native",
      icon: "/ReactNative.png",
      level: "Expert",
      description: "Cross-platform mobile apps",
    },
    {
      name: "Render",
      icon: "/Render.png",
      level: "Expert",
      description: "Cloud hosting platform",
    },
    {
      name: "Typescript",
      icon: "/Typescript Logo.jpeg",
      level: "Expert",
      description: "Typed JavaScript development",
    },
    {
      name: "Expo Go",
      icon: "/Expo_Go.png",
      level: "Expert",
      description: "React Native development tool",
    },
    {
      name: "Python",
      icon: "/Python.png",
      level: "Expert",
      description: "Versatile programming language",
    },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case "Expert":
        return "bg-green-100 text-green-800 border-green-200";
      case "Advanced":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Function to handle CV download
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Julius_Dagana_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactClick = () => {
    setActiveTab("Contact");
  };

  const handleSkillsClick = () => {
    setActiveTab("Skills");
  };

  const handleAboutMeClick = () => {
    setActiveTab("About Me");
  };

  const handleViewAllClick = () => {
    setActiveTab("Project");
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      {/* Hero & Orbit Section - Redesigned */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-24 pb-20 sm:pb-28">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -m-24 w-[40rem] h-[40rem] bg-blue-50 rounded-full blur-[120px] opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 -m-24 w-[30rem] h-[30rem] bg-purple-50 rounded-full blur-[120px] opacity-20 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-32 lg:gap-64">
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left relative z-10 max-w-2xl px-4 lg:px-0">
              <div className="inline-block mb-4">
                <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] px-4 py-2 bg-blue-50 rounded-full">Available for Projects</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-[1.05]">
                Hello <span className="inline-block animate-bounce-slow">👋</span>
                <br />
                I'm <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Julius Dagana</span>
                <br />
                <span className="text-gray-900">a Architect of Code.</span>
              </h1>
              <p className="text-gray-500 text-lg sm:text-xl font-semibold mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Specializing in high-performance Full-Stack development and intelligent AI orchestration.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <button
                  onClick={handleDownloadCV}
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-2xl font-black transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-2xl overflow-hidden whitespace-nowrap"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Download className="relative w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  <span className="relative uppercase tracking-widest text-xs">Capture Resume</span>
                </button>
                <button
                  onClick={handleContactClick}
                  className="group flex items-center gap-3 px-10 py-5 bg-white text-gray-900 border border-gray-100 rounded-2xl font-black transition-all duration-300 hover:border-blue-200 hover:bg-gray-50 uppercase tracking-widest text-xs whitespace-nowrap"
                >
                  Initiate Connection
                </button>
              </div>
            </div>

            {/* Orbiting Tech Section */}
            <div className="flex-1 flex justify-center lg:justify-end relative">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem]">
                {/* Central Profile Orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative group p-2 rounded-full bg-white shadow-2xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden flex items-center justify-center bg-white z-10 border-4 border-white">
                      <img
                        src="/Codetrain.png"
                        alt="Julius Dagana"
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                {/* Orbiting Icons */}
                {techIcons.map((icon, index) => (
                  <div
                    key={index}
                    className="absolute bg-white/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-lg border border-white floating-icon group/icon hover:scale-125 hover:z-50 transition-all duration-300"
                    style={{
                      top: "50%",
                      left: "50%",
                      animationDelay: `${(index / techIcons.length) * -20}s`,
                    }}
                  >
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="w-6 sm:w-8 lg:w-10 opacity-80 group-hover/icon:opacity-100 group-hover/icon:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          .floating-icon {
            position: absolute;
            animation: orbit 20s linear infinite;
          }

          @keyframes orbit {
            from { transform: translate(-50%, -50%) rotate(0deg) translate(9rem) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg) translate(9rem) rotate(-360deg); }
          }

          @media (min-width: 640px) {
            .floating-icon { animation-name: orbit-sm; }
            @keyframes orbit-sm {
              from { transform: translate(-50%, -50%) rotate(0deg) translate(13rem) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg) translate(13rem) rotate(-360deg); }
            }
          }

          @media (min-width: 1024px) {
            .floating-icon { animation-name: orbit-lg; }
            @keyframes orbit-lg {
              from { transform: translate(-50%, -50%) rotate(0deg) translate(18rem) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg) translate(18rem) rotate(-360deg); }
            }
          }

          .animate-bounce-slow {
            animation: bounce-slow 3s infinite;
          }

          @keyframes bounce-slow {
            0%, 100% { transform: translateY(-5%) rotate(5deg); }
            50% { transform: translateY(0) rotate(-5deg); }
          }
        `}
      </style>

      {/* Intro Section - Redesigned into High-Tier Card */}
      <section className="bg-[#fcfcfd] pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-white rounded-[3rem] p-8 sm:p-12 lg:p-20 border border-gray-100 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 p-12 text-blue-50/50">
                <Trophy className="w-48 h-48 sm:w-64 sm:h-64" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-400 font-black text-xs uppercase tracking-[0.3em]">Identity Core</span>
                </div>

                <p className="text-gray-600 text-xl sm:text-2xl lg:text-3xl font-semibold leading-relaxed mb-12">
                  I am a <span className="text-gray-900 font-extrabold">full-stack software engineer</span> with a precision-driven foundation in building dynamic, user-centric ecosystems.
                  Having successfully graduated from the <span className="bg-blue-600 text-white px-3 py-1 rounded-xl">AICE program</span>, my technical repertoire is anchored in
                  <span className="text-blue-600 font-black"> Artificial Intelligence</span> and modern software architecture.
                </p>

                <div className="grid sm:grid-cols-2 gap-12 lg:gap-20">
                  <div className="space-y-6">
                    <h3 className="text-gray-900 font-black text-lg tracking-tight flex items-center gap-3">
                      <Rocket className="w-5 h-5 text-blue-600" />
                      The Mission
                    </h3>
                    <p className="text-gray-500 font-bold leading-relaxed">
                      To engineer innovative, AI-enhanced solutions that scale seamlessly and deliver tangible, meaningful value to global enterprises and users alike.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-gray-900 font-black text-lg tracking-tight flex items-center gap-3">
                      <Users className="w-5 h-5 text-purple-600" />
                      The Philosophy
                    </h3>
                    <p className="text-gray-500 font-bold leading-relaxed">
                      Fuelled by the discipline of fitness, I translate consistency and peak-performance mindsets into every line of code and collaborative initiative.
                    </p>
                  </div>
                </div>

                <div className="mt-16 pt-12 border-t border-gray-50 flex flex-wrap gap-8 items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Collaborator" className="w-full h-full object-cover opacity-60" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                      +12
                    </div>
                  </div>
                  <button
                    onClick={handleAboutMeClick}
                    className="flex items-center gap-3 text-blue-600 font-black text-sm uppercase tracking-widest hover:gap-5 transition-all"
                  >
                    Deep Dive Journey
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Projects Section - Redesigned */}
      <section className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2 block">Portfolio</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Personal <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Showcasing my expertise in full-stack development through real-world applications
            </p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-20">
            {/* HydroFlow Project */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-12">
                  {/* Project Image */}
                  <div className="relative order-2 md:order-1">
                    <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-2xl"></div>
                    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 flex items-center justify-center aspect-square">
                      <img
                        src="/AquqTrack.png"
                        alt="HydroFlow Project"
                        className="w-full h-full object-contain rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                      Web App
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col justify-center order-1 md:order-2">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-4">
                      <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                      <span className="text-sm uppercase tracking-wider">Personal Project</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      HydroFlow
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      A water tracking app designed to help users stay healthy, hydrated, and consistent with their
                      daily goals. Built with modern tools for optimal performance and user experience.
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Technologies Used:</p>
                      <div className="flex flex-wrap gap-2">
                        {["React", "Tailwind CSS", "Firebase", "JavaScript", "HTML", "CSS", "MUI"].map((tech) => (
                          <span key={tech} className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:border-blue-400 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={handleViewAllClick}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
                      >
                        View Details
                      </button>
                      <button
                        onClick={handleContactClick}
                        className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 whitespace-nowrap"
                      >
                        Get In Touch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EasyProfile Project */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-12">
                  {/* Project Details */}
                  <div className="flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 text-purple-600 font-semibold mb-4">
                      <div className="w-12 h-1 bg-purple-600 rounded-full"></div>
                      <span className="text-sm uppercase tracking-wider">Personal Project</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      EasyProfile
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      A profile management application designed to help users create, customize, and manage
                      their personal information with ease using modern web technologies.
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Technologies Used:</p>
                      <div className="flex flex-wrap gap-2">
                        {["React", "Tailwind CSS", "Firebase", "Cloudinary", "JavaScript", "HTML", "CSS"].map((tech) => (
                          <span key={tech} className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200 hover:border-purple-400 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={handleViewAllClick}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
                      >
                        View Details
                      </button>
                      <button
                        onClick={handleContactClick}
                        className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 whitespace-nowrap"
                      >
                        Get In Touch
                      </button>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl blur-2xl"></div>
                    <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 flex items-center justify-center aspect-square">
                      <img
                        src="/EassyP.png"
                        alt="EasyProfile Project"
                        className="w-full h-full object-contain rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                      Web App
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ewash Project */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-12">
                  {/* Project Image */}
                  <div className="relative order-2 md:order-1">
                    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-2xl blur-2xl"></div>
                    <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 flex items-center justify-center aspect-square">
                      <img
                        src="/Ewash.png"
                        alt="Ewash Project"
                        className="w-full h-full object-contain rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                      Mobile App
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col justify-center order-1 md:order-2">
                    <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold mb-4">
                      <div className="w-12 h-1 bg-emerald-600 rounded-full"></div>
                      <span className="text-sm uppercase tracking-wider">Personal Project</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      Ewash
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      A mobile application designed for shop owners to easily showcase their services online.
                      Ewash allows users to post their shops, make services available, and let customers book
                      appointments seamlessly, reducing time wastage and operational challenges.
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Technologies Used:</p>
                      <div className="flex flex-wrap gap-2">
                        {["TypeScript", "React Native", "MongoDB", "Express", "Tailwind CSS", "Cloudinary", "Expo Go"].map((tech) => (
                          <span key={tech} className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200 hover:border-emerald-400 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={handleViewAllClick}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
                      >
                        View Details
                      </button>
                      <button
                        onClick={handleContactClick}
                        className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 whitespace-nowrap"
                      >
                        Get In Touch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Projects CTA */}
          <div className="text-center mt-16">
            <button
              onClick={handleViewAllClick}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              <span>Explore All Projects</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      {/* Enhanced Skills Section - Redesigned */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2 block text-center">Expertise</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 text-center">
                Skills <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Areas</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed md:font-bold">
              I bring expertise across the full stack of modern web development
              technologies, from frontend frameworks to backend services and
              deployment platforms.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {/* Main Card */}
                <div className="relative h-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-colors duration-300">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-10 h-10 object-contain transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    {/* Expertise Indicator */}
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${skill.level === "Expert" ? "bg-green-500" : "bg-blue-500"
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 font-bold">
                    {skill.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2 md:font-semibold">
                    {skill.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(
                        skill.level
                      )}`}
                    >
                      {skill.level}
                    </span>
                    <button
                      onClick={handleSkillsClick}
                      className="text-blue-600 text-xs font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white border border-blue-100 rounded-3xl p-8 sm:p-10 shadow-xl max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Build Something <span className="text-blue-600">Legendary?</span>
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg md:font-bold">
                  Let's leverage these technologies to bring your vision to life.
                  My expertise is at your service.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleSkillsClick}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                  >
                    View Stack Breakdown
                  </button>
                  <button
                    onClick={handleViewAllClick}
                    className="w-full sm:w-auto px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 whitespace-nowrap"
                  >
                    Explore Projects
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Services Section - Redesigned */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2 block text-center">Solutions</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 text-center">
                Awesome <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed md:font-bold">
              Deliver high-impact digital experiences with my specialized service offerings,
              tailored to help your business thrive in the modern web landscape.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Web Design",
                description:
                  "Creating visually appealing and user-friendly web interfaces with modern tools like Tailwind CSS and React, as seen in EasyProfile.",
                icon: "/Tailwind.png",
                level: "Expert",
                bgColor: "from-blue-500/10 to-transparent",
                hoverBorder: "group-hover:border-blue-500/50",
                iconBg: "bg-blue-50"
              },
              {
                title: "Web Development",
                description:
                  "Building responsive, scalable web apps using React, Firebase, and Node.js, demonstrated in HydroFlow.",
                icon: "/React.png",
                level: "Advanced",
                bgColor: "from-purple-500/10 to-transparent",
                hoverBorder: "group-hover:border-purple-500/50",
                iconBg: "bg-purple-50"
              },
              {
                title: "UI/UX Design",
                description:
                  "Designing intuitive experiences with MUI and Tailwind CSS, focusing on usability and accessibility.",
                icon: "/MUI.png",
                level: "Intermediate",
                bgColor: "from-pink-500/10 to-transparent",
                hoverBorder: "group-hover:border-pink-500/50",
                iconBg: "bg-pink-50"
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative h-full transition-all duration-300"
              >
                {/* Background Decoration */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10`}></div>

                {/* Main Card */}
                <div className={`h-full bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 ${service.hoverBorder} group-hover:-translate-y-2`}>
                  <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-inner`}>
                    <img
                      src={service.icon}
                      alt={`${service.title} icon`}
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-base leading-relaxed mb-6 md:font-semibold">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-100">
                      {service.level}
                    </span>
                    <a
                      href="#"
                      className="text-blue-600 font-bold hover:underline inline-flex items-center gap-2 group/link whitespace-nowrap"
                    >
                      Learn More
                      <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Get Started CTA */}
          <div className="mt-20 text-center">
            <button
              onClick={() => setActiveTab("Contact")}
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span>Ready to Start Your Project?</span>
              <svg className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
            <p className="text-gray-500 mt-6 font-medium">Let's build something exceptional together.</p>
          </div>
        </div>
      </section>
      {/* Stats Section - Redesigned */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                value: "10+",
                label: "Satisfied Clients",
                icon: <Users className="w-6 h-6 text-blue-600" />,
                gradient: "from-blue-600 to-blue-400"
              },
              {
                value: "15+",
                label: "Projects Completed",
                icon: <Rocket className="w-6 h-6 text-purple-600" />,
                gradient: "from-purple-600 to-purple-400"
              },
              {
                value: "25k+",
                label: "Lines of Code",
                icon: <Code2 className="w-6 h-6 text-emerald-600" />,
                gradient: "from-emerald-600 to-emerald-400"
              },
              {
                value: "0-1",
                label: "Year Experience",
                icon: <Trophy className="w-6 h-6 text-amber-600" />,
                gradient: "from-amber-600 to-amber-400"
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className={`text-3xl lg:text-4xl font-extrabold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-bold text-sm tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Journey Section - Redesigned */}
      <section className="bg-gray-50/50 py-16 sm:py-20 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Education Column */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-red-100 rounded-2xl">
                  <GraduationCap className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  My <span className="text-red-600">Education</span>
                </h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {[
                  {
                    title: "AiCE Program",
                    institution: "Current Advancement Program",
                    period: "2024 - Present",
                    description:
                      "Deepening expertise in modern web technologies, frameworks, and software development best practices through intensive training.",
                    color: "red"
                  },
                  {
                    title: "Full-Stack Development",
                    institution: "Codetrain",
                    period: "2024 - Present",
                    description:
                      "Currently enhancing skills in full-stack development through Codetrain's comprehensive curriculum, utilizing online resources, documentation, and practical project-based learning.",
                    color: "red"
                  },
                ].map((edu, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    {/* Icon/Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-red-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    {/* Content */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-red-600 font-bold text-xs uppercase tracking-wider">{edu.period}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.title}</h3>
                      <p className="text-blue-600 font-bold text-sm mb-3">{edu.institution}</p>
                      <p className="text-gray-600 text-sm leading-relaxed font-semibold">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Journey Column */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <Milestone className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Work <span className="text-blue-600">Journey</span>
                </h2>
              </div>

              <div className="space-y-8 relative">
                {[
                  {
                    title: "Personal Projects",
                    role: "Full Stack Developer",
                    period: "2024 - Present",
                    description:
                      "Developing personal projects like HydroFlow and EasyProfile to demonstrate skills in React, Firebase, and modern web technologies.",
                    icon: <Code2 className="w-5 h-5 text-white" />
                  },
                  {
                    title: "Learning & Growth",
                    role: "Continuous Development",
                    period: "2023 - Present",
                    description:
                      "Consistently learning new technologies, building projects, and improving coding practices through hands-on experience and community involvement.",
                    icon: <Rocket className="w-5 h-5 text-white" />
                  },
                ].map((exp, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {exp.icon}
                      </div>
                      <div className="w-0.5 h-full bg-blue-100 group-last:bg-transparent"></div>
                    </div>
                    <div className="flex-1 pb-8 group-last:pb-0">
                      <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">{exp.period}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                        <p className="text-purple-600 font-bold text-sm mb-3">{exp.role}</p>
                        <p className="text-gray-600 text-sm leading-relaxed font-semibold">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 py-16 sm:py-20  relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Got a Project? Let's Talk
          </h2>
          <p className="text-blue-100 mb-8 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create
            something amazing together. I'm here to help you build the perfect
            solution for your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleContactClick}
              className="bg-white text-blue-600 px-8 py-4 border-2  rounded-lg hover:bg-blue-50 text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-w-[200px] whitespace-nowrap"
            >
              Get Started Today
            </button>
            <button
              onClick={handleDownloadCV}
              className="bg-transparent border-2 md:mb-[6rem] border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 min-w-[200px] whitespace-nowrap"
            >
              Download Resume
            </button>
          </div>
        </div>

        {/* Enhanced wavy footer */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              fillOpacity="1"
              d="M0,96L24,112C48,128,96,160,144,160C192,160,240,128,288,122.7C336,117,384,139,432,138.7C480,139,528,117,576,117.3C624,117,672,139,720,133.3C768,128,816,96,864,90.7C912,85,960,107,1008,128C1056,149,1104,171,1152,165.3C1200,160,1248,128,1296,117.3C1344,107,1392,117,1416,122.7L1440,128L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            />
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L24,213.3C48,203,96,181,144,181.3C192,181,240,203,288,208C336,213,384,203,432,186.7C480,171,528,149,576,154.7C624,160,672,192,720,197.3C768,203,816,181,864,170.7C912,160,960,160,1008,170.7C1056,181,1104,203,1152,208C1200,213,1248,203,1296,186.7C1344,171,1392,149,1416,138.7L1440,128L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
