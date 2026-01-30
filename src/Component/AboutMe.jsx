import React, { useState } from "react";
import {
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe2,
  Download,
  Code2,
  Palette,
  BookOpen,
  Cpu,
  Music,
  Dumbbell,
  Lightbulb,
  ShieldCheck,
  Users,
  LineChart,
  Calendar,
  ChevronRight
} from "lucide-react";

const AboutMe = () => {
  const [activeTab, setActiveTab] = useState("story");

  const personalInfo = [
    { label: "Name", value: "Julius Dagana", icon: <User className="w-4 h-4" /> },
    { label: "Location", value: "Accra, Ghana", icon: <MapPin className="w-4 h-4" /> },
    { label: "Experience", value: "1+ Year", icon: <Calendar className="w-4 h-4" /> },
    { label: "Specialization", value: "Full-Stack Development", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Education", value: "Software Engineering/AI", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Institute", value: "Codetrain Africa", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Languages", value: "English, Local Languages", icon: <Globe2 className="w-4 h-4" /> },
  ];

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Julius_Dagana_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const interests = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Coding",
      description: "Building innovative web applications and exploring new technologies",
      color: "blue"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Design",
      description: "Creating beautiful and intuitive user interfaces",
      color: "purple"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Learning",
      description: "Continuously expanding knowledge in tech and beyond",
      color: "emerald"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Technology",
      description: "Following latest trends in web development and AI",
      color: "indigo"
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Music",
      description: "Enjoying various genres and discovering new artists",
      color: "pink"
    },
    {
      icon: <Dumbbell className="w-6 h-6" />,
      title: "Fitness",
      description: "Keeping fit and maintaining a healthy lifestyle",
      color: "orange"
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Always seeking creative solutions and pushing boundaries in web development",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Quality",
      description: "Committed to writing clean, maintainable code and delivering excellence",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Believing in the power of teamwork and effective communication",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Growth",
      description: "Embracing continuous learning and personal development",
      gradient: "from-emerald-500 to-teal-500"
    },
  ];

  const timeline = [
    {
      year: "2024",
      title: "Full-Stack Developer Journey",
      description: "Started focusing on full-stack development, mastering React, Node.js, and modern web technologies",
      icon: <Code2 className="w-5 h-5 text-blue-600" />,
    },
    {
      year: "2024",
      title: "Web Development Foundation",
      description: "Built solid foundation in HTML, CSS, JavaScript, and began exploring frontend frameworks",
      icon: <Globe2 className="w-5 h-5 text-purple-600" />,
    },
    {
      year: "2023",
      title: "Programming Discovery",
      description: "Discovered passion for programming and started learning the fundamentals of software engineering",
      icon: <Lightbulb className="w-5 h-5 text-amber-600" />,
    },
  ];

  const tabContent = {
    story: (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Hello!</span> I'm a passionate <span className="text-gray-900 font-extrabold uppercase tracking-tight">full-stack developer</span> based in Accra, Ghana. My journey into programming began with simple curiosity and has evolved into a dedicated mission to build digital experiences that matter.
          </p>
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 mb-6">
            <p className="text-gray-700 leading-relaxed font-semibold italic">
              "I specialize in the MERN stack—mastering the interplay between MongoDB, Express.js, React, and Node.js to create seamless, performance-driven applications."
            </p>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            I thrive at the intersection of <span className="font-bold text-gray-900">logic and creativity</span>. Whether it's architecting a robust backend with Node.js or crafting pixel-perfect interfaces with Tailwind CSS, I approach every project with a commitment to clean code and exceptional user experience.
          </p>
        </div>
      </div>
    ),
    journey: (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {timeline.map((item, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-8 last:mb-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-50 text-blue-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {item.icon}
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-600 font-extrabold text-lg">{item.year}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed font-semibold text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    values: (
      <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {values.map((value, index) => (
          <div
            key={index}
            className="group relative h-full"
          >
            <div className={`absolute -inset-1 bg-gradient-to-r ${value.gradient} rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500`}></div>
            <div className="relative h-full bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br ${value.gradient} text-white rounded-2xl shadow-lg mr-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{value.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-semibold">{value.description}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3 block">My Identity</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
              About <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mt-8 font-semibold leading-relaxed">
            A deep dive into the person behind the technology. Exploring the journey, the core values, and the passion that fuels my code.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Profile Card Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition duration-700"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 border border-white text-center">
                <div className="relative w-40 h-40 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full animate-spin-slow opacity-20"></div>
                  <div className="relative w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden">
                    <img
                      src="/Codetrain.jpg"
                      alt="Julius Dagana"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Julius Dagana</h2>
                <p className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-8">
                  Full-Stack Developer
                </p>

                {/* Info List */}
                <div className="space-y-4 text-left mb-10">
                  {personalInfo.map((info, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3 text-gray-500">
                        {info.icon}
                        <span className="text-sm font-bold">{info.label}</span>
                      </div>
                      <span className="text-sm font-black text-gray-900 text-right">{info.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleDownloadCV}
                  className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Download className="relative w-5 h-5" />
                  <span className="relative">Download Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Tab Navigation */}
            <div className="flex p-1.5 bg-gray-100 rounded-[2rem] shadow-inner items-center">
              {[
                { id: "story", label: "Identity", icon: <User className="w-4 h-4" /> },
                { id: "journey", label: "Journey", icon: <LineChart className="w-4 h-4" /> },
                { id: "values", label: "Essence", icon: <ShieldCheck className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[1.75rem] font-black text-sm uppercase tracking-wider transition-all duration-300 ${activeTab === tab.id
                    ? "bg-white text-gray-900 shadow-xl scale-100"
                    : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                    } whitespace-nowrap`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Display Area */}
            <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-50 min-h-[450px]">
              {tabContent[activeTab]}
            </div>

            {/* Interests Section */}
            <div>
              <div className="flex items-center gap-6 mb-10">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Passions & Interests</h2>
                <div className="h-px bg-gray-100 flex-1"></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 group"
                  >
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
                      {interest.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{interest.title}</h3>
                    <p className="text-gray-500 leading-relaxed font-semibold text-sm">
                      {interest.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Fun Facts */}
        <div className="mt-20 lg:mt-32 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden">
            <div className="absolute top-0 right-0 -m-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 -m-20 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>

            <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-center text-center">
              {[
                { value: "6+", label: "Strong Projects  Launched", color: "text-blue-400" },
                { value: "18+", label: "Mastered Technologies", color: "text-purple-400" },
                { value: "24/7", label: "Agile Learning", color: "text-amber-400" },
                { value: "∞", label: "Cups of Passion", color: "text-pink-400" },
              ].map((fact, index) => (
                <div key={index} className="space-y-3">
                  <div className={`text-5xl lg:text-7xl font-black ${fact.color} tracking-tighter`}>{fact.value}</div>
                  <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
