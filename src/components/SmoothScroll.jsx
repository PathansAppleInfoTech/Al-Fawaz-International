import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

// Lenis smooth scroll for the whole site + the reveal-on-scroll observer used by every page.
// Add data-reveal="up|left|right|fade|mask|arch|wipe" to any element, or data-group to a
// wrapper whose .rv-line children should slide in.
export default function SmoothScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
    })
    window.__lenis = lenis
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null }
  }, [])

  useEffect(() => {
    const lenis = window.__lenis
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el && lenis) lenis.scrollTo(el, { offset: -90 })
      }, 150)
    } else if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    const t = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-in), [data-group]:not(.is-in)').forEach((el) => io.observe(el))
    }, 80)
    return () => { clearTimeout(t); io.disconnect() }
  }, [pathname, hash])

  return null
}
