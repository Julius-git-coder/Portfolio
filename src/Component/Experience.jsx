import React from "react";
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
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* Dot/Icon */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-2xl border-4 border-white bg-gradient-to-br ${exp.gradient} shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transform group-hover:scale-110 transition-transform duration-300`}>
                  {exp.icon}
                </div>

                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3.5rem)] p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 -m-12 group-hover:scale-110 transition-transform duration-500">
                    <Briefcase className="w-32 h-32 text-gray-900" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4 relative">
                    <span className={`font-black text-xs uppercase tracking-widest bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}>{exp.year}</span>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase">Accra, Ghana</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-2 relative group-hover:text-blue-600 transition-colors">{exp.title}</h3>
                  <div className="flex items-center gap-2 mb-6 relative">
                    <div className={`w-6 h-0.5 bg-gradient-to-r ${exp.gradient}`}></div>
                    <p className="text-gray-500 font-bold text-sm tracking-tight">{exp.company}</p>
                  </div>

                  <p className="text-gray-500 font-semibold text-sm leading-relaxed mb-8 relative">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 relative">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold border border-gray-100 hover:border-blue-200 hover:bg-white hover:text-blue-600 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Highlight */}
        <div className="mt-24 lg:mt-32 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden text-center">
            <div className="absolute top-0 right-0 -m-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 -m-20 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-black mb-12 tracking-tight">The Impact of Code</h2>
            <div className="relative grid sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
              {[
                { label: "Code Commits", value: "2,200+", icon: <Code2 className="w-8 h-8 text-blue-400" /> },
                { label: "Production Apps", value: "6", icon: <Rocket className="w-8 h-8 text-purple-400" /> },
                { label: "Hours of Focus", value: "∞", icon: <Calendar className="w-8 h-8 text-amber-400" /> },
              ].map((stat, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-center">{stat.icon}</div>
                  <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
                  <div className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">{stat.label}</div>
                </div>
              ))}
            </div>

            <p className="relative text-gray-400 text-lg mt-16 max-w-2xl mx-auto font-semibold">
              Leveraging code to solve real-world problems. Currently open to new technological frontiers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
