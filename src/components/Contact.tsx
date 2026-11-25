import { useState, type FormEvent } from "react";
import { profile, web3formsKey } from "../data/profile";
import SectionTitle from "./SectionTitle";
import Socials from "./Socials";
import { MailIcon, PhoneIcon, PinIcon, SendIcon } from "./Icons";
import type { ToastFn } from "./Toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ toast }: { toast: ToastFn }) {
  const [sending, setSending] = useState(false);
  const [length, setLength] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!d.name.trim() || !d.email.trim() || !d.message.trim()) {
      toast("error", "Fill in your name, email and message, then send again.");
      return;
    }
    if (!EMAIL_RE.test(d.email)) {
      toast("error", "That email address doesn’t look right. Check it and send again.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Portfolio: ${d.subject.trim() || "New message"} (from ${d.name})`,
          from_name: "Portfolio contact form",
          replyto: d.email,
          name: d.name,
          email: d.email,
          message: d.message,
          botcheck: d.botcheck,
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.success) throw new Error(result.message || `HTTP ${res.status}`);
      form.reset();
      setLength(0);
      toast("success", `Thanks ${d.name}, your message was sent. I’ll reply to ${d.email} soon.`);
    } catch {
      toast("error", `The message didn’t go through. Email me directly at ${profile.email}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <SectionTitle kicker="Contact" title="Contact me" />
      <div className="contact-boxes">
        <div className="info-box wide">
          <PinIcon size={22} />
          <h3>My address</h3>
          <p>{profile.location}</p>
        </div>
        <div className="info-box">
          <h3>Social profiles</h3>
          <Socials />
        </div>
        <div className="info-box">
          <MailIcon size={22} />
          <h3>Email me</h3>
          <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        </div>
        <div className="info-box">
          <PhoneIcon size={22} />
          <h3>Call me</h3>
          <p><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></p>
        </div>
      </div>

      <form className="contact-form" onSubmit={onSubmit} noValidate>
        {/* Spam trap: hidden from people, bots fill it and Web3Forms drops those submissions. */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
        <div className="row">
          <label><span>Your name</span><input name="name" autoComplete="name" required /></label>
          <label><span>Your email</span><input name="email" type="email" autoComplete="email" required /></label>
        </div>
        <label><span>Subject</span><input name="subject" /></label>
        <label>
          <span>Message</span>
          <textarea name="message" rows={6} maxLength={1000} required onChange={(e) => setLength(e.target.value.length)} />
          <small className="counter">{length} / 1000</small>
        </label>
        <button className="btn btn-primary" type="submit" disabled={sending}>
          {sending ? <span className="spinner" aria-hidden /> : <SendIcon size={16} />}
          {sending ? "Sending…" : "Send message"}
        </button>
      </form>
    </>
  );
}
