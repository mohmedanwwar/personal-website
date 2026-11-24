export type TimelineItem = {
  title: string;
  org: string;
  place: string;
  start?: string;
  end?: string;
  points?: string[];
  text?: string;
  stack?: string[];
};

export const experience: TimelineItem[] = [
  {
    title: "Software Engineer",
    org: "Blnk (Fintech)",
    place: "Cairo, Egypt",
    start: "08.2023",
    end: "Present",
    text: "Point-of-sale financing platform promoting financial inclusion across Egypt.",
    points: [
      "Optimized the main dashboard’s load time with code splitting, lazy loading, memoization and efficient data fetching in React and Next.js.",
      "Built a real-time chat system over WebSockets supporting hundreds of concurrent users.",
      "Restructured client-side state with Redux Toolkit and Context API, cutting redundant API calls and simplifying data flow.",
      "Delivered 5+ business-critical payment and user-management features across 3 internal operations apps used daily.",
      "Built Django models and REST APIs with Django REST Framework to support payment workflows.",
      "Wrote unit tests with Jest to improve reliability and reduce production bugs.",
    ],
    stack: ["React", "Next.js", "Redux Toolkit", "WebSockets", "Django REST", "Jest"],
  },
  {
    title: "Full Stack Developer",
    org: "DSC Marketing",
    place: "Remote, Egypt",
    start: "04.2023",
    end: "07.2023",
    text: "Marketing and web solutions company serving SME clients.",
    points: [
      "Made the company’s websites work well on every mobile screen size.",
      "Delivered three client projects on time with Laravel and MySQL.",
      "Fixed legacy code and significantly reduced interface bugs.",
      "Connected frontend pages to backend services and databases.",
    ],
    stack: ["Laravel", "PHP", "MySQL", "JavaScript"],
  },
  {
    title: "Front-end Developer",
    org: "Tegarti",
    place: "Remote, Saudi Arabia",
    start: "09.2021",
    end: "01.2023",
    text: "Business management and accounting system for retail and wholesale businesses.",
    points: [
      "Started on client requirements before moving into a developer role.",
      "Built reusable UI components for the accounting, inventory and sales modules.",
      "Integrated the interfaces with backend APIs alongside the team.",
    ],
    stack: ["JavaScript", "Angular", "REST APIs"],
  },
];

export const education: TimelineItem[] = [
  {
    title: "BSc in Computer Science",
    org: "Faculty of Computers and Information",
    place: "Cairo, Egypt",
    start: "09.2017",
    end: "08.2021",
    text: "Graduated with a Good grade. Graduation project Playground, an online football-stadium booking platform, received a distinction.",
  },
];

export const courses: TimelineItem[] = [
  {
    title: "Artificial Intelligence Studies",
    org: "In progress",
    place: "Self-study",
    text: "Python for data analysis, and machine learning and deep learning fundamentals.",
  },
  {
    title: "Software Development Internship",
    org: "Fawry",
    place: "Cairo, Egypt",
    start: "03.2023",
    end: "06.2023",
    text: "Java, design patterns, unit testing, Spring Boot and Angular.",
  },
  {
    title: "Web Design Diploma (with honors)",
    org: "NTI",
    place: "Egypt",
    text: "HTML5, CSS3, JavaScript and Angular.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Angular", "HTML5", "CSS3", "SCSS", "Tailwind CSS", "Material UI", "PrimeReact", "Bootstrap"],
  },
  { group: "State & data", items: ["Redux Toolkit", "React Query", "Zustand", "Context API", "React Router"] },
  { group: "Backend", items: ["Python", "Django", "Django REST Framework", "PHP", "Laravel", "REST APIs", "WebSockets"] },
  { group: "Databases", items: ["MySQL", "SQL"] },
  { group: "Testing & tools", items: ["Jest", "Unit testing", "Git", "GitHub", "Figma"] },
  { group: "Practices", items: ["Performance optimization", "Responsive design", "Component architecture", "Agile"] },
];
