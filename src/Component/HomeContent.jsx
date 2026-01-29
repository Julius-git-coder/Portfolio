import React, { useState } from "react";
import { Coffee, Download } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 mb-6 md:mb-0 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              Hello 👋
              <br />
              I'm Julius Dagana
              <br />a{" "}
              <span className="text-blue-600">Full-Stack Developer</span>
            </h1>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-6 justify-center md:justify-start">
              <button
                onClick={handleDownloadCV}
                className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-200 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Download Resume"
                type="button"
                disabled={false} // Set to true conditionally if needed
              >
                <Download className="w-4 h-4 mr-2 shrink-0" />
                <span>Download Resume</span>
              </button>
              <button
                onClick={handleContactClick}
                className="border hover:text-blue-500 hover:border-2 hover:border-blue-500 border-gray-300 text-gray-700 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden flex items-center justify-center z-10">
                  <img
                    src="/Codetrain.png"
                    alt="Julius Dagana"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              {techIcons.map((icon, index) => {
                const angle = (index / techIcons.length) * 360;
                return (
                  <div
                    key={index}
                    className="absolute bg-white p-2 sm:p-2.5 rounded-lg floating-icon"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "center center",
                      "--angle": `${angle}deg`,
                    }}
                  >
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="w-8 sm:w-10 lg:w-12"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <style>
        {`
          .floating-icon {
            transform: translate(-50%, -50%) rotate(var(--angle)) translate(8rem) rotate(calc(-1 * var(--angle)));
            animation: orbit 15s linear infinite;
          }

          @keyframes orbit {
            from { transform: translate(-50%, -50%) rotate(0deg) translate(8rem) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg) translate(8rem) rotate(-360deg); }
          }

          @media (min-width: 640px) {
            .floating-icon {
              transform: translate(-50%, -50%) rotate(var(--angle)) translate(11rem) rotate(calc(-1 * var(--angle)));
              animation: orbit-sm 20s linear infinite;
            }
            @keyframes orbit-sm {
              from { transform: translate(-50%, -50%) rotate(0deg) translate(11rem) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg) translate(11rem) rotate(-360deg); }
            }
          }

          @media (min-width: 1024px) {
            .floating-icon {
              transform: translate(-50%, -50%) rotate(var(--angle)) translate(14rem) rotate(calc(-1 * var(--angle)));
              animation: orbit-lg 25s linear infinite;
            }
            @keyframes orbit-lg {
              from { transform: translate(-50%, -50%) rotate(0deg) translate(14rem) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg) translate(14rem) rotate(-360deg); }
            }
          }
        `}
      </style>
      {/* Partner Logos */}

      <section className="bg-white py-6 sm:py-10 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center mb-4 sm:mb-6 text-sm sm:text-base md:text-lg lg:text-xl">
            I am a{" "}
            <span className="font-bold pr-2">full-stack software developer</span>
            with a strong foundation in building dynamic, user-focused
            applications. I have successfully completed the{" "}
            <span className="font-semibold">
              A<span className="text-blue-600 font-bold">I</span>CE program
            </span>
            , a professional training focused on{" "}
            <span className="font-bold">
              Artificial Intelligence and modern software engineering
            </span>
            . This program strengthened my ability to build intelligent,
            scalable applications.
            <button
              onClick={handleAboutMeClick}
              className="inline-block bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-xs sm:text-sm md:hidden transition-colors duration-200 mx-2"
            >
              View More
            </button>
            <span className="hidden md:inline">
              . My journey in software development is fueled by discipline and
              consistency, inspired by my passion for{" "}
              <span className="font-bold">fitness</span>. I apply the same
              mindset to problem-solving, teamwork, and continuous learning. My
              goal is to build innovative, AI-enhanced and scalable solutions
              that create meaningful value for users and businesses.
            </span>
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center mb-12 lg:mb-16">
            <div className="flex-1 mb-6 md:mb-0">
              <h2 className="text-xl  sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-[5rem] text-gray-900 sm:mb-[4rem] md:hidden">
                Almost A Year+ Programming
                <br />
                Experienced
              </h2>
              <h1 className="text-center pr-[4rem] font-bold">HydroFlow App</h1>
              <div className="w-56 h-56 mt:[5rem] sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <img
                  src="/AquqTrack.png"
                  alt="HydroFlow Project"
                  className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="flex-1 md:pl-6 lg:pl-8">
              <h2 className="text-xl underline sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-[7rem] sm:mb-6 hidden md:block">
                One Year<span className="absolute my-[-1rem]">+</span>{" "}
                <span className="ml-5"></span>of Experience In Programming
              </h2>
              <p className="text-gray-600 md:font-bold mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                My latest project, HydroFlow, is a water tracking app designed
                to help users stay healthy, hydrated, and consistent with their
                daily goals. I built it using modern tools and technologies such
                as ⬇️
              </p>
              <div className="space-y-3 mb-4 sm:mb-6">
                {[
                  { name: "Tailwindcss", percent: "90%", color: "blue-600" },
                  { name: "HTML", percent: "90%", color: "blue-600" },
                  { name: "MUI", percent: "50%", color: "blue-400" },
                  { name: "React", percent: "98%", color: "blue-600" },
                  { name: "Firebase", percent: "90%", color: "blue-600" },
                  { name: "CSS", percent: "85%", color: "blue-600" },
                  { name: "JavaScript", percent: "80%", color: "blue-600" },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-xs sm:text-sm">
                        {skill.name}
                      </span>
                      {/* <span className="text-blue-600 text-xs sm:text-sm">
                        {skill.percent}
                      </span> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-6 md:mb-0">
              <h1 className="font-bold">EasyProfile App</h1>
              <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <img
                  src="/EassyP.png"
                  alt="EasyProfile Project"
                  className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="flex-1 md:pl-6 lg:pl-8">
              <p className="text-gray-600 md:font-bold mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                My latest project, EasyProfile, is a profile management
                application designed to help users create, customize, and manage
                their personal information with ease. I developed it using
                modern tools and technologies such as ⬇️
              </p>
              <div className="space-y-3 mb-4 sm:mb-6">
                {[
                  { name: "Tailwindcss", percent: "90%", color: "blue-600" },
                  { name: "HTML", percent: "90%", color: "blue-600" },
                  { name: "Cloudinary", percent: "70%", color: "blue-500" },
                  { name: "React", percent: "98%", color: "blue-600" },
                  { name: "Firebase", percent: "90%", color: "blue-600" },
                  { name: "CSS", percent: "85%", color: "blue-600" },
                  { name: "JavaScript", percent: "80%", color: "blue-600" },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-xs sm:text-sm">
                        {skill.name}
                      </span>
                      {/* <span className="text-blue-600 text-xs sm:text-sm">
                        {skill.percent}
                      </span> */}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleContactClick}
                className="border-2 border-blue-500  px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Get In Touch
              </button>
              <button
                onClick={handleViewAllClick}
                className="mx-5 bg-white border-2 border-blue-500 text-blue-600 hover:bgwhite px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:text-black text-sm sm:text-base"
              >
                View All Projects
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Skills Section */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-4 sm:mb-6">
              Skills
              <span className=" text-black px-3">Areas</span>
            </h2>
            <p className="text-gray-600  md:font-bold mb-6 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
              I bring expertise across the full stack of modern web development
              technologies, from frontend frameworks to backend services and
              deployment platforms.
            </p>
            <button
              onClick={handleSkillsClick}
              className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-blue-700 text-sm sm:text-base transition-colors duration-200"
            >
              See All Skills
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg mb-4 group-hover:bg-blue-50 transition-colors duration-300">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {skill.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {skill.description}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${skill.level === "Expert"
                          ? "bg-green-400"
                          : skill.level === "Advanced"
                            ? i < 2
                              ? "bg-blue-400"
                              : "bg-gray-200"
                            : i < 1
                              ? "bg-yellow-400"
                              : "bg-gray-200"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ready to work together?
              </h3>
              <p className="text-gray-600 mb-4 md:font-semibold">
                Let's build something amazing with these technologies
              </p>
              <button
                onClick={handleSkillsClick}
                className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors duration-200"
              >
                View Full Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-blue-600 font-semibold mb-2 text-sm sm:text-base">
              MY SERVICES
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Awesome Services For You
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Web Design",
                description:
                  "Creating visually appealing and user-friendly web interfaces with modern tools like Tailwind CSS and React, as seen in EasyProfile.",
                icon: "/Tailwind.png",
                level: "Expert",
              },
              {
                title: "Web Development",
                description:
                  "Building responsive, scalable web apps using React, Firebase, and Node.js, demonstrated in HydroFlow.",
                icon: "/React.png",
                level: "Advanced",
              },
              {
                title: "UI/UX Design",
                description:
                  "Designing intuitive experiences with MUI and Tailwind CSS, focusing on usability and accessibility.",
                icon: "/MUI.png",
                level: "Intermediate",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-4 md:font-semibold  sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-4">
                  <img
                    src={service.icon}
                    alt={`${service.title} icon`}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-xs sm:text-sm">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    {service.level}
                  </span>
                </div>
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline text-xs sm:text-sm mt-2 block"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => setActiveTab("Contact")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base font-semibold transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { value: "10+", label: "Satisfied Clients" },
              { value: "15+", label: "Projects Completed" },
              { value: "25k+", label: "Lines of Code" },
              { value: "0-1", label: "Year Experience" },
            ].map((stat, index) => (
              <div key={index}>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Education & Experience Section */}
      <section className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                My Education
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "AiCE Program",
                    institution: "Current Advancement Program (2024-Present)",
                    description:
                      "Deepening expertise in modern web technologies, frameworks, and software development best practices through intensive training.",
                  },
                  {
                    title: "Full-Stack Development Program",
                    institution: "Codetrain, 2024-Present",
                    description:
                      "Currently enhancing skills in full-stack development through Codetrain's comprehensive curriculum, utilizing online resources, documentation, and practical project-based learning.",
                  },
                ].map((edu, index) => (
                  <div key={index} className="flex">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                        {edu.title}
                      </h3>
                      <p className="text-blue-600 text-xs sm:text-sm mb-1">
                        {edu.institution}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                My Development Journey
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Personal Projects",
                    role: "Full Stack Developer (2024-Present)",
                    description:
                      "Developing personal projects like HydroFlow and EasyProfile to demonstrate skills in React, Firebase, and modern web technologies.",
                  },
                  {
                    title: "Learning & Growth",
                    role: "Continuous Development (2023-Present)",
                    description:
                      "Consistently learning new technologies, building projects, and improving coding practices through hands-on experience and community involvement.",
                  },
                ].map((exp, index) => (
                  <div key={index} className="flex">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                        {exp.title}
                      </h3>
                      <p className="text-blue-600 text-xs sm:text-sm mb-1">
                        {exp.role}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {exp.description}
                      </p>
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
              className="bg-white text-blue-600 px-8 py-4 border-2  rounded-lg hover:bg-blue-50 text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-w-[200px]"
            >
              Get Started Today
            </button>
            <button
              onClick={handleDownloadCV}
              className="bg-transparent border-2 md:mb-[6rem] border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 min-w-[200px]"
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
