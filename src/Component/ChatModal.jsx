import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Lock, Sparkles } from "lucide-react";

// ============================================================
// RAG-POWERED CHAT BOT — Trained on ALL Portfolio Data
// Retrieval-Augmented Generation Engine
// ============================================================

// ---- STOP WORDS ----
const STOP_WORDS = new Set(['a','an','the','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','shall','can','need','dare','ought','used','to','of','in','for','on','with','at','by','from','as','into','through','during','before','after','above','below','between','out','off','over','under','again','further','then','once','here','there','when','where','why','how','all','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','just','because','but','and','or','if','while','about','what','which','who','whom','this','that','these','those','i','me','my','we','our','you','your','he','him','his','she','her','it','its','they','them','their','am','also','like','tell','me','please','can','you','help','want','know','get','got','going','go','one','two','much','many','any','every','make','made','see','seen','take','took','come','came','think','thought','look','use','used','find','found','give','gave','tell','told','work','work','call','called','try','tried','ask','asked','need','needed','feel','felt','become','became','keep','kept','let','begin','began','show','showed','hear','heard','play','played','run','ran','move','moved','live','lived','believe','happen','happened','write','wrote','provide','provided','sit','sat','stand','stood','lose','lost','pay','paid','meet','met','include','included','continue','continued','set','learn','learned','change','changed','lead','led','understand','understood','watch','watched','follow','followed','stop','stopped','create','created','speak','spoke','read','allow','allowed','add','added','spend','spent','grow','grew','open','opened','walk','walked','win','won','offer','offered','remember','remembered','love','considered','appear','appeared','buy','bought','send','sent','expect','expected','build','built','stay','stayed','fall','fell','cut','reach','received','die','died','put','name','called','call','great','really','something','everything','nothing','everything','anything','even','new','long','little','big','high','different','small','large','next','early','young','important','few','public','bad','good','able','sure','right','left','hand','eye','head','face','way','thing','things','people','time','day','days','year','years','man','men','woman','women','child','children','water','room','house','school','state','family','student','students','group','group','part','place','case','week','company','system','program','question','work','number','night','point','home','member','members','world','life','hand','story','fact','morning','result','change','idea','far','back','still','since','however','whether','though','although','between','among','within','without','across','along','around','through','toward','towards','upon','per','via','versus','vs','etc','ie','eg','ie','vs']);

// ---- SYNONYM EXPANSION ----
const SYNONYMS = {
  'react': ['reactjs', 'react js', 'react.js'],
  'nextjs': ['next.js', 'next js', 'next'],
  'nodejs': ['node.js', 'node js', 'node'],
  'typescript': ['ts', 'type script', 'typed'],
  'python': ['py', 'python3'],
  'laravel': ['php', 'php framework'],
  'mongodb': ['mongo', 'nosql', 'document database'],
  'redis': ['cache', 'in memory', 'caching'],
  'docker': ['container', 'containerize', 'compose'],
  'firebase': ['firestore', 'realtime database', 'baaS'],
  'flutter': ['dart', 'cross platform mobile'],
  'langchain': ['llm', 'ai chain', 'agent'],
  'chromadb': ['chroma', 'vector database', 'embedding', 'vector store'],
  'ollama': ['local llm', 'offline ai', 'local model'],
  'flask': ['python api', 'python web'],
  'express': ['expressjs', 'express.js', 'node api'],
  'tailwind': ['tailwindcss', 'utility css', 'utility first'],
  'vercel': ['deploy', 'hosting', 'edge'],
  'netlify': ['hosting', 'deploy'],
  'render': ['hosting', 'deploy api'],
  'sentry': ['error tracking', 'monitoring', 'observability'],
  'gitlab': ['ci cd', 'pipeline', 'repository', 'git'],
  'jest': ['test', 'testing', 'unit test', 'integration test'],
  'reactnative': ['react native', 'rn', 'mobile app', 'cross platform'],
  'expo': ['expo go', 'mobile dev'],
  'mysql': ['sql', 'relational database'],
  'sqlite': ['embedded database', 'local database'],
  'postgresql': ['postgres', 'relational', 'sql database'],
  'socketio': ['socket', 'websocket', 'real time', 'realtime'],
  'zustand': ['state management', 'state manager'],
  'shadcn': ['shadcn ui', 'component library'],
  'framer': ['framer motion', 'animation', 'animate'],
  'gsap': ['animation', 'animate', 'greensock'],
  'paystack': ['payment', 'pay', 'donation', 'african payment'],
  'cloudinary': ['image', 'media', 'cdn', 'image optimization'],
  'materialui': ['mui', 'material design', 'material'],
  'coolify': ['self hosted', 'self-hosted', 'deployment'],
  'cpanel': ['hosting control', 'server management'],
  'imagekit': ['image', 'media management'],
  'axios': ['http client', 'api client', 'fetch'],
  'jspdf': ['pdf', 'report generation'],
  'sanctum': ['auth', 'authentication', 'laravel auth'],
  'recharts': ['chart', 'graph', 'visualization', 'dashboard'],
  'radix': ['radix ui', 'accessible components'],
  'nativewind': ['native styling', 'tailwind native'],
  'tanstack': ['tanstack query', 'react query', 'server state'],
  'maestro': ['e2e test', 'end to end', 'mobile test'],
  'bcrypt': ['password hash', 'password security'],
  'jwt': ['token', 'token auth', 'json web token'],
  'multer': ['file upload', 'image upload'],
  'pino': ['logger', 'logging'],
  'mongoose': ['odm', 'mongo schema'],
  'supertest': ['api test', 'backend test'],
  'cron': ['scheduled', 'scheduler', 'task'],
  'i18n': ['internationalization', 'translation', 'locale'],
  'ai': ['artificial intelligence', 'machine learning', 'ml', 'llm', 'neural', 'model'],
  'mobile': ['app', 'ios', 'android', 'phone', 'smartphone'],
  'frontend': ['front end', 'ui', 'user interface', 'client side', 'client-side'],
  'backend': ['back end', 'server', 'api', 'server side', 'server-side'],
  'fullstack': ['full stack', 'full-stack', 'end to end', 'end-to-end'],
  'devops': ['dev ops', 'deployment', 'ci cd', 'infrastructure'],
  'project': ['app', 'application', 'product', 'built', 'build', 'work'],
  'skill': ['skills', 'technology', 'technologies', 'tech', 'stack', 'tool', 'tools'],
  'contact': ['email', 'reach', 'hire', 'connect', 'communicate', 'get in touch'],
  'review': ['reviews', 'testimonial', 'testimonials', 'feedback', 'rating'],
  'cv': ['resume', 'curriculum vitae', 'download', 'pdf'],
  'github': ['git', 'repository', 'source code', 'repo', 'code'],
  'website': ['site', 'portfolio', 'page', 'web'],
  'experience': ['career', 'job', 'work history', 'background', 'professional'],
  'education': ['study', 'degree', 'learn', 'university', 'college', 'school', 'certification'],
  'location': ['where', 'live', 'based', 'country', 'city', 'from'],
  'available': ['freelance', 'hiring', 'open', 'looking', 'job', 'hire'],
  'rorep': ['ngo', 'donation', 'forest', 'environmental', 'ghana'],
  'eworld': ['ewash', 'booking', 'environmental', 'mobile booking'],
  'sonturk': ['supermarket', 'grocery', 'university', 'ordering'],
  'geeksflow': ['project management', 'workflow', 'task management'],
  'ggt': ['print', 'pos', 'point of sale', 'print shop'],
  'church': ['church management', 'attendance', 'finance', 'worship'],
  'hydroflow': ['water', 'hydration', 'health tracking'],
  'gradea': ['grade-a', 'education', 'student', 'school', 'academic'],
  'healthe': ['health', 'wellness', 'fitness', 'medical'],
  'easyprofile': ['profile', 'identity', 'user profile'],
  'shopmart': ['shop', 'ecommerce', 'shopping', 'store'],
  'student': ['student management', 'school dashboard', 'academic'],
  'auditor': ['ai website', 'website auditor', 'rag', 'audit'],
};

