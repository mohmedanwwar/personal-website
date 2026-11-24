# Mohamed Anwar — Portfolio

Personal site built with React, TypeScript and Vite, deployed to GitHub Pages by GitHub Actions.

**Live:** https://mohmedanwwar.github.io/personal-website/

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (http://localhost:5173/personal-website/).

## Edit the content

All text lives in `src/data/`, so you rarely need to touch components:

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, typed roles, intro, about text, stats, contact links, CV file, EmailJS keys |
| `resume.ts` | Experience, education, courses and skill groups |
| `projects.ts` | Projects with category, stack, live demo and code links (`featured: true` adds the badge) |

The Download CV buttons serve `public/Mohamed-Anwar-CV.pdf`. To update your CV, replace that file and keep the name (or change `cv` in `profile.ts`).

## Deploy

Every push to `main` builds the site and publishes it. One-time setup: in the repo go to
**Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

## Contact form

Messages are sent with [EmailJS](https://www.emailjs.com/) using the service and template IDs in `profile.ts`.
