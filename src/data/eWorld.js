/**
 * Single source of truth for eWorld copy used on Home, Projects, and Experience.
 */

export const eWorldProject = {
  title: "eWorld",
  image: "/Ewash.png",
  link: "#",
  gitLink: "https://github.com/Julius-git-coder/Ewash-On-Back.git",
  gradient: "from-emerald-600 to-teal-500",
  homeSummaryClient:
    "Shop and customer booking with maps and live Socket.io updates—React Native (Expo) on the client, Express on the server.",
  homeSummaryApi:
    "MongoDB, Redis, JWT, hardened middleware, ImageKit, Docker, GitLab CI/CD, and Sentry for production monitoring. Tests: Jest/Maestro/Sentry on mobile; Jest/Supertest on the API.",
  homeTechMobile: [
    "React Native",
    "Expo",
    "TypeScript",
    "Navigation · maps · gestures",
    "TanStack Query · Socket.io",
    "Jest · Maestro · Sentry",
    "i18n · Google Sign-in",
  ],
  homeTechBackend: [
    "Node.js · Express",
    "MongoDB · Mongoose",
    "Redis · Socket.io",
    "JWT · bcrypt · security stack",
    "Cron · Pino · email · SMS",
    "ImageKit · Multer",
    "Jest · Supertest · memory DB",
    "Docker",
    "GitLab · CI/CD",
    "Sentry",
  ],
  projectDescription:
    "React Native (Expo) booking app with maps and Socket.io. eWorld API: Express, MongoDB, Redis, JWT, hardened middleware, ImageKit, GitLab CI/CD, cron/email/SMS, Docker—tested with Jest, Supertest, Maestro, and Sentry.",
  projectTech: [
    "React Native",
    "Expo",
    "TypeScript",
    "TanStack Query",
    "React Navigation",
    "Socket.io",
    "Node.js",
    "Express",
    "MongoDB",
    "Redis",
    "Jest",
    "Maestro",
    "Docker",
    "GitLab",
    "Sentry",
  ],
};

export const eWorldCaseStudy = {
  problem:
    "Shop owners and customers needed one reliable flow for bookings—maps, availability, and live updates—without fragile ad-hoc messaging.",
  approach:
    "Built a React Native (Expo) client with TanStack Query and Socket.io, paired with an Express API on MongoDB and Redis, JWT-hardened routes, GitLab CI/CD, Dockerized environments, and Sentry for production visibility—tests via Jest, Supertest, and Maestro.",
  outcome:
    "A reproducible mobile + API foundation with automated tests and observability so features can ship safely as usage grows.",
};

export const eWorldExperience = {
  year: "2024 - Present",
  title: "eWorld — Mobile platform & API",
  company: "Lead Engineer · Personal product",
  description:
    "End-to-end eWorld: React Native (Expo) with maps and live Socket.io, TanStack Query, Jest/Maestro/Sentry, i18n, Google Sign-in. eWorld API: Express, MongoDB, Redis, JWT, security middleware, ImageKit, GitLab CI/CD, Sentry observability, Jest/Supertest, Docker.",
  gradient: "from-emerald-600 to-teal-600",
  skills: [
    "React Native",
    "Expo",
    "TypeScript",
    "TanStack Query",
    "Socket.io",
    "Jest",
    "Maestro",
    "Sentry",
    "GitLab",
    "Express",
    "MongoDB",
    "Redis",
    "Docker",
    "Security stack",
  ],
};
