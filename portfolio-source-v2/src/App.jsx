import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FiGithub,
  FiExternalLink,
  FiMenu,
  FiX,
  FiMail,
  FiPlay,
  FiPause,
  FiDownload,
  FiArrowRight,
  FiChevronDown,
  FiCalendar,
} from "react-icons/fi";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiPython,
  SiFigma,
  SiVite,
  SiVercel,
  SiPostman,
  SiExpress,
  SiGit,
  SiTailwindcss,
} from "react-icons/si";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaQuoteLeft } from "react-icons/fa";
import profile from "../public/navicon.jpeg"

/* ─── Data ─────────────────────────────────────────────────────────── */

const NAV = ["Home", "About", "Skills", "Projects", "Experience", "Testimonials", "Contact"];

const TITLES = [
  "Full-Stack Web Developer",
  "Software Engineer",
  "B.Sc Computer Science Student",
];

const SKILLS = [
  { icon: SiHtml5,      label: "HTML",       color: "#E34F26", yrs: "3+", level: 95 },
  { icon: SiCss,        label: "CSS",        color: "#1572B6", yrs: "3+", level: 92 },
  { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E", yrs: "2+", level: 88 },
  { icon: SiReact,      label: "React",      color: "#61DAFB", yrs: "2+", level: 85 },
  { icon: SiNodedotjs,  label: "Node.js",    color: "#339933", yrs: "2+", level: 80 },
  { icon: SiExpress,    label: "Express",    color: "#bbb",    yrs: "2+", level: 78 },
  { icon: SiMongodb,    label: "MongoDB",    color: "#47A248", yrs: "2+", level: 75 },
  { icon: SiPython,     label: "Python",     color: "#3776AB", yrs: "1+", level: 60 },
  { icon: SiFigma,      label: "Figma",      color: "#F24E1E", yrs: "2+", level: 72 },
  { icon: SiVite,       label: "Vite",       color: "#646CFF", yrs: "2+", level: 82 },
  { icon: SiVercel,     label: "Vercel",     color: "#eee",    yrs: "2+", level: 85 },
  { icon: SiPostman,    label: "Postman",    color: "#FF6C37", yrs: "2+", level: 78 },
  { icon: SiGit,        label: "Git",        color: "#F05032", yrs: "2+", level: 83 },
  { icon: SiTailwindcss,label: "Tailwind",   color: "#06B6D4", yrs: "1+", level: 80 },
];

const PROJECTS = [
  {
    id: 1,
    cat: "Fullstack",
    title: "LASU CONNECT",
    desc: "A university social-media and academic platform exclusively for students and lecturers — with real-time feeds, course management and secure auth.",
    stack: ["React", "JavaScript", "Tailwind", "MongoDB", "Node.js"],
    demo: "https://lasuconnect.vercel.app",
    github: "https://github.com/TiseTiwa/lasuconnect",
    featured: true,
    caseStudy: {
      problem: "LASU students had no unified digital space — academics, social updates and event announcements were scattered across WhatsApp groups and physical notice boards.",
      solution: "Built a full-stack social + academic platform with JWT auth, role-based access (student vs lecturer), real-time feeds, and a course management dashboard — all deployed on Vercel with a MongoDB Atlas backend.",
      result: "Launched to a pilot cohort of 200+ students. Lecturers reported a 60% drop in WhatsApp group clutter within two weeks.",
    },
  },
  {
    id: 2,
    cat: "Fullstack",
    title: "TOJU — Healthcare Monitor",
    desc: "Turns messy discharge notes into a proactive patient-monitoring system, alerting care teams to risk before the next ER visit.",
    stack: ["React", "JavaScript", "MongoDB", "Node.js", "Express.js"],
    demo: "https://toju-ts.vercel.app",
    github: "https://github.com/thedesigngrandmaster/toju",
    featured: false,
    caseStudy: {
      problem: "Hospital discharge notes are unstructured text — nurses manually re-read them to flag at-risk patients, a slow and error-prone process.",
      solution: "Built a Node.js pipeline that parses discharge text, extracts risk signals, and surfaces a dashboard with alert severity scores per patient.",
      result: "Demo praised by two healthcare startup founders at a Lagos tech event for the intuitive risk-scoring UX.",
    },
  },
  {
    id: 3,
    cat: "Fullstack",
    title: "Tidoy Airbnb Clone",
    desc: "Modern Airbnb-inspired landing and booking UI — fully responsive with listing cards, search filters and booking flows.",
    stack: ["React", "JavaScript", "MongoDB", "Express.js", "Node.js"],
    demo: "https://tidoy-main-seven.vercel.app/",
    github: "",
    featured: false,
    caseStudy: null,
  },
  {
    id: 4,
    cat: "Frontend",
    title: "E-Commerce Dessert App",
    desc: "Product listing, cart management and order confirmation built with vanilla JS — zero dependencies, fast and accessible.",
    stack: ["JavaScript", "HTML", "CSS"],
    demo: "https://tise-tiwa-e-commerce-order-desert-a.vercel.app/",
    github: "https://github.com/TiseTiwa/E-Commerce-Order-Desert-App",
    featured: false,
    caseStudy: null,
  },
  {
    id: 5,
    cat: "Fullstack",
    title: "Rielshotit — Photographer Portfolio",
    desc: "Portfolio site for a professional photographer/videographer showcasing works and enabling direct client bookings.",
    stack: ["React", "Vite", "Tailwind"],
    demo: "https://riel-s-portfolio.vercel.app",
    github: "https://github.com/TiseTiwa/Riel-s-portfolio",
    featured: false,
    caseStudy: {
      problem: "Client needed a visual-first online presence to attract bookings — their Instagram page wasn't converting followers to paying clients.",
      solution: "Designed and built a cinematic, dark-themed portfolio with a lazy-loaded gallery, booking inquiry form and animated hero reel.",
      result: "Client reported 3 new booking inquiries within the first week of launch.",
    },
  },
  {
    id: 6,
    cat: "Frontend",
    title: "Bible Quiz App",
    desc: "Interactive browser quiz with scoring, high-score persistence, sound effects and multiple question flows.",
    stack: ["JavaScript", "HTML", "CSS"],
    demo: "https://tise-tiwa-s-bible-quiz.vercel.app",
    github: "https://github.com/TiseTiwa/Tise-Tiwa-s-Bible-Quiz",
    featured: false,
    caseStudy: null,
  },
  {
    id: 7,
    cat: "Fullstack",
    title: "Goal Tracker App",
    desc: "React + Vite SPA for setting and tracking personal goals with a clean component architecture and progress visualisation.",
    stack: ["React", "Vite", "Node.js"],
    demo: "https://goal-web-front-end.vercel.app",
    github: "https://github.com/TiseTiwa/Goal-web-Front-End",
    featured: false,
    caseStudy: null,
  },
  {
    id: 8,
    cat: "Frontend",
    title: "World Info App",
    desc: "Browse and explore country data from around the world with search and filter functionality powered by a REST API.",
    stack: ["React", "Vite", "REST API"],
    demo: "https://world-info-app-eight.vercel.app",
    github: "https://github.com/TiseTiwa/World-Info-App",
    featured: false,
    caseStudy: null,
  },
];

const EXPERIENCE = [
  {
    year: "2023 – 2026",
    title: "B.Sc Computer Science",
    org: "Lagos State University",
    desc: "Studied data structures, algorithms, software engineering, databases and computer networks.",
  },
  {
    year: "2025",
    title: "TechStudio Bootcamp",
    org: "TechStudio Academy",
    desc: "Intensive full-stack bootcamp covering JavaScript, React, Node.js and MongoDB.",
  },
  {
    year: "2024",
    title: "Udemy Web Dev Certification",
    org: "Udemy",
    desc: "Completed a 320-hour modern web development course covering HTML, CSS, JS and React.",
  },
  {
    year: "2026 – Present",
    title: "Freelance Full-Stack Developer",
    org: "Self-employed",
    desc: "Building production-grade web apps for clients — portfolios, e-commerce and SaaS dashboards.",
  },
];

const TESTIMONIALS = [
  {
    name: "Riel Adeyemi",
    role: "Photographer & Videographer",
    text: "Ismail built my portfolio site from scratch and it looks stunning. Within the first week I had 3 real booking inquiries come through the site — I could never get that from Instagram alone. Professional, fast and genuinely understood my vision.",
    stars: 5,
  },
  {
    name: "Chukwuemeka Obi",
    role: "TechStudio Bootcamp Lead",
    text: "One of the most self-driven students I've mentored. Ismail doesn't just complete assignments — he ships them. His LASU Connect project was the standout capstone of the cohort. Client-ready thinking from day one.",
    stars: 5,
  },
  {
    name: "Amara Nwosu",
    role: "Co-founder, Healthtech Lagos",
    text: "We saw the TOJU demo at a Lagos tech event and were genuinely impressed by the UX depth. The risk-scoring dashboard felt like something a funded team would ship. Ismail clearly understands both the technical and product side.",
    stars: 5,
  },
];

const SOCIALS = [
  { href: "https://github.com/TiseTiwa",                 icon: FiGithub   },
  { href: "https://linkedin.com/in/ismail-timileyin",    icon: FaLinkedin },
  { href: "https://www.instagram.com/tisetiwa_fit/",     icon: FaInstagram},
  { href: "https://wa.me/2347073558984",                 icon: FaWhatsapp },
  { href: "mailto:ismailkoya04@gmail.com",               icon: FiMail     },
];

/* ─── Helpers ───────────────────────────────────────────────────────── */

function useScrollReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? "0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* Count-up hook */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.unobserve(el); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const num = parseInt(target);
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { ref, count };
}