// ---- KNOWLEDGE CORPUS (RAG Chunks) ----
// Each chunk: { id, text, tags[], category, metadata{} }
const KNOWLEDGE_CORPUS = [
  // === ABOUT JULIUS ===
  {
    id: 'about-1',
    text: 'Julius Dagana is a Full-Stack Software Engineer based in Ghana with 1+ years of professional experience building 20+ projects. He specializes in React, Next.js, TypeScript, Node.js, Python, Laravel, and AI engineering with LangChain, ChromaDB, and Ollama. He has worked with 10+ satisfied clients worldwide and written 200,000+ lines of code.',
    tags: ['julius', 'dagana', 'about', 'who', 'fullstack', 'full stack', 'engineer', 'developer', 'ghana', 'experience', 'background', 'profile', 'summary', 'overview'],
    category: 'about',
  },
  {
    id: 'about-2',
    text: 'Julius builds web applications with React and Next.js, mobile apps with React Native and Flutter, AI tools with LangChain and ChromaDB, backend APIs with Node.js Express and Laravel, and handles DevOps with Docker, Vercel, and GitLab CI/CD. He creates production-ready applications from concept to deployment.',
    tags: ['what', 'do', 'does', 'work', 'specialize', 'specialization', 'build', 'builds', 'creates', 'makes', 'type', 'kind', 'job', 'role'],
    category: 'about',
  },
  {
    id: 'contact-1',
    text: 'Contact Julius: Email — juliusdagana@gmail.com, LinkedIn — linkedin.com/in/juliusdagana, GitHub — github.com/Julius-git-coder. He is available for full-time positions, freelance projects, collaborations, and consulting. You can also use the contact form on his website.',
    tags: ['contact', 'email', 'reach', 'hire', 'connect', 'communicate', 'get in touch', 'phone', 'social', 'linkedin', 'github', 'available', 'freelance', 'open', 'looking', 'work together'],
    category: 'contact',
  },
  {
    id: 'cv-1',
    text: 'You can download Julius CV / Resume as a PDF. On the About page click "Download Full-Stack CV", on the Contact page click "Capture Full-Stack CV", or on the Home page scroll down and click the CV button. The file is named Julius_Dagana_Full_Stack_Resume.pdf.',
    tags: ['cv', 'resume', 'download', 'curriculum vitae', 'pdf', 'document', 'capture'],
    category: 'contact',
  },
  {
    id: 'location-1',
    text: 'Julius is based in Ghana 🇬🇭. He works remotely and collaborates with clients and teams worldwide.',
    tags: ['location', 'where', 'live', 'based', 'country', 'city', 'from', 'ghana', 'remote', 'work remotely'],
    category: 'about',
  },
  {
    id: 'education-1',
    text: 'Julius is a continuous learner who expands his skills through hands-on project development (20+ projects), online courses and documentation, and open-source contributions. His certifications and skills cover Full-Stack Web Development, Mobile App Development, AI/ML Engineering, and DevOps & Cloud Deployment.',
    tags: ['education', 'study', 'degree', 'learn', 'university', 'college', 'school', 'certification', 'certified', 'training', 'how did he learn', 'where did he study'],
    category: 'about',
  },
  {
    id: 'reviews-1',
    text: 'You can see and leave reviews for Julius on his portfolio. Scroll to the Reviews section on the homepage or visit the /review page for a dedicated review form. Reviews are stored in Firebase Firestore and visible to all visitors in real-time. Share the review link using the share button on the Reviews card.',
    tags: ['review', 'reviews', 'testimonial', 'testimonials', 'feedback', 'rating', 'rated', 'opinion', 'what do people say'],
    category: 'reviews',
  },
  {
    id: 'website-1',
    text: 'This portfolio is built with React + Vite, Tailwind CSS, Framer Motion for animations, Firebase Firestore for reviews, Lucide React for icons, and React Router for navigation. Features include smooth page transitions, animated robot assistant, real-time reviews, responsive design, and optimized performance with WebP images.',
    tags: ['website', 'site', 'portfolio site', 'this site', 'built with', 'made with', 'how is this made', 'how was this built', 'tech stack of this site'],
    category: 'website',
  },
  {
    id: 'github-1',
    text: 'Julius GitHub: github.com/Julius-git-coder. Notable repos: Raglangchain (AI Website Auditor), NGO-fe (ROREP), Ewash-On-Back (eWorld), hydroFlow, Grade-A, Healthe, EasyProfile, GeeksFlow-Api, WTI-church-website, shortmart-main. He uses GitLab for CI/CD pipelines across projects.',
    tags: ['github', 'git', 'repository', 'source code', 'code', 'repo', 'source', 'github link', 'open source'],
    category: 'github',
  },
  {
    id: 'stats-1',
    text: 'Julius has built 20+ projects, mastered 37+ technologies, worked with 10+ satisfied clients, has 1+ years of professional experience, and written 200,000+ lines of code. 22+ tools at Expert level, 10+ at Advanced level.',
    tags: ['how many', 'how much', 'count', 'number', 'total', 'quantity', 'stats', 'statistics', 'numbers'],
    category: 'stats',
  },
  {
    id: 'experience-1',
    text: 'Julius experience timeline: 2024-Present: eWorld Lead Engineer (React Native + Express API). 2025-Present: Sonturk Supermarket ecosystem (Next.js + Laravel + PostgreSQL). 2026: AI Website Auditor Lead Developer (offline RAG platform), GGT Print POS Lead Engineer (solo). Client projects include ROREP, GeeksFlow, Church Management, and more.',
    tags: ['experience', 'career', 'job', 'work history', 'background', 'professional', 'how long', 'years', 'timeline', 'history'],
    category: 'experience',
  },

  // === SKILLS (37 technologies) ===
  { id: 'skill-react', text: 'React — Expert Level. Building dynamic user interfaces with hooks, context, and advanced patterns. 1+ year experience. Projects: HydroFlow, EasyProfile, eWorld, Portfolio, ShopMart, Student Management.', tags: ['react', 'reactjs', 'frontend', 'library', 'hooks', 'component'], category: 'skill', level: 'Expert' },
  { id: 'skill-javascript', text: 'JavaScript — Expert Level. ES6+, async programming, modern patterns including async/await, closures, promises. Used in all 20+ projects. Foundation of full-stack expertise.', tags: ['javascript', 'js', 'es6', 'async', 'promise', 'closure'], category: 'skill', level: 'Expert' },
  { id: 'skill-html', text: 'HTML — Expert Level. Semantic markup, accessibility, modern HTML5 features. Used in all web projects following web standards and accessibility best practices.', tags: ['html', 'html5', 'semantic', 'markup', 'accessibility'], category: 'skill', level: 'Expert' },
  { id: 'skill-css', text: 'CSS — Expert Level. Flexbox, Grid, animations, responsive design principles. Combines raw CSS with Tailwind for maximum flexibility.', tags: ['css', 'flexbox', 'grid', 'animation', 'responsive', 'styling'], category: 'skill', level: 'Expert' },
  { id: 'skill-tailwind', text: 'Tailwind CSS — Expert Level. Utility-first CSS framework for rapid UI development. Projects: HydroFlow, EasyProfile, Portfolio, Sonturk, Church Management. Combined with Framer Motion for animated interfaces.', tags: ['tailwind', 'tailwindcss', 'utility', 'css', 'styling', 'framework'], category: 'skill', level: 'Expert' },
  { id: 'skill-nodejs', text: 'Node.js — Expert Level. Server-side JavaScript runtime for scalable applications. Projects: eWorld API, backend services. Skills: REST APIs, middleware, async operations.', tags: ['nodejs', 'node', 'node.js', 'server', 'runtime', 'backend'], category: 'skill', level: 'Expert' },
  { id: 'skill-express', text: 'Express.js — Expert Level. Fast, unopinionated web framework for Node.js. Projects: eWorld API, backend services. Features: RESTful APIs, middleware, routing.', tags: ['express', 'expressjs', 'express.js', 'framework', 'api', 'rest'], category: 'skill', level: 'Expert' },
  { id: 'skill-python', text: 'Python — Advanced Level. Used for Flask APIs, LangChain pipelines, and AI/ML data processing. Projects: AI Website Auditor, backend scripts, RAG pipelines. Primary language for AI and machine learning.', tags: ['python', 'py', 'ai', 'ml', 'machine learning', 'script'], category: 'skill', level: 'Advanced' },
  { id: 'skill-langchain', text: 'LangChain — Advanced Level. LLM orchestration framework for RAG pipelines, chain composition, and agent-based AI workflows. Projects: AI Website Auditor, RAG Knowledge Base. Core of his AI platform.', tags: ['langchain', 'llm', 'ai', 'chain', 'agent', 'orchestration'], category: 'skill', level: 'Advanced' },
  { id: 'skill-chromadb', text: 'ChromaDB — Advanced Level. Open-source vector database for semantic search, embedding storage, and RAG-powered knowledge retrieval. Projects: AI Website Auditor with 12K+ vector store.', tags: ['chromadb', 'chroma', 'vector', 'embedding', 'semantic', 'search', 'database'], category: 'skill', level: 'Advanced' },
  { id: 'skill-ollama', text: 'Ollama — Advanced Level. Local LLM runtime for running open-source models offline with custom prompt engineering. Projects: AI Website Auditor, local LLM chatbot. Enables completely offline AI — no cloud API needed.', tags: ['ollama', 'local llm', 'offline', 'ai', 'model', 'inference'], category: 'skill', level: 'Advanced' },
  { id: 'skill-flask', text: 'Flask — Advanced Level. Lightweight Python web framework for REST APIs, rule engines, and backend services. Projects: AI Website Auditor with 60+ rule engine.', tags: ['flask', 'python', 'api', 'web', 'framework', 'rule engine'], category: 'skill', level: 'Advanced' },
  { id: 'skill-mongodb', text: 'MongoDB — Expert Level. NoSQL database for flexible, scalable data storage. Projects: eWorld API, database design. Skills: Document modeling, flexible schemas, scalability.', tags: ['mongodb', 'mongo', 'nosql', 'database', 'document', 'schema'], category: 'skill', level: 'Expert' },
  { id: 'skill-redis', text: 'Redis — Advanced Level. In-memory data structure store used as database, cache, and message broker. Projects: eWorld API, backend architectures. Use cases: Caching, session management, real-time data.', tags: ['redis', 'cache', 'in memory', 'caching', 'session', 'broker'], category: 'skill', level: 'Advanced' },
  { id: 'skill-mysql', text: 'MySQL — Advanced Level. Relational database management with structured queries and optimized indexing. Projects: Backend systems, data management.', tags: ['mysql', 'sql', 'relational', 'database', 'query', 'index'], category: 'skill', level: 'Advanced' },
  { id: 'skill-sqlite', text: 'SQLite — Advanced Level. Lightweight embedded relational database for local and mobile data persistence. Projects: Local storage, mobile database.', tags: ['sqlite', 'embedded', 'local', 'mobile', 'database', 'lightweight'], category: 'skill', level: 'Advanced' },
  { id: 'skill-postgresql', text: 'PostgreSQL — Advanced Level. Robust relational data storage with advanced queries and data integrity. Projects: Sonturk (supermarket), GeeksFlow (project management). Paired with Laravel backend.', tags: ['postgresql', 'postgres', 'relational', 'database', 'sql', 'integrity'], category: 'skill', level: 'Advanced' },
  { id: 'skill-firebase', text: 'Firebase — Expert Level. Backend-as-a-Service platform for authentication and real-time data. Projects: HydroFlow, EasyProfile, real-time apps, Portfolio Reviews. Features: Real-time database, authentication, Firestore.', tags: ['firebase', 'firestore', 'realtime', 'baaS', 'authentication', 'real-time'], category: 'skill', level: 'Expert' },
  { id: 'skill-laravel', text: 'Laravel — Advanced Level. PHP web framework for elegant backend APIs, MVC architecture, and scalable applications. Projects: Sonturk, GeeksFlow, GGT Print POS, Church Management. Features: API development, Sanctum auth, DOMPDF, workflow engine.', tags: ['laravel', 'php', 'framework', 'mvc', 'api', 'backend', 'sanctum'], category: 'skill', level: 'Advanced' },
  { id: 'skill-php', text: 'PHP — Advanced Level. Server-side scripting for dynamic web applications, APIs, and CMS integrations. Projects: Backend services, web platforms. Used with Laravel framework.', tags: ['php', 'server', 'scripting', 'backend', 'cms'], category: 'skill', level: 'Advanced' },
  { id: 'skill-nextjs', text: 'Next.js — Expert Level. React framework for production with SSR and static generation. Projects: ROREP (22-page NGO site), Sonturk, GGT Print POS, Church Management, EasyProfile. Features: Server-side rendering, static generation, API routes.', tags: ['nextjs', 'next.js', 'next', 'ssr', 'ssg', 'react', 'framework'], category: 'skill', level: 'Expert' },
  { id: 'skill-typescript', text: 'TypeScript — Expert Level. Typed superset of JavaScript for scalable applications. Projects: eWorld, AI Website Auditor, Sonturk, Church Management, EasyProfile. Benefits: Type safety, better IDE support, fewer runtime errors.', tags: ['typescript', 'ts', 'typed', 'type safe', 'javascript', 'superset'], category: 'skill', level: 'Expert' },
  { id: 'skill-reactnative', text: 'React Native — Expert Level. Cross-platform mobile app development. Projects: eWorld (booking app), Healthe (health & wellness), GeeksFlow (admin + customer apps). Features: Maps, gestures, navigation, real-time updates.', tags: ['reactnative', 'react native', 'rn', 'mobile', 'cross platform', 'app'], category: 'skill', level: 'Expert' },
  { id: 'skill-expo', text: 'Expo — Expert Level. Development platform for React Native applications. Projects: eWorld, Healthe, GeeksFlow. Features: Fast development, OTA updates, native APIs.', tags: ['expo', 'expo go', 'mobile', 'react native', 'ota'], category: 'skill', level: 'Expert' },
  { id: 'skill-flutter', text: 'Flutter — Expert Level. Cross-platform mobile and web UI framework for high-performance applications. 1+ year experience. Projects: Mobile apps, cross-platform solutions.', tags: ['flutter', 'cross platform', 'mobile', 'ui', 'framework'], category: 'skill', level: 'Expert' },
  { id: 'skill-dart', text: 'Dart — Expert Level. Type-safe programming language optimized for client-side development and Flutter. Used in Flutter projects.', tags: ['dart', 'flutter', 'type safe', 'language'], category: 'skill', level: 'Expert' },
  { id: 'skill-nosql', text: 'NoSQL — Expert Level. Document-oriented database design and flexible schema modeling. Projects: Data architecture, scalable storage.', tags: ['nosql', 'document', 'schema', 'flexible', 'database'], category: 'skill', level: 'Expert' },
  { id: 'skill-docker', text: 'Docker — Advanced Level. Container images and compose workflows for reproducible dev, test, and deploy environments. Projects: eWorld, environment parity across dev/test/prod.', tags: ['docker', 'container', 'compose', 'environment', 'deploy'], category: 'skill', level: 'Advanced' },
  { id: 'skill-jest', text: 'Jest — Advanced Level. JavaScript testing with matchers, mocks, and async flows to keep features safe to ship. Projects: eWorld (unit & integration tests).', tags: ['jest', 'test', 'testing', 'unit', 'integration', 'mock'], category: 'skill', level: 'Advanced' },
  { id: 'skill-gitlab', text: 'GitLab & Sentry — Expert Level. GitLab for repos and CI/CD workflows; Sentry for error monitoring and production observability. Projects: eWorld, Portfolio, all projects. Features: CI/CD pipelines, automated testing, deployments, error tracking.', tags: ['gitlab', 'sentry', 'ci cd', 'pipeline', 'monitoring', 'error', 'observability'], category: 'skill', level: 'Expert' },
  { id: 'skill-vercel', text: 'Vercel — Expert Level. Frontend deployment and hosting platform. Projects: HydroFlow, eWorld, Portfolio, EasyProfile, Grade-A. Features: Automatic deployments, edge functions, preview deployments.', tags: ['vercel', 'deploy', 'hosting', 'edge', 'frontend'], category: 'skill', level: 'Expert' },
  { id: 'skill-netlify', text: 'Netlify — Expert Level. Platform for deploying and hosting modern web applications. Projects: All deployed projects. Features: CI/CD, serverless functions, form handling.', tags: ['netlify', 'hosting', 'deploy', 'serverless'], category: 'skill', level: 'Expert' },
  { id: 'skill-render', text: 'Render — Expert Level. Cloud platform for deploying and scaling web services and APIs. Projects: API deployment, backend services. Features: Auto-scaling, managed databases, custom domains.', tags: ['render', 'hosting', 'deploy', 'api', 'scaling'], category: 'skill', level: 'Expert' },
  { id: 'skill-cloudinary', text: 'Cloudinary — Expert Level. Cloud-based image and video management platform. Projects: EasyProfile. Features: Image optimization, transformations, CDN delivery.', tags: ['cloudinary', 'image', 'media', 'cdn', 'optimization'], category: 'skill', level: 'Expert' },
  { id: 'skill-materialui', text: 'Material-UI — Intermediate Level. React component library implementing Google Material Design. Projects: Component libraries, UI development. Features: Pre-built components, theming, accessibility.', tags: ['materialui', 'mui', 'material', 'design', 'component'], category: 'skill', level: 'Intermediate' },
  { id: 'skill-coolify', text: 'Coolify — Advanced Level. Self-hosted deployment platform for containerized applications and CI/CD automation. Projects: Deployment pipelines, self-hosted applications.', tags: ['coolify', 'self hosted', 'self-hosted', 'deployment', 'ci cd'], category: 'skill', level: 'Advanced' },
  { id: 'skill-cpanel', text: 'cPanel — Advanced Level. Web hosting control panel for server management, domain, and database administration. Projects: Server management, hosting setup.', tags: ['cpanel', 'hosting', 'server', 'control panel', 'domain'], category: 'skill', level: 'Advanced' },
  { id: 'skill-socketio', text: 'Socket.io — Real-Time Communication. Bidirectional real-time communication. Projects: eWorld (live updates), GeeksFlow (notifications). Features: Live data sync, notifications, chat.', tags: ['socketio', 'socket', 'websocket', 'realtime', 'real time', 'live'], category: 'skill', level: 'Advanced' },
  { id: 'skill-zustand', text: 'Zustand — State Management. Lightweight state management with simple API and minimal boilerplate. Projects: Sonturk, GeeksFlow, Student Management.', tags: ['zustand', 'state', 'management', 'store'], category: 'skill', level: 'Advanced' },
  { id: 'skill-shadcn', text: 'shadcn/ui — UI Components. Accessible pre-built component libraries. Projects: ROREP, Sonturk, Church Management. Features: Pre-built accessible components, theming.', tags: ['shadcn', 'shadcn ui', 'component', 'accessible', 'ui'], category: 'skill', level: 'Expert' },
  { id: 'skill-framer', text: 'Framer Motion — Animations. React-native animations for smooth transitions and page animations. Projects: ROREP, Portfolio, EasyProfile.', tags: ['framer', 'framer motion', 'animation', 'animate', 'transition'], category: 'skill', level: 'Expert' },
  { id: 'skill-gsap', text: 'GSAP — Professional Animations. Professional-grade animation engine for complex animations and storytelling. Projects: ROREP.', tags: ['gsap', 'animation', 'animate', 'greensock', 'storytelling'], category: 'skill', level: 'Expert' },
  { id: 'skill-paystack', text: 'Paystack — Payment Integration. African payment gateway for real-time payments and donation processing. Project: ROREP (NGO donations in GHS).', tags: ['paystack', 'payment', 'pay', 'donation', 'african', 'transaction'], category: 'skill', level: 'Expert' },
  { id: 'skill-imagekit', text: 'ImageKit — Image Management. Media management with image optimization and transformations. Project: eWorld API.', tags: ['imagekit', 'image', 'media', 'optimization'], category: 'skill', level: 'Advanced' },

  // === PROJECTS (detailed) ===
  { id: 'proj-auditor', text: 'AI Website Auditor — A production-grade offline AI website auditor with rule engine, RAG knowledge base, local LLM chatbot, feedback pipeline, and LoRA-ready training data. Tech: Python, LangChain, Flask, ChromaDB, Ollama, React, TypeScript, Tailwind CSS, Radix UI, Recharts. Features: 60+ rule checks, ChromaDB vector store with 12K+ vectors, Ollama for local LLM inference (no cloud API), RAG-powered knowledge retrieval, feedback pipeline, LoRA training data export, Recharts dashboards. Problem: Existing tools require expensive cloud APIs or lack customization. Result: Fully offline, production-ready AI auditor that learns from feedback. GitHub: Raglangchain.git', tags: ['auditor', 'ai website', 'rag', 'langchain', 'chromadb', 'ollama', 'offline', 'ai', 'llm', 'rule engine', 'flask', 'python', 'lora'], category: 'project' },
  { id: 'proj-rorep', text: 'ROREP — A professional 22-page website for an environmental NGO focused on forest restoration and community development in Ghana. Tech: Next.js, React, TypeScript, Tailwind, Framer Motion, GSAP, Paystack, shadcn/ui. Features: 22 pages with engaging storytelling, Paystack donation integration (real-time GHS payments), Framer Motion & GSAP animations, impact statistics, focus areas, news, gallery, volunteer management, partner showcase. Problem: ROREP needed a professional digital presence to drive donations. Result: Polished NGO website that drives real donations. GitHub: NGO-fe.git', tags: ['rorep', 'ngo', 'donation', 'forest', 'environmental', 'ghana', 'nextjs', 'paystack', 'framer', 'gsap'], category: 'project' },
  { id: 'proj-eworld', text: 'eWorld — Full-stack mobile booking platform with maps, live updates, and robust API backend. Client: React Native (Expo) with maps, gestures, TanStack Query, Socket.io, Jest/Maestro/Sentry, i18n, Google Sign-in. API: Express, MongoDB, Redis, JWT, security middleware (bcrypt), ImageKit, GitLab CI/CD, Sentry, Jest/Supertest, Docker, cron/email/SMS, Multer, Pino. Problem: Shop owners needed reliable bookings with live updates. Result: Reproducible mobile + API foundation with automated tests and observability. GitHub: Ewash-On-Back.git', tags: ['eworld', 'ewash', 'booking', 'mobile', 'react native', 'express', 'mongodb', 'redis', 'socketio', 'docker', 'jwt', 'bcrypt'], category: 'project' },
  { id: 'proj-sonturk', text: 'Sonturk — Full-stack supermarket ecosystem for Sonturk University. Customer Next.js webapp for grocery ordering, admin dashboard with inventory and order management, Laravel API with PostgreSQL. Tech: Next.js, React, TypeScript, Tailwind, Laravel, PostgreSQL, shadcn/ui, Zustand, Sentry. Problem: University customers lacked unified grocery ordering platform. Result: Production-ready supermarket platform connecting customers, admins, and operations. GitHub: sonturk-webapp.git', tags: ['sonturk', 'supermarket', 'grocery', 'university', 'nextjs', 'laravel', 'postgresql', 'zustand'], category: 'project' },
  { id: 'proj-geeksflow', text: 'GeeksFlow — Comprehensive project management system with dual React Native apps and Laravel API. Admin app: dashboard, customers, projects, tasks, payments, meetings. Customer app: project participation. Laravel API: workflow engine, notifications, PostgreSQL, comprehensive reporting. Tech: React Native, Expo, Laravel, PostgreSQL, Zustand, React Navigation, NativeWind, Socket.io. Problem: Organizations needed unified project management. Result: Full-featured ecosystem with admin/customer separation and real-time collaboration. GitHub: GeeksFlow-Api.git', tags: ['geeksflow', 'project management', 'workflow', 'task', 'react native', 'laravel', 'postgresql'], category: 'project' },
  { id: 'proj-ggt', text: 'GGT Print POS — Full-featured print shop point-of-sale system. Next.js frontend with intuitive order management and payment flows, Laravel API backend for business logic. Tech: Next.js, React, TypeScript, Tailwind, Laravel, Axios. Features: Order management, job tracking, payment processing, customer history. Problem: Print shops needed modern POS without enterprise complexity. Result: Streamlined POS for print businesses. GitHub: ggt-print-pos-fe', tags: ['ggt', 'print', 'pos', 'point of sale', 'nextjs', 'laravel', 'order'], category: 'project' },
  { id: 'proj-church', text: 'Church Management — Full-stack multi-app church platform. Four applications: public Next.js website, admin dashboard (members, attendance, finance, groups, roles, announcements, SMS broadcast, reports), member portal, Laravel API with Sanctum auth and DOMPDF. Tech: Next.js, React, TypeScript, Tailwind, Laravel, shadcn/ui, Axios, jsPDF, Sanctum. Problem: Churches needed unified platform without disjointed tools. Result: Comprehensive ecosystem connecting visitors, members, and administrators. GitHub: WTI-church-website.git', tags: ['church', 'church management', 'attendance', 'finance', 'worship', 'nextjs', 'laravel', 'sanctum', 'sms'], category: 'project' },
  { id: 'proj-hydroflow', text: 'HydroFlow — High-performance water tracking intelligence system for optimizing hydration. Tech: React, Tailwind, Vite, Web API, GitLab, Firebase. Features: Weather-based hydration recommendations, daily goal synchronization, real-time tracking, smart insights. Problem: People needed intelligent hydration tracking that adapts to environment. Result: Smart water tracking that personalizes goals based on weather data.', tags: ['hydroflow', 'water', 'hydration', 'health', 'react', 'firebase', 'weather'], category: 'project' },
  { id: 'proj-gradea', text: 'Grade-A — Comprehensive educational management system with admin dashboard. Tech: React, Tailwind, Vercel, GitLab. Features: Student tracking, assignment management, roadmap planning, admin dashboard, interactive data visualizations. Problem: Schools needed centralized system for managing students and academics. Result: Complete educational management platform.', tags: ['gradea', 'grade-a', 'education', 'student', 'school', 'academic', 'react'], category: 'project' },
  { id: 'proj-healthe', text: 'Healthe — Health and wellness mobile application for tracking fitness and health metrics. Tech: React Native, Expo, TypeScript, NativeWind, React Navigation. Features: Fitness goal tracking, health metrics monitoring, lifestyle recommendations, mobile-first design. Problem: Users needed simple way to track health and fitness. Result: Mobile app for healthier lifestyle.', tags: ['healthe', 'health', 'wellness', 'fitness', 'medical', 'react native', 'expo'], category: 'project' },
  { id: 'proj-easyprofile', text: 'EasyProfile — Advanced profile orchestration platform for seamless identity management. Tech: Next.js, Firebase, TypeScript, Framer Motion, GitLab, Cloudinary. Features: Dynamic user customization, high-tier UI/UX design, identity management, image optimization via Cloudinary, real-time data via Firebase. Problem: Users needed platform for seamless profile management. Result: Polished profile platform with excellent UI/UX.', tags: ['easyprofile', 'profile', 'identity', 'user', 'nextjs', 'firebase', 'cloudinary'], category: 'project' },
  { id: 'proj-shopmart', text: 'ShopMart — Modern shopping web application with clean React interface. Tech: React, Vite, Tailwind, React Router. Features: Product browsing, cart management, seamless checkout flow, intuitive e-commerce experience. Problem: Users needed clean modern shopping experience. Result: Intuitive e-commerce app.', tags: ['shopmart', 'shop', 'ecommerce', 'shopping', 'store', 'react', 'cart'], category: 'project' },
  { id: 'proj-student', text: 'Student Management — Comprehensive school management dashboard with interactive data visualizations. Tech: React, Vite, Tailwind, Recharts, Zustand, Headless UI. Features: Student records, attendance tracking, assignment management, grading system, class scheduling, interactive charts with Recharts. Problem: Schools needed dashboard for managing student data. Result: Complete school management system with beautiful visualizations.', tags: ['student', 'student management', 'school', 'dashboard', 'academic', 'react', 'recharts'], category: 'project' },

  // === TOPIC CLUSTERS ===
  { id: 'topic-ai', text: 'Julius specializes in AI engineering: LangChain for LLM orchestration and RAG pipelines, ChromaDB for vector databases (12K+ vectors), Ollama for local offline LLM inference, Flask for Python AI backends, and LoRA fine-tuning. His flagship AI project is the AI Website Auditor — a fully offline RAG-powered analysis platform with 60+ rule checks.', tags: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'llm', 'rag', 'langchain', 'chromadb', 'ollama', 'neural', 'model', 'fine tuning', 'lora'], category: 'topic' },
  { id: 'topic-mobile', text: 'Julius builds cross-platform mobile apps: React Native (Expert) for eWorld, Healthe, GeeksFlow with maps, gestures, navigation, real-time updates; Flutter & Dart (Expert) for high-performance cross-platform apps; Expo (Expert) for fast development with OTA updates. His apps work on both iOS and Android.', tags: ['mobile', 'app', 'ios', 'android', 'phone', 'react native', 'flutter', 'expo', 'cross platform'], category: 'topic' },
  { id: 'topic-database', text: 'Julius works with multiple databases: MongoDB (Expert) for NoSQL flexible schemas, PostgreSQL (Advanced) for relational data in Sonturk/GeeksFlow, Redis (Advanced) for in-memory caching, MySQL (Advanced) for structured queries, SQLite (Advanced) for embedded mobile databases. He chooses the right database for each project.', tags: ['database', 'data', 'store', 'query', 'mongo', 'postgres', 'redis', 'mysql', 'sqlite', 'nosql', 'relational'], category: 'topic' },
  { id: 'topic-security', text: 'Julius implements robust security: JWT authentication with token refresh (eWorld), bcrypt password hashing (eWorld), Laravel Sanctum API auth (Church Management), security middleware with input validation and rate limiting (eWorld). Security is a priority in all his applications.', tags: ['security', 'auth', 'authentication', 'jwt', 'bcrypt', 'sanctum', 'token', 'password', 'middleware'], category: 'topic' },
  { id: 'topic-uiux', text: 'Julius focuses on beautiful, functional interfaces: shadcn/ui for accessible components (ROREP, Sonturk, Church), Framer Motion for React animations (ROREP, Portfolio, EasyProfile), GSAP for professional animations (ROREP), Tailwind CSS for utility-first styling across most projects. He creates interfaces that are both beautiful and accessible.', tags: ['ui', 'ux', 'design', 'interface', 'animation', 'accessible', 'shadcn', 'framer', 'gsap', 'tailwind'], category: 'topic' },
  { id: 'topic-realtime', text: 'Julius implements real-time features: Socket.io for bidirectional communication in eWorld (live updates) and GeeksFlow (notifications), Firebase Realtime for Portfolio Reviews and HydroFlow. His apps keep users informed with live data.', tags: ['realtime', 'real time', 'live', 'socket', 'websocket', 'notification', 'update'], category: 'topic' },
  { id: 'topic-payment', text: 'Julius integrates payment systems: Paystack for African payment gateway in ROREP (NGO donations in GHS) with real-time payments and donation processing. He enables real transactions in his applications.', tags: ['payment', 'pay', 'donation', 'stripe', 'transaction', 'paystack', 'money'], category: 'topic' },
  { id: 'topic-state', text: 'Julius uses multiple state management approaches: Zustand for lightweight state (Sonturk, GeeksFlow, Student Management), React Context for global state in smaller projects, TanStack Query for server state management (eWorld) with caching and background refetching.', tags: ['state', 'zustand', 'redux', 'context', 'management', 'store', 'tanstack', 'query'], category: 'topic' },
  { id: 'topic-devops', text: 'Julius handles DevOps: Docker for containerized environments (eWorld), GitLab CI/CD for automated pipelines (all projects), Vercel for frontend deployment, Netlify for web hosting, Render for API hosting, Coolify for self-hosted deployment, cPanel for server management, Sentry for production monitoring across all apps.', tags: ['devops', 'dev ops', 'deploy', 'deployment', 'docker', 'ci cd', 'pipeline', 'infrastructure', 'hosting', 'server'], category: 'topic' },
  { id: 'topic-testing', text: 'Julius writes tests to keep features safe to ship: Jest for unit and integration tests (eWorld), Supertest for API testing (eWorld), Maestro for mobile E2E tests (eWorld). He ensures code quality through automated testing.', tags: ['test', 'testing', 'jest', 'maestro', 'supertest', 'unit', 'integration', 'e2e', 'quality'], category: 'topic' },
  { id: 'topic-compare', text: 'Julius chooses technologies based on project needs: React vs Next.js — React for SPAs, Next.js for SSR/SEO; Node.js vs Python — Node for JS full-stack, Python for AI/ML; MongoDB vs PostgreSQL — MongoDB for flexible schemas, PostgreSQL for relational data; React Native vs Flutter — React Native for React devs, Flutter for pure Dart; Firebase vs Custom API — Firebase for speed, Custom API for control.', tags: ['compare', 'vs', 'versus', 'difference', 'better', 'which', 'choose', 'between', 'alternative'], category: 'topic' },

  // === HR-SPECIFIC KNOWLEDGE CHUNKS ===
  { id: 'hr-workstyle', text: 'Julius follows modern development practices: he uses Git for version control with GitLab CI/CD pipelines, writes clean and documented code, follows agile methodologies, handles code reviews, and deploys using automated pipelines. He uses Jest for unit testing and Sentry for production monitoring.', tags: ['work style', 'workflow', 'agile', 'clean code', 'code review', 'version control', 'git', 'deployment', 'best practices', 'documentation', 'coding style', 'technical debt', 'bugs', 'deadline', 'handle'], category: 'hr' },
  { id: 'hr-teamwork', text: 'Julius has extensive team collaboration experience. As Lead Engineer on eWorld and GGT Print POS, he coordinated with clients, managed project timelines, and delivered on deadlines. He communicates clearly with both technical and non-technical stakeholders, uses daily standups, and reports progress regularly through project management tools.', tags: ['team', 'collaboration', 'teamwork', 'stakeholder', 'communication', 'lead', 'mentor', 'leadership', 'conflict', 'independent', 'standup', 'progress', 'report', 'client feedback', 'non-technical'], category: 'hr' },
  { id: 'hr-technical', text: 'Julius handles security with JWT authentication, bcrypt password hashing, and Sanctum auth. He optimizes performance with image optimization (WebP), lazy loading, and caching (Redis). He uses CI/CD pipelines (GitLab), monitors with Sentry, implements real-time features with Socket.io, and ensures accessibility in his web applications.', tags: ['security', 'performance', 'optimization', 'microservices', 'ci cd', 'cloud', 'api versioning', 'error handling', 'load balancing', 'backup', 'monitoring', 'caching', 'authentication', 'scalability', 'accessibility', 'database migration'], category: 'hr' },
  { id: 'hr-salary', text: 'For salary and rate inquiries, please contact Julius directly at juliusdagana@gmail.com or through LinkedIn: linkedin.com/in/juliusdagana. He is open to discussing compensation based on the project scope, role, and requirements.', tags: ['salary', 'rate', 'compensation', 'budget', 'price', 'pricing', 'payment', 'negotiable', 'discount', 'hourly', 'charge', 'terms', 'methods'], category: 'hr' },
  { id: 'hr-motivation', text: 'Julius is motivated by building impactful products that solve real problems. He enjoys working with cutting-edge technologies like AI and machine learning, and takes pride in delivering production-ready applications. He is continuously learning and expanding his skill set.', tags: ['motivation', 'motivate', 'goals', '5 years', 'future', 'weakness', 'learning next', 'career goals'], category: 'hr' },
  { id: 'hr-skills-list', text: 'Julius has mastered 37+ technologies across frontend, backend, mobile, AI, and DevOps. His core stack includes React, Next.js, TypeScript, Node.js, Python, Laravel, and AI tools like LangChain and ChromaDB. He is proficient in both relational and NoSQL databases, cloud deployment, and mobile development.', tags: ['programming languages', 'languages', 'frameworks', 'frontend technologies', 'backend technologies', 'rest api', 'devops', 'cloud platforms', 'testing tools', 'state management', 'css frameworks', 'animation', 'real-time', 'deploy', 'databases', 'proficient', 'expertise', 'good with', 'familiar', 'optimize'], category: 'hr' },
  { id: 'hr-projects-list', text: 'Julius has built 20+ projects spanning web applications, mobile apps, AI platforms, e-commerce, healthcare, education, and more. His flagship projects include AI Website Auditor (offline AI RAG platform), eWorld (mobile booking with real-time updates), and ROREP (NGO website with donations). He has delivered real-time applications, dashboard tools, and POS systems.', tags: ['type of projects', 'delivered', 'real-time applications', 'dashboard', 'mobile apps', 'ai projects', 'ngo', 'healthcare', 'education', 'ecommerce', 'pos', 'booking', 'supermarket', 'student management', 'health tracking', 'project management', 'ecommerce', 'healthcare'], category: 'hr' },
];

