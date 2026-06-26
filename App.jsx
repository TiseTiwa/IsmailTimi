import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  FiGithub, FiExternalLink, FiMenu, FiX, FiMail,
  FiPlay, FiPause, FiDownload, FiArrowRight, FiMapPin, FiPhone
} from 'react-icons/fi'
import {
  SiReact, SiNodedotjs, SiMongodb, SiJavascript, SiHtml5,
  SiCss, SiPython, SiFigma, SiVite, SiVercel, SiPostman,
  SiExpress, SiGit, SiTailwindcss
} from 'react-icons/si'
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'

/* ─── Data ─────────────────────────────────────────────────────────── */

const NAV = ['Home','About','Skills','Projects','Experience','Contact']

const TITLES = [
  'Full-Stack Web Developer',
  'Software Engineer',
  'B.Sc Computer Science Student',
]

const SKILLS = [
  { icon: SiHtml5,       label: 'HTML',        color: '#E34F26', yrs: '3+' },
  { icon: SiCss,         label: 'CSS',         color: '#1572B6', yrs: '3+' },
  { icon: SiJavascript,  label: 'JavaScript',  color: '#F7DF1E', yrs: '2+' },
  { icon: SiReact,       label: 'React',        color: '#61DAFB', yrs: '2+' },
  { icon: SiNodedotjs,   label: 'Node.js',     color: '#339933', yrs: '2+' },
  { icon: SiExpress,     label: 'Express',     color: '#bbb',    yrs: '2+' },
  { icon: SiMongodb,     label: 'MongoDB',     color: '#47A248', yrs: '2+' },
  { icon: SiPython,      label: 'Python',      color: '#3776AB', yrs: '1+' },
  { icon: SiFigma,       label: 'Figma',       color: '#F24E1E', yrs: '2+' },
  { icon: SiVite,        label: 'Vite',        color: '#646CFF', yrs: '2+' },
  { icon: SiVercel,      label: 'Vercel',      color: '#eee',    yrs: '2+' },
  { icon: SiPostman,     label: 'Postman',     color: '#FF6C37', yrs: '2+' },
  { icon: SiGit,         label: 'Git',         color: '#F05032', yrs: '2+' },
  { icon: SiTailwindcss, label: 'Tailwind',    color: '#06B6D4', yrs: '1+' },
]

const PROJECTS = [
  { id:1, cat:'fullstack', title:'Rielshotit — Photographer Portfolio',
    desc:'Portfolio site for a professional photographer/videographer showcasing works and bookings.',
    stack:['React','Vite','Tailwind'], demo:'https://riel-s-portfolio.vercel.app', github:'' },
  { id:2, cat:'fullstack', title:'Tidoy Airbnb Clone',
    desc:'Modern Airbnb-inspired landing and booking UI built with React + Vite.',
    stack:['React','Vite','CSS'], demo:'https://tidoy-main-seven.vercel.app/', github:'' },
  { id:3, cat:'frontend', title:'E-Commerce Dessert App',
    desc:'Product listing, cart management and order confirmation built with vanilla JS, HTML and CSS.',
    stack:['JavaScript','HTML','CSS'], demo:'https://tise-tiwa-e-commerce-order-desert-a.vercel.app/',
    github:'https://github.com/TiseTiwa/E-Commerce-Order-Desert-App' },
  { id:4, cat:'frontend', title:'Bible Quiz App',
    desc:'Interactive browser quiz with scoring, high-score persistence, sound effects and multiple flows.',
    stack:['JavaScript','HTML','CSS'], demo:'https://tise-tiwa-s-bible-quiz.vercel.app',
    github:'https://github.com/TiseTiwa/Tise-Tiwa-s-Bible-Quiz' },
  { id:5, cat:'fullstack', title:'Goal Tracker App',
    desc:'React + Vite SPA for setting and tracking personal goals with a clean component architecture.',
    stack:['React','Vite','Node.js'], demo:'https://goal-web-front-end.vercel.app',
    github:'https://github.com/TiseTiwa/Goal-web-Front-End' },
  { id:6, cat:'frontend', title:'World Info App',
    desc:'Browse and explore country data from around the world with search and filter functionality.',
    stack:['React','Vite','REST API'], demo:'https://world-info-app-eight.vercel.app',
    github:'https://github.com/TiseTiwa/World-Info-App' },
]

