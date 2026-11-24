export type Category = "React" | "Next.js" | "Angular" | "HTML & CSS" | "PHP";

export type Project = {
  name: string;
  summary: string;
  category: Category;
  stack: string[];
  code?: string;
  live?: string;
  featured?: boolean;
};

const gh = "https://github.com/mohmedanwwar";
const pages = "https://mohmedanwwar.github.io";

export const projects: Project[] = [
  {
    name: "Masroof",
    summary:
      "Personal finance tracker. Log income and expenses, set monthly budgets per category, and see where the money goes with charts. Exports to CSV.",
    category: "React",
    stack: ["React", "TypeScript", "Vite", "Recharts", "Vitest"],
    code: `${gh}/masroof`,
    live: `${pages}/masroof/`,
    featured: true,
  },
  {
    name: "KanbanFlow",
    summary:
      "Kanban board with drag and drop across four columns, validated task forms, debounced search, pagination and React Query caching.",
    category: "React",
    stack: ["React", "React Query", "Zustand", "Material UI", "Drag & drop"],
    code: `${gh}/kanban-todo-dashboard`,
    featured: true,
  },
  {
    name: "AI Chat",
    summary:
      "Chat interface in Next.js with a typed API route, Zod request validation and a custom useChat hook that handles loading and error states.",
    category: "Next.js",
    stack: ["Next.js", "TypeScript", "Zod"],
    code: `${gh}/ai-chat`,
    featured: true,
  },
  {
    name: "User Dashboard",
    summary:
      "User management dashboard that loads 50 users from an API, with search, pagination, a details modal and unit-tested components.",
    category: "React",
    stack: ["React", "Redux Toolkit", "Axios", "Material UI", "Jest"],
    code: `${gh}/user-dashboard`,
    featured: true,
  },
  {
    name: "Euphoria",
    summary:
      "Fashion store front end with product listings, cart, checkout, login, profile, wishlist and saved delivery addresses.",
    category: "React",
    stack: ["React", "React Router", "PrimeReact", "Bootstrap"],
    code: `${gh}/Euphoria`,
  },
  {
    name: "Product Catalog",
    summary: "Product list with live search, category filter and delete.",
    category: "React",
    stack: ["React", "React Bootstrap"],
    code: `${gh}/projectReactjs`,
  },
  {
    name: "Knight",
    summary: "Single-page company site, my first Angular project.",
    category: "Angular",
    stack: ["Angular", "TypeScript"],
    code: `${gh}/Knight`,
  },
  {
    name: "Playground",
    summary: "Book a football pitch online and check it’s free before you go. Graduation project, awarded a distinction.",
    category: "PHP",
    stack: ["PHP", "SQL"],
    code: `${gh}/playground-`,
  },
  {
    name: "Natours",
    summary: "Fully responsive tour-company landing page written in Sass.",
    category: "HTML & CSS",
    stack: ["HTML", "Sass"],
    code: `${gh}/Natours`,
  },
  { name: "Sigma Star", summary: "Agency landing page.", category: "HTML & CSS", stack: ["HTML", "CSS"], live: `${pages}/sigma-star/`, code: `${gh}/sigma-star` },
  { name: "Rapid", summary: "Responsive company website.", category: "HTML & CSS", stack: ["HTML", "CSS"], live: `${pages}/RAPID/`, code: `${gh}/RAPID` },
  { name: "Jetro", summary: "Multi-section landing page.", category: "HTML & CSS", stack: ["HTML", "CSS"], live: `${pages}/JETRO/`, code: `${gh}/JETRO` },
  { name: "Shokran", summary: "Business landing page.", category: "HTML & CSS", stack: ["HTML", "CSS"], live: `${pages}/Shokran/`, code: `${gh}/Shokran` },
  { name: "Biznew", summary: "News-style business layout.", category: "HTML & CSS", stack: ["HTML", "CSS"], live: `${pages}/biznew/`, code: `${gh}/biznew` },
];

export const categories: ("All" | Category)[] = ["All", "React", "Next.js", "Angular", "PHP", "HTML & CSS"];
