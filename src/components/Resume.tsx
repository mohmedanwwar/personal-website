import { courses, education, experience, type TimelineItem } from "../data/resume";
import { profile } from "../data/profile";
import SectionTitle from "./SectionTitle";
import { cvHref } from "./Header";
import { DownloadIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

function Item({ item }: { item: TimelineItem }) {
  return (
    <div className="resume-item">
      <h4>{item.title}</h4>
      {item.start && <h5>{item.start}{item.end ? ` – ${item.end}` : ""}</h5>}
      <p className="org"><em>{item.org} · {item.place}</em></p>
      {item.text && <p>{item.text}</p>}
      {item.points && (
        <ul className="points">
          {item.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
      )}
      {item.stack && (
        <ul className="chips small" aria-label="Technologies">
          {item.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
      )}
    </div>
  );
}

export default function Resume() {
  return (
    <>
      <div className="resume-head">
        <SectionTitle kicker="Resume" title="Check my resume" />
        <a className="btn btn-primary" href={cvHref} download>
          <DownloadIcon /> Download CV (PDF)
        </a>
      </div>
      <div className="resume-grid">
        <div>
          <h3 className="resume-title">Summary</h3>
          <div className="resume-item summary">
            <h4>{profile.firstName} {profile.lastName}</h4>
            <p><em>{profile.intro}</em></p>
            <ul className="contact-lines">
              <li><PinIcon size={16} /> {profile.location}</li>
              <li><PhoneIcon size={16} /> {profile.phone}</li>
              <li><MailIcon size={16} /> {profile.email}</li>
            </ul>
          </div>

          <h3 className="resume-title">Education</h3>
          {education.map((e) => <Item key={e.title} item={e} />)}

          <h3 className="resume-title">Certifications & training</h3>
          {courses.map((e) => <Item key={e.title} item={e} />)}
        </div>
        <div>
          <h3 className="resume-title">Professional experience</h3>
          {experience.map((e) => <Item key={e.org} item={e} />)}
        </div>
      </div>
    </>
  );
}
