// All portfolio copy lives here.
// Sources: Sairam_Murugan_Resume.pdf and github.com/sairam6381 (public repos).

export type IconKey =
  | "dotnet"
  | "csharp"
  | "python"
  | "c"
  | "sql"
  | "unity"
  | "blender"
  | "arduino"
  | "uipath"
  | "git"
  | "github"
  | "linkedin"
  | "leetcode"
  | "x"
  | "mail"
  | "ai"
  | "api";

export const profile = {
  name: "Sairam M",
  firstName: "Sairam",
  role: "Software engineer, backend & AI",
  headline: "Backend & AI engineer building agentic systems.",
  intro:
    "I design the AI backends behind Syncfusion's support platforms: agentic workflows, assistants and automation in .NET.",
  about:
    "I started out wiring sensors to an Arduino and building AR apps in Unity. Today I make large language models useful in production: designing agent workflows, cutting response times in half, and shipping AI features to tens of thousands of businesses.",
  location: "Tirunelveli, Tamil Nadu, India",
  email: "sairam9488144883@gmail.com",
  socials: [
    {
      label: "GitHub",
      handle: "sairam6381",
      href: "https://github.com/sairam6381",
      icon: "github",
    },
    {
      label: "LinkedIn",
      handle: "sairam6381",
      href: "https://www.linkedin.com/in/sairam6381",
      icon: "linkedin",
    },
    {
      label: "LeetCode",
      handle: "sairam6381",
      href: "https://leetcode.com/sairam6381",
      icon: "leetcode",
    },
    {
      label: "X",
      handle: "@Sai__official_",
      href: "https://x.com/Sai__official_",
      icon: "x",
    },
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
  summary:
    "Promoted twice in just over a year, from junior developer to core AI backend engineer.",
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
  icons: IconKey[];
  href?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    name: "BoldAgent",
    kind: "AI platform at Syncfusion",
    period: "2025 - Present",
    summary:
      "SaaS platform for building, testing and deploying AI assistants, knowledge bases and workflow automations. I work on the agentic AI backend.",
    stack: [".NET", "C#", "Agentic AI", "RAG"],
    icons: ["dotnet", "csharp", "ai"],
  },
  {
    name: "BoldDesk AI",
    kind: "AI help desk at Syncfusion",
    period: "2024 - 2025",
    summary:
      "AI inside a SaaS ticketing system used by 33,000+ corporate customers, so assistants understand and answer real support requests.",
    stack: [".NET", "C#", "LLMs", "Prompt engineering"],
    icons: ["dotnet", "ai", "api"],
  },
  {
    name: "ArLearnX",
    kind: "Augmented-reality learning app",
    period: "2023 - 2024",
    summary:
      "Point a phone at a marker and an interactive 3D brain, plant cell or planet appears. Built for anatomy and space science lessons.",
    stack: ["Unity", "Vuforia", "Blender", "C#"],
    icons: ["unity", "blender", "csharp"],
    href: "https://github.com/sairam6381/ArLearnX-ARProject",
    linkLabel: "View code",
  },
  {
    name: "Patrol Rover",
    kind: "Autonomous IoT robot",
    period: "2022",
    summary:
      "Arduino rover that patrols a perimeter on its own, using ultrasonic sensors to detect and steer around obstacles.",
    stack: ["Arduino Uno", "Ultrasonic sensors", "C++"],
    icons: ["arduino", "c"],
    href: "https://github.com/sairam6381/IOT-Project",
    linkLabel: "View code",
  },
  {
    name: "Price Comparison Engine",
    kind: "Python desktop tool",
    period: "2022",
    summary:
      "Search once and compare the same product's price on Amazon and Flipkart side by side, scraped live.",
    stack: ["Python", "Web scraping", "Tkinter"],
    icons: ["python"],
    href: "https://github.com/sairam6381/price-comparator",
    linkLabel: "View code",
  },
  {
    name: "Customer Care Bot",
    kind: "UiPath automation",
    period: "2022",
    summary:
      "RPA bot that reads customer emails, logs each query to Excel and sends the right reply automatically.",
    stack: ["UiPath", "RPA", "Excel"],
    icons: ["uipath"],
    href: "https://github.com/sairam6381/RPA-project",
    linkLabel: "View code",
  },
];

export type Capability = {
  title: string;
  summary: string;
  proof?: string;
  proofNote?: string;
  tools: { label: string; icon: IconKey }[];
};

export const capabilities: Capability[] = [
  {
    title: "AI engineering",
    summary:
      "Agentic workflows, retrieval-augmented generation and prompt design for assistants that run in production.",
    proof: "25s to 12s",
    proofNote:
      "Average LLM response time after I redesigned the agentic workflow",
    tools: [
      { label: "Agentic AI", icon: "ai" },
      { label: "RAG", icon: "ai" },
      { label: "Prompt engineering", icon: "ai" },
    ],
  },
  {
    title: "Backend & APIs",
    summary: "Multi-tenant SaaS services and REST APIs on .NET, backed by SQL.",
    proof: "Used by 33,000+ businesses",
    tools: [
      { label: ".NET", icon: "dotnet" },
      { label: "C#", icon: "csharp" },
      { label: "REST APIs", icon: "api" },
      { label: "SQL", icon: "sql" },
    ],
  },
  {
    title: "Languages",
    summary:
      "C# every day, Python for AI and tooling, C for systems fundamentals.",
    tools: [
      { label: "C#", icon: "csharp" },
      { label: "Python", icon: "python" },
      { label: "C", icon: "c" },
    ],
  },
  {
    title: "Also built with",
    summary: "AR, hardware and automation from earlier projects.",
    tools: [
      { label: "Unity", icon: "unity" },
      { label: "Blender", icon: "blender" },
      { label: "Arduino", icon: "arduino" },
      { label: "UiPath", icon: "uipath" },
      { label: "Git", icon: "git" },
    ],
  },
];

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

export const avatar = {
  // Personal 3D avatar (Ready Player Me + Mixamo animations).
  // The clip finder in avatar-canvas.tsx matches by substring, so
  // "Idle", "idle", "Armature|mixamo.com|Idle" etc. all work.
  src: "/models/avatar.glb",
  idleClip: "Idle",
  waveClip: "Wave",
  greeting: "Hey there! Welcome in 👋",
};
