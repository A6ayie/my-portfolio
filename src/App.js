import { useState, useEffect, useRef } from "react";
import profilePhoto from "./Debo_image.jpeg";

const PHOTO_B64 =
  "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";

const COLORS = {
  emerald: "#065F46",
  emeraldMid: "#047857",
  emeraldLight: "#10B981",
  emeraldPale: "#D1FAE5",
  gold: "#B45309",
  goldMid: "#D97706",
  goldLight: "#F59E0B",
  goldPale: "#FEF3C7",
  cream: "#FAFAF7",
  white: "#FFFFFF",
  stone: "#78716C",
  stoneLight: "#A8A29E",
  dark: "#1C1917",
  darkCard: "#292524",
  border: "rgba(6,95,70,0.12)",
  borderGold: "rgba(180,83,9,0.18)",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600&family=Fira+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --emerald: ${COLORS.emerald};
    --emerald-mid: ${COLORS.emeraldMid};
    --emerald-light: ${COLORS.emeraldLight};
    --emerald-pale: ${COLORS.emeraldPale};
    --gold: ${COLORS.gold};
    --gold-mid: ${COLORS.goldMid};
    --gold-light: ${COLORS.goldLight};
    --gold-pale: ${COLORS.goldPale};
    --cream: ${COLORS.cream};
    --white: ${COLORS.white};
    --stone: ${COLORS.stone};
    --stone-light: ${COLORS.stoneLight};
    --dark: ${COLORS.dark};
    --border: ${COLORS.border};
    --border-gold: ${COLORS.borderGold};
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--cream);
    color: var(--dark);
    font-family: 'Outfit', sans-serif;
    font-weight: 400;
    overflow-x: hidden;
    cursor: none;
  }
  ::selection { background: var(--emerald-pale); color: var(--emerald); }

  /* CUSTOM CURSOR */
  .cursor {
    position: fixed; width: 8px; height: 8px;
    background: var(--emerald); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transition: transform 0.1s ease;
  }
  .cursor-ring {
    position: fixed; width: 32px; height: 32px;
    border: 1.5px solid var(--gold-mid);
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
    background: rgba(250,250,247,0.94);
    backdrop-filter: blur(16px);
    box-shadow: 0 1px 0 var(--border);
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem; letter-spacing: 0.04em; color: var(--emerald);
    text-decoration: none; font-weight: 600;
  }
  .nav-logo span { color: var(--gold-mid); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-family: 'Fira Mono', monospace;
    font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--stone); text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--emerald); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; padding: 0 5rem;
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, var(--cream) 60%, var(--emerald-pale) 100%);
  }
  .hero-pattern {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden; opacity: 0.35;
  }
  .hero-pattern svg { width: 100%; height: 100%; }
  .hero-eyebrow {
    font-family: 'Fira Mono', monospace;
    font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--emerald-mid); margin-bottom: 1.4rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .hero-eyebrow::before { content: ''; display: block; width: 36px; height: 1.5px; background: var(--emerald-light); }
  .hero-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3.2rem, 6.5vw, 5.5rem);
    font-weight: 600; line-height: 1.0; color: var(--dark); margin-bottom: 1.2rem;
  }
  .hero-name em { font-style: italic; color: var(--emerald); }
  .hero-subtitle {
    font-size: 1.0rem; font-weight: 300; color: var(--stone);
    line-height: 1.8; max-width: 400px; margin-bottom: 2.8rem;
  }
  .hero-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    font-family: 'Fira Mono', monospace;
    font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 0.85rem 2rem;
    background: var(--emerald); color: var(--white);
    border: 2px solid var(--emerald);
    cursor: none; text-decoration: none; border-radius: 2px;
    transition: background 0.25s, color 0.25s;
    display: inline-block;
  }
  .btn-primary:hover { background: var(--emerald-mid); border-color: var(--emerald-mid); }
  .btn-outline {
    font-family: 'Fira Mono', monospace;
    font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 0.85rem 2rem;
    background: transparent; color: var(--gold);
    border: 2px solid var(--gold-mid);
    cursor: none; text-decoration: none; border-radius: 2px;
    transition: all 0.25s; display: inline-block;
  }
  .btn-outline:hover { background: var(--gold-pale); }

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
    border: 2px solid var(--emerald-light);
    border-radius: 4px; z-index: 0; opacity: 0.5;
  }
  .photo-accent-2 {
    position: absolute; bottom: -16px; right: -16px;
    width: 200px; height: 200px;
    background: var(--gold-pale);
    border: 2px solid var(--gold-light);
    border-radius: 4px; z-index: 0;
  }
  .photo-img {
    position: relative; z-index: 1;
    width: 100%; height: 420px; object-fit: cover;
    object-position: center top;
    border-radius: 4px;
    box-shadow: 0 24px 60px rgba(6,95,70,0.18);
    display: block;
  }
  .photo-badge {
    position: absolute; bottom: -24px; right: -24px; z-index: 2;
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: 4px;
    padding: 1rem 1.2rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    min-width: 160px;
  }
  .badge-stat { font-size: 1.6rem; font-weight: 600; font-family: 'Playfair Display', serif; color: var(--emerald); line-height: 1; }
  .badge-label { font-size: 0.58rem; font-family: 'Fira Mono', monospace; letter-spacing: 0.12em; text-transform: uppercase; color: var(--stone); margin-top: 4px; }

  /* SECTIONS */
  section { padding: 6rem 5rem; }
  .section-label {
    font-family: 'Fira Mono', monospace;
    font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--emerald-mid); display: flex; align-items: center; gap: 1rem;
    margin-bottom: 0.8rem;
  }
  .section-label::after { content: ''; flex: 1; max-width: 60px; height: 1.5px; background: var(--emerald-light); opacity: 0.5; }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4.5vw, 3.5rem);
    font-weight: 600; line-height: 1.1; color: var(--dark); margin-bottom: 0.6rem;
  }
  .section-title em { font-style: italic; color: var(--emerald); }

  /* ABOUT */
  .about-section { background: var(--white); }
  .about-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 5rem; align-items: start; margin-top: 3.5rem; }
  .about-text { font-size: 0.96rem; line-height: 1.9; color: var(--stone); }
  .about-text p + p { margin-top: 1.1rem; }
  .meta-row { display: flex; gap: 3rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
  .meta-item-label { font-family: 'Fira Mono', monospace; font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--stone-light); margin-bottom: 4px; }
  .meta-item-val { font-size: 0.88rem; font-weight: 500; color: var(--dark); }
  .meta-item-val.green { color: var(--emerald-mid); }

  .edu-card {
    background: var(--cream);
    border: 1.5px solid var(--border);
    border-left: 4px solid var(--emerald);
    border-radius: 4px;
    padding: 1.6rem; margin-bottom: 1rem;
  }
  .edu-year { font-family: 'Fira Mono', monospace; font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold-mid); margin-bottom: 6px; }
  .edu-school { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 600; color: var(--dark); margin-bottom: 2px; }
  .edu-degree { font-size: 0.8rem; color: var(--stone); }
  .edu-highlight { margin-top: 8px; font-size: 0.72rem; font-family: 'Fira Mono', monospace; color: var(--emerald-mid); }
  .tag-row { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
  .tag {
    font-family: 'Fira Mono', monospace; font-size: 0.52rem; letter-spacing: 0.08em;
    padding: 3px 9px; border-radius: 2px;
    background: var(--emerald-pale); color: var(--emerald); border: 1px solid rgba(6,95,70,0.2);
  }

  .campus-card {
    background: var(--cream);
    border: 1.5px solid var(--border-gold);
    border-left: 4px solid var(--gold-mid);
    border-radius: 4px; padding: 1.4rem;
  }
  .campus-label { font-family: 'Fira Mono', monospace; font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; }
  .campus-item { font-size: 0.83rem; color: var(--stone); padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.05); display: flex; align-items: center; gap: 8px; }
  .campus-item:last-child { border-bottom: none; }
  .campus-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold-mid); flex-shrink: 0; }

  /* SKILLS */
  .skills-section { background: var(--emerald); }
  .skills-section .section-label { color: var(--emerald-light); }
  .skills-section .section-label::after { background: var(--emerald-light); }
  .skills-section .section-title { color: var(--white); }
  .skills-section .section-title em { color: var(--gold-light); }
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3.5rem; }
  .skill-block {
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
    border-radius: 4px; padding: 2rem;
    transition: background 0.3s, border-color 0.3s;
  }
  .skill-block:hover { background: rgba(255,255,255,0.13); border-color: rgba(245,158,11,0.4); }
  .skill-icon {
    width: 42px; height: 42px; border-radius: 4px; margin-bottom: 1.3rem;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Fira Mono', monospace; font-size: 0.85rem; font-weight: 500;
  }
  .icon-e { background: rgba(16,185,129,0.2); color: var(--emerald-light); }
  .icon-g { background: rgba(245,158,11,0.18); color: var(--gold-light); }
  .icon-w { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); }
  .skill-block-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: var(--white); margin-bottom: 1rem; }
  .pill-list { display: flex; flex-wrap: wrap; gap: 5px; }
  .pill {
    font-family: 'Fira Mono', monospace; font-size: 0.5rem; letter-spacing: 0.07em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 2px;
    background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.65);
    border: 1px solid rgba(255,255,255,0.12); transition: all 0.2s;
  }
  .pill:hover { background: rgba(255,255,255,0.14); color: var(--white); }

  /* EXPERIENCE */
  .exp-section { background: var(--cream); }
  .exp-item {
    display: grid; grid-template-columns: 180px 1fr;
    gap: 3rem; padding: 2.8rem 0;
    border-bottom: 1px solid var(--border);
  }
  .exp-item:first-child { border-top: 1px solid var(--border); }
  .exp-date { font-family: 'Fira Mono', monospace; font-size: 0.62rem; letter-spacing: 0.1em; color: var(--gold); padding-top: 4px; }
  .exp-loc { font-size: 0.62rem; font-family: 'Fira Mono', monospace; color: var(--stone-light); margin-top: 5px; letter-spacing: 0.08em; }
  .exp-company { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 600; color: var(--dark); margin-bottom: 2px; }
  .exp-role { font-family: 'Fira Mono', monospace; font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--emerald-mid); margin-bottom: 1rem; }
  .exp-bullets { list-style: none; }
  .exp-bullets li {
    font-size: 0.88rem; line-height: 1.8; color: var(--stone);
    padding-left: 1.2rem; position: relative; margin-bottom: 4px;
  }
  .exp-bullets li::before { content: '—'; position: absolute; left: 0; color: var(--emerald-light); font-size: 0.7rem; top: 4px; }

  /* PROJECTS */
  .projects-section { background: var(--white); }
  .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 3.5rem; }
  .project-card {
    background: var(--cream); border: 1.5px solid var(--border);
    border-radius: 4px; padding: 2rem; position: relative; overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  }
  .project-card:hover {
    border-color: rgba(6,95,70,0.3);
    box-shadow: 0 12px 40px rgba(6,95,70,0.08);
    transform: translateY(-3px);
  }
  .project-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2.5px; background: linear-gradient(90deg, var(--emerald), var(--gold-light));
    transform: scaleX(0); transition: transform 0.35s; transform-origin: left;
  }
  .project-card:hover::after { transform: scaleX(1); }
  .project-num {
    font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 600;
    color: var(--emerald-pale); position: absolute; top: 1rem; right: 1.2rem; line-height: 1;
  }
  .project-badge {
    display: inline-block; font-family: 'Fira Mono', monospace; font-size: 0.52rem;
    letter-spacing: 0.1em; padding: 3px 10px; margin-bottom: 1rem;
    text-transform: uppercase; border-radius: 2px;
  }
  .badge-win { background: var(--emerald-pale); border: 1px solid rgba(6,95,70,0.25); color: var(--emerald); }
  .badge-live { background: var(--gold-pale); border: 1px solid rgba(180,83,9,0.2); color: var(--gold); }
  .badge-wip { background: #FEF9EE; border: 1px solid rgba(217,119,6,0.2); color: var(--gold-mid); }
  .project-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 600; color: var(--dark); margin-bottom: 0.6rem; }
  .project-desc { font-size: 0.83rem; line-height: 1.8; color: var(--stone); margin-bottom: 1.2rem; }
  .tech-row { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 1.2rem; }
  .tech-chip {
    font-family: 'Fira Mono', monospace; font-size: 0.5rem; letter-spacing: 0.06em;
    padding: 3px 8px; border-radius: 2px;
    background: var(--white); color: var(--stone);
    border: 1px solid var(--border); text-transform: uppercase;
  }
  .proj-link {
    font-family: 'Fira Mono', monospace; font-size: 0.58rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--emerald); text-decoration: none;
    display: inline-flex; align-items: center; gap: 4px; transition: color 0.2s;
  }
  .proj-link:hover { color: var(--emerald-mid); }

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
  .contact-link:hover { color: var(--emerald); }
  .contact-link:hover .link-icon { background: var(--emerald); color: var(--white); border-color: var(--emerald); }
  .link-icon {
    width: 34px; height: 34px; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    border: 1.5px solid var(--border); background: var(--white);
    font-size: 0.65rem; font-family: 'Fira Mono', monospace; color: var(--emerald-mid);
    flex-shrink: 0; transition: all 0.2s;
  }
  .avail-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Fira Mono', monospace; font-size: 0.6rem; letter-spacing: 0.1em;
    padding: 0.55rem 1.1rem; border-radius: 2px;
    border: 1.5px solid rgba(6,95,70,0.25);
    background: var(--emerald-pale); color: var(--emerald);
    margin-bottom: 2rem;
  }
  .avail-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--emerald-light); animation: blink 2s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .contact-meta { font-size: 0.83rem; line-height: 2; color: var(--stone); }
  .quote-box {
    margin-top: 2.5rem; padding: 1.5rem;
    background: var(--white); border: 1.5px solid var(--border-gold);
    border-left: 4px solid var(--gold-mid); border-radius: 4px;
  }
  .quote-text { font-family: 'Playfair Display', serif; font-size: 1.02rem; font-style: italic; color: var(--dark); line-height: 1.7; margin-bottom: 8px; }
  .quote-attr { font-family: 'Fira Mono', monospace; font-size: 0.55rem; letter-spacing: 0.15em; color: var(--stone-light); }

  /* FOOTER */
  footer {
    padding: 1.8rem 5rem;
    border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
    background: var(--white);
  }
  .footer-copy { font-family: 'Fira Mono', monospace; font-size: 0.56rem; letter-spacing: 0.1em; color: var(--stone-light); }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 1rem; color: var(--emerald); font-style: italic; }

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
    footer { flex-direction: column; gap: 0.8rem; text-align: center; padding: 1.5rem 2rem; }
  }
  @media (max-width: 600px) {
    .nav-links { display: none; }
    .hero-name { font-size: 2.8rem; }
    .photo-accent-2 { display: none; }
    body { cursor: auto; }
    .cursor, .cursor-ring { display: none; }
  }
