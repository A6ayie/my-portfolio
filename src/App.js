import { useState, useEffect, useRef } from "react";
import profilePhoto from "./Debo_image.jpeg";

const COLORS = {
  cream: "#F8F3E7",
  creamAlt: "#F0E4CB",
  white: "#FFFDF8",
  black: "#17140F",
  blackSoft: "#221D15",
  blackSofter: "#2C2519",
  brown: "#8B6239",
  brownDark: "#6E4C2C",
  brownLight: "#C89A66",
  brownPale: "rgba(139,98,57,0.12)",
  rust: "#A8451E",
  rustLight: "#E0925A",
  rustPale: "rgba(168,69,30,0.12)",
  stone: "#71583D",
  stoneOnDark: "#C7AD84",
  border: "rgba(23,20,15,0.1)",
  borderBrown: "rgba(139,98,57,0.3)",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600&family=Fira+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: ${COLORS.cream};
    --cream-alt: ${COLORS.creamAlt};
    --white: ${COLORS.white};
    --black: ${COLORS.black};
    --black-soft: ${COLORS.blackSoft};
    --black-softer: ${COLORS.blackSofter};
    --brown: ${COLORS.brown};
    --brown-dark: ${COLORS.brownDark};
    --brown-light: ${COLORS.brownLight};
    --brown-pale: ${COLORS.brownPale};
    --rust: ${COLORS.rust};
    --rust-light: ${COLORS.rustLight};
    --rust-pale: ${COLORS.rustPale};
    --stone: ${COLORS.stone};
    --stone-on-dark: ${COLORS.stoneOnDark};
    --border: ${COLORS.border};
    --border-brown: ${COLORS.borderBrown};
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--cream);
    color: var(--black);
    font-family: 'Outfit', sans-serif;
    font-weight: 400;
    overflow-x: hidden;
    cursor: none;
  }
  ::selection { background: var(--brown); color: var(--cream); }

  /* GRAIN TEXTURE */
  .grain {
    position: fixed; inset: 0; z-index: 2; pointer-events: none;
    opacity: 0.035; mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  }

  /* CUSTOM CURSOR */
  .cursor {
    position: fixed; width: 8px; height: 8px;
    background: var(--brown); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transition: transform 0.1s ease;
  }
  .cursor-ring {
    position: fixed; width: 32px; height: 32px;
    border: 1.5px solid var(--rust);
    border-radius: 50%; pointer-events: none; z-index: 9998;
    transition: transform 0.3s ease, opacity 0.3s;
    opacity: 0.5;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.4rem 5rem;
    transition: background 0.4s, box-shadow 0.4s;
  }
  nav.scrolled {
    background: rgba(248,243,231,0.9);
    backdrop-filter: blur(16px);
    box-shadow: 0 1px 0 var(--border);
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; letter-spacing: 0.02em; color: var(--black);
    text-decoration: none; font-weight: 600;
  }
  .nav-logo span { color: var(--brown); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-family: 'Fira Mono', monospace;
    font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--stone); text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--brown); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; padding: 0 5rem;
    position: relative; overflow: hidden;
    background: radial-gradient(ellipse 80% 60% at 75% 30%, rgba(139,98,57,0.10), transparent 65%), var(--cream);
  }
  .hero-pattern {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden;
  }
  .particle-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .hero-eyebrow {
    font-family: 'Fira Mono', monospace;
    font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--brown); margin-bottom: 1.4rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .hero-eyebrow::before { content: ''; display: block; width: 36px; height: 1.5px; background: var(--brown); }
  .hero-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3.2rem, 6.5vw, 5.5rem);
    font-weight: 600; line-height: 1.0; color: var(--black); margin-bottom: 1.2rem;
  }
  .hero-name em { font-style: italic; color: var(--rust); }
  .hero-subtitle {
    font-size: 1.0rem; font-weight: 300; color: var(--stone);
    line-height: 1.8; max-width: 420px; margin-bottom: 2.8rem;
  }
  .hero-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    font-family: 'Fira Mono', monospace;
    font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 0.85rem 2rem;
    background: var(--brown); color: var(--cream);
    border: 2px solid var(--brown);
    cursor: none; text-decoration: none; border-radius: 2px;
    transition: background 0.25s, border-color 0.25s;
    display: inline-block;
  }
  .btn-primary:hover { background: var(--brown-dark); border-color: var(--brown-dark); }
  .btn-outline {
    font-family: 'Fira Mono', monospace;
    font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 0.85rem 2rem;
    background: transparent; color: var(--rust);
    border: 2px solid var(--rust);
    cursor: none; text-decoration: none; border-radius: 2px;
    transition: all 0.25s; display: inline-block;
  }
  .btn-outline:hover { background: var(--rust-pale); }

  /* PHOTO CARD */
  .hero-right {
    display: flex; align-items: center; justify-content: center;
    height: 100vh; position: relative;
  }
  .photo-frame {
    position: relative; width: 340px;
  }
  .photo-accent {
    position: absolute; top: -16px; left: -16px;
    width: 340px; height: 420px;
    border: 2px solid var(--brown);
    border-radius: 4px; z-index: 0; opacity: 0.55;
  }
  .photo-accent-2 {
    position: absolute; bottom: -16px; right: -16px;
    width: 200px; height: 200px;
    background: var(--brown-pale);
    border: 2px solid var(--rust);
    border-radius: 4px; z-index: 0;
  }
  .photo-img {
    position: relative; z-index: 1;
    width: 100%; height: 420px; object-fit: cover;
    object-position: center top;
    border-radius: 4px;
    box-shadow: 0 24px 60px rgba(23,20,15,0.2);
    display: block;
  }
  .photo-badge {
    position: absolute; bottom: -24px; right: -24px; z-index: 2;
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: 4px;
    padding: 1rem 1.2rem;
    box-shadow: 0 8px 24px rgba(23,20,15,0.12);
    min-width: 160px;
  }
  .badge-stat { font-size: 1.6rem; font-weight: 600; font-family: 'Playfair Display', serif; color: var(--brown); line-height: 1; }
  .badge-label { font-size: 0.58rem; font-family: 'Fira Mono', monospace; letter-spacing: 0.12em; text-transform: uppercase; color: var(--stone); margin-top: 4px; }

  /* SECTIONS */
  section { padding: 6rem 5rem; position: relative; z-index: 1; }
  .section-label {
    font-family: 'Fira Mono', monospace;
    font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--brown); display: flex; align-items: center; gap: 1rem;
    margin-bottom: 0.8rem;
  }
  .section-label::after { content: ''; flex: 1; max-width: 60px; height: 1.5px; background: var(--brown); opacity: 0.5; }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4.5vw, 3.5rem);
    font-weight: 600; line-height: 1.1; color: var(--black); margin-bottom: 0.6rem;
  }
  .section-title em { font-style: italic; color: var(--rust); }

  /* ABOUT */
  .about-section { background: var(--cream-alt); }
  .about-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 5rem; align-items: start; margin-top: 3.5rem; }
  .about-text { font-size: 0.96rem; line-height: 1.9; color: var(--stone); }
  .about-text p + p { margin-top: 1.1rem; }
  .meta-row { display: flex; flex-wrap: wrap; gap: 1.4rem 3rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
  .meta-item-wide { flex-basis: 100%; max-width: 480px; }
  .meta-item-label { font-family: 'Fira Mono', monospace; font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--stone); margin-bottom: 4px; }
  .meta-item-val { font-size: 0.88rem; font-weight: 500; color: var(--black); }
  .meta-item-val.accent { color: var(--brown); }

  .edu-card {
    background: var(--white);
    border: 1.5px solid var(--border);
    border-left: 4px solid var(--brown);
    border-radius: 4px;
    padding: 1.6rem; margin-bottom: 1rem;
  }
  .edu-year { font-family: 'Fira Mono', monospace; font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--rust); margin-bottom: 6px; }
  .edu-school { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 600; color: var(--black); margin-bottom: 2px; }
  .edu-degree { font-size: 0.8rem; color: var(--stone); margin-bottom: 10px; }
  .tag-row { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
  .tag {
    font-family: 'Fira Mono', monospace; font-size: 0.52rem; letter-spacing: 0.08em;
    padding: 3px 9px; border-radius: 2px;
    background: var(--brown-pale); color: var(--brown); border: 1px solid var(--border-brown);
  }

  /* SKILLS */
  .skills-section { background: var(--black); }
  .skills-section .section-label { color: var(--brown-light); }
  .skills-section .section-label::after { background: var(--brown-light); }
  .skills-section .section-title { color: var(--cream); }
  .skills-section .section-title em { color: var(--rust-light); }
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3.5rem; }
  .skill-block {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px; padding: 2rem;
    transition: background 0.3s, border-color 0.3s;
  }
  .skill-block:hover { background: rgba(255,255,255,0.09); border-color: rgba(224,146,90,0.4); }
  .skill-icon {
    width: 42px; height: 42px; border-radius: 4px; margin-bottom: 1.3rem;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Fira Mono', monospace; font-size: 0.85rem; font-weight: 500;
    background: rgba(255,255,255,0.07);
  }
  .icon-e { color: var(--brown-light); border: 1px solid rgba(200,154,102,0.35); }
  .icon-g { color: var(--rust-light); border: 1px solid rgba(224,146,90,0.35); }
  .icon-w { color: var(--cream); border: 1px solid rgba(248,243,231,0.25); }
  .skill-block-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: var(--cream); margin-bottom: 1rem; }
  .pill-list { display: flex; flex-wrap: wrap; gap: 5px; }
  .pill {
    font-family: 'Fira Mono', monospace; font-size: 0.5rem; letter-spacing: 0.07em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 2px;
    background: rgba(255,255,255,0.06); color: var(--stone-on-dark);
    border: 1px solid rgba(255,255,255,0.12); transition: all 0.2s;
  }
  .pill:hover { background: rgba(255,255,255,0.12); color: var(--cream); }

  /* EXPERIENCE */
  .exp-section { background: var(--cream); }
  .exp-item {
    display: grid; grid-template-columns: 200px 1fr;
    gap: 3rem; padding: 2.8rem 0;
    border-bottom: 1px solid var(--border);
  }
  .exp-item:first-child { border-top: 1px solid var(--border); }
  .exp-date { font-family: 'Fira Mono', monospace; font-size: 0.62rem; letter-spacing: 0.1em; color: var(--rust); padding-top: 4px; }
  .exp-loc { font-size: 0.62rem; font-family: 'Fira Mono', monospace; color: var(--stone); margin-top: 5px; letter-spacing: 0.08em; }
  .exp-company { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 600; color: var(--black); margin-bottom: 2px; }
  .exp-role { font-family: 'Fira Mono', monospace; font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--brown); margin-bottom: 1rem; }
  .exp-bullets { list-style: none; }
  .exp-bullets li {
    font-size: 0.88rem; line-height: 1.8; color: var(--stone);
    padding-left: 1.2rem; position: relative; margin-bottom: 4px;
  }
  .exp-bullets li::before { content: '—'; position: absolute; left: 0; color: var(--brown); font-size: 0.7rem; top: 4px; }

  /* PROJECTS */
  .projects-section { background: var(--cream-alt); }
  .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 3.5rem; }
  .project-card {
    background: var(--white); border: 1.5px solid var(--border);
    border-radius: 4px; padding: 2rem; position: relative; overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  }
  .project-card:hover {
    border-color: var(--border-brown);
    box-shadow: 0 12px 40px rgba(23,20,15,0.1);
    transform: translateY(-3px);
  }
  .project-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2.5px; background: linear-gradient(90deg, var(--brown), var(--rust));
    transform: scaleX(0); transition: transform 0.35s; transform-origin: left;
  }
  .project-card:hover::after { transform: scaleX(1); }
  .project-num {
    font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 600;
    color: rgba(23,20,15,0.05); position: absolute; top: 1rem; right: 1.2rem; line-height: 1;
  }
  .project-badge {
    display: inline-block; font-family: 'Fira Mono', monospace; font-size: 0.52rem;
    letter-spacing: 0.1em; padding: 3px 10px; margin-bottom: 1rem;
    text-transform: uppercase; border-radius: 2px;
  }
  .badge-win { background: var(--brown-pale); border: 1px solid var(--border-brown); color: var(--brown); }
  .badge-live { background: var(--rust-pale); border: 1px solid rgba(168,69,30,0.3); color: var(--rust); }
  .badge-wip { background: rgba(23,20,15,0.05); border: 1px solid var(--border); color: var(--stone); }
  .project-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 600; color: var(--black); margin-bottom: 0.6rem; }
  .project-desc { font-size: 0.83rem; line-height: 1.8; color: var(--stone); margin-bottom: 1.2rem; }
  .tech-row { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 1.2rem; }
  .tech-chip {
    font-family: 'Fira Mono', monospace; font-size: 0.5rem; letter-spacing: 0.06em;
    padding: 3px 8px; border-radius: 2px;
    background: var(--cream); color: var(--stone);
    border: 1px solid var(--border); text-transform: uppercase;
  }
  .proj-link {
    font-family: 'Fira Mono', monospace; font-size: 0.58rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--brown); text-decoration: none;
    display: inline-flex; align-items: center; gap: 4px; transition: color 0.2s;
  }
  .proj-link:hover { color: var(--rust); }
  .more-projects { margin-top: 4rem; }
  .more-projects-label {
    font-family: 'Fira Mono', monospace; font-size: 0.58rem; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--brown); margin-bottom: 0.5rem;
  }
  .more-project-item {
    display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem;
    padding: 1.2rem 0; border-bottom: 1px solid var(--border);
  }
  .more-project-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 600; color: var(--black); }
  .more-project-desc { font-size: 0.8rem; line-height: 1.6; color: var(--stone); margin-top: 4px; max-width: 560px; }
  .more-project-tech { font-family: 'Fira Mono', monospace; font-size: 0.55rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--stone); margin-top: 8px; }
  .more-project-link {
    font-family: 'Fira Mono', monospace; font-size: 0.58rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--brown); text-decoration: none;
    white-space: nowrap; flex-shrink: 0; transition: color 0.2s;
  }
  .more-project-link:hover { color: var(--rust); }
  .projects-more { margin-top: 3rem; text-align: center; }

  /* CONTACT */
  .contact-section { background: var(--cream); }
  .contact-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; margin-top: 3.5rem; }
  .contact-intro { font-size: 1rem; line-height: 1.85; color: var(--stone); margin-bottom: 2rem; }
  .contact-links { display: flex; flex-direction: column; gap: 0.5rem; }
  .contact-link {
    display: flex; align-items: center; gap: 1rem;
    font-size: 0.88rem; color: var(--stone);
    text-decoration: none; padding: 0.85rem 0;
    border-bottom: 1px solid var(--border);
    transition: color 0.2s;
  }
  .contact-link:hover { color: var(--black); }
  .contact-link:hover .link-icon { background: var(--brown); color: var(--cream); border-color: var(--brown); }
  .link-icon {
    width: 34px; height: 34px; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    border: 1.5px solid var(--border); background: var(--white);
    font-size: 0.65rem; font-family: 'Fira Mono', monospace; color: var(--brown);
    flex-shrink: 0; transition: all 0.2s;
  }
  .avail-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Fira Mono', monospace; font-size: 0.6rem; letter-spacing: 0.1em;
    padding: 0.55rem 1.1rem; border-radius: 2px;
    border: 1.5px solid var(--border-brown);
    background: var(--brown-pale); color: var(--brown);
    margin-bottom: 2rem;
  }
  .avail-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brown); animation: blink 2s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .contact-meta { font-size: 0.83rem; line-height: 2; color: var(--stone); }

  /* FOOTER */
  footer {
    padding: 1.8rem 5rem;
    border-top: 1px solid var(--border);
    background: var(--cream-alt);
    position: relative; z-index: 1;
  }
  .footer-verse {
    text-align: center; margin-bottom: 1.2rem;
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 0.8rem; color: var(--stone); line-height: 1.6;
  }
  .footer-verse-ref { font-family: 'Fira Mono', monospace; font-style: normal; font-size: 0.55rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--brown); }
  .footer-row { display: flex; justify-content: space-between; align-items: center; }
  .footer-copy { font-family: 'Fira Mono', monospace; font-size: 0.56rem; letter-spacing: 0.1em; color: var(--stone); }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 1rem; color: var(--brown); font-style: italic; }

  /* FADE IN */
  .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* MOBILE */
  @media (max-width: 960px) {
    nav { padding: 1.2rem 2rem; }
    .hero { grid-template-columns: 1fr; padding: 6rem 2rem 4rem; min-height: auto; gap: 3rem; }
    .hero-right { height: auto; justify-content: flex-start; }
    .photo-frame { width: 260px; }
    .photo-img { height: 320px; }
    .photo-badge { bottom: -16px; right: -16px; }
    section { padding: 4rem 2rem; }
    .about-grid, .skills-grid, .contact-inner { grid-template-columns: 1fr; gap: 2rem; }
    .exp-item { grid-template-columns: 1fr; gap: 0.4rem; }
    .projects-grid { grid-template-columns: 1fr; }
    .more-project-item { flex-direction: column; gap: 0.6rem; }
    footer { padding: 1.5rem 2rem; }
    .footer-row { flex-direction: column; gap: 0.8rem; text-align: center; }
  }
  @media (max-width: 600px) {
    .nav-links { display: none; }
    .hero-name { font-size: 2.8rem; }
    .photo-accent-2 { display: none; }
    body { cursor: auto; }
    .cursor, .cursor-ring { display: none; }
  }
