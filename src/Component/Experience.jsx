import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Rocket,
  Code2,
  Terminal,
  Layers,
  Calendar,
  Sparkles,
  ChevronRight
} from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      year: "2025 - Present",
      title: "Junior Web Developer",
      company: "Jnard IT Consultancy, Accra, Ghana",
      description: "Building responsive front-end interfaces with React and Tailwind CSS, focusing on user experience and performance optimization. Contributing to backend APIs using Node.js and deploying projects on Netlify.",
      icon: <Code2 className="w-5 h-5 text-white" />,
      gradient: "from-blue-600 to-indigo-600",
      skills: ["React", "JavaScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase", "Git", "Netlify", "UI/UX"]
    },
    {
      year: "2024 - Present",
      title: "Full-Stack Developer",
      company: "Codetrain Africa, Accra, Ghana",
      description: "Developing and maintaining web applications using the MERN stack. Collaborated with cross-functional teams to deliver scalable solutions, integrating Firebase and Tailwind CSS for enhanced functionality and design.",
      icon: <Terminal className="w-5 h-5 text-white" />,
      gradient: "from-purple-600 to-pink-600",
      skills: ["MERN Stack", "Firebase", "Tailwind CSS", "Scalable Solutions", "Collaboration"]
    },
    {
      year: "2024",
      title: "Ewash - Mobile Service Booking Platform",
      company: "Lead Developer (Personal Project)",
      description: "Architected a mobile platform for shop owners to digitize their services. Reduced operational challenges and streamlined appointment booking. Successfully integrated complex features like cloud storage and real-time data.",
      icon: <Layers className="w-5 h-5 text-white" />,
      gradient: "from-emerald-600 to-teal-600",
      skills: ["TypeScript", "React Native", "Expo", "MongoDB", "Cloudinary"]
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block relative">
            <Sparkles className="absolute -top-8 -right-8 w-10 h-10 text-blue-600 animate-pulse opacity-20" />
            <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3 block">Professional Roadmap</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
              Work <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mt-8 font-semibold leading-relaxed">
            A strategic timeline of my professional evolution, highlighting key roles, technical leadership, and the impact of my contributions.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 md:left-1/2 md:-ml-px"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Icon Marker */}
                  <div className="absolute left-0 w-8 h-8 rounded-full border-4 border-white bg-blue-600 shadow-sm -translate-x-[15px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 md:w-1/2 px-4">
                    <div className={`p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                      }`}>
                      <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                        }`}>
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-black text-blue-600 uppercase tracking-widest">{exp.company}</span>
                      </div>

                      <h3 className="text-2xl font-black text-gray-900 mb-2">{exp.title}</h3>
                      <div className={`flex items-center gap-2 mb-6 text-gray-500 font-semibold text-sm ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                        }`}>
                        <Calendar className="w-4 h-4" />
                        {exp.year}
                      </div>

                      <p className="text-gray-600 leading-relaxed font-medium mb-6">
                        {exp.description}
                      </p>

                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                        }`}>
                        {exp.skills.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg border border-gray-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty Space for Timeline Alignment */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 lg:mt-32 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden">
              <div className="absolute top-0 right-0 -m-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
              <div className="absolute bottom-0 left-0 -m-20 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>

              <div className="relative z-10 text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-black mb-6 tracking-tight">Impact of Code</h2>
                <p className="text-gray-400 font-semibold max-w-2xl mx-auto">
                  Every line of code written contributes to a larger ecosystem of solutions, driving efficiency and innovation.
                </p>
              </div>

              <div className="relative grid sm:grid-cols-3 gap-8 text-center border-t border-white/10 pt-12">
                {[
                  { label: "Code Commits", value: "2.5k+", color: "text-blue-400" },
                  { label: "Projects Completed", value: "20+", color: "text-purple-400" },
                  { label: "Hours of Coding", value: "1200+", color: "text-emerald-400" },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className={`text-4xl sm:text-5xl font-black ${stat.color} mb-2 tracking-tighter`}>{stat.value}</div>
                    <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
