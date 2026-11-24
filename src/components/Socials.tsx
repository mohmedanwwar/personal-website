import { profile } from "../data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, XIcon } from "./Icons";

export default function Socials() {
  const items = [
    { href: profile.socials.github, label: "GitHub", icon: <GitHubIcon /> },
    { href: profile.socials.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
    { href: profile.socials.x, label: "X (Twitter)", icon: <XIcon size={16} /> },
    { href: `mailto:${profile.email}`, label: "Email", icon: <MailIcon /> },
  ];
  return (
    <ul className="socials">
      {items.map((s) => (
        <li key={s.label}>
          <a href={s.href} aria-label={s.label} title={s.label} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            {s.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
