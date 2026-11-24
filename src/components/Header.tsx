import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { useTyped } from "./useTyped";
import Socials from "./Socials";
import { CloseIcon, DownloadIcon, MenuIcon } from "./Icons";

export type SectionId = "home" | "about" | "resume" | "portfolio" | "contact";
export const sections: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export const cvHref = `${import.meta.env.BASE_URL}${profile.cv}`;

export default function Header({ active }: { active: SectionId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const typed = useTyped(profile.roles);
  const home = active === "home";

  useEffect(() => setMenuOpen(false), [active]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header className={`header ${home ? "is-home" : "is-compact"}`}>
      <div className="header-photo" aria-hidden />
      <div className="header-inner">
        <div className="header-text">
          {home && (
            <p className="hello">
              <span>Hello</span>, my name is
            </p>
          )}
          <h1 className="name">
            <a href="#home">{profile.firstName} {profile.lastName}</a>
          </h1>
          {home && (
            <>
              <p className="role">
                I’m a <span className="typed">{typed}</span>
                <span className="caret" aria-hidden>|</span>
                <span className="sr">{profile.roles[0]}</span>
              </p>
              <p className="hero-intro">{profile.intro}</p>
            </>
          )}
        </div>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
        </button>

        <nav id="site-nav" className={`nav ${menuOpen ? "open" : ""}`} aria-label="Main">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? "page" : undefined}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {home && (
          <div className="hero-bottom">
            <div className="hero-actions">
              <a className="btn btn-primary" href={cvHref} download>
                <DownloadIcon /> Download CV
              </a>
              <a className="btn btn-ghost" href="#portfolio">View my work</a>
            </div>
            <Socials />
          </div>
        )}
      </div>
      {home && (
        <p className="credits">Designed & built by <a href={profile.socials.github}>{profile.firstName} {profile.lastName}</a></p>
      )}
    </header>
  );
}
