
import React from "react";

const Skills = ({ onSwitchToContact, onSwitchToProjects }) => {
  // Complete skills data
  const allSkills = [
    {
      name: "React",
      icon: "/React.png",
      level: "Expert",
      description:
        "Building dynamic user interfaces with hooks, context, and advanced patterns",
      experience: "0-1 year",
      projects: ["HydroFlow", "EasyProfile", "Portfolio"],
    },
    {
      name: "JavaScript",
      icon: "/Javascript.png",
      level: "Advanced",
      description: "ES6+, async programming, and modern JavaScript patterns",
      experience: "0-1 year",
      projects: ["All Projects"],
    },
    {
      name: "HTML",
      icon: "/Html.png",
      level: "Expert",
      description: "Semantic markup, accessibility, and modern HTML5 features",
      experience: "0-1 year",
      projects: ["All Web Projects"],
    },
    {
      name: "CSS",
      icon: "/CSS.png",
      level: "Advanced",
      description:
        "Flexbox, Grid, animations, and responsive design principles",
      experience: "0-1 year",
      projects: ["Portfolio", "Custom Styling"],
    },
    {
      name: "Tailwind CSS",
      icon: "/Tailwind.png",
      level: "Expert",
      description: "Utility-first CSS framework for rapid UI development",
      experience: "0-1 year",
      projects: ["HydroFlow", "EasyProfile", "Portfolio"],
    },
    {
      name: "Node.js",
      icon: "/Node.png",
      level: "Expert",
      description:
        "Server-side JavaScript runtime for building scalable applications",
      experience: "0-1 year",
      projects: ["Backend APIs", "Server Projects"],
    },
    {
      name: "Express.js",
      icon: "/Express.png",
      level: "Expert",
      description: "Fast, unopinionated web framework for Node.js applications",
      experience: "0-1 year",
      projects: ["API Development", "Backend Services"],
    },
    {
      name: "Python",
      icon: "/Python.png",
      level: "Intermediate",
      description:
        "General-purpose programming language for backend, scripting, and data processing",
      experience: "0-1 year",
      projects: ["Backend Scripts", "APIs", "Automation"],
    },
    {
      name: "Render",
      icon: "/Render.png",
      level: "Intermediate",
      description:
        "Cloud platform for deploying and scaling web services and APIs",
      experience: "0-1 year",
      projects: ["API Deployment", "Backend Services"],
    },

    {
      name: "MongoDB",
      icon: "/Mogo.png",
      level: "Expert",
      description:
        "NoSQL database for flexible, scalable data storage solutions",
      experience: "0-1 year",
      projects: ["Database Design", "Data Management"],
    },
    {
      name: "Firebase",
      icon: "/Firebase.png",
      level: "Expert",
      description:
        "Backend-as-a-Service platform for authentication and real-time data",
      experience: "0-1 year",
      projects: ["HydroFlow", "EasyProfile", "Real-time Apps"],
    },
    {
      name: "Git",
      icon: "/Git.png",
      level: "Advanced",
      description:
        "Version control system for tracking changes and collaboration",
      experience: "0-1 year",
      projects: ["All Projects"],
    },
    {
      name: "Material-UI",
      icon: "/MUI.png",
      level: "Intermediate",
      description:
        "React component library implementing Google's Material Design",
      experience: "0-1 year",
      projects: ["Component Libraries", "UI Development"],
    },
    {
      name: "Netlify",
      icon: "/Netli.png",
      level: "Expert",
      description: "Platform for deploying and hosting modern web applications",
      experience: "0-1 year",
      projects: ["All Deployed Projects"],
    },
    {
      name: "Cloudinary",
      icon: "/Cloudinary.png",
      level: "Expert",
      description: "Cloud-based image and video management platform",
      experience: "0-1 year",
      projects: ["EasyProfile"],
    },
  ];

  // Skill categories
  const skillCategories = {
    Frontend: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Material-UI",
    ],
    Backend: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Python", // ✅ add
    ],
    "Tools & Deployment": [
      "Git",
      "Netlify",
      "Cloudinary",
      "Render", // ✅ add
    ],
  };


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

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Technical <span className="text-blue-600">Skills</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise across the full
            stack of modern web development technologies, from frontend
            frameworks to backend services and deployment platforms.
          </p>
        </div>

        {/* Skills Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
              13+
            </h3>
            <p className="text-gray-600 text-sm">Technologies</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
              5
            </h3>
            <p className="text-gray-600 text-sm">Expert Level</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">
              15+
            </h3>
            <p className="text-gray-600 text-sm">Projects Built</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">
              <span className="text-black">0</span>-1
            </h3>
            <p className="text-gray-600 text-sm">Year Experience</p>
          </div>
        </div>

        {/* Skills by Category */}
        {Object.entries(skillCategories).map(([category, skillNames]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              {category} <span className="text-blue-600">Skills</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allSkills
                .filter((skill) => skillNames.includes(skill.name))
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100"
                  >
                    {/* Skill Header */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-14 h-14 bg-gray-50 rounded-lg mr-4 group-hover:bg-blue-50 transition-colors duration-300">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {skill.name}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(
                            skill.level
                          )}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          Proficiency
                        </span>
                        {/* <span className="text-sm font-semibold text-blue-600">
                          {getLevelProgress(skill.level)}%
                        </span> */}
                      </div>

                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Experience & Projects */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <svg
                          className="w-4 h-4 text-blue-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-600">Experience: </span>
                        <span className="font-medium text-gray-900 ml-1">
                          {skill.experience}
                        </span>
                      </div>
                      <div className="flex items-start text-sm">
                        <svg
                          className="w-4 h-4 text-blue-500 mr-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M5 11h14"
                          />
                        </svg>
                        <span className="text-gray-600">Projects: </span>
                        <span className="font-medium text-gray-900 ml-1">
                          {skill.projects.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Call to Action Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              With expertise across the full stack, I'm ready to bring your
              ideas to life using modern technologies and best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white border-gradient-to-br border-2 from-blue-500 hover:border-via-blue-600 to-blue-700 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                onClick={onSwitchToProjects}
              >
                View My Projects
              </button>
              <button
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
                onClick={onSwitchToContact}
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;