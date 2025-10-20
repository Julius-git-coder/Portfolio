// import React, { useEffect, useRef, useState } from "react";

// const FadeInSection = ({ children, delay = 0 }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [timeoutId, setTimeoutId] = useState(null);
//   const ref = useRef();

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (timeoutId) {
//           clearTimeout(timeoutId);
//         }

//         if (entry.isIntersecting) {
//           const newTimeoutId = setTimeout(() => {
//             setIsVisible(true);
//             setTimeoutId(null);
//           }, delay);
//           setTimeoutId(newTimeoutId);
//         } else {
//           setIsVisible(false);
//           setTimeoutId(null);
//         }
//       },
//       {
//         threshold: 0.3,
//         rootMargin: "50px 0px -50px 0px",
//       }
//     );

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current);
//       }
//       if (timeoutId) {
//         clearTimeout(timeoutId);
//       }
//     };
//   }, [delay, timeoutId]);

//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-800 ease-out transform ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
//       }`}
//     >
//       {children}
//     </div>
//   );
// };

// const Project = () => {
//   // Array of project data with placeholder images for demonstration
//   const projects = [
//     {
//       title: "HydroFlow",
//       description:
//         "A water tracking app to help users stay hydrated and meet daily goals.",
//       image:
//         "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=800&h=600&fit=crop",
//       link: "https://hydroflow-app.netlify.app",
//     },
//     {
//       title: "EasyProfile",
//       description:
//         "A profile management app for creating and customizing user profiles.",
//       image:
//         "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
//       link: "https://easyprofile-app.netlify.app",
//     },
//     {
//       title: "TaskMaster",
//       description:
//         "A task management tool to organize and prioritize your daily tasks.",
//       image:
//         "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
//       link: "https://taskmaster-app.netlify.app",
//     },
//     {
//       title: "ShopEasy",
//       description:
//         "An e-commerce platform for seamless online shopping experiences.",
//       image:
//         "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
//       link: "https://shopeasy-app.netlify.app",
//     },
//     {
//       title: "FitTrack",
//       description: "A fitness tracking app to monitor workouts and progress.",
//       image:
//         "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
//       link: "https://fittrack-app.netlify.app",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <FadeInSection delay={0}>
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
//               My Projects
//             </h2>
//             <p className="text-gray-600 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
//               Explore some of my recent work, showcasing full-stack development
//               with modern technologies.
//             </p>
//           </div>
//         </FadeInSection>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {projects.slice(0, 5).map((project, index) => (
//             <FadeInSection key={index} delay={index * 150}>
//               <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
//                 <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
//                   <img
//                     src={project.image}
//                     alt={`${project.title} project screenshot`}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     loading="lazy"
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                       e.target.nextSibling.style.display = "flex";
//                     }}
//                   />
//                   {/* Fallback placeholder */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 hidden items-center justify-center">
//                     <div className="text-white text-center">
//                       <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-lg flex items-center justify-center">
//                         <svg
//                           className="w-8 h-8"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </div>
//                       <p className="text-sm font-medium">{project.title}</p>
//                     </div>
//                   </div>
//                   {/* Overlay gradient for better text readability */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <div className="p-4 sm:p-6 flex flex-col flex-grow">
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
//                     {project.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm sm:text-base mb-4 flex-grow leading-relaxed">
//                     {project.description}
//                   </p>
//                   <a
//                     href={project.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center bg-blue-600 text-white px-4 sm:px-6 py-2.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 text-sm sm:text-base font-medium transition-all duration-200 mt-auto group-hover:shadow-md transform group-hover:-translate-y-0.5"
//                   >
//                     View Live Demo
//                     <svg
//                       className="w-4 h-4 ml-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//                       />
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </FadeInSection>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Project;
import React, { useEffect, useRef, useState } from "react";

const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        if (entry.isIntersecting) {
          const newTimeoutId = setTimeout(() => {
            setIsVisible(true);
            setTimeoutId(null);
          }, delay);
          setTimeoutId(newTimeoutId);
        } else {
          setIsVisible(false);
          setTimeoutId(null);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "50px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay, timeoutId]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </div>
  );
};

const Project = () => {
  // Array of project data with your images
  const projects = [
    {
      title: "HydroFlow",
      description:
        "A water tracking app to help users stay hydrated and meet daily goals.",
      image: "/AquqTrack.png",
      link: "https://hydroflow-app.netlify.app",
    },
    {
      title: "EasyProfile",
      description:
        "A profile management app for creating and customizing user profiles.",
      image: "/EassyP.png",
      link: "https://easyprofile-app.netlify.app",
    },
    {
      title: "TaskMaster",
      description:
        "A task management tool to organize and prioritize your daily tasks.",
      image: "/AquqTrack.png",
      link: "https://taskmaster-app.netlify.app",
    },
    {
      title: "ShopEasy",
      description:
        "An e-commerce platform for seamless online shopping experiences.",
      image: "/AquqTrack.png",
      link: "https://shopeasy-app.netlify.app",
    },
    {
      title: "FitTrack",
      description: "A fitness tracking app to monitor workouts and progress.",
      image: "/AquqTrack.png",
      link: "https://fittrack-app.netlify.app",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection delay={0}>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              My Projects
            </h2>
            <p className="text-gray-600 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
              Explore some of my recent work, showcasing full-stack development
              with modern technologies.
            </p>
          </div>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.slice(0, 5).map((project, index) => (
            <FadeInSection key={index} delay={index * 150}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                <div className="relative w-full h-80 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300 max-w-full"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 hidden items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">{project.title}</p>
                    </div>
                  </div>
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2.5 rounded-lg hover:bg-blue-500 active:bg-blue-500 text-sm sm:text-base font-medium transition-all duration-200 mt-auto group-hover:shadow-md transform group-hover:-translate-y-0.5"
                  >
                    View Live Demo
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;