`;

const projects = [
  {
    n: "01",
    title: "CoThrift",
    badge: "badge-win",
    badgeLabel: "🏆 Hoya Hacks Winner",
    desc: "A sustainability-focused full-stack platform making secondhand exchange on college campuses seamless — no chaotic lines, just clean circular fashion.",
    tech: ["PHP", "MySQL", "HTML", "CSS"],
    links: [{ label: "GitHub ↗", href: "https://github.com/A6ayie" }],
  },
  {
    n: "02",
    title: "MoviFy",
    badge: "badge-live",
    badgeLabel: "Live",
    desc: "A Netflix-inspired mock streaming platform built from scratch — self-taught HTML/CSS. Features sign-up, login, subscriptions, and payment simulation.",
    tech: ["HTML", "CSS", "Git"],
    links: [{ label: "GitHub ↗", href: "https://github.com/A6ayie" }],
  },
  {
    n: "03",
    title: "DebbyShop",
    badge: "badge-live",
    badgeLabel: "Live",
    desc: "A mock e-commerce experience simulating Amazon. Includes product listings, user authentication, hover effects, and transitions.",
    tech: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "GitHub ↗", href: "https://github.com/A6ayie" }],
  },
  {
    n: "04",
    title: "Personal Finance Tracker",
    badge: "badge-wip",
    badgeLabel: "In Progress",
    desc: "A Python budgeting tool with CSV data storage, Matplotlib visual reports, a randomized dataset generator, and a Tkinter UI.",
    tech: ["Python", "Matplotlib", "Tkinter", "CSV"],
    links: [],
  },
  {
    n: "05",
    title: "Astrophysics Calculator",
    badge: "badge-wip",
    badgeLabel: "In Progress",
    desc: "C++ calculator leveraging the STL, Qt GUI, and Boost for astrophysics computations, unit conversions, and mathematical operations.",
    tech: ["C++", "Qt", "Boost", "STL"],
    links: [],
  },
  {
    n: "06",
    title: "Abibiman Healthcare Site",
    badge: "badge-live",
    badgeLabel: "Professional",
    desc: "Mobile-responsive website for a healthcare company built with cross-functional teams. Led user testing that resolved 10+ issues.",
    tech: ["HTML", "CSS", "Bootstrap"],
    links: [],
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
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="nav-logo">
          D<span>.</span>Abayie
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
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern
                id="grid"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="rgba(6,95,70,0.15)"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
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
              Software engineer building thoughtful digital experiences — from
              healthcare platforms to astrophysics tools. Wesleyan African
              Scholar, class of 2028.
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
                I'm a Computer Science student at Wesleyan University, awarded
                the Wesleyan African Scholar distinction. My path into tech
                started with curiosity and a lot of self-teaching — I built my
                first website by reading docs and experimenting late into the
                night.
              </p>
              <p>
                From interning at a healthcare company in Accra to winning the
                sustainability track at Hoya Hacks 2025, I gravitate toward
                projects where engineering meets real human needs.
              </p>
              <p>
                On campus, I contribute as an Audio-Visual Tech Assistant, an
                Astronomy Public Outreach Assistant, and a Library Assistant —
                finding ways to blend technical skill with community.
              </p>
            </div>
            <div className="meta-row">
              <div>
                <div className="meta-item-label">Location</div>
                <div className="meta-item-val">Middletown, CT</div>
              </div>
              <div>
                <div className="meta-item-label">Status</div>
                <div className="meta-item-val green">Open to Opportunities</div>
              </div>
            </div>
          </FadeInSection>
          <FadeInSection style={{ transitionDelay: "0.15s" }}>
            <div className="edu-card">
              <div className="edu-year">Aug 2024 — Expected May 2028</div>
              <div className="edu-school">Wesleyan University</div>
              <div className="edu-degree">
                Bachelor of Arts, Computer Science
              </div>
              <div className="edu-highlight">✦ Wesleyan African Scholar</div>
              <div className="tag-row">
                {[
                  "Intro to CS",
                  "Web Development",
                  "SQL & Databases",
                  "Data Structures",
                  "OOP",
                  "Algorithms",
                ].map((c) => (
                  <span key={c} className="tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="campus-card" style={{ marginTop: "1rem" }}>
              <div className="campus-label">Campus Involvement</div>
              {[
                "Audio-Visual Tech Assistant",
                "Astronomy Public Outreach Assistant",
                "Library Assistant",
              ].map((r) => (
                <div key={r} className="campus-item">
                  <div className="campus-dot" />
                  {r}
                </div>
              ))}
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
          {[
            {
              icon: "</>",
              cls: "icon-e",
              title: "Languages",
              pills: ["Python", "C++", "Java", "PHP"],
            },
            {
              icon: "{ }",
              cls: "icon-g",
              title: "Frontend",
              pills: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"],
            },
            {
              icon: "DB",
              cls: "icon-w",
              title: "Backend & Data",
              pills: ["MySQL", "PostgreSQL", "REST APIs", "Git"],
            },
          ].map((b, i) => (
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
          <FadeInSection>
            <div className="exp-item">
              <div>
                <div className="exp-date">Sep 2023 — Dec 2023</div>
                <div className="exp-loc">Accra, Ghana</div>
              </div>
              <div>
                <div className="exp-company">Abibiman</div>
                <div className="exp-role">Software Engineer Intern</div>
                <ul className="exp-bullets">
                  <li>
                    Built a mobile-responsive healthcare website with
                    cross-functional teams using HTML, CSS, and Bootstrap.
                  </li>
                  <li>
                    Developed and streamlined documentation to ensure project
                    consistency across teams.
                  </li>
                  <li>
                    Led user testing efforts, identifying and resolving 10+
                    performance issues to meet deadlines.
                  </li>
                </ul>
              </div>
            </div>
          </FadeInSection>
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
              <a href="tel:+14133588395" className="contact-link">
                <div className="link-icon">☏</div>
                +1 (413) 358-8395
              </a>
            </div>
          </FadeInSection>
          <FadeInSection style={{ transitionDelay: "0.15s" }}>
            <div className="avail-badge">
              <div className="avail-dot" />
              Available for Internships 2025
            </div>
            <div className="contact-meta">
              <div>Currently studying at Wesleyan University, CT</div>
              <div>Open to remote and in-person roles</div>
              <div>Interests: Full-stack · Healthcare Tech · EdTech</div>
            </div>
            <div className="quote-box">
              <div className="quote-text">
                "I build things that matter — with code, curiosity, and craft."
              </div>
              <div className="quote-attr">— Deborah Abayie</div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-copy">
          © 2025 Deborah Abayie · Designed & Built with React
        </div>
        <div className="footer-logo">D.A.</div>
      </footer>
    </>
  );
}
