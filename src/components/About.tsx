import { profile } from "../data/profile";
import { skills } from "../data/resume";
import SectionTitle from "./SectionTitle";
import { ChevronIcon } from "./Icons";

export default function About() {
  const portrait = `${import.meta.env.BASE_URL}portrait.jpg`;
  const facts = [
    ["Role", "Software Engineer at Blnk"],
    ["Experience", "4+ years"],
    ["City", profile.location],
    ["Degree", profile.degree],
    ["Email", profile.email],
    ["Freelance", profile.freelance],
  ];
  return (
    <>
      <SectionTitle kicker="About" title="Learn more about me" />
      <div className="about-grid">
        <img className="about-photo" src={portrait} alt="Mohamed Anwar" width={535} height={941} loading="lazy" />
        <div className="about-content">
          <h3>{profile.headline}</h3>
          {profile.about.map((p) => <p key={p}>{p}</p>)}
          <ul className="facts">
            {facts.map(([k, v]) => (
              <li key={k}>
                <ChevronIcon size={16} />
                <strong>{k}:</strong> <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="stats">
        {profile.stats.map((s) => (
          <li key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </li>
        ))}
      </ul>

      <div className="skills">
        <div className="section-title small">
          <h2>Skills</h2>
          <p>What I work with</p>
        </div>
        <div className="skills-grid">
          {skills.map((g) => (
            <div key={g.group} className="skill-group">
              <h4>{g.group}</h4>
              <ul className="chips">
                {g.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
