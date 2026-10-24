import { useEffect, useRef, useState } from 'react'
import { SK, EX, PJ } from './data.js'
import { useReveal, useScrollEffects, useCardSpotlight, useTheme, useCountUp, useTypewriter } from './hooks.js'

const RESUME = 'Syed_Ajmathulla_Frontend_Resume.pdf'
const EMAIL = 'sdajmathulla@gmail.com'
const LINKEDIN = 'https://linkedin.com/in/syed-ajmathulla-055ab1216'
const NAV = ['about', 'skills', 'experience', 'projects', 'education', 'contact']
const SECTIONS = ['about', 'skills', 'experience', 'projects', 'education', 'resume', 'contact']
const ROLES = ['React.js', 'Angular', 'TypeScript', 'JavaScript (ES6+)']
const LANGS = ['English – Professional', 'Telugu – Native', 'Hindi – Conversational', 'Urdu – Conversational']
const delay = (d) => ({ '--d': `${d}s` })

const Chips = ({ items }) => (
  <div className="chips">{items.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
)
const Bullets = ({ items }) => <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>

function Stat({ to, decimals = 0, suffix = '', label }) {
  const ref = useRef(null)
  useCountUp(to, decimals, ref)
  return (
    <div className="card stat">
      <b><span ref={ref}>{to.toFixed(decimals)}</span>{suffix}</b>
      <span>{label}</span>
    </div>
  )
}

function Hero() {
  const role = useTypewriter(ROLES)
  return (
    <section className="hero" style={{ paddingBottom: 88 }}>
      <div className="blob b1" /><div className="blob b2" />
      <div className="w hg">
        <div className="hc">
          <span className="badge rv"><i className="dot" />Open to relocation · Immediate joiner</span>
          <h1 className="rv" style={delay(0.1)}>
            <span style={{ fontSize: '.4em', display: 'block', fontWeight: 600, color: 'var(--mu)', letterSpacing: 0, marginBottom: 6 }}>Hello, I'm</span>
            <span className="g">Syed Ajmathulla</span>
          </h1>
          <p className="role rv" style={delay(0.2)}>
            <span id="ty">{role}</span><span className="cur" /> <span style={{ opacity: 0.8 }}>Frontend Developer</span>
          </p>
          <p className="lead rv" style={delay(0.3)}>
            Frontend Developer with 4.8+ years building reusable, responsive interfaces in React.js and Angular for a healthcare Electronic Health Record (EHR) platform, with strong JavaScript, TypeScript and REST API integration.
          </p>
          <div className="cta rv" style={delay(0.4)}>
            <a className="btn p" href="#projects">View My Work →</a>
            <a className="btn" href={RESUME} download>⬇ Download Resume</a>
          </div>
          <div className="soc rv" style={delay(0.5)}>
            <a className="btn sm" href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
            <a className="btn sm" href={`mailto:${EMAIL}`}>Email</a>
            <a className="btn sm" href="tel:+918328044343">Call</a>
          </div>
          <a href="#about" className="sc rv" style={delay(0.6)}><i />Scroll</a>
        </div>
        <div className="ph rv" style={delay(0.25)}>
          <div className="ring">
            <img src="./profile.webp" width="480" height="480" alt="Professional profile photo of Syed Ajmathulla" fetchPriority="high" />
          </div>
          <span className="fb f1">⚛ React.js</span>
          <span className="fb f2">Angular</span>
          <span className="fb f3"><i className="dot" />Immediate joiner</span>
        </div>
      </div>
    </section>
  )
}

const About = () => (
  <section id="about" className="alt"><div className="w">
    <p className="eye rv">About me</p>
    <h2 className="rv">React.js and Angular, built for real products</h2>
    <div className="ab">
      <div className="card rv">
        <p style={{ color: 'var(--mu)' }}>Frontend Developer with 4.8+ years of overall frontend experience, with professional experience in both React.js and Angular/AngularJS, including React.js work on the Practice Administration and ITS Tracker projects. Strong in JavaScript (ES6+), TypeScript, reusable components, responsive design, REST API integration, and maintainable UI architecture.</p>
        <p style={{ color: 'var(--mu)', marginTop: 14 }}>Professional Angular work includes RxJS, Reactive Forms, and Angular Material on healthcare EHR applications. I collaborate closely with backend, QA, and product teams, and I'm open to React.js Developer and Angular Developer roles, available to join immediately.</p>
        <div style={{ marginTop: 18 }}><Chips items={LANGS} /></div>
      </div>
      <div className="st rv" style={delay(0.15)}>
        <Stat to={4.8} decimals={1} suffix="+" label="Years experience" />
        <Stat to={3} label="Roles held" />
        <Stat to={4} label="Key projects" />
        <div className="card stat"><b>React + Angular</b><span>Two frameworks, one team</span></div>
      </div>
    </div>
  </div></section>
)

const Skills = () => (
  <section id="skills"><div className="w">
    <p className="eye rv">Skills</p><h2 className="rv">Technologies I work with</h2>
    <div className="sk">
      {SK.map(([h, a], i) => (
        <div className="card rv" style={delay(i * 0.06)} key={h}><h3>{h}</h3><Chips items={a} /></div>
      ))}
    </div>
  </div></section>
)

const Experience = ({ timelineRef }) => (
  <section id="experience" className="alt"><div className="w">
    <p className="eye rv">Experience</p><h2 className="rv">Where I've worked</h2>
    <div className="tl" ref={timelineRef}>
      {EX.map(([r, c, l, d, b, t]) => (
        <article className="card rv" key={r + d}>
          <div className="hd">
            <div><h3>{r}</h3><p className="co">{c}</p><p className="mt">{l}</p></div>
            <span className="dt">{d}</span>
          </div>
          <Bullets items={b} /><Chips items={t} />
        </article>
      ))}
    </div>
  </div></section>
)

const Projects = () => (
  <section id="projects"><div className="w">
    <p className="eye rv">Projects</p><h2 className="rv">Projects I've built</h2>
    <div className="pj">
      {PJ.map(([n, s, b, t, w], i) => (
        <article className={`card rv ${w ? 'big' : ''}`} style={delay((i % 2) * 0.1)} key={n}>
          <p className="tag">{s}</p><h3>{n}</h3><Bullets items={b} /><Chips items={t} />
        </article>
      ))}
    </div>
  </div></section>
)

const Education = () => (
  <section id="education" className="alt"><div className="w">
    <p className="eye rv">Education</p><h2 className="rv">Education &amp; languages</h2>
    <div className="ed">
      <div className="card rv">
        <h3>Bachelor of Science (B.Sc. – MPC)</h3>
        <p className="co">Parvathaneni Brahmayya Siddhartha College of Arts &amp; Science</p>
        <p className="mt">Vijayawada · Krishna University</p>
        <span className="dt">2015 – 2020</span>
      </div>
      <div className="card rv" style={delay(0.1)}>
        <h3>Languages</h3>
        <div style={{ marginTop: 6 }}><Chips items={LANGS} /></div>
      </div>
    </div>
  </div></section>
)

const ResumeCta = () => (
  <section id="resume"><div className="w rs rv">
    <p className="eye">Resume</p><h2>Want the full picture?</h2>
    <p>Download my resume for complete details on experience, skills and projects.</p>
    <div className="cta"><a className="btn p" href={RESUME} download>⬇ Download Resume</a></div>
  </div></section>
)

function Contact() {
  const [v, setV] = useState({ n: '', e: '', m: '' })
  const [err, setErr] = useState({})
  const [status, setStatus] = useState({ ok: false, text: '' })
  const [busy, setBusy] = useState(false)
  const set = (k) => (ev) => setV({ ...v, [k]: ev.target.value })

  const submit = (ev) => {
    ev.preventDefault()
    const n = v.n.trim(), e = v.e.trim(), m = v.m.trim()
    const er = {
      n: n ? '' : 'Please enter your name.',
      e: /^\S+@\S+\.\S+$/.test(e) ? '' : 'Enter a valid email.',
      m: m.length >= 10 ? '' : 'Message should be at least 10 characters.',
    }
    setErr(er)
    if (er.n || er.e || er.m) { setStatus({ ok: false, text: 'Please fix the errors above.' }); return }
    setBusy(true)
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio enquiry from ' + n)}&body=${encodeURIComponent(m + '\n\n— ' + n + ' (' + e + ')')}`
    setStatus({ ok: true, text: 'Your email app should open with the message ready to send.' })
    setTimeout(() => setBusy(false), 1500)
  }

  return (
    <section id="contact" className="alt"><div className="w">
      <p className="eye rv">Contact</p><h2 className="rv">Let's work together</h2>
      <div className="ct">
        <div className="ci rv">
          <a className="card" href={`mailto:${EMAIL}`}><span>✉</span><div><small>Email</small>{EMAIL}</div></a>
          <a className="card" href="tel:+918328044343"><span>✆</span><div><small>Phone</small>+91 8328044343</div></a>
          <a className="card" href={LINKEDIN} target="_blank" rel="noopener"><span>in</span><div><small>LinkedIn</small>syed-ajmathulla-055ab1216</div></a>
        </div>
        <form className="card rv" noValidate style={delay(0.1)} onSubmit={submit}>
          <label>Name<input value={v.n} onChange={set('n')} autoComplete="name" /><span className="er">{err.n}</span></label>
          <label>Email<input type="email" value={v.e} onChange={set('e')} autoComplete="email" /><span className="er">{err.e}</span></label>
          <label>Message<textarea value={v.m} onChange={set('m')} /><span className="er">{err.m}</span></label>
          <button className="btn p" type="submit" disabled={busy}>{busy ? 'Opening mail app…' : 'Send message'}</button>
          <p className={`msg ${status.ok ? 'ok' : ''}`} role="status">{status.text}</p>
        </form>
      </div>
    </div></section>
  )
}

export default function App() {
  const progressRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)
  const [open, setOpen] = useState(false)
  const toggleTheme = useTheme()
  const { active, showTop } = useScrollEffects({ progressRef, headerRef, timelineRef, sectionIds: SECTIONS })
  useReveal()
  useCardSpotlight()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div id="pg" ref={progressRef} aria-hidden="true" />
      <header ref={headerRef}><div className="w nav">
        <a href="#home" className="logo" aria-label="Syed Ajmathulla, home">Syed<b>.</b>Ajmathulla</a>
        <nav className={`links ${open ? 'o' : ''}`} id="nav" aria-label="Main">
          {NAV.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ic" onClick={toggleTheme} aria-label="Toggle dark/light theme">◐</button>
          <button className="ic burger" onClick={() => setOpen(!open)} aria-label="Open menu" aria-expanded={open} aria-controls="nav">{open ? '✕' : '☰'}</button>
        </div>
      </div></header>
      <main id="home">
        <Hero /><About /><Skills /><Experience timelineRef={timelineRef} /><Projects /><Education /><ResumeCta /><Contact />
      </main>
      <footer><div className="w ft">
        <span>© {new Date().getFullYear()} Syed Ajmathulla</span>
        <span>Frontend Developer · React.js · Angular</span>
      </div></footer>
      <button className={`ic top ${showTop ? 'v' : ''}`} onClick={() => scrollTo({ top: 0 })} aria-label="Back to top">↑</button>
    </>
  )
}