// ---- RAG ENGINE ----

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Tokenize and expand with synonyms
function tokenizeAndExpand(text) {
  const normalized = normalizeText(text);
  const tokens = new Set(normalized.split(' ').filter(w => w.length > 1 && !STOP_WORDS.has(w)));

  // Expand with synonyms
  const expanded = new Set(tokens);
  for (const token of tokens) {
    for (const [key, syns] of Object.entries(SYNONYMS)) {
      if (token === key || syns.includes(token)) {
        expanded.add(key);
        syns.forEach(s => expanded.add(s.replace(/\s+/g, '')));
      }
    }
  }
  return expanded;
}

// Build inverted index: term -> [{chunkId, weight}]
function buildIndex(corpus) {
  const index = {};
  const docFreq = {};

  corpus.forEach(chunk => {
    const text = chunk.text + ' ' + chunk.tags.join(' ') + ' ' + (chunk.category || '');
    const tokens = tokenizeAndExpand(text);

    tokens.forEach(token => {
      if (!index[token]) index[token] = {};
      if (!index[token][chunk.id]) index[token][chunk.id] = 0;
      index[token][chunk.id]++;

      if (!docFreq[token]) docFreq[token] = 0;
      docFreq[token]++;
    });
  });

  const N = corpus.length;
  // Compute TF-IDF weights
  const tfidfIndex = {};
  for (const [token, chunks] of Object.entries(index)) {
    tfidfIndex[token] = {};
    const idf = Math.log((N + 1) / (docFreq[token] + 1)) + 1;
    for (const [chunkId, tf] of Object.entries(chunks)) {
      tfidfIndex[token][chunkId] = tf * idf;
    }
  }
  return tfidfIndex;
}