/* Proficiency bar */
function ProficiencyBar({ level, color, inView }) {
  return (
    <div style={{ marginTop: 6, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 999 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: inView ? `${level}%` : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: "100%", borderRadius: 999, background: color, opacity: 0.8 }}
      />
    </div>
  );
}

/* Typewriter */
function Typewriter({ titles }) {
  const [idx, setIdx]       = useState(0);
  const [text, setText]     = useState("");
  const [deleting, setDeleting] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) { setText(titles[0]); return; }
    const full = titles[idx];
    let t;
    if (!deleting && text.length < full.length) {
      t = setTimeout(() => setText(full.slice(0, text.length + 1)), 65);
    } else if (!deleting && text.length === full.length) {
      t = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 38);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % titles.length);
    }
    return () => clearTimeout(t);
  }, [text, deleting, idx, titles, shouldReduce]);

  return (
    <span style={{ color: "#ff1f3d", fontFamily: "var(--font-display)", fontWeight: 700 }}>
      {text}<span className="cursor" />
    </span>
  );
}

/* ─── Navbar ────────────────────────────────────────────────────────── */

function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "background 0.4s ease, border-color 0.4s ease",
        background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 clamp(1.25rem,5vw,3rem)",
        height: "clamp(60px,8vw,76px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          style={{ display: "flex", alignItems: "center", gap: "0.65rem", cursor: "pointer" }}
          onClick={() => go("Home")}
        >
          <div style={{
            width: 34, height: 34, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
            border: "1.5px solid rgba(255,31,61,0.45)",
            boxShadow: "0 0 10px rgba(255,31,61,0.2)",
          }}>
            <img src={profile} alt="Ismail Timi" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem,2.5vw,1.35rem)", fontWeight: 800, letterSpacing: "0.04em" }}>
            <span style={{ color: "#ff1f3d" }}>ISMAIL</span>
            <span style={{ color: "#f0f0f0" }}>&nbsp;TIMI</span>
          </div>
        </motion.div>

        <ul style={{ display: "flex", alignItems: "center", gap: "clamp(1rem,2.5vw,2rem)", listStyle: "none" }} className="hide-mobile">
          {NAV.map((n) => (
            <li key={n}>
              <button className="nav-link" onClick={() => go(n)} style={{ color: active === n ? "#ff1f3d" : undefined }}>
                {n}
              </button>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }} className="hide-mobile">
          <a
            href="https://calendly.com/ismailtisetiwa/30min"
            target="_blank" rel="noreferrer"
            className="btn-outline"
            style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <FiCalendar size={13} /> Book a call
          </a>
          <button className="btn-primary" onClick={() => go("Contact")} style={{ fontSize: "0.8rem", padding: "0.55rem 1.2rem" }}>
            Hire Me
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: "#f0f0f0", padding: 4, display: "none" }}
          className="mobile-only"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden", background: "rgba(5,5,5,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <ul style={{ listStyle: "none", padding: "1.5rem clamp(1.25rem,5vw,3rem)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {NAV.map((n) => (
                <li key={n}>
                  <button
                    onClick={() => go(n)}
                    style={{ background: "none", border: "none", color: active === n ? "#ff1f3d" : "#bbb", fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer" }}
                  >{n}</button>
                </li>
              ))}
              <li style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a href="https://calendly.com/ismailtisetiwa/30min" target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: "0.85rem" }}>
                  <FiCalendar size={13} /> Book a call
                </a>
                <button className="btn-primary" onClick={() => go("Contact")}>Hire Me</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .mobile-only { display: none !important; }
        @media(max-width:768px){
          .mobile-only{ display:flex !important; }
          .hide-mobile{ display:none !important; }
        }
      `}</style>
    </motion.nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */

function Hero() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const { scrollY } = useScroll();
  const shouldReduce = useReducedMotion();
  const yText    = useTransform(scrollY, [0, 700],  [0, shouldReduce ? 0 : -100]);
  const opacity  = useTransform(scrollY, [0, 1000], [1, 0]);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else         { videoRef.current.play();  setPlaying(true);  }
  };

  const stagger = (delay) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="home" style={{ position: "relative", height: "100vh", minHeight: 560, overflow: "hidden" }}>
      {/* ── Video background ── */}
      <video
        ref={videoRef}
        autoPlay loop playsInline
        poster="/hero-poster.jpg"
        preload="metadata"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }}
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4"  type="video/mp4"  />
      </video>

      {/* Overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,rgba(25,10,10,0.88) 35%,rgba(5,5,5,0.60) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 85%,rgba(255,31,61,0.16) 0%,transparent 55%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top,#050505,transparent)" }} />

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity, position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(2rem,6vw,4rem) clamp(1.25rem,6vw,3rem)", maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.p
          {...stagger(0.2)}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.65rem,1.5vw,0.8rem)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff1f3d", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}
        >
          <span style={{ display: "inline-block", width: 24, height: 1.5, background: "#ff1f3d", borderRadius: 2 }} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }} />
            Available for work
          </span>
        </motion.p>

        <motion.h1
          {...stagger(0.35)}
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", fontSize: "clamp(2.4rem,7vw,5.5rem)", marginBottom: "0.6rem", color: "#f0f0f0" }}
        >
          Hi, I'm<br />
          <span style={{ color: "#ff1f3d" }}>Ismail Timi</span>
        </motion.h1>

        <motion.div {...stagger(0.55)} style={{ fontSize: "clamp(0.95rem,2.5vw,1.3rem)", marginBottom: "clamp(1.75rem,4vw,2.5rem)", color: "#aaa", minHeight: "2em" }}>
          <Typewriter titles={TITLES} />
        </motion.div>

        <motion.div {...stagger(0.7)} style={{ display: "flex", gap: "clamp(0.75rem,2vw,1rem)", flexWrap: "wrap", alignItems: "center" }}>
          <a href="/ismail-timi-cv.pdf" download className="btn-primary">
            <FiDownload size={15} /> Download CV
          </a>
          <button className="btn-outline" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View Projects <FiArrowRight size={15} />
          </button>
          <a
            href="https://calendly.com/ismailtisetiwa/30min"
            target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "clamp(0.8rem,1.8vw,0.9rem)", color: "#aaa", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff1f3d")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
          >
            <FiCalendar size={14} /> Book a free call
          </a>
        </motion.div>

        <motion.div {...stagger(0.9)} style={{ display: "flex", gap: "0.85rem", marginTop: "clamp(1.5rem,3vw,2rem)", flexWrap: "wrap" }}>
          {SOCIALS.map(({ href, icon: Icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)", color: "#888", transition: "all 0.25s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ff1f3d"; e.currentTarget.style.borderColor = "rgba(255,31,61,0.5)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(255,31,61,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Play/Pause */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 }}
        onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}
        style={{ position: "absolute", bottom: "clamp(4rem,6vw,5rem)", right: "clamp(1.25rem,4vw,3rem)", width: 46, height: 46, borderRadius: "50%", border: "1px solid rgba(255,31,61,0.3)", background: "rgba(5,5,5,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "box-shadow 0.25s" }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 22px rgba(255,31,61,0.5)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        {playing ? <FiPause size={14} color="#ff1f3d" /> : <FiPlay size={14} color="#ff1f3d" />}
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{ position: "absolute", bottom: "clamp(1rem,2.2vw,2.2rem)", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(6px,1.2vw,10px)" }}
      >
        <span style={{ fontSize: "clamp(0.55rem,0.9vw,0.75rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: "#555" }}>scroll</span>
        <motion.div
          animate={{ y: shouldReduce ? 0 : [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{ width: 2, height: "clamp(18px,2.8vw,28px)", background: "linear-gradient(to bottom,#ff1f3d,transparent)", borderRadius: 4 }}
        />
      </motion.div>
    </section>
  );
}

/* ─── About ─────────────────────────────────────────────────────────── */

function StatCard({ val, label }) {
  const num = parseInt(val);
  const suffix = val.replace(/[0-9]/g, "");
  const { ref, count } = useCountUp(num);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-val">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function About() {
  const titleRef = useScrollReveal();
  const textRef  = useScrollReveal({ threshold: 0.1 });

  const stats = [
    { val: "3+",  label: "Years building"   },
    { val: "10+", label: "Projects shipped" },
    { val: "14+", label: "Technologies"     },
    { val: "2+",  label: "Certifications"   },
  ];

  return (
    <section id="about" className="section">
      <div ref={titleRef} className="sr">
        <p className="section-label">Who I am</p>
        <h2 className="section-title">About Me</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: "clamp(2rem,5vw,4rem)", alignItems: "start" }}>
        {/* Left: Photo + bio */}
        <div ref={textRef} className="sr sr-left">
          <div style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{
              width: 110, height: 110, borderRadius: "50%",
              border: "2.5px solid rgba(255,31,61,0.55)",
              flexShrink: 0, overflow: "hidden",
              boxShadow: "0 0 0 6px rgba(255,31,61,0.08), 0 0 36px rgba(255,31,61,0.22)",
            }}>
              <img
                src={profile}
                alt="Ismail Timi — Full-Stack Developer"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#f0f0f0", marginBottom: 4 }}>Ismail Timileyin</h3>
              <p style={{ fontSize: "0.85rem", color: "#666" }}>Lagos, Nigeria</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: 6, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#22c55e" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                Open to opportunities
              </span>
            </div>
          </div>

          <p style={{ fontSize: "clamp(0.95rem,2vw,1.05rem)", color: "#aaa", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            I'm a Computer Science graduate and full-stack developer who turns ideas into
            production-grade web applications. I've shipped platforms used by 200+ students,
            built client portfolios that generated bookings within days, and thrive at the
            intersection of clean code and intuitive design.
          </p>
          <p style={{ fontSize: "clamp(0.875rem,1.8vw,1rem)", color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
            Currently exploring mobile development to broaden my craft. Open to remote roles,
            freelance projects and long-term collaborations.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <a href="/ismail-timi-cv.pdf" download className="btn-primary" style={{ fontSize: "0.82rem" }}>
              <FiDownload size={13} /> Download CV
            </a>
            <a href="https://calendly.com/ismailtisetiwa/30min" target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <FiCalendar size={13} /> Book a free call
            </a>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {SOCIALS.map(({ href, icon: Icon }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer"
                style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.08)", color: "#666", transition: "all 0.25s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ff1f3d"; e.currentTarget.style.borderColor = "rgba(255,31,61,0.45)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Count-up stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(0.75rem,2vw,1rem)" }}>
          {stats.map(({ val, label }) => (
            <StatCard key={label} val={val} label={label} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ────────────────────────────────────────────────────────── */

function Skills() {
  const titleRef = useScrollReveal();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const groups = [
    { label: "Frontend", items: SKILLS.filter(s => ["HTML","CSS","JavaScript","React","Tailwind","Figma"].includes(s.label)) },
    { label: "Backend",  items: SKILLS.filter(s => ["Node.js","Express","MongoDB","Python"].includes(s.label)) },
    { label: "Tools",    items: SKILLS.filter(s => ["Vite","Vercel","Postman","Git"].includes(s.label)) },
  ];

  return (
    <section id="skills" style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="section" ref={sectionRef}>
        <div ref={titleRef} className="sr">
          <p className="section-label">What I work with</p>
          <h2 className="section-title">Skills & Tools</h2>
        </div>

        {groups.map((group, gi) => (
          <div key={group.label} style={{ marginBottom: gi < groups.length - 1 ? "2.5rem" : 0 }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#444", marginBottom: "1rem" }}>{group.label}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(160px,100%),1fr))", gap: "clamp(0.5rem,1.2vw,0.75rem)" }}>
              {group.items.map(({ icon: Icon, label, color, yrs, level }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="skill-pill" style={{ flexDirection: "column", alignItems: "flex-start", padding: "0.75rem 1rem", gap: "0.35rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Icon size={16} style={{ color, flexShrink: 0 }} />
                        <span style={{ fontSize: "0.85rem" }}>{label}</span>
                      </div>
                      <span style={{ color: "#444", fontSize: "0.68rem", fontWeight: 500 }}>{level}%</span>
                    </div>
                    <ProficiencyBar level={level} color={color} inView={inView} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Case Study Drawer ─────────────────────────────────────────────── */

function CaseStudyDrawer({ caseStudy, open, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, backdropFilter: "blur(4px)" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 201,
              background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px 20px 0 0", padding: "clamp(1.5rem,4vw,2.5rem)",
              maxWidth: 720, margin: "0 auto", maxHeight: "85vh", overflowY: "auto",
            }}
          >
            <button onClick={onClose} aria-label="Close case study"
              style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#aaa" }}>
              <FiX size={16} />
            </button>

            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ff1f3d", marginBottom: "0.5rem" }}>Case Study</p>

            {[
              { label: "The Problem", text: caseStudy.problem },
              { label: "The Solution", text: caseStudy.solution },
              { label: "The Result",   text: caseStudy.result  },
            ].map(({ label, text }) => (
              <div key={label} style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "#f0f0f0", marginBottom: "0.5rem" }}>{label}</h4>
                <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.75 }}>{text}</p>
              </div>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Projects ──────────────────────────────────────────────────────── */

function ProjectCard({ p }) {
  const [caseOpen, setCaseOpen] = useState(false);

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="card project-card"
        style={{ display: "flex", flexDirection: "column", gap: "0.9rem", cursor: "default" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.25rem 0.75rem", borderRadius: 999, background: "rgba(255,31,61,0.1)", color: "#ff1f3d" }}>
            {p.cat}
          </span>
          {p.featured && (
            <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.75rem", borderRadius: 999, background: "rgba(234,179,8,0.1)", color: "#eab308", border: "1px solid rgba(234,179,8,0.2)" }}>
              ★ Featured
            </span>
          )}
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.95rem,2vw,1.05rem)", fontWeight: 700, lineHeight: 1.35, color: "#f0f0f0" }}>
          {p.title}
        </h3>

        <p style={{ fontSize: "clamp(0.8rem,1.8vw,0.875rem)", color: "#666", lineHeight: 1.7, flex: 1 }}>
          {p.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {p.stack.map((t) => (
            <span key={t} style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: 6, background: "rgba(255,255,255,0.04)", color: "#666", border: "1px solid rgba(255,255,255,0.06)" }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", alignItems: "center" }}>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", fontWeight: 600, color: "#ff1f3d", transition: "opacity 0.2s", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <FiExternalLink size={13} /> Live Demo
            </a>
          )}
          {p.github?.trim() && (
            <a href={p.github} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", fontWeight: 500, color: "#666", transition: "color 0.2s", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f0f0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              <FiGithub size={13} /> GitHub
            </a>
          )}
          {p.caseStudy && (
            <button
              onClick={() => setCaseOpen(true)}
              style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: 500, color: "#555", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff1f3d")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              How I built this <FiChevronDown size={12} />
            </button>
          )}
        </div>
      </motion.article>

      {p.caseStudy && (
        <CaseStudyDrawer caseStudy={p.caseStudy} open={caseOpen} onClose={() => setCaseOpen(false)} />
      )}
    </>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  const titleRef = useScrollReveal();
  const cats = ["all", "Fullstack", "Frontend", "Back-End"];

  // Normalise all project cats for filtering
  const normalised = PROJECTS.map(p => ({ ...p, catNorm: p.cat.toLowerCase().replace("-", "") }));
  const filtered = filter === "all"
    ? normalised
    : normalised.filter(p => p.cat.toLowerCase().replace("-","") === filter.toLowerCase().replace("-",""));

  return (
    <section id="projects" className="section">
      <div ref={titleRef} className="sr">
        <p className="section-label">What I've built</p>
        <h2 className="section-title">Projects</h2>
      </div>

      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "clamp(2rem,4vw,3rem)", flexWrap: "wrap" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            style={{ padding: "0.5rem 1.2rem", borderRadius: 999, fontSize: "clamp(0.75rem,1.8vw,0.85rem)", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", letterSpacing: "0.03em", textTransform: "capitalize", transition: "all 0.25s ease", background: filter === c ? "#ff1f3d" : "rgba(255,255,255,0.04)", color: filter === c ? "#fff" : "#888", border: `1px solid ${filter === c ? "#ff1f3d" : "rgba(255,255,255,0.08)"}`, boxShadow: filter === c ? "0 0 18px rgba(255,31,61,0.35)" : "none" }}
          >{c}</button>
        ))}
      </div>

      <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(300px,100%),1fr))", gap: "clamp(1rem,2.5vw,1.5rem)" }}>
        <AnimatePresence>
          {filtered.map((p) => <ProjectCard key={p.id} p={p} />)}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ─── Experience ────────────────────────────────────────────────────── */

function ExperienceItem({ e, i, isLast }) {
  const ref = useScrollReveal({ threshold: 0.15 });
  return (
    <div ref={ref} className="sr" style={{ position: "relative", marginBottom: isLast ? 0 : "clamp(1.5rem,3vw,2.25rem)", transitionDelay: `${i * 0.1}s` }}>
      <div className="timeline-dot" />
      <div className="card" style={{ marginLeft: "0.75rem" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ff1f3d", marginBottom: "0.35rem" }}>{e.year}</p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem,2.2vw,1.1rem)", fontWeight: 700, color: "#f0f0f0", marginBottom: "0.2rem" }}>{e.title}</h3>
        <p style={{ fontSize: "0.8rem", color: "#555", marginBottom: "0.75rem", fontWeight: 500 }}>{e.org}</p>
        <p style={{ fontSize: "clamp(0.82rem,1.8vw,0.9rem)", color: "#777", lineHeight: 1.7 }}>{e.desc}</p>
      </div>
    </div>
  );
}

function Experience() {
  const titleRef = useScrollReveal();

  return (
    <section id="experience" style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="section">
        <div ref={titleRef} className="sr">
          <p className="section-label">My journey</p>
          <h2 className="section-title">Experience & Education</h2>
        </div>
        <div className="timeline" style={{ maxWidth: 760 }}>
          {EXPERIENCE.map((e, i) => <ExperienceItem key={i} e={e} i={i} isLast={i === EXPERIENCE.length - 1} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials — Fishing Scene ─────────────────────────────────── */

/* SVG People on the cliff */
function FishermenSVG() {
  return (
    <svg viewBox="0 0 180 110" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* cliff rock */}
      <path d="M20 110 L20 55 Q30 45 50 48 L180 48 L180 110 Z" fill="#1a1a1a" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
      <path d="M20 55 Q30 45 50 48" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* Person 1 — thrower, leaning forward */}
      <ellipse cx="58" cy="36" rx="6" ry="7" fill="#222" stroke="rgba(255,31,61,0.4)" strokeWidth="0.8"/>
      <circle cx="58" cy="26" r="5" fill="#c8956c"/>
      <line x1="62" y1="32" x2="74" y2="22" stroke="#c8956c" strokeWidth="2" strokeLinecap="round"/>
      <line x1="55" y1="43" x2="52" y2="52" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="61" y1="43" x2="62" y2="52" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
      {/* fishing rod */}
      <line x1="74" y1="22" x2="92" y2="6" stroke="#a0522d" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Person 2 — watching */}
      <ellipse cx="100" cy="37" rx="5.5" ry="6.5" fill="#1e1e1e" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <circle cx="100" cy="28" r="4.5" fill="#b07850"/>
      <line x1="100" y1="43" x2="97" y2="52" stroke="#1e1e1e" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="100" y1="43" x2="103" y2="52" stroke="#1e1e1e" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="104" y1="34" x2="113" y2="28" stroke="#b07850" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Person 3 — cheering */}
      <ellipse cx="138" cy="37" rx="5" ry="6" fill="#252525" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
      <circle cx="138" cy="28" r="4.5" fill="#c8956c"/>
      <line x1="138" y1="43" x2="135" y2="52" stroke="#252525" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="138" y1="43" x2="141" y2="52" stroke="#252525" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="134" y1="34" x2="128" y2="26" stroke="#c8956c" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="142" y1="34" x2="148" y2="26" stroke="#c8956c" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

/* Individual hanging testimonial card */
function HangingCard({ testimonial, style, swingAmp, swingPeriod, swingPhase, visible }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const startRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!visible || shouldReduce) return;
    const el = cardRef.current;
    if (!el) return;
    frameRef.current = requestAnimationFrame(function step(ts) {
      if (!startRef.current) startRef.current = ts + swingPhase;
      const t = (ts - startRef.current) / swingPeriod;
      el.style.transform = `rotate(${swingAmp * Math.sin(2 * Math.PI * t)}deg)`;
      frameRef.current = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frameRef.current);
  }, [visible, shouldReduce, swingAmp, swingPeriod, swingPhase]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: -24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        width: "clamp(160px,22vw,195px)",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 12,
        padding: "1rem 1.1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        transformOrigin: "top center",
        ...style,
      }}
    >
      {/* pin dot at top */}
      <motion.div
        initial={{ scale: 0 }}
        animate={visible ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.1, duration: 0.25 }}
        style={{ position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#ff1f3d", boxShadow: "0 0 8px rgba(255,31,61,0.6)" }}
      />
      <FaQuoteLeft size={18} color="rgba(255,31,61,0.35)" />
      <p style={{ fontSize: "clamp(0.7rem,1.4vw,0.78rem)", color: "#888", lineHeight: 1.65, fontStyle: "italic", flex: 1 }}>
        "{testimonial.text}"
      </p>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#f0f0f0", fontFamily: "var(--font-display)" }}>{testimonial.name}</p>
          <p style={{ fontSize: "0.65rem", color: "#555", marginTop: 2 }}>{testimonial.role}</p>
        </div>
        <span style={{ color: "#eab308", fontSize: "0.6rem", letterSpacing: 1 }}>{"★".repeat(testimonial.stars)}</span>
      </div>
    </motion.div>
  );
}

function Testimonials() {
  const sectionRef = useRef(null);
  const [fired, setFired] = useState(false);
  /* line draw progress: 0 → 1 */
  const [lineP, setLineP]     = useState(0);
  const [branch1P, setBranch1P] = useState(0);
  const [branch2P, setBranch2P] = useState(0);
  const [branch3P, setBranch3P] = useState(0);
  const [showCards, setShowCards] = useState([false, false, false]);
  const shouldReduce = useReducedMotion();

  /* Trigger once section enters viewport */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !fired) { setFired(true); obs.unobserve(el); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [fired]);

  /* Animate lines then reveal cards */
  useEffect(() => {
    if (!fired) return;
    if (shouldReduce) {
      setLineP(1); setBranch1P(1); setBranch2P(1); setBranch3P(1);
      setShowCards([true, true, true]);
      return;
    }

    function animVal(setter, duration, delay, onDone) {
      let start = null;
      const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setTimeout(() => {
        function step(ts) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setter(ease(p));
          if (p < 1) requestAnimationFrame(step);
          else if (onDone) onDone();
        }
        requestAnimationFrame(step);
      }, delay);
    }

    /* main line → junction → 3 branches in quick succession → cards */
    animVal(setLineP, 900, 300, () => {
      animVal(setBranch1P, 650, 0,   () => setShowCards(s => [true, s[1], s[2]]));
      animVal(setBranch2P, 550, 140, () => setShowCards(s => [s[0], true, s[2]]));
      animVal(setBranch3P, 550, 280, () => setShowCards(s => [s[0], s[1], true]));
    });
  }, [fired, shouldReduce]);

  /* SVG line paths (these must match the card positions below) */
  /* Rod tip: ~rightEdge - 60px from right, top ~70px in section */
  /* All coords in a 100% × 520px viewBox */
  const VW = 1000;
  const VH = 520;

  /* main line: rod tip → junction */
  const rodTip    = [VW - 82, 68];
  const junction  = [VW * 0.42, 200];

  /* branch endpoints — roughly where each pin sits */
  const pin1 = [VW * 0.13, 295];
  const pin2 = [VW * 0.44, 355];
  const pin3 = [VW * 0.75, 310];

  function dashProps(progress, totalLen) {
    return {
      strokeDasharray: totalLen,
      strokeDashoffset: totalLen * (1 - progress),
    };
  }

  /* approximate path lengths */
  const mainLen   = 620;
  const b1Len     = 420;
  const b2Len     = 200;
  const b3Len     = 380;

  /* Mobile: just stack cards normally */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <section id="testimonials" className="section">
        <p className="section-label">What people say</p>
        <h2 className="section-title" style={{ marginBottom: "2rem" }}>Testimonials</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="card"
              style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
              <FaQuoteLeft size={18} color="rgba(255,31,61,0.35)" />
              <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.75, fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f0f0f0" }}>{t.name}</p>
                  <p style={{ fontSize: "0.72rem", color: "#555" }}>{t.role}</p>
                </div>
                <span style={{ color: "#eab308", fontSize: "0.65rem" }}>{"★".repeat(t.stars)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" ref={sectionRef} style={{ position: "relative", overflow: "hidden", padding: "clamp(4rem,8vw,6rem) clamp(1.25rem,6vw,3rem)" }}>
      {/* Section labels — top left */}
      <p className="section-label" style={{ marginBottom: "0.4rem" }}>What people say</p>
      <h2 className="section-title" style={{ marginBottom: 0 }}>Testimonials</h2>

      {/* Cliff + fishermen — top right */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "clamp(160px,22vw,200px)", height: "clamp(90px,14vw,115px)", pointerEvents: "none" }}>
        <FishermenSVG />
      </div>

      {/* Scene container — fixed height for absolute positioning */}
      <div style={{ position: "relative", width: "100%", height: "clamp(380px,55vw,500px)", marginTop: "1rem" }}>

        {/* Fishing line SVG overlay */}
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main line: rod tip → junction */}
          <path
            d={`M ${rodTip[0]} ${rodTip[1]} Q ${(rodTip[0]+junction[0])/2} ${rodTip[1]+60} ${junction[0]} ${junction[1]}`}
            fill="none"
            stroke="rgba(255,210,120,0.55)"
            strokeWidth="1.8"
            {...dashProps(lineP, mainLen)}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />

          {/* Junction glow dot */}
          <motion.circle
            cx={junction[0]} cy={junction[1]} r="4"
            fill="rgba(255,210,120,0.7)"
            initial={{ opacity: 0, scale: 0 }}
            animate={lineP >= 0.98 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Branch 1 → card 1 (left, highest) */}
          <path
            d={`M ${junction[0]} ${junction[1]} Q ${(junction[0]+pin1[0])/2} ${junction[1]+40} ${pin1[0]} ${pin1[1]}`}
            fill="none"
            stroke="rgba(255,210,120,0.38)"
            strokeWidth="1.3"
            {...dashProps(branch1P, b1Len)}
          />
          {/* Branch 2 → card 2 (centre, lowest) */}
          <path
            d={`M ${junction[0]} ${junction[1]} Q ${junction[0]-10} ${junction[1]+80} ${pin2[0]} ${pin2[1]}`}
            fill="none"
            stroke="rgba(255,210,120,0.38)"
            strokeWidth="1.3"
            {...dashProps(branch2P, b2Len)}
          />
          {/* Branch 3 → card 3 (right, mid) */}
          <path
            d={`M ${junction[0]} ${junction[1]} Q ${(junction[0]+pin3[0])/2} ${junction[1]+30} ${pin3[0]} ${pin3[1]}`}
            fill="none"
            stroke="rgba(255,210,120,0.38)"
            strokeWidth="1.3"
            {...dashProps(branch3P, b3Len)}
          />
        </svg>

        {/* String drops from pin to card top — pure CSS via ::before on each card */}
        {/* Card 1 — left, highest */}
        <HangingCard
          testimonial={TESTIMONIALS[0]}
          visible={showCards[0]}
          swingAmp={1.6} swingPeriod={3800} swingPhase={0}
          style={{ left: "5%", top: "clamp(260px,42%,310px)" }}
        />
        {/* Card 2 — centre, lowest */}
        <HangingCard
          testimonial={TESTIMONIALS[1]}
          visible={showCards[1]}
          swingAmp={1.3} swingPeriod={4300} swingPhase={1400}
          style={{ left: "36%", top: "clamp(305px,52%,370px)" }}
        />
        {/* Card 3 — right, mid */}
        <HangingCard
          testimonial={TESTIMONIALS[2]}
          visible={showCards[2]}
          swingAmp={1.5} swingPeriod={3600} swingPhase={2500}
          style={{ left: "67%", top: "clamp(275px,46%,335px)" }}
        />
      </div>
    </section>
  );
}

/* ─── Contact ───────────────────────────────────────────────────────── */

function Contact() {
  const titleRef  = useScrollReveal();
  const leftRef   = useScrollReveal({ threshold: 0.1 });
  const rightRef  = useRef(null);
  const formRef   = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const SERVICE_ID  = "service_6ss4u88";
    const TEMPLATE_ID = "template_kxzloy8";
    const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

    if (!PUBLIC_KEY) {
      console.warn("[EmailJS] VITE_EMAILJS_PUBLIC_KEY is not set. Emails will not be sent.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message }, PUBLIC_KEY);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const contacts = [
    { href: "mailto:ismailtisetiwa@gmail.com",           icon: FiMail,     label: "Email",     val: "ismailtisetiwa@gmail.com" },
    { href: "https://wa.me/2347073558984",               icon: FaWhatsapp, label: "WhatsApp",  val: "+234 707 355 8984"        },
    { href: "https://linkedin.com/in/ismail-timileyin",  icon: FaLinkedin, label: "LinkedIn",  val: "ismail-timileyin"         },
    { href: "https://calendly.com/ismailtisetiwa/30min",         icon: FiCalendar, label: "Book a call", val: "30-min free consultation" },
  ];

  return (
    <section id="contact" className="section">
      <div ref={titleRef} className="sr">
        <p className="section-label">Get in touch</p>
        <h2 className="section-title">Let's Work Together</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "clamp(2rem,5vw,4rem)", alignItems: "start" }}>
        <div ref={leftRef} className="sr sr-left">
          <p style={{ fontSize: "clamp(0.9rem,2vw,1.05rem)", color: "#777", lineHeight: 1.8, marginBottom: "clamp(1.5rem,3vw,2rem)" }}>
            Open to freelance projects, full-time remote roles and interesting collaborations. If you have an idea — let's talk. A free 30-minute call is the best place to start.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {contacts.map(({ href, icon: Icon, label, val }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-row">
                <div className="contact-icon"><Icon size={17} /></div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "#555", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: "clamp(0.8rem,1.8vw,0.9rem)", color: "#d0d0d0", fontWeight: 500 }}>{val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form
          ref={(el) => { rightRef.current = el; formRef.current = el; }}
          className="sr sr-right"
          onSubmit={handleSubmit}
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(180px,100%),1fr))", gap: "1rem" }}>
            <input required name="name"  value={form.name}  onChange={handleChange} placeholder="Your name"     className="form-input" />
            <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" className="form-input" />
          </div>
          <input required name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="form-input" />
          <textarea required name="message" value={form.message} onChange={handleChange} placeholder="Your message…" rows={5} className="form-input" style={{ resize: "vertical", minHeight: 130 }} />

          {status === "error" && (
            <p style={{ fontSize: "0.82rem", color: "#ef4444", padding: "0.6rem 1rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8 }}>
              Something went wrong. Please email me directly at ismailtisetiwa@gmail.com
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="btn-primary"
            style={{ alignSelf: "flex-start", background: status === "sent" ? "#16a34a" : "#ff1f3d", boxShadow: status === "sent" ? "0 0 20px rgba(22,163,74,0.4)" : "0 0 24px rgba(255,31,61,0.4)" }}
          >
            <FiMail size={14} />
            {status === "idle" ? "Send Message" : status === "sending" ? "Sending…" : "✓ Sent!"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "clamp(2rem,4vw,3rem) clamp(1.25rem,5vw,3rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
            border: "1.5px solid rgba(255,31,61,0.4)",
            boxShadow: "0 0 12px rgba(255,31,61,0.15)",
          }}>
            <img src={profile} alt="Ismail Timi" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 800, letterSpacing: "0.06em", marginBottom: "0.2rem" }}>
              <span style={{ color: "#ff1f3d" }}>ISMAIL</span>
              <span style={{ color: "#f0f0f0" }}>&nbsp;TIMI</span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "#444" }}>
              © {new Date().getFullYear()} Ismail Timileyin. Designed & built with React + Framer Motion.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          {SOCIALS.map(({ href, icon: Icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.07)", color: "#555", transition: "all 0.25s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ff1f3d"; e.currentTarget.style.borderColor = "rgba(255,31,61,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── App ───────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
