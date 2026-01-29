import React from "react";

const Experience = () => {
  const experiences = [
    {
      year: "2024 - Present",
      title: "Full-Stack Developer",
      company: "Codetrain Africa., Accra, Ghana",
      description:
        "Developed and maintained web applications using the MERN stack (MongoDB, Express.js, React, Node.js). Collaborated with cross-functional teams to deliver scalable solutions, integrating Firebase and Tailwind CSS for enhanced functionality and design.",
      icon: "💻",
    },
    {
      year: "2025 - present",
      title: "Junior Web Developer",
      company: "Jnard IT Consultancy, Accra, Ghana",
      description:
        "Built responsive front-end interfaces with React and Tailwind CSS, focusing on user experience and performance optimization. Contributed to backend APIs using Node.js and deployed projects on Netlify.",
      icon: <img src="/code.png" />,
    },
    {
      year: "2024",
      title: "Ewash - Mobile Service Booking Platform",
      company: "Personal Project",
      description:
        "A mobile application designed for shop owners to easily showcase their services online. Ewash allows users to post their shops, make services available on the internet, and let customers book appointments seamlessly. This helps reduce time wastage, stress, long queues, and other operational challenges. Technologies Used: TypeScript, HTML, CSS, MongoDB, Express, Tailwind CSS, Cloudinary, React Native, Expo Go",
      icon: <img src="/Ewash.png" className="w-full h-full object-cover rounded-lg" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-blue-600">Experience</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            A journey through my professional roles, showcasing my expertise in
            full-stack development and passion for creating impactful solutions.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 text-2xl rounded-full flex-shrink-0">
                  {exp.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-blue-600 font-bold text-lg">
                      {exp.year}
                    </span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-gray-700 font-medium mb-2">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
