import { useMemo, useState } from "react";
import { categories, projects } from "../data/projects";
import SectionTitle from "./SectionTitle";
import { CodeIcon, ExternalIcon } from "./Icons";

export default function Portfolio() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const shown = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <SectionTitle kicker="Portfolio" title="My work" />
      <div className="filters" role="group" aria-label="Filter projects">
        {categories.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c} <span className="count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="projects">
        {shown.map((p) => (
          <article key={p.name} className={`project ${p.featured ? "featured" : ""}`}>
            <div className="project-top">
              <span className="project-cat">{p.category}</span>
              {p.featured && <span className="badge">Featured</span>}
            </div>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>
            <ul className="chips small" aria-label="Technologies">
              {p.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <div className="project-links">
              {p.live && (
                <a className="btn btn-primary btn-sm" href={p.live} target="_blank" rel="noreferrer">
                  <ExternalIcon size={16} /> Live demo
                </a>
              )}
              {p.code && (
                <a className="btn btn-ghost btn-sm" href={p.code} target="_blank" rel="noreferrer">
                  <CodeIcon size={16} /> Code
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="more">
        More on <a href="https://github.com/mohmedanwwar?tab=repositories" target="_blank" rel="noreferrer">GitHub</a>.
      </p>
    </>
  );
}
