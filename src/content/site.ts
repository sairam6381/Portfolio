// All portfolio copy lives here. Source: Sairam_Murugan_Resume.pdf.

export const profile = {
  name: "Sairam M",
  role: "Software engineer, backend & AI",
  headline: "I build the AI backends that support teams rely on.",
  intro:
    "Core AI backend developer at Syncfusion, shipping agentic workflows and AI assistants on .NET SaaS platforms.",
  location: "Tirunelveli, Tamil Nadu, India",
  email: "sairam9488144883@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/sairam6381" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sairam6381" },
    { label: "LeetCode", href: "https://leetcode.com/sairam6381" },
  ],
} as const;

export const stats = [
  { value: 50, suffix: "%", label: "faster LLM responses, 25s down to 12s" },
  { value: 33000, suffix: "+", label: "corporate customers on BoldDesk AI" },
  { value: 3, suffix: "+", label: "major platform features shipped" },
  {
    value: 1.5,
    suffix: "+",
    label: "years building AI-driven SaaS",
    decimals: 1,
  },
] as const;

export type Role = {
  title: string;
  period: string;
  mode: string;
  points: string[];
};

export const experience = {
  company: "Syncfusion",
  location: "Chennai, Tamil Nadu",
  period: "Dec 2024 - Present",
  roles: [
    {
      title: "Software Engineer, Level 2",
      period: "Jan 2026 - Present",
      mode: "Remote",
      points: [
        "Core AI backend developer for BoldAgent, a .NET SaaS platform where businesses build, test and deploy AI assistants, knowledge bases and workflow automations.",
        "Shipped 3+ major platform features in a 5-person team, expanding assistant, knowledge base and automation capabilities.",
      ],
    },
    {
      title: "Software Engineer, Level 1",
      period: "Jun 2025 - Jan 2026",
      mode: "Remote",
      points: [
        "Designed agentic workflows where AI agents help human agents with suggestions, data retrieval and next-step recommendations.",
        "Cut average LLM response time from 25s to 12s by redesigning the agentic workflow.",
        "Integrated AI decision-making into support workflows for autonomous task handling.",
      ],
    },
    {
      title: "Junior Developer",
      period: "Dec 2024 - Jul 2025",
      mode: "On-site",
      points: [
        "Backend developer on the BoldDesk AI team, bringing AI into a ticketing system used by 33,000+ corporate customers.",
        "Tuned how AI assistants understand and respond to customer needs.",
      ],
    },
  ] satisfies Role[],
} as const;

export type Project = {
  name: string;
  kind: string;
  period: string;
  summary: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "BoldAgent",
    kind: "AI platform, Syncfusion",
    period: "2025 - Present",
    summary:
      "SaaS platform for building, testing and deploying AI assistants, knowledge bases and workflow automations. I work on the AI backend.",
    stack: [".NET", "C#", "Agentic AI", "RAG"],
  },
  {
    name: "BoldDesk AI",
    kind: "AI in ticketing, Syncfusion",
    period: "2024 - 2025",
    summary:
      "AI features inside a SaaS help desk used by 33,000+ corporate customers, making assistants understand and answer real support requests.",
    stack: [".NET", "C#", "LLMs", "Prompt engineering"],
  },
  {
    name: "ArLearnX",
    kind: "AR education app",
    period: "2023 - 2024",
    summary:
      "Augmented-reality learning app that overlays interactive 3D models for subjects like anatomy and space science.",
    stack: ["Unity", "Vuforia", "Blender", "C#"],
  },
  {
    name: "Patrol Rover",
    kind: "IoT prototype",
    period: "2022",
    summary:
      "Military-base patrol rover with automated obstacle detection and avoidance to strengthen surveillance.",
    stack: ["IoT", "Robotics"],
  },
];

export const skills = {
  groups: [
    { label: "Languages", items: ["C#", "C", "Python"] },
    { label: "Backend", items: [".NET", "REST APIs", "SaaS", "SQL"] },
    {
      label: "AI",
      items: ["Agentic AI", "RAG", "Prompt engineering", "LLM workflows"],
    },
    { label: "Practice", items: ["OOP", "Agile", "Software engineering"] },
  ],
};

export const education = {
  degree: "B.E. Computer Science",
  school: "Rajalakshmi Engineering College",
  period: "2020 - 2024",
  grade: "CGPA 8.32",
};

export const certifications = [
  { name: "Robotic Process Automation", issuer: "UiPath" },
  { name: "Database Management Systems", issuer: "Infosys" },
  { name: "Introduction to Cyber Security", issuer: "Cisco" },
];