// Score query against index
function searchQuery(query, index, corpus, topN = 8) {
  const queryTokens = tokenizeAndExpand(query);
  const scores = {};

  queryTokens.forEach(token => {
    if (index[token]) {
      for (const [chunkId, weight] of Object.entries(index[token])) {
        if (!scores[chunkId]) scores[chunkId] = 0;
        scores[chunkId] += weight;
      }
    }
  });

  // Boost specific categories when query mentions them
  // e.g., if query mentions a project name, boost project chunks over generic about chunks
  const q = normalizeText(query);
  const projectTokens = ['rorep', 'eworld', 'ewash', 'sonturk', 'geeksflow', 'ggt', 'church', 'hydroflow', 'gradea', 'healthe', 'easyprofile', 'shopmart', 'student', 'auditor'];
  const skillTokens = ['react', 'nextjs', 'typescript', 'python', 'laravel', 'nodejs', 'mongodb', 'redis', 'docker', 'firebase', 'flutter', 'langchain', 'chromadb', 'ollama', 'flask', 'express', 'tailwind', 'vercel', 'gitlab', 'jest', 'reactnative', 'expo', 'mysql', 'sqlite', 'postgresql', 'socketio', 'zustand', 'shadcn', 'framer', 'gsap', 'paystack', 'cloudinary'];

  const hasProjectToken = projectTokens.some(t => queryTokens.has(t) || q.includes(t));
  const hasSkillToken = skillTokens.some(t => queryTokens.has(t) || q.includes(t));

  // Apply boosts
  Object.keys(scores).forEach(chunkId => {
    const chunk = corpus.find(c => c.id === chunkId);
    if (!chunk) return;

    // Boost project chunks when project name mentioned
    if (hasProjectToken && chunk.category === 'project') {
      scores[chunkId] *= 2.5;
    }
    // Demote generic about chunks when specific topic mentioned
    if (hasProjectToken && chunk.category === 'about') {
      scores[chunkId] *= 0.3;
    }
    // Boost skill chunks when skill name mentioned
    if (hasSkillToken && chunk.category === 'skill') {
      scores[chunkId] *= 2.5;
    }
    // Demote generic about chunks when specific skill mentioned
    if (hasSkillToken && chunk.category === 'about') {
      scores[chunkId] *= 0.3;
    }
  });

  // Normalize by query length
  const results = Object.entries(scores)
    .map(([chunkId, score]) => ({
      chunk: corpus.find(c => c.id === chunkId),
      score: score / queryTokens.size,
    }))
    .filter(r => r.chunk && r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return results;
}

// ---- DIRECT INTENT DETECTION ----
// Catches specific, common questions and returns a direct, concise answer
// IMPORTANT: Order matters! More specific intents must come BEFORE general ones.
function detectDirectIntent(query, results) {
  const q = normalizeText(query);
  const tokens = tokenizeAndExpand(query);

  // GREETING — only match pure greetings, not sentences that happen to contain "hi" inside another word
  const greetingPatterns = ['^hello', '^hi', '^hey', '^greetings', '^howdy', '^sup', '^whats up', '^yo', '^how are you'];
  if (greetingPatterns.some(g => new RegExp(g).test(q)) || q === 'hi' || q === 'hello' || q === 'hey') {
    return "Hello! I'm Julius's AI Portfolio Assistant.\n\nI can tell you about:\n• His **skills** and tech stack (37+ technologies)\n• His **projects** and what he's built (20+ projects)\n• His **experience** and career\n• How to **contact** him\n• His **reviews** and testimonials\n\nWhat would you like to know?";
  }

  // GOODBYE
  if (['bye', 'goodbye', 'see you', 'later', 'cya', 'gotta go', 'farewell'].some(g => q.includes(g))) {
    return "Goodbye! Feel free to come back anytime you have questions about Julius's work. Have a great day!";
  }

  // THANKS — only match if the query is SHORT and primarily a thank-you, not a question containing "thank"
  if ((q === 'thank you' || q === 'thanks' || q === 'thankyou' || q === 'thx' || q === 'ty' || q === 'cheers' || q === 'appreciate it' || q === 'appreciated') && q.length < 30) {
    return "You're welcome! I'm glad I could help. Feel free to ask anything else about Julius's portfolio!";
  }

  // JOKE
  if (q.includes('joke') || q.includes('funny') || q.includes('laugh') || q.includes('humor')) {
    return "Here's a dev joke for you!\n\nWhy do programmers prefer dark mode?\n\nBecause light attracts bugs!";
  }

  // RECOMMEND / BEST PROJECT
  if (q.includes('recommend') || q.includes('best project') || q.includes('top project') || q.includes('suggestion') || q.includes('suggest') || (q.includes('one') && (q.includes('project') || q.includes('pick')))) {
    return "I'd recommend the **AI Website Auditor** — it's Julius's most impressive project. It's a fully offline AI platform that audits websites using 60+ rule checks, a RAG knowledge base with 12K+ vectors, and a local LLM chatbot (no cloud API needed). Tech: Python, LangChain, Flask, ChromaDB, Ollama, React, TypeScript.\n\nIt shows his full-stack skills, AI expertise, and ability to build production-grade systems from scratch.";
  }

  // CV / RESUME — before CONTACT since "download cv" might contain "can"
  if (q.includes('cv') || q.includes('resume') || (q.includes('download') && (q.includes('cv') || q.includes('resume')))) {
    return "You can download Julius's CV as a PDF. On the About page click \"Download Full-Stack CV\", on the Contact page click \"Capture Full-Stack CV\", or on the Home page scroll down and click the CV button. The file is named Julius_Dagana_Full_Stack_Resume.pdf.";
  }

  // CONTACT
  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('get in touch') || q.includes('connect with') || q.includes('talk to')) {
    return "Contact Julius:\n\n**Email:** juliusdagana@gmail.com\n**LinkedIn:** linkedin.com/in/juliusdagana\n**GitHub:** github.com/Julius-git-coder\n\nHe's available for full-time positions, freelance projects, and consulting. You can also use the contact form on his website.";
  }

  // WHY HIRE / STRENGTHS — before AVAILABLE since "hire" is in both
  if (q.includes('why should') || q.includes('stand out') || q.includes('strengths') || q.includes('unique') || q.includes('differentiate')) {
    return "Julius stands out because he combines full-stack expertise with AI engineering. He's built 20+ production projects across 37+ technologies, worked with 10+ clients worldwide, and delivered complex systems like an offline AI RAG platform. His strengths include rapid delivery, clean code, and the ability to handle entire projects from concept to deployment independently.";
  }

  // AVAILABLE / HIRING — expanded for HR recruiter questions
  if (q.includes('available') || q.includes('hire') || q.includes('freelance') || q.includes('open to') || q.includes('looking for') ||
    q.includes('contract basis') || q.includes('part-time') || q.includes('consulting') || q.includes('notice period') ||
    q.includes('multiple projects') || q.includes('long-term') || q.includes('work schedule') || q.includes('commit to') ||
    q.includes('currently employed') || q.includes('start a new') || q.includes('quickly can') || q.includes('when can')) {
    return "Yes, Julius is available! He's open to full-time positions, freelance projects, collaborations, and consulting. He can work on contract or full-time basis. Reach him at juliusdagana@gmail.com or through LinkedIn: linkedin.com/in/juliusdagana.";
  }

  // GITHUB / SOURCE CODE
  if (q.includes('github') || q.includes('source code') || q.includes('repo') || q.includes('repository') || q.includes('find julius projects')) {
    return "Julius's GitHub: github.com/Julius-git-coder\n\nNotable repos: Raglangchain (AI Website Auditor), NGO-fe (ROREP), Ewash-On-Back (eWorld), hydroFlow, Grade-A, Healthe, EasyProfile, GeeksFlow-Api, WTI-church-website, shortmart-main.";
  }

  // WHERE IS HE FROM / LOCATION — expanded for HR recruiter questions
  if ((q.includes('where') && (q.includes('from') || q.includes('live') || q.includes('based'))) || q.includes('location') || q.includes('country') || q.includes('ghana') ||
    q.includes('time zone') || q.includes('remote') || q.includes('relocate') || q.includes('travel') ||
    q.includes('home office') || q.includes('work environment') || q.includes('us-based') ||
    q.includes('international collaboration') || q.includes('different time zones') || q.includes('remote communication') ||
    q.includes('remote work') || q.includes('on-site') || q.includes('hybrid')) {
    return "Julius is based in Ghana. He works remotely and collaborates with clients and teams worldwide. He is comfortable working across different time zones and has experience with international collaboration.";
  }

  // WHAT DOES HE DO — be very specific to avoid catching unrelated questions
  // Must NOT match: "what do people say", "what does Julius know", "how does Julius handle", etc.
  const isWhatDoesHeDo = (q.includes('what') && (q.includes('do') || q.includes('does')) && (q.includes('he') || q.includes('julius') || q.includes('does he') || q.includes('do you')) &&
    !q.includes('know') && !q.includes('say') && !q.includes('handle') && !q.includes('approach') && !q.includes('use') && !q.includes('built') && !q.includes('charge') && !q.includes('accept')) ||
    (q.includes('specialize') && !q.includes('specialization')) ||
    q.includes('specialty') ||
    q.includes('work as') ||
    (q.includes('job') && (q.includes('what') || q.includes('role') || q.includes('title'))) ||
    (q.includes('role') && (q.includes('what') || q.includes('title')));
  if (isWhatDoesHeDo) {
    return "Julius is a Full-Stack Software Engineer. He builds web apps with React and Next.js, mobile apps with React Native and Flutter, AI tools with LangChain and ChromaDB, and backend APIs with Node.js and Laravel. He handles the full lifecycle from concept to deployment.";
  }

  // HOW MANY / HOW MUCH — before WHAT_DOES
  if (q.includes('how many') || q.includes('how much') || q.includes('count') || q.includes('number') || q.includes('total') || q.includes('stats')) {
    return "Julius has built **20+ projects**, mastered **37+ technologies**, worked with **10+ satisfied clients**, has **1+ years** of professional experience, and written **200,000+ lines of code**. He has 22+ tools at Expert level and 10+ at Advanced level.";
  }

  // EDUCATION — before WHAT_DOES
  if (q.includes('education') || q.includes('study') || q.includes('degree') || q.includes('university') || q.includes('college') || q.includes('certification') || q.includes('certified') || q.includes('bootcamp') || q.includes('self-taught') || q.includes('learn to code') || q.includes('where did') || q.includes('how did') || q.includes('formal training') || q.includes('courses') || q.includes('online platforms') || q.includes('learning approach') || q.includes('open source') || q.includes('stay updated')) {
    return "Julius is a continuous learner who expands his skills through hands-on project development (20+ projects), online courses and documentation, and open-source contributions. His certifications and skills cover Full-Stack Web Development, Mobile App Development, AI/ML Engineering, and DevOps & Cloud Deployment.";
  }

  // MOTIVATION / WEAKNESSES / FUTURE GOALS
  if (q.includes('motivat') || q.includes('weakness') || q.includes('5 years') || q.includes('future') || q.includes('learning next') || q.includes('career goals')) {
    return "Julius is motivated by building impactful products that solve real problems. He enjoys working with cutting-edge technologies like AI and machine learning, and takes pride in delivering production-ready applications. He is continuously learning and expanding his skill set.";
  }

  // SALARY / RATE — before WHAT_DOES
  if (q.includes('salary') || q.includes('rate') || q.includes('compensation') || q.includes('budget') || q.includes('price') || q.includes('pricing') || q.includes('charge') || q.includes('negotiable') || q.includes('discount') || q.includes('hourly') || q.includes('payment methods') || q.includes('payment terms')) {
    return "For salary and rate inquiries, please contact Julius directly at juliusdagana@gmail.com or through LinkedIn: linkedin.com/in/juliusdagana. He is open to discussing compensation based on the project scope, role, and requirements.";
  }

  // EXPERIENCE / CAREER — expanded to catch more HR recruiter patterns
  if (q.includes('experience') || q.includes('career') || q.includes('work history') || q.includes('timeline') || q.includes('years') ||
    q.includes('how long') || q.includes('track record') || q.includes('professional background') ||
    q.includes('employment history') || q.includes('last position') || q.includes('led a team') ||
    q.includes('lead developer') || q.includes('managed a team') || q.includes('team environment') ||
    q.includes('industries') || q.includes('sectors') || q.includes('companies') ||
    q.includes('international clients') || q.includes('enterprise projects') || q.includes('startup projects') ||
    q.includes('delivered projects') || q.includes('coding') || q.includes('start his career') ||
    q.includes('level of experience') || q.includes('junior') || q.includes('senior')) {
    return "Julius's experience:\n\n**2024-Present:** eWorld Lead Engineer (React Native + Express API)\n**2025-Present:** Sonturk Supermarket ecosystem (Next.js + Laravel + PostgreSQL)\n**2026:** AI Website Auditor Lead Developer, GGT Print POS Lead Engineer\n\nClient projects include ROREP, GeeksFlow, Church Management, and more.\n\nHe has 1+ years of professional experience, worked with 10+ clients worldwide, and has served as Lead Engineer on multiple projects.";
  }

  // WORK STYLE / TEAM / TECHNICAL — catch HR-specific patterns before WHAT_DOES
  if (q.includes('work style') || q.includes('workflow') || q.includes('agile') || q.includes('clean code') || q.includes('code review') ||
    q.includes('version control') || q.includes('coding style') || q.includes('technical debt') || q.includes('best practices') ||
    q.includes('deployment process') || q.includes('handle bugs') || q.includes('handle deadlines') || q.includes('document his code') ||
    q.includes('approach to testing') || q.includes('approach to code quality') || q.includes('approach to problem') ||
    q.includes('communication style') || q.includes('collaborate with teams') || q.includes('project management tools') ||
    q.includes('handle feedback') || q.includes('write unit tests')) {
    return null; // Let RAG find hr-workstyle
  }
  if (q.includes('team') || q.includes('collaboration') || q.includes('stakeholder') || q.includes('mentor') || q.includes('leadership') ||
    q.includes('conflict') || q.includes('independent') || q.includes('standup') || q.includes('report progress') ||
    q.includes('client feedback') || q.includes('non-technical') || q.includes('collaboration tools') || q.includes('teamwork')) {
    return null; // Let RAG find hr-teamwork
  }
  if (q.includes('security') || q.includes('performance optimization') || q.includes('microservices') || q.includes('cloud architecture') ||
    q.includes('api versioning') || q.includes('error handling') || q.includes('load balancing') || q.includes('data backup') ||
    q.includes('caching') || q.includes('scalability') || q.includes('accessibility') || q.includes('database migration') ||
    q.includes('approach to performance') || q.includes('approach to error') || q.includes('approach to scalability') ||
    q.includes('handle security') || q.includes('handle database') || q.includes('handle api') ||
    q.includes('experience with ci') || q.includes('experience with monitoring')) {
    return null; // Let RAG find hr-technical
  }

  // REVIEWS / REFERENCES — before WHAT_DOES to catch "what do people say"
  if (q.includes('review') || q.includes('testimonial') || q.includes('feedback') || q.includes('rating') || q.includes('references') || q.includes('what do people say') || q.includes('what people say')) {
    return "You can see and leave reviews on his portfolio. Scroll to the Reviews section on the homepage or visit the /review page for a dedicated review form. Reviews are stored in Firebase and visible to all visitors in real-time.";
  }

  // WEBSITE / THIS SITE / PORTFOLIO / LINKEDIN
  if (q.includes('linkedin profile') || q.includes('linkedin')) {
    return "Julius's LinkedIn: linkedin.com/in/juliusdagana. You can connect with him there for professional networking and updates.";
  }
  if (((q.includes('this site') || q.includes('this website') || q.includes('this portfolio')) && (q.includes('built') || q.includes('made') || q.includes('how') || q.includes('tech'))) ||
    (q.includes('portfolio website') && (q.includes('have') || q.includes('does')))) {
    return "This portfolio is built with React + Vite, Tailwind CSS, Framer Motion for animations, Firebase Firestore for reviews, and React Router for navigation. It features smooth page transitions, animated robot assistant, real-time reviews, and optimized performance with WebP images.";
  }

  // SPECIFIC PROJECT DETECTION — "tell me about [project name]" or "has he built [type]"
  const projectNames = ['rorep', 'eworld', 'ewash', 'sonturk', 'geeksflow', 'ggt', 'church', 'hydroflow', 'gradea', 'grade-a', 'healthe', 'easyprofile', 'shopmart', 'student', 'auditor'];
  const mentionedProject = projectNames.find(name => tokens.has(name) || q.includes(name));
  if (mentionedProject && (q.includes('about') || q.includes('tell me') || q.includes('what is') || q.includes('what is the'))) {
    return null;
  }

  // PROJECT TYPE DETECTION — "has he built [type] projects?"
  if (q.includes('built') || q.includes('worked on')) {
    if (q.includes('ecommerce') || q.includes('e-commerce') || q.includes('shopping') || q.includes('store')) return null;
    if (q.includes('mobile') || q.includes('app')) return null;
    if (q.includes('ai') || q.includes('artificial intelligence')) return null;
    if (q.includes('ngo') || q.includes('donation')) return null;
    if (q.includes('healthcare') || q.includes('health') || q.includes('medical')) return null;
    if (q.includes('education') || q.includes('school') || q.includes('academic')) return null;
    if (q.includes('pos') || q.includes('point of sale') || q.includes('print')) return null;
    if (q.includes('project management') || q.includes('task management')) return null;
    if (q.includes('real-time') || q.includes('real time')) return null;
    if (q.includes('booking') || q.includes('reservation')) return null;
    if (q.includes('dashboard') || q.includes('admin')) return null;
    if (q.includes('supermarket') || q.includes('grocery')) return null;
    if (q.includes('student') || q.includes('school')) return null;
  }

  // SPECIFIC TOPIC DETECTION — "tell me about his skills", "tell me about his projects", etc.
  // These need to be caught BEFORE the generic WHO_IS intent
  if (q.includes('about') && (tokens.has('skill') || tokens.has('skills') || tokens.has('technology') || tokens.has('tech stack'))) {
    return "Julius has mastered **37+ technologies**:\n\n**Expert Level (22+):** React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind, Node.js, Express, MongoDB, Firebase, React Native, Expo, Flutter, Dart, NoSQL, GitLab & Sentry, Vercel, Netlify, Render, Cloudinary, shadcn/ui, Framer Motion, GSAP, Paystack.\n\n**Advanced Level (10+):** Python, LangChain, ChromaDB, Ollama, Flask, Redis, MySQL, SQLite, PostgreSQL, Laravel, PHP, Docker, Jest, Coolify, cPanel, Socket.io, Zustand, ImageKit.\n\nWant to see which projects used a specific technology?";
  }

  if (q.includes('about') && (tokens.has('project') || tokens.has('projects') || tokens.has('work') || tokens.has('built'))) {
    return "Julius has built **20+ projects** including:\n\n**Flagship:** AI Website Auditor (offline AI RAG platform), eWorld (mobile booking app), ROREP (NGO website with donations).\n\n**Client Work:** Sonturk (supermarket ecosystem), GeeksFlow (project management), Church Management, GGT Print POS.\n\n**Personal Projects:** HydroFlow (water tracking), Grade-A (education), Healthe (health & wellness), EasyProfile (identity management), ShopMart (e-commerce), Student Management.\n\nWant to know about a specific project?";
  }

  // WHO IS HE / ABOUT — only match when asking about Julius specifically
  const isAboutJulius = (q.includes('who') && (q.includes('is') || q.includes('are'))) ||
    q === 'about' ||
    (q.includes('about') && (tokens.has('julius') || tokens.has('dagana') || tokens.has('who') || tokens.has('background'))) ||
    q.includes('background') ||
    (q.includes('tell me about') && (tokens.has('julius') || tokens.has('dagana')));

  if (isAboutJulius) {
    return "Julius Dagana is a Full-Stack Software Engineer based in Ghana with 1+ years of professional experience. He's built 20+ projects, mastered 37+ technologies, worked with 10+ clients, and written 200,000+ lines of code. His specialties include React, Next.js, TypeScript, Node.js, Python, Laravel, and AI engineering.";
  }

  // PRAISE (only if no relevant results)
  if (['love', 'like', 'awesome', 'amazing', 'cool', 'impressive', 'wow', 'fantastic', 'incredible', 'brilliant', 'outstanding'].some(p => q.includes(p)) && results.length === 0) {
    return "I'm glad you think so! Julius really is an impressive developer with 20+ projects and 37+ technologies under his belt.\n\nIs there anything specific about his work that interests you?";
  }

  return null;
}