`;

const skillGroups = [
  {
    icon: "</>",
    cls: "icon-e",
    title: "Languages",
    pills: ["C++", "C", "Python", "Java", "JavaScript", "OCaml", "R"],
  },
  {
    icon: "{ }",
    cls: "icon-g",
    title: "Frameworks & Tools",
    pills: ["React", "SFML", "Bootstrap", "Git/GitHub"],
  },
  {
    icon: "DB",
    cls: "icon-w",
    title: "Data & Backend",
    pills: ["PostgreSQL", "Supabase", "Pandas", "Matplotlib"],
  },
];

const experience = [
  {
    date: "Nov 2024 — Present",
    loc: "Middletown, CT",
    company: "Instructional Media Service",
    role: "Classroom Support Manager",
    bullets: [
      "Manage 20+ tech staff, coordinating shift schedules and resource allocation for smooth operations across classrooms.",
      "Train staff on AV troubleshooting and ServiceNow workflows while developing tools to track system usage.",
    ],
  },
  {
    date: "Aug 2025 — Dec 2025",
    loc: "Middletown, CT",
    company: "Wesleyan University",
    role: "Teaching Assistant, Intro to Programming (Python)",
    bullets: [
      "Led lab sessions for 10 students, covering control flow, functions, and data structures with hands-on debugging support.",
      "Responded to student inquiries weekly on course discussion forums, guiding students to improve coding proficiency.",
      "Evaluated assignments, projects, and exams, checking for code correctness, style, and logic.",
    ],
  },
  {
    date: "Sep 2023 — Dec 2023",
    loc: "Accra, Ghana",
    company: "Abibiman Ghana",
    role: "Software Engineer Intern",
    bullets: [
      "Built a responsive healthcare website using JavaScript and Bootstrap, collaborating with cross-functional team members to implement frontend features.",
      "Led user testing and resolved 10+ usability and performance issues while documenting development workflows for consistent team delivery.",
    ],
  },
];

const projects = [
  {
    n: "01",
    title: "IMS Workflow Portal",
    badge: "badge-live",
    badgeLabel: "In Production",
    desc: "A full-stack platform used by 20+ AV technicians for real-time classroom condition reporting, with role-based authentication, an admin analytics dashboard, and an interactive 3D equipment viewer backed by a searchable troubleshooting knowledge base.",
    tech: ["JavaScript", "React", "Supabase", "PostgreSQL"],
    links: [],
  },
  {
    n: "02",
    title: "Vehicle Dynamics & Engine Simulation",
    badge: "badge-wip",
    badgeLabel: "Completed",
    desc: "A real-time C++ vehicle physics simulator modeling engine torque, aerodynamic drag, and tire friction across 9 vehicles, with an SFML dashboard featuring live telemetry, benchmark-validated 0–100 km/h testing, and RPM-based engine audio.",
    tech: ["C++17", "SFML", "OOP"],
    links: [
      {
        label: "GitHub ↗",
        href: "https://github.com/A6ayie/Vehicle-Dynamics-and-Engine-Simulation",
      },
    ],
  },
  {
    n: "03",
    title: "CoThrift",
    badge: "badge-win",
    badgeLabel: "🏆 Hoya Hacks Winner",
    desc: "A sustainability-focused full-stack marketplace for exchanging secondhand clothing, dorm essentials, and electronics on college campuses — built in 24 hours for Microsoft Hoya Hacks 2025.",
    tech: ["PHP", "MySQL", "JavaScript"],
    links: [],
  },
  {
    n: "04",
    title: "DataFest 2025",
    badge: "badge-win",
    badgeLabel: "🏆 Best Business Value",
    desc: "Cleaned and analyzed a large real-world dataset in R, translating statistical findings into a data-driven business narrative for the American Statistical Association's DataFest 2025 challenge.",
    tech: ["R", "Data Analysis", "Statistics"],
    links: [],
  },
];

const moreProjects = [
  {
    title: "MoviFy",
    desc: "A Netflix-inspired mock streaming platform built from scratch while self-teaching HTML/CSS — category browsing, a sign-up flow, and an about page.",
    tech: ["HTML", "CSS"],
    href: "https://github.com/A6ayie/MoviFy",
  },
  {
    title: "DebbieShop",
    desc: "A redesigned mock e-commerce site with product listings, a shopping cart, and a full checkout flow.",
    tech: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/A6ayie/DebbieShop",
  },
  {
    title: "Financial Budget Tracker",
    desc: "A Python budgeting tool to track and manage personal finances, built as a final project for Intro to CS coursework.",
    tech: ["Python"],
    href: "https://github.com/A6ayie/Financial-budget-tracker",
  },
];

function FadeInSection({ children, style }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="fade-in" style={style}>
      {children}
    </div>
  );
}

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const DOT = "139,98,57";
    const LINE = "168,69,30";
    const COUNT = 70;
    let width, height, particles, animId;

    function resize() {
      width = canvas.width = canvas.offsetWidth * dpr;
      height = canvas.height = canvas.offsetHeight * dpr;
    }

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
        r: (Math.random() * 1.2 + 0.6) * dpr,
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT},0.4)`;
        ctx.fill();
      }
      const maxDist = 140 * dpr;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${LINE},${0.14 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.6 * dpr;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(tick);
    }

    init();
    tick();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

