import { useEffect, useState } from 'react'

export const reduced = () => matchMedia('(prefers-reduced-motion:reduce)').matches

// Adds .in to every .rv element once it scrolls into view.
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((x) => {
        if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target) }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.rv').forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
}

// Scroll progress, sticky header shadow, active nav link, back-to-top, timeline fill.
export function useScrollEffects({ progressRef, headerRef, timelineRef, sectionIds }) {
  const [active, setActive] = useState('')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let tick = 0
    const update = () => {
      tick = 0
      const max = document.documentElement.scrollHeight - innerHeight
      progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`
      headerRef.current.classList.toggle('sc2', scrollY > 8)

      const tl = timelineRef.current
      if (tl) {
        const r = tl.getBoundingClientRect()
        tl.style.setProperty('--tp', Math.max(0, Math.min(1, (innerHeight * 0.6 - r.top) / r.height)))
      }

      const y = scrollY + 120
      let cur = ''
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) cur = id
      })
      setActive(cur)
      setShowTop(scrollY > 600)
    }
    const onScroll = () => { tick || (tick = requestAnimationFrame(update)) }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    update()
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
    }
  }, [progressRef, headerRef, timelineRef, sectionIds])

  return { active, showTop }
}

// Cursor-following glow on cards.
export function useCardSpotlight() {
  useEffect(() => {
    const move = (e) => {
      const c = e.target.closest && e.target.closest('.card')
      if (!c) return
      const b = c.getBoundingClientRect()
      c.style.setProperty('--mx', e.clientX - b.left + 'px')
      c.style.setProperty('--my', e.clientY - b.top + 'px')
    }
    document.addEventListener('pointermove', move, { passive: true })
    return () => document.removeEventListener('pointermove', move)
  }, [])
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || '' } catch { return '' }
  })
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme
  }, [theme])
  return () => {
    const R = document.documentElement
    const dark = R.dataset.theme ? R.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches
    const next = dark ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('theme', next) } catch { /* storage unavailable */ }
  }
}

export function useCountUp(to, decimals, ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ease = (t) => 1 - Math.pow(1 - t, 3)
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return
      io.disconnect()
      if (reduced()) { el.textContent = to.toFixed(decimals); return }
      const t0 = performance.now()
      const f = (n) => {
        const k = Math.min(1, (n - t0) / 1300)
        el.textContent = (to * ease(k)).toFixed(decimals)
        if (k < 1) requestAnimationFrame(f)
      }
      requestAnimationFrame(f)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, decimals, ref])
}

export function useTypewriter(words) {
  const [text, setText] = useState(words[0])
  useEffect(() => {
    if (reduced()) return
    let wi = 0, ci = words[0].length, del = true
    let id
    const step = () => {
      const w = words[wi]
      setText(w.slice(0, ci))
      let d = del ? 45 : 85
      if (!del && ci === w.length) { del = true; d = 1600 }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; d = 250 }
      else ci += del ? -1 : 1
      id = setTimeout(step, d)
    }
    id = setTimeout(step, 1600)
    return () => clearTimeout(id)
  }, [words])
  return text
}