// Generate response from retrieved chunks
function generateResponse(query, results, corpus) {
  const normalized = normalizeText(query);
  const tokens = tokenizeAndExpand(query);

  // 1. Check direct intents first — return immediate, specific answer
  const directAnswer = detectDirectIntent(query, results);
  if (directAnswer) return directAnswer;

  // 2. No results at all
  if (results.length === 0) {
    const suggestions = [];
    if (tokens.has('react') || tokens.has('nextjs') || tokens.has('javascript') || tokens.has('typescript')) {
      suggestions.push('frontend technologies like React or Next.js');
    }
    if (tokens.has('nodejs') || tokens.has('python') || tokens.has('laravel') || tokens.has('express')) {
      suggestions.push('backend technologies like Node.js or Laravel');
    }
    if (tokens.has('ai') || tokens.has('langchain') || tokens.has('chromadb') || tokens.has('ollama')) {
      suggestions.push('AI tools like LangChain or Ollama');
    }
    if (tokens.has('reactnative') || tokens.has('flutter') || tokens.has('expo') || tokens.has('mobile')) {
      suggestions.push('mobile development with React Native or Flutter');
    }
    if (tokens.has('docker') || tokens.has('vercel') || tokens.has('gitlab') || tokens.has('deploy')) {
      suggestions.push('DevOps tools like Docker or Vercel');
    }

    if (suggestions.length > 0) {
      return `I think you might be asking about ${suggestions.join(', ')}\.\n\nJulius has experience with all of these! Try asking:\n• "Tell me about his skills"\n• "What projects did he build?"\n• "Is he proficient in [technology]?"`;
    }

    return `That's an interesting question! Here's what I can help with:\n\n**About Julius** — His background, skills, and experience\n**Projects** — Details about his 20+ projects\n**Tech Stack** — 37+ technologies he's mastered\n**Contact** — How to reach him\n**Reviews** — How to leave feedback\n\nTry asking something like:\n• "What projects has he built?"\n• "Tell me about his AI experience"\n• "How can I contact him?"`;
  }

  // 3. Return only the TOP 1-2 most relevant chunks — concise and direct
  const topResults = results.slice(0, 2);
  const responseParts = [];

  topResults.forEach(r => {
    let formatted = r.chunk.text;

    // Add level badge for skills
    if (r.chunk.level) {
      const firstLine = formatted.split('.')[0];
      formatted = `${firstLine} — ${r.chunk.level} Level.`;
    }

    responseParts.push(formatted);
  });

  // Add a single, relevant follow-up
  const topCategory = topResults[0].chunk.category;
  let followUp = '';
  if (topCategory === 'project') {
    followUp = `\n\nWant to know about another project or how to contact Julius?`;
  } else if (topCategory === 'skill') {
    followUp = `\n\nWant to see which projects used this technology?`;
  } else if (topCategory === 'topic') {
    followUp = `\n\nWant to know more about his projects or skills?`;
  }

  return responseParts.join('\n\n') + followUp;
}

