import { eWorldProject } from "./eWorld";

/** Portfolio projects grid (Projects page + shared metadata) */
export const projects = [
  {
    title: "HydroFlow",
    description:
      "A high-performance water tracking intelligence system designed to optimize hydration through weather-based recommendations and daily goal synchronization.",
    image: "/AquqTrack.png",
    link: "https://hydro-flow-y4rx.vercel.app/",
    gitLink: "https://github.com/Julius-git-coder/hydroFlow.git",
    tech: ["React", "Tailwind", "Vite", "Web API", "GitLab"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "EasyProfile",
    description:
      "An advanced profile orchestration platform that enables seamless identity management and dynamic user customization with a high-tier UI/UX focus.",
    image: "/EassyP.png",
    link: "https://easy-profile-ms2l.vercel.app/",
    gitLink: "https://github.com/Julius-git-coder/EasyProfile.git",
    tech: ["Next.js", "Firebase", "TypeScript", "Framer", "GitLab"],
    gradient: "from-purple-600 to-indigo-500",
  },
  {
    title: eWorldProject.title,
    description: eWorldProject.projectDescription,
    image: eWorldProject.image,
    link: eWorldProject.link,
    gitLink: eWorldProject.gitLink,
    tech: eWorldProject.projectTech,
    gradient: eWorldProject.gradient,
  },
  {
    title: "Grade-A",
    description:
      "A comprehensive educational management system features an administrator dashboard for tracking students, assignments, and roadmaps.",
    image: "/Grade.png",
    link: "https://grade-a-s1sm.vercel.app/",
    gitLink: "https://github.com/Julius-git-coder/Grade-A-",
    tech: ["React", "Tailwind", "Vercel", "GitLab"],
    gradient: "from-orange-600 to-red-500",
  },
];
