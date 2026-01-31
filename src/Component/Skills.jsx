
import React from "react";
import {
  Code2,
  Terminal,
  Wrench,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Cloud,
  Database,
  Smartphone,
  Layout,
  GitBranch,
  Rocket,
  ChevronRight
} from "lucide-react";

const Skills = ({ onSwitchToContact, onSwitchToProjects }) => {
  // Complete skills data
  const allSkills = [
    {
      name: "React",
      icon: "/React.png",
      level: "Expert",
      description: "Building dynamic user interfaces with hooks, context, and advanced patterns",
      experience: "1+ year",
      projects: ["HydroFlow", "EasyProfile", "Portfolio"],
      color: "blue"
    },
    {
      name: "JavaScript",
      icon: "/Javascript.png",
      level: "Expert",
      description: "ES6+, async programming, and modern JavaScript patterns",
      experience: "1+ year",
      projects: ["All Projects"],
      color: "yellow"
    },
    {
      name: "HTML",
      icon: "/Html.png",
      level: "Expert",
      description: "Semantic markup, accessibility, and modern HTML5 features",
      experience: "1+ year",
      projects: ["All Web Projects"],
      color: "orange"
    },
    {
      name: "CSS",
      icon: "/CSS.png",
      level: "Expert",
      description: "Flexbox, Grid, animations, and responsive design principles",
      experience: "1+ year",
      projects: ["Portfolio", "Custom Styling"],
      color: "blue"
    },
    {
      name: "Tailwind CSS",
      icon: "/Tailwind.png",
      level: "Expert",
      description: "Utility-first CSS framework for rapid UI development",
      experience: "1+ year",
      projects: ["HydroFlow", "EasyProfile", "Portfolio"],
      color: "teal"
    },
    {
      name: "Node.js",
      icon: "/Node.png",
      level: "Expert",
      description: "Server-side JavaScript runtime for building scalable applications",
      experience: "1+ year",
      projects: ["Backend APIs", "Server Projects"],
      color: "green"
    },
    {
      name: "Express.js",
      icon: "/Express.png",
      level: "Expert",
      description: "Fast, unopinionated web framework for Node.js applications",
      experience: "1+ year",
      projects: ["API Development", "Backend Services"],
      color: "gray"
    },
    {
      name: "Python",
      icon: "/Python.png",
      level: "Intermediate",
      description: "General-purpose programming language for backend, scripting, and data processing",
      experience: "1+ year",
      projects: ["Backend Scripts", "APIs", "Automation"],
      color: "blue"
    },
    {
      name: "Render",
      icon: "/Render.png",
      level: "Expert",
      description: "Cloud platform for deploying and scaling web services and APIs",
      experience: "1+ year",
      projects: ["API Deployment", "Backend Services"],
      color: "indigo"
    },
    {
      name: "MongoDB",
      icon: "/Mogo.png",
      level: "Expert",
      description: "NoSQL database for flexible, scalable data storage solutions",
      experience: "1+ year",
      projects: ["Database Design", "Data Management"],
      color: "green"
    },
    {
      name: "Firebase",
      icon: "/Firebase.png",
      level: "Expert",
      description: "Backend-as-a-Service platform for authentication and real-time data",
      experience: "1+ year",
      projects: ["HydroFlow", "EasyProfile", "Real-time Apps"],
      color: "orange"
    },
    {
      name: "Git",
      icon: "/Git.png",
      level: "Expert",
      description: "Version control system for tracking changes and collaboration",
      experience: "1+ year",
      projects: ["All Projects"],
      color: "red"
    },
    {
      name: "Material-UI",
      icon: "/MUI.png",
      level: "Intermediate",
      description: "React component library implementing Google's Material Design",
      experience: "1+ year",
      projects: ["Component Libraries", "UI Development"],
      color: "blue"
    },
    {
      name: "Netlify",
      icon: "/Netli.png",
      level: "Expert",
      description: "Platform for deploying and hosting modern web applications",
      experience: "1+ year",
      projects: ["All Deployed Projects"],
      color: "cyan"
    },
    {
      name: "Cloudinary",
      icon: "/Cloudinary.png",
      level: "Expert",
      description: "Cloud-based image and video management platform",
      experience: "1+ year",
      projects: ["EasyProfile"],
      color: "blue"
    },
    {
      name: "Next.js",
      icon: "/Nextjs.png",
      level: "Expert",
      description: "React framework for production with SSR and static generation",
      experience: "1+ year",
      projects: ["Web Applications"],
      color: "gray"
    },
    {
      name: "TypeScript",
      icon: "/Typescript Logo.jpeg",
      level: "Expert",
      description: "Typed superset of JavaScript for scalable applications",
      experience: "1+ year",
      projects: ["Ewash", "Type-Safe Apps"],
      color: "blue"
    },
    {
      name: "React Native",
      icon: "/ReactNative.png",
      level: "Expert",
      description: "Cross-platform mobile app development framework",
      experience: "1+ year",
      projects: ["Ewash", "Mobile Apps"],
      color: "cyan"
    },
    {
      name: "Expo Go",
      icon: "/Expo_Go.png",
      level: "Expert",
      description: "Development platform for React Native applications",
      experience: "1+ year",
      projects: ["Ewash", "Mobile Development"],
      color: "purple"
    },
    {
      name: "Vercel",
      icon: "/Vercel Logo.jpeg",
      level: "Expert",
      description: "Frontend deployment and hosting platform",
      experience: "1+ year",
      projects: ["HydroFlow", "Ewash"],
      color: "black"
    },
  ];

  const categories = [
    {
      id: "frontend",
      name: "Frontend Development",
      icon: <Layout className="w-6 h-6" />,
      skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Material-UI", "React Native", "Expo Go", "Vercel"],
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      id: "backend",
      name: "Backend & Systems",
      icon: <Database className="w-6 h-6" />,
      skills: ["Node.js", "Express.js", "MongoDB", "Firebase", "Python"],
      gradient: "from-purple-600 to-indigo-500"
    },
    {
      id: "devops",
      name: "Tools & Deployment",
      icon: <Cloud className="w-6 h-6" />,
      skills: ["Git", "Netlify", "Cloudinary", "Render"],
      gradient: "from-emerald-600 to-teal-500"
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case "Expert": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Advanced": return "text-blue-600 bg-blue-50 border-blue-100";
      case "Intermediate": return "text-amber-600 bg-amber-50 border-amber-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3 block">Technical Arsenal</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
              Mastered <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Tech Stack</span>
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mt-8 font-semibold leading-relaxed">
            A comprehensive landscape of my technical capabilities, ranging from high-performance frontend engineering to robust backend architecture.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 lg:mb-32">
          {[
            { label: "Technologies", value: "18+", icon: <Cpu className="w-5 h-5 text-blue-600" />, color: "blue" },
            { label: "Expert Level", value: "18+", icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, color: "emerald" },
            { label: "Projects Built", value: "20+", icon: <Rocket className="w-5 h-5 text-purple-600" />, color: "purple" },
            { label: "Focus Areas", value: "3", icon: <Layout className="w-5 h-5 text-amber-600" />, color: "amber" },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-center group">
              <div className="inline-flex p-3 bg-gray-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1 tracking-tighter">{stat.value}</div>
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Categorized Skills */}
        <div className="space-y-24 lg:space-y-32">
          {categories.map((category) => (
            <div key={category.id} className="relative">
              <div className="flex items-center gap-6 mb-12">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-lg shadow-blue-500/10`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">{category.name}</h2>
                  <p className="text-gray-500 font-semibold">{category.skills.length} Advanced Tools</p>
                </div>
                <div className="h-px bg-gray-100 flex-1 hidden md:block"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allSkills
                  .filter((skill) => category.skills.includes(skill.name))
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="group relative bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 -m-4 w-24 h-24 bg-gray-50 rounded-full opacity-50 transition-all duration-500 group-hover:scale-150 group-hover:bg-blue-50"></div>

                      <div className="relative flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-white rounded-2xl shadow-inner border border-gray-50 flex items-center justify-center p-3 group-hover:shadow-blue-500/20 transition-all duration-300">
                            <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{skill.name}</h3>
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border mt-1 ${getLevelColor(skill.level)}`}>
                              {skill.level}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="relative text-gray-500 text-sm font-semibold leading-relaxed mb-8 min-h-[40px]">
                        {skill.description}
                      </p>

                      <div className="relative space-y-4 pt-6 border-t border-gray-50">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400 font-bold uppercase tracking-widest">Experience</span>
                          <span className="text-gray-900 font-black">{skill.experience}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skill.projects.map((proj, i) => (
                            <span key={i} className="text-[10px] bg-gray-50 text-gray-500 px-2.5 py-1 rounded-lg font-bold">
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic CTA */}
        <div className="mt-24 lg:mt-32 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden text-center">
            <div className="absolute top-0 left-0 -m-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
            <div className="absolute bottom-0 right-0 -m-20 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-black mb-6 tracking-tight">Need a Customized Solution?</h2>
            <p className="relative text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-semibold">
              Leveraging this stack to bring high-performance applications to life. Your vision, my expertise, extraordinary results.
            </p>

            <div className="relative flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={onSwitchToProjects}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-2xl font-black transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-xl whitespace-nowrap"
              >
                <span>View My Portfolio</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onSwitchToContact}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 text-white rounded-2xl font-black border border-white/20 transition-all duration-300 hover:bg-white/20 active:scale-95 whitespace-nowrap"
              >
                <span>Consultation</span>
                <Terminal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;