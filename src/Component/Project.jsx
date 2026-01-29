import React from "react";
import {
  ExternalLink,
  Github,
  Layers,
  Cpu,
  Globe2,
  Sparkles,
  ArrowRight,
  Code2,
  Terminal,
  Smartphone
} from "lucide-react";

const Project = () => {
  const projects = [
    {
      title: "HydroFlow",
      description: "A high-performance water tracking intelligence system designed to optimize hydration through weather-based recommendations and daily goal synchronization.",
      image: "/AquqTrack.png",
      link: "https://hydro-flow-y4rx.vercel.app/",
      gitLink: "#",
      tech: ["React", "Tailwind", "Vite", "Web API"],
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      title: "EasyProfile",
      description: "An advanced profile orchestration platform that enables seamless identity management and dynamic user customization with a high-tier UI/UX focus.",
      image: "/EassyP.png",
      link: "https://easy-profile-ms2l.vercel.app/",
      gitLink: "#",
      tech: ["Next.js", "Firebase", "TypeScript", "Framer"],
      gradient: "from-purple-600 to-indigo-500"
    },
    {
      title: "Ewash",
      description: "A revolutionary mobile-first service booking ecosystem for shop owners, digitizing appointments and operational workflows to eliminate physical constraints.",
      image: "/Ewash.png",
      link: "#",
      gitLink: "#",
      tech: ["React Native", "Expo", "Node.js", "MongoDB"],
      gradient: "from-emerald-600 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block relative">
            <Sparkles className="absolute -top-8 -right-8 w-10 h-10 text-blue-600 animate-pulse opacity-20" />
            <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3 block">Digital Portfolio</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
              Crafted <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Innovations</span>
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mt-8 font-semibold leading-relaxed">
            Exploring the intersection of high-tier architecture and intuitive design. Each project represents a leap in digital engineering.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden bg-gray-50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a
                      href={project.gitLink}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                      title="Source Code"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  {project.tech.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 group-hover:border-blue-100 group-hover:text-blue-600 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-500 font-semibold text-sm leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="pt-6 border-t border-gray-50 mt-auto">
                  <a
                    href={project.link}
                    className="flex items-center justify-between group/btn text-gray-900 font-black text-sm hover:text-blue-600 transition-colors"
                  >
                    <span>Execute Live Site</span>
                    <div className="w-10 h-10 rounded-full bg-gray-50 group-hover/btn:bg-blue-600 group-hover/btn:text-white flex items-center justify-center transition-all">
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Project CTA */}
        <div className="mt-24 lg:mt-32 text-center bg-gray-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -m-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 -m-20 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>

          <h2 className="relative text-white text-3xl sm:text-4xl lg:text-6xl font-black mb-8 tracking-tight">Need a Custom Engine?</h2>
          <p className="relative text-gray-400 text-lg sm:text-xl font-semibold mb-12 max-w-2xl mx-auto leading-relaxed">
            I specialize in architecting complex digital solutions that drive performance and user engagement. Let's build your next breakthrough.
          </p>

          <div className="relative flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:daganajulius5@gmail.com"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Start Consultation
            </a>
            <a
              href="https://github.com/Julius-git-coder"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/10 text-white rounded-2xl font-black hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              View Lab Space
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;