const EXPERIENCE = [
  { year:'2022 – 2025', title:'B.Sc Computer Science', org:'University',
    desc:'Studied data structures, algorithms, software engineering, databases and computer networks.' },
  { year:'2023', title:'TechStudio Bootcamp', org:'TechStudio Academy',
    desc:'Intensive full-stack bootcamp covering JavaScript, React, Node.js and MongoDB.' },
  { year:'2023', title:'Udemy Web Dev Certification', org:'Udemy',
    desc:'Completed a 60-hour modern web development course covering HTML, CSS, JS and React.' },
  { year:'2024 – Present', title:'Freelance Full-Stack Developer', org:'Self-employed',
    desc:'Building production-grade web apps for clients — portfolios, e-commerce and SaaS dashboards.' },
]

const SOCIALS = [
  { href:'https://github.com/TiseTiwa',           icon: FiGithub },
  { href:'https://linkedin.com/in/ismail-timileyin', icon: FaLinkedin },
  { href:'https://www.instagram.com/tisetiwa_fit/', icon: FaInstagram },
  { href:'https://wa.me/2347073558984',            icon: FaWhatsapp },
  { href:'mailto:ismailkoya04@gmail.com',          icon: FiMail },
]

/* ─── Scroll-reveal hook ────────────────────────────────────────────── */

function useScrollReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? '0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── Typewriter ────────────────────────────────────────────────────── */

