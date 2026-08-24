// Portfolio content — all data lives here

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  quote: string;
  year: string;
}

export interface Passion {
  icon: string;
  label: string;
  description: string;
}

export interface SkillGroup {
  name: string;
  accentColor: string;
  skills: { icon: string; name: string }[];
}

export interface Project {
  id: string;
  number: string;
  category: string;
  name: string;
  description: string;
  tags: string[];
  color: string;
  status: "coming_soon" | "live";
  isFeatured?: boolean;
  /** Path to project photo in public folder, e.g. "/project-photos/origin-of-saare.jpg" */
  image?: string;
  /** When project is live: URL to open on card click. Leave undefined until ready. */
  link?: string;
}

export const personalInfo: PersonalInfo = {
  name: "EKLAVYA",
  role: "Full Stack Developer",
  tagline:
    "I write code by night. I chase the cosmos by dream. Somewhere in between — I build things that matter.",
  quote:
    "I would rather exhaust myself building my own dreams than live comfortably building someone else.",
  year: "Final Year, Computer Science",
};

export const personalityTraits: string[] = [
  "Night Owl",
  "Dreamer + Doer",
  "Hustler",
  "Builder",
  "Cosmology Nerd",
  "Entrepreneur",
  "Anime Fan",
  "Bookworm",
];

export const passions: Passion[] = [
  {
    icon: "🌌",
    label: "Cosmology",
    description:
      "My parallel dream. One day I'll study the universe, not just build for it.",
  },
  {
    icon: "🚀",
    label: "Entrepreneurship",
    description:
      "Building products that solve real problems. Currently cooking something big.",
  },
  {
    icon: "📚",
    label: "Reading",
    description:
      "Books are the original open source — ideas shared freely across time.",
  },
  {
    icon: "🎬",
    label: "Anime & Cinema",
    description: "Storytelling at its finest. Inspiration beyond the screen.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    accentColor: "#F02E65",
    skills: [
      { icon: "☕", name: "Java" },
      { icon: "⚡", name: "JavaScript" },
    ],
  },
  {
    name: "Frontend",
    accentColor: "#A855F7",
    skills: [
      { icon: "⚛️", name: "React" },
      { icon: "📱", name: "React Native" },
    ],
  },
  {
    name: "Backend",
    accentColor: "#8CC84B",
    skills: [
      { icon: "🟢", name: "Node.js" },
      { icon: "🚂", name: "Express.js" },
      { icon: "🔌", name: "REST APIs" },
    ],
  },
  {
    name: "BaaS",
    accentColor: "#3ECF8E",
    skills: [{ name: "Supabase", icon: "" }],
  },
  {
    name: "DevOps & Tools",
    accentColor: "#2496ED",
    skills: [
      { icon: "🐙", name: "Git & GitHub" },
      { icon: "▲", name: "Vercel" },
      { icon: "🎭", name: "Figma" },
      { icon: "☁️", name: "Cloud" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "nearteach",
    number: "01",
    category: "Startup",
    name: "NEARTEACH",
    description:
      "Hyperlocal home tuition platform — PostGIS-powered tutor discovery within 1/3/5km. Live with 230+ users.",
    tags: ["React Native", "Node.js", "PostgreSQL", "PostGIS"],
    color: "#6EE7B7",
    status: "live",
    image: "/project-photos/nearteach.png",
    link: "https://nearteach.com",
  },
  {
    id: "origin-of-saare",
    number: "02",
    category: "Production",
    name: "ORIGIN OF SAARE",
    description:
      "A real production app built for a real client. Delivered end-to-end.",
    tags: ["React", "Node.js", "PostgreSQL"],
    color: "#F02E65",
    status: "live",
    image: "/project-photos/origin-of-saare.png",
    link: "https://www.originofmysaree.com/",
  },
  {
    id: "resqora",
    number: "03",
    category: "Featured",
    name: "RESQORA",
    description:
      "Emergency response community app. Real-time SOS alerts, community rescue coordination, and critical incident reporting.",
    tags: ["React Native", "Node.js", "PostgreSQL", "Firebase"],
    color: "#EF4444",
    status: "coming_soon",
    isFeatured: true,
    image: "/project-photos/resqora.png",
  },
  {
    id: "oglos",
    number: "04",
    category: "Security",
    name: "OGLOS",
    description:
      "Secure laptop authentication using behavioral biometrics. Because passwords are not enough.",
    tags: ["Python", "C++", "Security"],
    color: "#FBBF24",
    status: "coming_soon",
    image: "/project-photos/oglos.png",
  },
];

export const contactLinks = {
  github: { label: "GitHub", handle: "@Eklavya-Yadav-1711", href: "https://github.com/Eklavya-Yadav-1711", icon: "🐙" },
  linkedin: { label: "LinkedIn", handle: "Eklavya Yadav", href: "https://www.linkedin.com/in/eklavya-yadav", icon: "💼" },
  email: {
    label: "Email",
    handle: "rajeklavya65@gmail.com",
    href: "mailto:rajeklavya65@gmail.com",
    icon: "✉️",
  },
};
