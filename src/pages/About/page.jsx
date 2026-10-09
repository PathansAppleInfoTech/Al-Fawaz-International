import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { company, waLink } from '../../data/company.js'
import Reveal from '../../components/Reveal.jsx'

/* =========================================================
   ICONS & HELPERS
========================================================= */

const ArrowIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

const CheckIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ShieldIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

/* Used by hero + Who we are only (unchanged) */
function Eyebrow({ children, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-10 ${light ? 'bg-white' : 'bg-[#8B1E46]'}`} />
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.22em] md:text-xs ${light ? 'text-white' : 'text-[#8B1E46]'
          }`}
      >
        {children}
      </p>
    </div>
  )
}

/* ---------------------------------------------------------
   SafeImage: tries the given src, then fallbacks, and always
   sits on a branded gradient so the box is never blank.
--------------------------------------------------------- */
function SafeImage({ srcs, alt, className = '', ...rest }) {
  const [i, setI] = useState(0)
  const [failed, setFailed] = useState(false)
  const list = Array.isArray(srcs) ? srcs : [srcs]

  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B2F66_0%,#071B3C_60%,#8B1E46_140%)]">
      {!failed && (
        <img
          key={list[i]}
          src={list[i]}
          alt={alt}
          referrerPolicy="no-referrer"
          decoding="async"
          onError={() => (i < list.length - 1 ? setI(i + 1) : setFailed(true))}
          className={`h-full w-full object-cover ${className}`}
          {...rest}
        />
      )}
    </div>
  )
}
const FALLBACK = '/assets/common/hero.png'

