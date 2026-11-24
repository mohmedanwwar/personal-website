import { useEffect, useRef, useState } from "react";
import Header, { sections, type SectionId } from "./components/Header";
import About from "./components/About";
import Resume from "./components/Resume";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import { useToasts } from "./components/Toast";

function readHash(): SectionId {
  const id = window.location.hash.replace("#", "");
  return (sections.find((s) => s.id === id)?.id ?? "home") as SectionId;
}

export default function App() {
  const [active, setActive] = useState<SectionId>(readHash);
  const { toast, view } = useToasts();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onHash = () => setActive(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const label = sections.find((s) => s.id === active)?.label;
    document.title = active === "home" ? "Mohamed Anwar · Frontend Engineer" : `${label} · Mohamed Anwar`;
    window.scrollTo({ top: 0 });
    if (active !== "home") mainRef.current?.focus({ preventScroll: true });
  }, [active]);

  return (
    <>
      <Header active={active} />
      {active !== "home" && (
        <main ref={mainRef} tabIndex={-1} className="panel" key={active}>
          <section className="container" id={active} aria-label={active}>
            {active === "about" && <About />}
            {active === "resume" && <Resume />}
            {active === "portfolio" && <Portfolio />}
            {active === "contact" && <Contact toast={toast} />}
          </section>
          <footer className="footer">
            Designed & built by <a href="https://github.com/mohmedanwwar/personal-website">Mohamed Anwar</a> with React
          </footer>
        </main>
      )}
      {view}
    </>
  );
}