function Typewriter({ titles }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = titles[idx]
    let t
    if (!deleting && text.length < full.length) {
      t = setTimeout(() => setText(full.slice(0, text.length + 1)), 65)
    } else if (!deleting && text.length === full.length) {
      t = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 38)
    } else {
      setDeleting(false)
      setIdx(i => (i + 1) % titles.length)
    }
    return () => clearTimeout(t)
  }, [text, deleting, idx, titles])

  return (
    <span style={{ color: '#ff1f3d', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
      {text}<span className="cursor" />
    </span>
  )
}

/* ─── Navbar ────────────────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active, setActive]       = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(5,5,5,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)',
        height: 'clamp(60px,8vw,76px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.03 }} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,2.5vw,1.35rem)', fontWeight: 800, letterSpacing: '0.06em', cursor: 'pointer' }} onClick={() => go('Home')}>
          <span style={{ color: '#ff1f3d' }}>ISMAIL</span>
          <span style={{ color: '#f0f0f0' }}>&nbsp;TIMI</span>
        </motion.div>

        {/* Desktop links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem,3vw,2.5rem)', listStyle: 'none' }} className="hide-mobile">
          {NAV.map(n => (
            <li key={n}>
              <button className="nav-link" onClick={() => go(n)}
                style={{ color: active === n ? '#ff1f3d' : undefined }}>
                {n}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <button className="btn-primary hide-mobile" onClick={() => go('Contact')}
          style={{ fontSize: '0.8rem', padding: '0.55rem 1.2rem' }}>
          Hire Me
        </button>

        {/* Mobile burger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#f0f0f0', padding: 4, display: 'none' }}
          className="mobile-only" aria-label="Toggle menu">
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', background: 'rgba(5,5,5,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <ul style={{ listStyle: 'none', padding: '1.5rem clamp(1.25rem,5vw,3rem)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {NAV.map(n => (
                <li key={n}>
                  <button onClick={() => go(n)} style={{ background: 'none', border: 'none', color: active === n ? '#ff1f3d' : '#bbb', fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer' }}>
                    {n}
                  </button>
                </li>
              ))}
              <li>
                <button className="btn-primary" onClick={() => go('Contact')} style={{ marginTop: '0.5rem' }}>
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.mobile-only { display: none !important; } @media(max-width:768px){ .mobile-only{ display:flex !important; } }`}</style>
    </motion.nav>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────────── */

function Hero() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const { scrollY } = useScroll()
  const yText    = useTransform(scrollY, [0, 600], [0, -100])
  const opacity  = useTransform(scrollY, [0, 400], [1, 0])

  const toggle = () => {
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play(); setPlaying(true) }
  }

  const stagger = (delay) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.8, ease: [0.22,1,0.36,1] } })

  return (
    <section id="home" style={{ position: 'relative', height: '100vh', minHeight: 560, overflow: 'hidden' }}>

      {/* Video bg */}
      <video ref={videoRef} autoPlay loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}>
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4"  type="video/mp4" />
      </video>

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(5,5,5,0.95) 35%, rgba(5,5,5,0.55) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 85%, rgba(255,31,61,0.14) 0%, transparent 55%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, #050505, transparent)' }} />

      {/* Content */}
      <motion.div style={{ y: yText, opacity, position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'clamp(2rem,6vw,4rem) clamp(1.25rem,6vw,3rem)', maxWidth: 1200, margin: '0 auto' }}>

        <motion.p {...stagger(0.2)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.65rem,1.5vw,0.8rem)',
          fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ff1f3d',
          marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ display: 'inline-block', width: 24, height: 1.5, background: '#ff1f3d', borderRadius: 2 }} />
          Available for work
        </motion.p>

        <motion.h1 {...stagger(0.35)} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.05,
          letterSpacing: '-0.03em', fontSize: 'clamp(2.4rem,7vw,5.5rem)', marginBottom: '0.6rem', color: '#f0f0f0' }}>
          Hi, I'm<br />
          <span style={{ color: '#ff1f3d' }}>Ismail Timi</span>
        </motion.h1>

        <motion.div {...stagger(0.55)} style={{ fontSize: 'clamp(0.95rem,2.5vw,1.3rem)', marginBottom: 'clamp(1.75rem,4vw,2.5rem)', color: '#aaa', minHeight: '2em' }}>
          <Typewriter titles={TITLES} />
        </motion.div>

        <motion.div {...stagger(0.7)} style={{ display: 'flex', gap: 'clamp(0.75rem,2vw,1rem)', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="/ismailcv.pdf" download className="btn-primary">
            <FiDownload size={15} /> Download CV
          </a>
          <button className="btn-outline" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View Projects <FiArrowRight size={15} />
          </button>
        </motion.div>

        {/* Social icons */}
        <motion.div {...stagger(0.9)} style={{ display: 'flex', gap: '0.85rem', marginTop: 'clamp(1.5rem,3vw,2rem)', flexWrap: 'wrap' }}>
          {SOCIALS.map(({ href, icon: Icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)', color: '#888', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ff1f3d'; e.currentTarget.style.borderColor = 'rgba(255,31,61,0.5)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(255,31,61,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none' }}>
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Play/pause */}
      <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 }}
        onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}
        style={{ position: 'absolute', bottom: 'clamp(1.25rem,3vw,2rem)', right: 'clamp(1.25rem,3vw,2rem)',
          width: 46, height: 46, borderRadius: '50%', border: '1px solid rgba(255,31,61,0.3)',
          background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          transition: 'box-shadow 0.25s' }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 22px rgba(255,31,61,0.6)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
        {playing ? <FiPause size={16} color="#ff1f3d" /> : <FiPlay size={16} color="#ff1f3d" />}
      </motion.button>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{ position: 'absolute', bottom: 'clamp(1.5rem,3vw,2.2rem)', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555' }}>scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ width: 1.5, height: 24, background: 'linear-gradient(to bottom, #ff1f3d, transparent)', borderRadius: 2 }} />
      </motion.div>
    </section>
  )
}

/* ─── About ─────────────────────────────────────────────────────────── */

function About() {
  const titleRef = useScrollReveal()
  const textRef  = useScrollReveal({ threshold: 0.1 })
  const statsRef = useScrollReveal({ threshold: 0.1 })

  const stats = [
    { val: '3+',  label: 'Years building' },
    { val: '10+', label: 'Projects shipped' },
    { val: '14+', label: 'Technologies' },
    { val: '2+',  label: 'Certifications' },
  ]

  return (
    <section id="about" className="section">
      <div ref={titleRef} className="sr">
        <p className="section-label">Who I am</p>
        <h2 className="section-title">About Me</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px,100%), 1fr))', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'start' }}>
        <div ref={textRef} className="sr sr-left">
          <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', color: '#aaa', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            I'm a Computer Science graduate and full-stack developer who turns ideas into
            production-grade web applications. I care deeply about performance, clean architecture,
            and experiences that feel effortless to use.
          </p>
          <p style={{ fontSize: 'clamp(0.875rem,1.8vw,1rem)', color: '#777', lineHeight: 1.8, marginBottom: '2rem' }}>
            Currently exploring mobile development to broaden my craft. Open to remote roles,
            freelance projects and long-term collaborations.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            {SOCIALS.map(({ href, icon: Icon }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer"
                style={{ width: 42, height: 42, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.08)', color: '#666', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ff1f3d'; e.currentTarget.style.borderColor = 'rgba(255,31,61,0.45)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(255,31,61,0.25)' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#666'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="sr sr-right" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.75rem,2vw,1rem)' }}>
          {stats.map(({ val, label }, i) => (
            <div key={label} className="stat-card" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="stat-val">{val}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Skills ────────────────────────────────────────────────────────── */

function Skills() {
  const titleRef = useScrollReveal()

  return (
    <section id="skills" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section">
        <div ref={titleRef} className="sr">
          <p className="section-label">What I work with</p>
          <h2 className="section-title">Skills & Tools</h2>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.5rem,1.5vw,0.75rem)' }}>
          {SKILLS.map(({ icon: Icon, label, color, yrs }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.045, duration: 0.45, ease: [0.22,1,0.36,1] }}>
              <div className="skill-pill">
                <Icon size={16} style={{ color, flexShrink: 0 }} />
                <span>{label}</span>
                <span style={{ color: '#444', fontSize: '0.7rem', fontWeight: 400 }}>{yrs}yr</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Projects ──────────────────────────────────────────────────────── */

function Projects() {
  const [filter, setFilter] = useState('all')
  const titleRef = useScrollReveal()
  const cats = ['all','fullstack','frontend']
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === filter)

  return (
    <section id="projects" className="section">
      <div ref={titleRef} className="sr">
        <p className="section-label">What I've built</p>
        <h2 className="section-title">Projects</h2>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: 'clamp(2rem,4vw,3rem)', flexWrap: 'wrap' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            style={{
              padding: '0.5rem 1.2rem', borderRadius: 999, fontSize: 'clamp(0.75rem,1.8vw,0.85rem)',
              fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', letterSpacing: '0.03em',
              textTransform: 'capitalize', transition: 'all 0.25s ease',
              background: filter === c ? '#ff1f3d' : 'rgba(255,255,255,0.04)',
              color: filter === c ? '#fff' : '#888',
              border: `1px solid ${filter === c ? '#ff1f3d' : 'rgba(255,255,255,0.08)'}`,
              boxShadow: filter === c ? '0 0 18px rgba(255,31,61,0.45)' : 'none',
            }}>
            {c}
          </button>
        ))}
      </div>

      <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%),1fr))', gap: 'clamp(1rem,2.5vw,1.5rem)' }}>
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.article key={p.id} layout initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22,1,0.36,1] }}
              className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '0.25rem 0.75rem', borderRadius: 999,
                  background: 'rgba(255,31,61,0.1)', color: '#ff1f3d' }}>
                  {p.cat}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.95rem,2vw,1.05rem)', fontWeight: 700, lineHeight: 1.35, color: '#f0f0f0' }}>
                {p.title}
              </h3>

              <p style={{ fontSize: 'clamp(0.8rem,1.8vw,0.875rem)', color: '#666', lineHeight: 1.7, flex: 1 }}>
                {p.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {p.stack.map(t => (
                  <span key={t} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: 6,
                    background: 'rgba(255,255,255,0.04)', color: '#666', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 600, color: '#ff1f3d', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.75'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    <FiExternalLink size={13} /> Live Demo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 500, color: '#666', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f0f0f0'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
                    <FiGithub size={13} /> GitHub
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

/* ─── Experience ────────────────────────────────────────────────────── */

function Experience() {
  const titleRef = useScrollReveal()

  return (
    <section id="experience" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section">
        <div ref={titleRef} className="sr">
          <p className="section-label">My journey</p>
          <h2 className="section-title">Experience & Education</h2>
        </div>

        <div className="timeline" style={{ maxWidth: 760 }}>
          {EXPERIENCE.map((e, i) => {
            const ref = useScrollReveal({ threshold: 0.15 })
            return (
              <div key={i} ref={ref} className="sr" style={{ position: 'relative', marginBottom: i < EXPERIENCE.length - 1 ? 'clamp(1.5rem,3vw,2.25rem)' : 0, transitionDelay: `${i * 0.1}s` }}>
                <div className="timeline-dot" />
                <div className="card" style={{ marginLeft: '0.75rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ff1f3d', marginBottom: '0.35rem' }}>
                    {e.year}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem,2.2vw,1.15rem)', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.2rem' }}>
                    {e.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '0.75rem', fontWeight: 500 }}>
                    {e.org}
                  </p>
                  <p style={{ fontSize: 'clamp(0.82rem,1.8vw,0.9rem)', color: '#777', lineHeight: 1.7 }}>
                    {e.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Contact ───────────────────────────────────────────────────────── */

function Contact() {
  const titleRef = useScrollReveal()
  const leftRef  = useScrollReveal({ threshold: 0.1 })
  const rightRef = useScrollReveal({ threshold: 0.1 })
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const contacts = [
    { href: 'mailto:ismailkoya04@gmail.com', icon: FiMail,      label: 'Email',     val: 'ismailkoya04@gmail.com' },
    { href: 'https://wa.me/2347073558984',   icon: FaWhatsapp,  label: 'WhatsApp',  val: '+234 707 355 8984' },
    { href: 'https://linkedin.com/in/ismail-timileyin', icon: FaLinkedin, label: 'LinkedIn', val: 'ismail-timileyin' },
  ]

  return (
    <section id="contact" className="section">
      <div ref={titleRef} className="sr">
        <p className="section-label">Get in touch</p>
        <h2 className="section-title">Let's Work Together</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%),1fr))', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'start' }}>
        <div ref={leftRef} className="sr sr-left">
          <p style={{ fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: '#777', lineHeight: 1.8, marginBottom: 'clamp(1.5rem,3vw,2rem)' }}>
            I'm open to freelance projects, full-time remote roles and interesting collaborations.
            If you have an idea you'd like to bring to life — let's talk.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {contacts.map(({ href, icon: Icon, label, val }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-row">
                <div className="contact-icon"><Icon size={17} /></div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#555', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 'clamp(0.8rem,1.8vw,0.9rem)', color: '#d0d0d0', fontWeight: 500 }}>{val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form ref={rightRef} className="sr sr-right" onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px,100%),1fr))', gap: '1rem' }}>
            <input required name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="form-input" />
            <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" className="form-input" />
          </div>
          <input required name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="form-input" />
          <textarea required name="message" value={form.message} onChange={handleChange} placeholder="Your message…" rows={5} className="form-input" style={{ resize: 'vertical', minHeight: 130 }} />
          <button type="submit" disabled={status === 'sending' || status === 'sent'} className="btn-primary"
            style={{ alignSelf: 'flex-start', background: status === 'sent' ? '#16a34a' : '#ff1f3d',
              boxShadow: status === 'sent' ? '0 0 20px rgba(22,163,74,0.4)' : '0 0 24px rgba(255,31,61,0.4)' }}>
            <FiMail size={14} />
            {status === 'idle' ? 'Send Message' : status === 'sending' ? 'Sending…' : '✓ Message Sent!'}
          </button>
        </form>
      </div>
    </section>
  )
}

/* ─── Footer ────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(2rem,4vw,3rem) clamp(1.25rem,5vw,3rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem,2vw,1.2rem)', fontWeight: 800, letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
            <span style={{ color: '#ff1f3d' }}>ISMAIL</span>
            <span style={{ color: '#f0f0f0' }}>&nbsp;TIMI</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#444' }}>
            © {new Date().getFullYear()} Ismail Timi. All Rights Reserved.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {SOCIALS.map(({ href, icon: Icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              style={{ width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.07)', color: '#555', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ff1f3d'; e.currentTarget.style.borderColor = 'rgba(255,31,61,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}>
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
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
      <Contact />
      <Footer />
    </>
  )
}