/* ---------------------------------------------------------
   ScrollReveal: fades in only when the element scrolls into
   view (IntersectionObserver), once. `delay` is in ms.
--------------------------------------------------------- */
function ScrollReveal({ as: Tag = 'div', delay = 0, y = 28, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: shown ? 'auto' : 'opacity, transform',
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Shared heading style for the redesigned sections */
const h2Base = 'font-sans text-[clamp(2.4rem,4.8vw,4.8rem)] font-extrabold leading-[0.94] tracking-[-0.045em]'
const outlineMaroon = 'block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]'
const outlineWhite = 'block text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]'

/* =========================================================
   ABOUT COMPONENT
========================================================= */

export default function About() {
  const siteUrl = useMemo(() => {
    if (typeof window === 'undefined') return 'https://www.alfawazinternational.com'
    return window.location.origin
  }, [])

  const detailsList = [
    { label: 'Registered name', value: company.name, link: null },
    { label: 'Arabic legal name', value: company.arabic, link: null, isArabic: true },
    { label: 'Commercial Registration', value: company.cr, link: null },
    { label: 'Location', value: company.address, icon: MapPinIcon, link: 'https://www.google.com/maps?q=Doha+Qatar+Zone+27+Street+950' },
    { label: 'Phone', value: company.phoneIntl, icon: PhoneIcon, link: `tel:${company.phone}` },
    { label: 'Email', value: company.email, icon: MailIcon, link: `mailto:${company.email}` },
    { label: 'Website', value: company.website, icon: ArrowIcon, link: company.url },
  ]

  const focusAreas = [
    ['Qatar network', 'Nationwide supply reach'],
    ['Zero delay', 'Responsive scheduling'],
    ['Quality assured', 'Certified storage & handling'],
  ]

  const standards = [
    'Fast order intake via WhatsApp, phone and email',
    'Direct doorstep delivery to families and commercial accounts',
    'Reliable stock buffers preventing out-of-stock disappointments',
  ]

  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}
      <Helmet>
        <title>About Us | Al Fawaz International for Food Trading, Doha Qatar</title>
        <meta
          name="description"
          content="Learn about Al Fawaz International for Food Trading in Doha, Qatar: our vision, mission, values, commercial registration and commitment to rapid food and beverage distribution."
        />
        <link rel="canonical" href={`${company.url}/about`} />
        <meta property="og:title" content="About Al Fawaz International for Food Trading" />
        <meta
          property="og:description"
          content="Discover the vision, mission and values behind Al Fawaz International for Food Trading in Doha, Qatar."
        />
        <meta property="og:url" content={`${company.url}/about`} />
        <meta property="og:image" content={`${siteUrl}/assets/logo.png`} />
      </Helmet>

      {/* HERO (unchanged) */}
      <section className="relative isolate h-[42vh] min-h-[400px] max-h-[520px] overflow-hidden bg-[#071B3C]">
        <div className="absolute inset-0 -z-20">
          <SafeImage srcs={[FALLBACK]} alt="" aria-hidden="true" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,18,40,0.94)_0%,rgba(4,18,40,0.76)_45%,rgba(4,18,40,0.42)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,27,60,0.1)_0%,rgba(7,27,60,0.72)_100%)]" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[24rem] w-[24rem] rounded-full border border-[#ffffff]/20" />

        <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-5 pb-10 md:px-10 md:pb-14">
          <div className="max-w-4xl">
            <Reveal><Eyebrow light>About Al Fawaz International</Eyebrow></Reveal>
            <Reveal as="h1" delay={0.1} className="mt-5 font-sans text-[clamp(2.6rem,6vw,5.8rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
              Built to move
              <span className="block text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>
                what matters.
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHO WE ARE (unchanged)
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute -right-36 top-1/3 h-96 w-96 rounded-full border border-[#0B2F66]/5" />
        <div className="pointer-events-none absolute -left-20 top-2/3 h-72 w-72 rounded-full border border-[#8B1E46]/5" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>Who we are</Eyebrow>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="mt-6 max-w-2xl font-sans text-[clamp(2.5rem,5vw,5.2rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-[#0B2F66]">
                  A distribution partner
                  <span className="block">built around</span>
                  <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                    trust and speed.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-8 max-w-xl text-base leading-7 text-[#23314A]/75 md:text-lg md:leading-8">
                  {company.intro}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#23314A]/65 md:text-base">
                  Operating in the vibrant market of Doha, Al Fawaz International was established with
                  a clear mission: to eliminate distribution delays and supply bottlenecks. Whether delivering
                  bulk water packs to homes or keeping retail shelves continuously stocked, we treat every order
                  with operational urgency.
                </p>
              </Reveal>

              <Reveal delay={300} className="mt-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2F66]/50">
                  Customer Sectors We Support:
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {company.serves.map((sector) => (
                    <span
                      key={sector}
                      className="group flex items-center gap-2 rounded-full border border-[#0B2F66]/15 bg-[#F2F5F9] px-4 py-2 text-xs font-bold text-[#0B2F66] transition-all duration-300 hover:border-[#8B1E46] hover:bg-[#8B1E46] hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8B1E46] transition-colors group-hover:bg-white" />
                      {sector}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="relative lg:col-span-5">
              <Reveal variant="right" delay={180}>
                <div className="relative">
                  <div className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-[#ffffff] md:-left-6 md:-top-6 md:h-32 md:w-32" />
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-[#8B1E46] md:-bottom-6 md:-right-6 md:h-32 md:w-32" />

                  <div className="group relative overflow-hidden rounded-[2.5rem] bg-[#071B3C] shadow-2xl">
                    <img
                      src="/assets/common/truck.png"
                      alt="Al Fawaz International logistics fleet and distribution"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3C]/80 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#ffffff]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                          Doha · State of Qatar
                        </span>
                      </div>
                      <p className="mt-2 text-xl font-extrabold text-white">
                        Fleet on the road daily
                      </p>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 max-w-xs rounded-2xl border border-white/20 bg-white/95 p-4 shadow-xl backdrop-blur-md md:-bottom-8 md:-left-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8B1E46] text-white">
                        <CheckIcon />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#23314A]/50">
                          Ministry Registered
                        </p>
                        <p className="text-sm font-extrabold text-[#0B2F66]">
                          CR № {company.cr}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISION & MISSION
          Two full-bleed halves meeting in the middle.
          No cards: just colour, space and big type.
      ===================================================== */}
      <section className="grid lg:grid-cols-2">
        {/* Vision (navy) */}
        <div className="relative overflow-hidden bg-[#071B3C] px-5 py-20 text-white md:px-10 md:py-28 lg:pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))] lg:pr-16">
          <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-[20rem] w-[20rem] rounded-full border border-[#ffffff]/25" />

          <div className="relative flex h-full max-w-xl flex-col">
            <ScrollReveal>
              <div className="flex items-center gap-3 text-[#ffffff]">
                <span className="h-px w-8 bg-[#ffffff]" />
                <span className="text-sm font-semibold">Our Vision</span>
              </div>
            </ScrollReveal>

            <ScrollReveal as="blockquote" delay={100} className="mt-8 font-sans text-[clamp(1.9rem,3.3vw,3.1rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
              {company.vision.quote}
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mt-6 text-base leading-8 text-white/70">{company.vision.text}</p>
            </ScrollReveal>

            <ScrollReveal delay={300} className="mt-auto pt-14">
              <dl className="border-b border-white/15">
                {focusAreas.map(([t, s]) => (
                  <div key={t} className="flex items-baseline justify-between gap-6 border-t border-white/15 py-4">
                    <dt className="text-sm font-bold text-white">{t}</dt>
                    <dd className="text-sm text-white/55">{s}</dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>
        </div>

        {/* Mission (light) */}
        <div className="relative overflow-hidden bg-[#F2F5F9] px-5 py-20 md:px-10 md:py-28 lg:pl-16 lg:pr-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]">
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full border border-[#8B1E46]/10" />

          <div className="relative flex h-full max-w-xl flex-col">
            <ScrollReveal delay={80}>
              <div className="flex items-center gap-3 text-[#8B1E46]">
                <span className="h-px w-8 bg-[#8B1E46]" />
                <span className="text-sm font-semibold">Our Mission</span>
              </div>
            </ScrollReveal>

            <ScrollReveal as="blockquote" delay={180} className="mt-8 font-sans text-[clamp(1.9rem,3.3vw,3.1rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#0B2F66]">
              {company.mission.quote}
            </ScrollReveal>

            <ScrollReveal delay={280}>
              <p className="mt-6 text-base leading-8 text-[#23314A]/70">{company.mission.text}</p>
            </ScrollReveal>

            <ScrollReveal delay={380} className="mt-auto pt-14">
              <ul className="border-b border-[#0B2F66]/12">
                {standards.map((s) => (
                  <li key={s} className="flex items-start gap-3 border-t border-[#0B2F66]/12 py-4 text-sm font-semibold leading-6 text-[#0B2F66]">
                    <span className="mt-0.5 text-[#1F7A4D]"><CheckIcon size={18} /></span>
                    {s}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          PHILOSOPHY: arched image + oversized type
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#0B2F66] py-24 md:py-36">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[30rem] w-[30rem] rounded-full border border-[#ffffff]/20" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <ScrollReveal y={40}>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* offset outline arch behind the photo */}
                  <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[1.5rem] border border-[#ffffff]/60 md:translate-x-6 md:translate-y-6" />
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] bg-[#071B3C]">
                    <img
                      src="/assets/common/doorStep.png"
                      alt="Al Fawaz food distribution delivery and handling"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3C]/75 via-transparent to-transparent" />
                    <p className="absolute inset-x-0 bottom-7 px-6 text-center text-lg font-bold text-white">
                      Distribution without delay
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="text-base font-semibold text-[#ffffff]">How we operate</p>
              </ScrollReveal>

              <div className="mt-6 space-y-1">
                {company.philosophy.line.map((line, index) => (
                  <ScrollReveal key={line} delay={index * 130} y={36}>
                    <span
                      className={`block font-sans text-[clamp(2.8rem,6.5vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.055em] ${index === 0
                          ? 'text-white'
                          : index === 1
                            ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]'
                            : 'text-[#ffffff]'
                        }`}
                    >
                      {line}
                    </span>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={400}>
                <p className="mt-8 max-w-xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
                  {company.philosophy.text}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={500} className="mt-10">
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#ffffff] px-7 py-4 text-sm font-extrabold text-[#071B3C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    Start a supply partnership
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </Link>
                  <a
                    href={waLink('Hello Al Fawaz, I would like to learn about your distribution routes.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-white/25 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ORDER JOURNEY: a real timeline (this IS a sequence)
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#F2F5F9] py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <ScrollReveal as="h2" className={`${h2Base} max-w-2xl text-[#0B2F66]`}>
              From your requirement
              <span className={outlineMaroon}>to your doorstep.</span>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <p className="max-w-md text-base leading-7 text-[#23314A]/70">
                Four coordinated steps designed to remove turnaround delays and keep you informed
                on every delivery.
              </p>
            </ScrollReveal>
          </div>

          <div className="relative mt-20 grid gap-12 lg:grid-cols-4 lg:gap-8">
            {/* connecting line: vertical on mobile, horizontal on desktop */}
            <div className="pointer-events-none absolute bottom-6 left-6 top-6 w-px bg-[#0B2F66]/20 lg:hidden" />
            <div className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-[#ffffff] via-[#0B2F66]/25 to-[#8B1E46] lg:block" />

            {company.steps.map(([title, text], i) => {
              const last = i === company.steps.length - 1
              return (
                <ScrollReveal key={title} delay={i * 120} className="relative pl-20 lg:pl-0 lg:pt-20">
                  <span
                    className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full font-sans text-base font-extrabold ring-8 ring-[#F2F5F9] ${last ? 'bg-[#8B1E46] text-white' : 'bg-[#0B2F66] text-[#ffffff]'
                      }`}
                  >
                    {last ? <CheckIcon size={20} /> : i + 1}
                  </span>
                  <h3 className="font-sans text-xl font-extrabold tracking-[-0.02em] text-[#0B2F66]">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-[#23314A]/70">{text}</p>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CREDENTIALS: a registry sheet, not a grid of cards
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <ScrollReveal as="h2" className={`${h2Base} text-[#0B2F66]`}>
                  Licensed and
                  <span className={outlineMaroon}>fully registered.</span>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                  <p className="mt-6 max-w-md text-base leading-7 text-[#23314A]/70">
                    Al Fawaz International for Food Trading is a licensed trading entity in the State
                    of Qatar, with full regulatory compliance across our supply chain and customer
                    partnerships.
                  </p>
                </ScrollReveal>

                {/* Registration number as a typographic seal */}
                <ScrollReveal delay={200}>
                  <div className="mt-10 flex items-center gap-5">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#0B2F66] text-[#ffffff]">
                      <ShieldIcon size={26} />
                    </span>
                    <div>
                      <p className="text-sm text-[#23314A]/55">Commercial Registration</p>
                      <p className="font-sans text-3xl font-extrabold tracking-tight text-[#0B2F66] md:text-4xl">
                        {company.cr}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <dl className="border-b border-[#0B2F66]/12">
                {detailsList.map((item, idx) => {
                  const Icon = item.icon
                  const body = (
                    <>
                      <dt className="text-sm text-[#23314A]/55">{item.label}</dt>
                      <dd
                        className={`break-words font-bold text-[#0B2F66] transition-colors group-hover:text-[#8B1E46] ${item.isArabic ? 'font-arabic text-2xl' : 'text-lg md:text-xl'
                          }`}
                        {...(item.isArabic ? { lang: 'ar', dir: 'rtl' } : {})}
                      >
                        {item.value}
                      </dd>
                      <span className="hidden text-[#0B2F66]/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#8B1E46] sm:block">
                        {item.link && Icon ? <Icon /> : null}
                      </span>
                    </>
                  )
                  const rowClass =
                    'group grid items-baseline gap-1 border-t border-[#0B2F66]/12 py-6 sm:grid-cols-[190px_1fr_24px] sm:gap-6'
                  return (
                    <ScrollReveal key={item.label} delay={idx * 60} y={18}>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`${rowClass} transition-colors hover:bg-[#F2F5F9]/70`}
                        >
                          {body}
                        </a>
                      ) : (
                        <div className={rowClass}>{body}</div>
                      )}
                    </ScrollReveal>
                  )
                })}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES: ruled list with big type, no tiles
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#F2F5F9] py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <ScrollReveal as="h2" className={`${h2Base} text-[#0B2F66]`}>
                  Values that
                  <span className={outlineMaroon}>guide every run.</span>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                  <p className="mt-6 max-w-md text-base leading-7 text-[#23314A]/70">
                    How we treat clients, manage stock, coordinate drivers and keep our promises.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={180} className="mt-8">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-3 text-sm font-bold text-[#8B1E46] transition-colors duration-300 hover:text-[#0B2F66]"
                  >
                    Discuss your supply requirements
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#8B1E46]/25 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#8B1E46] group-hover:text-white">
                      <ArrowIcon size={18} />
                    </span>
                  </Link>
                </ScrollReveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-b border-[#0B2F66]/12">
                {company.values.map(([title, description], index) => (
                  <ScrollReveal key={title} delay={index * 70} y={20}>
                    <div className="group relative grid gap-3 border-t border-[#0B2F66]/12 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-10 md:py-10">
                      {/* gold marker that grows on hover */}
                      <span className="absolute -top-px left-0 h-[2px] w-0 bg-[#8B1E46] transition-all duration-500 group-hover:w-full" />
                      <h3 className="font-sans text-2xl font-extrabold tracking-[-0.025em] text-[#0B2F66] transition-colors duration-300 group-hover:text-[#8B1E46] md:text-3xl">
                        {title}
                      </h3>
                      <p className="text-base leading-7 text-[#23314A]/70">{description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMITMENTS: open columns with a short rule
      ===================================================== */}
      <section className="bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <ScrollReveal as="h2" className={`${h2Base} max-w-3xl text-[#0B2F66]`}>
            What you can
            <span className={outlineMaroon}>count on.</span>
          </ScrollReveal>

          <div className="mt-16 grid gap-x-14 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {company.commitments.map(([title, text], i) => (
              <ScrollReveal key={title} delay={(i % 3) * 100} className="group">
                <div className="relative h-px bg-[#0B2F66]/15">
                  <span className="absolute left-0 top-0 h-[3px] w-12 -translate-y-px bg-[#ffffff] transition-all duration-500 group-hover:w-24 group-hover:bg-[#8B1E46]" />
                </div>
                <div className="mt-7 flex items-start gap-3">
                  <span className="mt-1 text-[#8B1E46]"><CheckIcon size={20} /></span>
                  <div>
                    <h3 className="font-sans text-xl font-extrabold tracking-[-0.02em] text-[#0B2F66]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#23314A]/70">{text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#071B3C]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-[20rem] w-[20rem] rounded-full border border-[#ffffff]/20" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full border border-[#8B1E46]/40" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="max-w-5xl">
            <ScrollReveal>
              <p className="text-base font-semibold text-[#ffffff]">{company.delivery.quote}</p>
            </ScrollReveal>

            <ScrollReveal as="h2" delay={100} className="mt-6 font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
              Ready to build a
              <span className={outlineWhite}>better distribution network?</span>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                Connect with our team to arrange regular deliveries for your home, grocery store,
                supermarket or foodservice establishment across Qatar.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={320}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#ffffff] px-8 py-4 text-sm font-extrabold text-[#071B3C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
                >
                  Contact our dispatch team
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>

                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                >
                  Order on WhatsApp
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}