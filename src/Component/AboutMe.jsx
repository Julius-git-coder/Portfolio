import React, { useState } from "react";
import { GiJourney } from "react-icons/gi";
import { RxValue } from "react-icons/rx";
import { FaCcDiscover } from "react-icons/fa6";
import { IoLogoDesignernews } from "react-icons/io5";
import { CgGym } from "react-icons/cg";

const AboutMe = () => {
  const [activeTab, setActiveTab] = useState("story");

  const personalInfo = [
    { label: "Name", value: "Julius Dagana" },
    { label: "Location", value: "Accra, Ghana" },
    { label: "Experience", value: "(0-1) Year" },
    { label: "Specialization", value: "Full-Stack Development" },
    { label: "Education", value: "Software Engineering/AI" },
    { label: "Institute", value: "Codetrain Africa" },
    { label: "Languages", value: "English, Local Languages" },
  ];

  // Function to handle CV download
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/CV111.pdf";
    link.download = "Julius_Dagana_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const interests = [
    {
      icon: "💻",
      title: "Coding",
      description:
        "Building innovative web applications and exploring new technologies",
    },
    {
      icon: <IoLogoDesignernews />,
      title: "Design",
      description: "Creating beautiful and intuitive user interfaces",
    },
    {
      icon: <img src="/code.png" alt="Code Icon" className="w-6 h-6" />,
      title: "Learning",
      description: "Continuously expanding knowledge in tech and beyond",
    },
    {
      icon: "🌍",
      title: "Technology",
      description: "Following latest trends in web development and AI",
    },
    {
      icon: "🎵",
      title: "Music",
      description: "Enjoying various genres and discovering new artists",
    },
    {
      icon: <CgGym />,
      title: "Fitness",
      description: "Keeping fit and maintaining a healthy lifestyle",
    },
  ];

  const values = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Innovation",
      description:
        "Always seeking creative solutions and pushing boundaries in web development",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Quality",
      description:
        "Committed to writing clean, maintainable code and delivering excellence",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Collaboration",
      description:
        "Believing in the power of teamwork and effective communication",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Growth",
      description: "Embracing continuous learning and personal development",
    },
  ];

  const timeline = [
  {
  year: "2024",
  title: "Full-Stack Developer Journey",
  description:
    "Started focusing on full-stack development, mastering React, Node.js, and modern web technologies",
  icon: <img src="/code.png" alt="Code Icon" className="w-6 h-6" />,
},
    {
      year: "2024",
      title: "Web Development Foundation",
      description:
        "Built solid foundation in HTML, CSS, JavaScript, and began exploring frontend frameworks",
      icon: "💻",
    },
    {
      year: "2022",
      title: "Programming Discovery",
      description:
        "Discovered passion for programming and started learning the fundamentals of software engineering",
      icon: <FaCcDiscover />,
    },
  ];

  const tabContent = {
    story: (
      <div className="space-y-6">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed text-lg">
            <span className="font-bold">Hello</span>! I'm a passionate{" "}
            <span className="underline font-bold">full-stack developer</span> based in
            Accra, Ghana, with almost a year of experience in creating modern,
            responsive web applications. My journey into programming began with
            curiosity and has evolved into a deep passion for building solutions
            that make a difference.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            I specialize in the <span className="font-bold">MERN</span> stack
            (<span className="font-bold">MongoDB, Express.js, React, Node.js</span>) and have expertise in
           <span className="font-bold"> Firebase, Tailwind CSS,</span> and modern deployment platforms like
           <span className="font-bold"> Netlify</span>. I love the entire development process, from conceptualizing
            ideas to deploying <span className="font-bold">production-ready applications</span>.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            When I'm not coding, you'll find me exploring new technologies,
            contributing to open-source projects, or enjoying music and sports.
            I believe in continuous learning and am always excited to take on
            new challenges that push me to grow as a <span className="font-bold">developer</span>.
          </p>
        </div>
      </div>
    ),
    journey: (
      <div className="space-y-8">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-50 text-2xl rounded-full flex-shrink-0">
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-600 font-bold text-lg">
                  {item.year}
                </span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
    values: (
      <div className="grid md:grid-cols-2 gap-6">
        {values.map((value, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-lg mr-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">Me</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Get to know the person behind the code. Learn about my journey,
            values, and what drives me to create exceptional web experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 sticky top-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                <img
                  src="/Codetrain.jpg"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Julius Dagana
              </h2>
              <p className="text-blue-600 font-medium mb-4">
                Full-Stack Developer
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Passionate about creating innovative web solutions and bringing
                ideas to life through code.
              </p>

              {/* Personal Info */}
              <div className="space-y-3 text-left">
                {personalInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-600 font-medium">
                      {info.label}:
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <button
                  onClick={handleDownloadCV}
                  className="w-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Download Resume
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100">
              {[
                { id: "story", label: "My Story", icon: "📖" },
                { id: "journey", label: "Journey", icon: <GiJourney /> },
                { id: "values", label: "Values", icon: <RxValue /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 min-h-[400px]">
              {tabContent[activeTab]}
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            My <span className="text-blue-600">Interests</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {interest.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {interest.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-6">Fun Facts About Me</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Projects Built</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">13+</div>
              <div className="text-blue-100">Technologies</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Learning Mode</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">∞</div>
              <div className="text-blue-100">Cups of Coffee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