function FooterVerse() {
  const [verse, setVerse] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchVerse(attemptsLeft) {
      try {
        const res = await fetch("https://bible-api.com/data/kjv/random");
        const data = await res.json();
        const v = data.random_verse;
        const text = v.text.trim().replace(/\s+/g, " ");
        if (text.length < 60 && attemptsLeft > 0) {
          return fetchVerse(attemptsLeft - 1);
        }
        if (!cancelled) {
          setVerse({ text, reference: `${v.book} ${v.chapter}:${v.verse}` });
        }
      } catch {
        // silently omit the verse line if the API is unreachable
      }
    }

    fetchVerse(4);
    return () => {
      cancelled = true;
    };
  }, []);

  if (!verse) return null;

  return (
    <div className="footer-verse">
      "{verse.text}"
      <span className="footer-verse-ref"> — {verse.reference} (KJV)</span>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef();
  const ringRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 4 + "px";
        cursorRef.current.style.top = e.clientY - 4 + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX - 16 + "px";
        ringRef.current.style.top = e.clientY - 16 + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="grain" />
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#home" className="nav-logo">
          Deborah <span>Abayie</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-pattern">
          <ParticleField />
        </div>
        <div>
          <FadeInSection>
            <div className="hero-eyebrow">Computer Science Student</div>
            <h1 className="hero-name">
              Deborah
              <br />
              <em>Abayie</em>
            </h1>
            <p className="hero-subtitle">
              Software engineer building full-stack platforms and simulations
              — from campus operations tools to real-time physics engines.
              Wesleyan University, Class of 2028.
            </p>
            <div className="hero-cta-row">
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn-outline">
                Get In Touch
              </a>
            </div>
          </FadeInSection>
        </div>
        <div className="hero-right">
          <FadeInSection style={{ transitionDelay: "0.2s" }}>
            <div className="photo-frame">
              <div className="photo-accent" />
              <div className="photo-accent-2" />
              <img
                src={profilePhoto}
                alt="Deborah Abayie"
                className="photo-img"
              />
              <div className="photo-badge">
                <div className="badge-stat">6+</div>
                <div className="badge-label">Projects Built</div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <FadeInSection>
          <div className="section-label">About</div>
          <h2 className="section-title">
            Code, craft &<br />
            <em>community</em>
          </h2>
        </FadeInSection>
        <div className="about-grid">
          <FadeInSection>
            <div className="about-text">
              <p>
                I'm a Computer Science student at Wesleyan University. My
                path into tech started with curiosity and a lot of
                self-teaching — I built my first website by reading docs and
                experimenting late into the night.
              </p>
              <p>
                From interning at a healthcare company in Accra to winning the
                sustainability track at Hoya Hacks 2025 and the Best Business
                Value award at DataFest 2025, I gravitate toward projects
                where engineering meets real human needs — most recently
                building a full-stack workflow portal and a C++ vehicle
                physics simulator.
              </p>
              <p>
                Outside the classroom, I lead AV operations for Wesleyan's
                Instructional Media Service. When I'm not building things,
                you'll find me cooking, drawing, or singing.
              </p>
            </div>
            <div className="meta-row">
              <div>
                <div className="meta-item-label">Location</div>
                <div className="meta-item-val">Middletown, CT</div>
              </div>
              <div>
                <div className="meta-item-label">Status</div>
                <div className="meta-item-val accent">Open to Opportunities</div>
              </div>
              <div className="meta-item-wide">
                <div className="meta-item-label">Beyond The Code</div>
                <div className="meta-item-val">
                  Co-Founder, Passion for Impact Foundation · Volunteer, JCL
                  (Just Christ-Like) Children's Foundation
                </div>
              </div>
            </div>
          </FadeInSection>
          <FadeInSection style={{ transitionDelay: "0.15s" }}>
            <div className="edu-card">
              <div className="edu-year">Aug 2024 — Expected May 2028</div>
              <div className="edu-school">Wesleyan University</div>
              <div className="edu-degree">
                Major in Computer Science
              </div>
              <div className="tag-row">
                {[
                  "Data Structures & Algorithms",
                  "Object-Oriented Programming",
                  "Functional Programming",
                  "Web Development",
                  "SQL & Databases",
                  "Discrete Mathematics",
                ].map((c) => (
                  <span key={c} className="tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills-section">
        <FadeInSection>
          <div className="section-label">Technical Skills</div>
          <h2 className="section-title">
            Languages &<br />
            <em>tools</em>
          </h2>
        </FadeInSection>
        <div className="skills-grid">
          {skillGroups.map((b, i) => (
            <FadeInSection
              key={b.title}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="skill-block">
                <div className={`skill-icon ${b.cls}`}>{b.icon}</div>
                <div className="skill-block-title">{b.title}</div>
                <div className="pill-list">
                  {b.pills.map((p) => (
                    <span key={p} className="pill">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="exp-section">
        <FadeInSection>
          <div className="section-label">Experience</div>
          <h2 className="section-title">
            Where I've
            <br />
            <em>worked</em>
          </h2>
        </FadeInSection>
        <div style={{ marginTop: "3.5rem" }}>
          {experience.map((job, i) => (
            <FadeInSection key={job.company + job.role}>
              <div className="exp-item">
                <div>
                  <div className="exp-date">{job.date}</div>
                  <div className="exp-loc">{job.loc}</div>
                </div>
                <div>
                  <div className="exp-company">{job.company}</div>
                  <div className="exp-role">{job.role}</div>
                  <ul className="exp-bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section">
        <FadeInSection>
          <div className="section-label">Projects</div>
          <h2 className="section-title">
            Things I've
            <br />
            <em>built</em>
          </h2>
        </FadeInSection>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <FadeInSection
              key={p.title}
              style={{ transitionDelay: `${(i % 2) * 0.1}s` }}
            >
              <div className="project-card">
                <div className="project-num">{p.n}</div>
                <span className={`project-badge ${p.badge}`}>
                  {p.badgeLabel}
                </span>
                <div className="project-title">{p.title}</div>
                <p className="project-desc">{p.desc}</p>
                <div className="tech-row">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
                {p.links.length > 0 && (
                  <div style={{ display: "flex", gap: "1rem" }}>
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        className="proj-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </FadeInSection>
          ))}
        </div>
        <FadeInSection>
          <div className="more-projects">
            <div className="more-projects-label">More On GitHub</div>
            {moreProjects.map((p) => (
              <div key={p.title} className="more-project-item">
                <div>
                  <div className="more-project-title">{p.title}</div>
                  <p className="more-project-desc">{p.desc}</p>
                  <div className="more-project-tech">{p.tech.join(" · ")}</div>
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="more-project-link"
                >
                  GitHub ↗
                </a>
              </div>
            ))}
          </div>
          <div className="projects-more">
            <a
              href="https://github.com/A6ayie"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              View Full GitHub Profile ↗
            </a>
          </div>
        </FadeInSection>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <FadeInSection>
          <div className="section-label">Contact</div>
          <h2 className="section-title">
            Let's build
            <br />
            <em>something</em>
          </h2>
        </FadeInSection>
        <div className="contact-inner">
          <FadeInSection>
            <p className="contact-intro">
              Whether it's an internship, collaboration, or just a conversation
              about tech — I'd love to connect.
            </p>
            <div className="contact-links">
              <a href="mailto:dabayie@wesleyan.edu" className="contact-link">
                <div className="link-icon">@</div>
                dabayie@wesleyan.edu
              </a>
              <a
                href="https://linkedin.com/in/deborah-abayie1"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <div className="link-icon">in</div>
                linkedin.com/in/deborah-abayie1
              </a>
              <a
                href="https://github.com/A6ayie"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <div className="link-icon">gh</div>
                github.com/A6ayie
              </a>
            </div>
          </FadeInSection>
          <FadeInSection style={{ transitionDelay: "0.15s" }}>
            <div className="avail-badge">
              <div className="avail-dot" />
              Open to Summer 2027 Internships
            </div>
            <div className="contact-meta">
              <div>Currently studying at Wesleyan University, CT</div>
              <div>Open to remote and in-person roles</div>
              <div>Interests: Full-Stack Development · Systems & Simulation · Data</div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <FooterVerse />
        <div className="footer-row">
          <div className="footer-copy">
            © 2026 Deborah Abayie · Designed & Built with React
          </div>
          <div className="footer-logo">D.A.</div>
        </div>
      </footer>
    </>
  );
}