// Pre-build the index
const RAG_INDEX = buildIndex(KNOWLEDGE_CORPUS);

// Main response function
function getResponse(message) {
  const results = searchQuery(message, RAG_INDEX, KNOWLEDGE_CORPUS, 8);
  return generateResponse(message, results, KNOWLEDGE_CORPUS);
}

export default function ChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Check for unlock keyword
    if (!isUnlocked) {
      const keyword = input.toLowerCase().trim();
      if (keyword === "hack" || keyword === "help") {
        setIsUnlocked(true);
        setTimeout(() => {
          const welcomeMessage = {
            id: Date.now() + 1,
            text: "Access granted! Welcome to the Portfolio Assistant!\n\nI'm here to answer questions about Julius's skills, projects, experience, and more. What would you like to know?",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, welcomeMessage]);
        }, 500);
      } else {
        setTimeout(() => {
          const lockMessage = {
            id: Date.now() + 1,
            text: "To unlock the chat, type **hack** or **help** to begin.",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, lockMessage]);
        }, 500);
      }
      return;
    }

    // Generate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: getResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-[90vw] sm:w-[400px] h-[80vh] sm:h-[600px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full overflow-hidden flex items-center justify-center">
                    <img src="/Ai Robot Vector Art.webp" alt="Bot" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl">Portfolio Assistant</h3>
                    <p className="text-blue-100 text-xs sm:text-sm">
                      {isUnlocked ? "Online • Ready to help" : "Locked"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close chat"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              {/* Lock Notice */}
              {!isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3"
                >
                  <Lock className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <p className="text-white text-sm">
                    Type <strong>hack</strong> or <strong>help</strong> to unlock the chat
                  </p>
                </motion.div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-10 h-10 text-blue-600" />
                  </div>
                  <h4 className="text-gray-900 font-bold text-lg mb-2">Welcome!</h4>
                  <p className="text-gray-500 text-sm max-w-xs">
                    {!isUnlocked 
                      ? "Type 'hack' or 'help' to unlock and start chatting about Julius's portfolio."
                      : "Ask me anything about Julius's skills, projects, experience, or how to contact him!"
                    }
                  </p>
                </div>
              )}
              
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-end gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user" 
                        ? "bg-blue-600" 
                        : "bg-gradient-to-br from-blue-600 to-purple-600"
                    }`}>
                      {message.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <img src="/Ai Robot Vector Art.webp" alt="Bot" className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 shadow-md border border-gray-100 rounded-bl-sm"
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <span className={`text-xs mt-1 block ${
                        message.sender === "user" ? "text-blue-200" : "text-gray-400"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                      <img src="/Ai Robot Vector Art.webp" alt="Bot" className="w-full h-full object-contain" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-md border border-gray-100">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isUnlocked ? "Ask about Julius's portfolio..." : "Type 'hack' or 'help' to unlock..."}
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
