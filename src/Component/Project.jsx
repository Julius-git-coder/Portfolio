import React, { createElement } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  ArrowRight,
  Target,
  Wrench,
  Rocket,
} from "lucide-react";
import { projects } from "../data/projects";
import { eWorldCaseStudy } from "../data/eWorld";

const RenderProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="group relative h-[30rem] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
  >
    <div className="absolute inset-0">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent opacity-90"></div>
    </div>

    <div className="relative h-full p-6 sm:p-8 flex flex-col justify-end z-10">
      <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
        <a
          href={project.link}
          className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
          title="Live Demo"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
        <a
          href={project.gitLink}
          className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
          title="Source Code"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>

      <div className="transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {project.tech.map((skill, i) => (
            <span
              key={`${project.title}-${skill}-${i}`}
              className="px-3 py-1 bg-white/10 backdrop-blur-md text-white/90 rounded-full text-xs font-bold border border-white/20 uppercase tracking-wider"
            >
              {skill}
            </span>
          ))}
        </div>

        {project.type && (
          <span className="inline-block px-3 py-1 mb-2 bg-white/15 backdrop-blur-md text-white rounded-full text-xs font-bold border border-white/20 w-fit">
            {project.type}
          </span>
        )}

        <h3 className="text-3xl font-black text-white mb-3">{project.title}</h3>

        <p className="text-gray-300 font-medium text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>

        <a
          href={project.link}
          className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider group/btn hover:text-blue-400 transition-colors"
        >
          <span>Execute Site</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </motion.div>
);

const Project = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfd] py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
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

        {/* Personal Projects */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-10">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">Personal Work</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2 tracking-tight">
              Personal <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-4"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {projects.filter(p => p.category === "featured").map((project, index) => (
              <RenderProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Client Work */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-10">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.2em]">Professional Work</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2 tracking-tight">
              Client <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-gray-500 font-semibold text-sm mt-2">Companies &amp; commercial projects</p>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full mt-4"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {projects.filter(p => p.category === "client").map((project, index) => (
              <RenderProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mt-20 lg:mt-28"
          aria-labelledby="eworld-case-study-heading"
        >
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.2em]">Flagship deep-dive</span>
            <h2 id="eworld-case-study-heading" className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
              eWorld — problem, approach, outcome
            </h2>
            <p className="text-gray-600 mt-4 font-semibold text-sm sm:text-base leading-relaxed">
              One end-to-end product story: what we solved, how it was built, and what that unlocks next.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { label: "Problem", body: eWorldCaseStudy.problem, icon: Target, accent: "from-rose-500 to-orange-500" },
              { label: "Approach", body: eWorldCaseStudy.approach, icon: Wrench, accent: "from-blue-600 to-indigo-600" },
              { label: "Outcome", body: eWorldCaseStudy.outcome, icon: Rocket, accent: "from-emerald-600 to-teal-600" },
            ].map(({ label, body, icon, accent }) => (
              <div
                key={label}
                className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${accent} text-white mb-5 shadow-lg`}>
                  {createElement(icon, { className: "w-6 h-6", "aria-hidden": true })}
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3 tracking-tight">{label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">{body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 lg:mt-32 text-center bg-gray-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 -m-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 -m-20 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>

          <h2 className="relative text-white text-3xl sm:text-4xl lg:text-6xl font-black mb-8 tracking-tight">Need a Custom Engine?</h2>
          <p className="relative text-gray-400 text-lg sm:text-xl font-semibold mb-12 max-w-2xl mx-auto leading-relaxed">
            I specialize in architecting complex digital solutions that drive performance and user engagement. Let&apos;s build your next breakthrough.
          </p>

          <div className="relative flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:daganajulius5@gmail.com"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all duration-300 whitespace-nowrap"
            >
              Start Consultation
            </a>
            <a
              href="https://github.com/Julius-git-coder"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/10 text-white rounded-2xl font-black hover:bg-white hover:text-gray-900 transition-all duration-300 whitespace-nowrap"
            >
              <Github className="w-5 h-5" />
              View Lab Space
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Project;
