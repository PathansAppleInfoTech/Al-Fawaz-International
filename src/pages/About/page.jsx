import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { company, waLink } from '../../data/company.js'
import Reveal from '../../components/Reveal.jsx'

/* =========================================================
   ICONS & HELPERS
========================================================= */

const ArrowIcon = () => (
  <svg
    width="20"
    height="20"
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

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
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
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const MapPinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ShieldIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

function Eyebrow({ children, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-10 ${light ? 'bg-[#D2A844]' : 'bg-[#8B1E46]'}`} />
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.22em] md:text-xs ${
          light ? 'text-[#D2A844]' : 'text-[#8B1E46]'
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

/* =========================================================
   ABOUT COMPONENT
========================================================= */

export default function About() {
  const siteUrl = useMemo(() => {
    if (typeof window === 'undefined') return 'https://www.alfawazinternational.com'
    return window.location.origin
  }, [])

  const detailsList = [
    { label: 'Registered name', value: company.name, icon: ShieldIcon, link: null },
    { label: 'Arabic legal name', value: company.arabic, icon: ShieldIcon, link: null, isArabic: true },
    { label: 'Commercial Registration', value: company.cr, icon: ShieldIcon, link: null },
    { label: 'Location & Zone', value: company.address, icon: MapPinIcon, link: 'https://www.google.com/maps?q=Doha+Qatar+Zone+27+Street+950' },
    { label: 'Direct Hotline', value: company.phoneIntl, icon: PhoneIcon, link: `tel:${company.phone}` },
    { label: 'Official Email', value: company.email, icon: MailIcon, link: `mailto:${company.email}` },
    { label: 'Website Domain', value: company.website, icon: ArrowIcon, link: company.url },
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

       {/* HERO */}
      <section className="relative isolate h-[42vh] min-h-[400px] max-h-[520px] overflow-hidden bg-[#071B3C]">
        <div className="absolute inset-0 -z-20">
          <SafeImage srcs={[FALLBACK]} alt="" aria-hidden="true" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,18,40,0.94)_0%,rgba(4,18,40,0.76)_45%,rgba(4,18,40,0.42)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,27,60,0.1)_0%,rgba(7,27,60,0.72)_100%)]" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[24rem] w-[24rem] rounded-full border border-[#D2A844]/20" />

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
          WHO WE ARE (Editorial Asymmetrical Layout)
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute -right-36 top-1/3 h-96 w-96 rounded-full border border-[#0B2F66]/5" />
        <div className="pointer-events-none absolute -left-20 top-2/3 h-72 w-72 rounded-full border border-[#8B1E46]/5" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Left Narrative */}
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

              {/* Sectors Served Pills */}
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

            {/* Right Multi-Layer Visual Card */}
            <div className="relative lg:col-span-5">
              <Reveal variant="right" delay={180}>
                <div className="relative">
                  {/* Decorative Corner Accents */}
                  <div className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-[#D2A844] md:-left-6 md:-top-6 md:h-32 md:w-32" />
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-[#8B1E46] md:-bottom-6 md:-right-6 md:h-32 md:w-32" />

                  {/* Main Visual Frame */}
                  <div className="group relative overflow-hidden rounded-[2.5rem] bg-[#071B3C] shadow-2xl">
                    <img
                      src="/assets/common/truck.png"
                      alt="Al Fawaz International logistics fleet and distribution"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3C]/80 via-transparent to-transparent" />

                    {/* Editorial Overlay Caption */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#D2A844]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                          Doha · State of Qatar
                        </span>
                      </div>
                      <p className="mt-2 text-xl font-extrabold text-white">
                        Fleet on the road daily
                      </p>
                    </div>
                  </div>

                  {/* Floating Certificate Pill */}
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
          VISION & MISSION (ARCHITECTURAL DUAL-PILLAR SHOWCASE)
          Redesigned completely away from boring boxes!
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#F2F5F9] py-24 md:py-36">
        {/* Subtle Decorative Geometry */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full border border-[#0B2F66]/5" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full border border-[#D2A844]/15" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          {/* Section Header */}
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Strategic Direction</Eyebrow>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-5 font-sans text-[clamp(2.5rem,5.2vw,5rem)] font-extrabold leading-[0.93] tracking-[-0.045em] text-[#0B2F66]">
                Where we are headed.
                <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                  How we get there.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 text-base leading-7 text-[#23314A]/70 md:text-lg">
                Our vision sets our long-term ambition across Qatar; our mission defines the exacting
                standards we execute on every single delivery run.
              </p>
            </Reveal>
          </div>

          {/* Dual Architectural Pillars (Sculptural Contrast) */}
          <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* PILLAR 1: VISION (Deep Night Navy Luxury Pillar) */}
            <Reveal delay={220} className="lg:col-span-6">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071B3C] via-[#0B2F66] to-[#0A224E] p-8 text-white shadow-2xl md:p-12">
                {/* Decorative Concentric Rings Watermark */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full border border-[#D2A844]/25" />

                <div>
                  {/* Badge & Label */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#D2A844]/40 bg-[#D2A844]/15 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#D2A844]">
                      <span className="h-2 w-2 rounded-full bg-[#D2A844]" />
                      Our Vision
                    </span>
                    <span className="font-sans text-5xl font-black text-white/10 md:text-6xl">
                      “
                    </span>
                  </div>

                  {/* Vision Quote */}
                  <blockquote className="mt-8 font-sans text-[clamp(1.6rem,2.8vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight text-white">
                    {company.vision.quote}
                  </blockquote>

                  {/* Vision Text */}
                  <p className="mt-6 text-sm leading-7 text-white/75 md:text-base md:leading-8">
                    {company.vision.text}
                  </p>
                </div>

                {/* Purpose Milestones */}
                <div className="mt-10 border-t border-white/15 pt-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D2A844]">
                    Strategic Focus Areas:
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                      <p className="text-xs font-bold text-white">Qatar Network</p>
                      <p className="mt-1 text-[11px] text-white/60">Nationwide supply reach</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                      <p className="text-xs font-bold text-[#D2A844]">Zero Delay</p>
                      <p className="mt-1 text-[11px] text-white/60">Responsive scheduling</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                      <p className="text-xs font-bold text-white">Quality Assured</p>
                      <p className="mt-1 text-[11px] text-white/60">Certified storage & handling</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* PILLAR 2: MISSION (Crisp Editorial Elevated Card) */}
            <Reveal delay={320} className="lg:col-span-6">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 border-[#0B2F66]/10 bg-white p-8 text-[#0B2F66] shadow-xl md:p-12">
                {/* Decorative Accent Frame */}
                <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-[#8B1E46]/10 via-transparent to-transparent" />
                <div className="absolute right-8 top-8 h-12 w-12 border-r-2 border-t-2 border-[#8B1E46]/40" />

                <div>
                  {/* Badge & Label */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#8B1E46]/20 bg-[#8B1E46]/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8B1E46]">
                      <span className="h-2 w-2 rounded-full bg-[#8B1E46]" />
                      Our Mission
                    </span>
                    <span className="font-sans text-5xl font-black text-[#0B2F66]/10 md:text-6xl">
                      “
                    </span>
                  </div>

                  {/* Mission Quote */}
                  <blockquote className="mt-8 font-sans text-[clamp(1.6rem,2.8vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight text-[#0B2F66]">
                    {company.mission.quote}
                  </blockquote>

                  {/* Mission Text */}
                  <p className="mt-6 text-sm leading-7 text-[#23314A]/70 md:text-base md:leading-8">
                    {company.mission.text}
                  </p>
                </div>

                {/* Actionable Commitments */}
                <div className="mt-10 border-t border-[#0B2F66]/10 pt-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1E46]">
                    Daily Operational Standards:
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-center gap-3 text-sm font-semibold text-[#0B2F66]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F7A4D] text-white">
                        <CheckIcon />
                      </span>
                      Fast order intake via WhatsApp, phone and email
                    </li>
                    <li className="flex items-center gap-3 text-sm font-semibold text-[#0B2F66]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F7A4D] text-white">
                        <CheckIcon />
                      </span>
                      Direct doorstep delivery to families and commercial accounts
                    </li>
                    <li className="flex items-center gap-3 text-sm font-semibold text-[#0B2F66]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F7A4D] text-white">
                        <CheckIcon />
                      </span>
                      Reliable stock buffers preventing out-of-stock disappointments
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          PHILOSOPHY (Right Product · Right Place · Right Time)
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#0B2F66] py-24 md:py-36">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-[30rem] w-[30rem] rounded-full border border-[#D2A844]/20" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Visual Frame */}
            <div className="relative lg:col-span-5">
              <Reveal variant="left">
                <div className="relative">
                  <div className="absolute -bottom-5 -left-5 h-24 w-24 border-b-2 border-l-2 border-[#D2A844] md:-bottom-7 md:-left-7 md:h-32 md:w-32" />
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <img
                      src="/assets/common/doorStep.png"
                      alt="Al Fawaz food distribution delivery and handling"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3C]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D2A844]">
                        Core Commitment
                      </p>
                      <p className="mt-1 text-lg font-bold text-white">
                        Distribution without delay
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Typography & Philosophy Lines */}
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow light>Our Operating Philosophy</Eyebrow>
              </Reveal>

              <div className="mt-8 space-y-1">
                {company.philosophy.line.map((line, index) => (
                  <Reveal key={line} delay={index * 120}>
                    <span
                      className={`block font-sans text-[clamp(2.8rem,6.5vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.055em] ${
                        index === 0
                          ? 'text-white'
                          : index === 1
                          ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]'
                          : 'text-[#D2A844]'
                      }`}
                    >
                      {line}
                    </span>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={380}>
                <p className="mt-8 max-w-xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
                  {company.philosophy.text}
                </p>
              </Reveal>

              <Reveal delay={480} className="mt-10">
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#8B1E46] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2A844] hover:shadow-lg"
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
                    className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW AN ORDER MOVES (DYNAMIC CONNECTED PROCESS FLOW)
          Replaces the generic 4-box grid with a connected stream!
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <Eyebrow>The Order Journey</Eyebrow>
              </Reveal>

              <Reveal delay={120}>
                <h2 className="mt-5 max-w-2xl font-sans text-[clamp(2.4rem,4.8vw,4.8rem)] font-extrabold leading-[0.93] tracking-[-0.045em] text-[#0B2F66]">
                  From your requirement
                  <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                    to your doorstep.
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <p className="max-w-md text-sm leading-relaxed text-[#23314A]/70 md:text-base">
                Four simple, coordinated steps designed to eliminate turnaround delays
                and give you real-time confidence in every delivery.
              </p>
            </Reveal>
          </div>

          {/* Connected Stream Cards */}
          <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {company.steps.map(([title, text], i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="group relative flex h-full flex-col justify-between rounded-[2rem] border border-[#0B2F66]/10 bg-[#F2F5F9] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#8B1E46]/40 hover:bg-white hover:shadow-xl md:p-9">
                  {/* Step Top Bar */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-5xl font-black text-transparent [-webkit-text-stroke:1.5px_#D2A844] transition-all duration-300 group-hover:scale-110">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0B2F66]/10 bg-white text-xs font-extrabold text-[#8B1E46] transition-colors duration-300 group-hover:bg-[#8B1E46] group-hover:text-white">
                        {i === 3 ? '✓' : '→'}
                      </span>
                    </div>

                    <h3 className="mt-8 font-sans text-xl font-extrabold tracking-[-0.02em] text-[#0B2F66] transition-colors duration-300 group-hover:text-[#8B1E46]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#23314A]/65">
                      {text}
                    </p>
                  </div>

                  {/* Micro Accent */}
                  <div className="mt-8 pt-4">
                    <span className="block h-1 w-10 rounded-full bg-[#0B2F66]/15 transition-all duration-300 group-hover:w-16 group-hover:bg-[#8B1E46]" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          OFFICIAL CREDENTIALS & REGISTRY
          Replaces the boring template table!
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#F2F5F9] py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Left Official Identity Feature */}
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Corporate Identity</Eyebrow>
              </Reveal>

              <Reveal delay={120}>
                <h2 className="mt-6 font-sans text-[clamp(2.4rem,4.5vw,4.5rem)] font-extrabold leading-[0.94] tracking-[-0.045em] text-[#0B2F66]">
                  Official credentials
                  <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                    and registry.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-6 text-sm leading-7 text-[#23314A]/70 md:text-base md:leading-8">
                  Al Fawaz International for Food Trading is a fully licensed and registered trading entity
                  in the State of Qatar. We maintain complete transparency and regulatory compliance across
                  our supply chain and customer partnerships.
                </p>
              </Reveal>

              {/* Official Seal Card */}
              <Reveal delay={300} className="mt-9">
                <div className="rounded-[2rem] border border-[#0B2F66]/15 bg-white p-7 shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B2F66] text-[#D2A844]">
                      <ShieldIcon />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1E46]">
                        Verified Commercial Registration
                      </p>
                      <p className="mt-1 font-sans text-2xl font-extrabold text-[#0B2F66]">
                        CR: {company.cr}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 border-t border-[#0B2F66]/10 pt-4 font-arabic text-lg font-bold text-[#0B2F66]" lang="ar" dir="rtl">
                    {company.arabic}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Interactive Credential Spec Cards */}
            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {detailsList.map((item, idx) => {
                  const Icon = item.icon
                  const cardContent = (
                    <div className="group flex h-full flex-col justify-between rounded-2xl border border-[#0B2F66]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#8B1E46] hover:shadow-lg">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#23314A]/50">
                            {item.label}
                          </span>
                          <span className="text-[#8B1E46] opacity-60 transition-opacity group-hover:opacity-100">
                            <Icon />
                          </span>
                        </div>
                        <p
                          className={`mt-4 break-words text-base font-bold text-[#0B2F66] transition-colors group-hover:text-[#8B1E46] ${
                            item.isArabic ? 'font-arabic text-xl' : ''
                          }`}
                          {...(item.isArabic ? { lang: 'ar', dir: 'rtl' } : {})}
                        >
                          {item.value}
                        </p>
                      </div>
                      {item.link && (
                        <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-[#8B1E46]">
                          Click to open →
                        </p>
                      )}
                    </div>
                  )

                  return (
                    <Reveal key={item.label} delay={idx * 60}>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="block h-full"
                        >
                          {cardContent}
                        </a>
                      ) : (
                        cardContent
                      )}
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CORE VALUES (ASYMMETRICAL INTERACTIVE VALUES)
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            {/* Sticky Editorial Sidebar */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <Eyebrow>What we stand for</Eyebrow>
                </Reveal>

                <Reveal delay={120}>
                  <h2 className="mt-6 font-sans text-[clamp(2.6rem,5vw,5rem)] font-extrabold leading-[0.93] tracking-[-0.05em] text-[#0B2F66]">
                    Values that
                    <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                      guide every run.
                    </span>
                  </h2>
                </Reveal>

                <Reveal delay={200}>
                  <p className="mt-6 max-w-md text-base leading-7 text-[#23314A]/70">
                    Our principles define how we treat clients, manage stock, coordinate drivers,
                    and fulfill commitments without compromise.
                  </p>
                </Reveal>

                <Reveal delay={280} className="mt-8">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-3 text-sm font-bold text-[#8B1E46] transition-colors duration-300 hover:text-[#0B2F66]"
                  >
                    Discuss your supply requirements
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#8B1E46]/20 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#8B1E46] group-hover:text-white">
                      <ArrowIcon />
                    </span>
                  </Link>
                </Reveal>
              </div>
            </div>

            {/* Asymmetrical Values Showcase */}
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {company.values.map(([title, description], index) => (
                  <Reveal key={title} delay={index * 60}>
                    <div className="group flex h-full flex-col justify-between rounded-2xl border border-[#0B2F66]/10 bg-[#F2F5F9] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#8B1E46] hover:bg-white hover:shadow-lg">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-[#D2A844]">
                            #{String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="h-2 w-2 rounded-full bg-[#0B2F66]/20 transition-colors group-hover:bg-[#8B1E46]" />
                        </div>
                        <h3 className="mt-4 font-sans text-xl font-extrabold tracking-[-0.02em] text-[#0B2F66] transition-colors duration-300 group-hover:text-[#8B1E46]">
                          {title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-[#23314A]/70">
                          {description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMITMENTS (COUNT ON US)
      ===================================================== */}
      <section className="bg-[#F2F5F9] py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <Eyebrow>Customer Commitments</Eyebrow>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-5 max-w-3xl font-sans text-[clamp(2.5rem,4.6vw,4.6rem)] font-extrabold leading-[0.94] tracking-[-0.05em] text-[#0B2F66]">
              What you can count on.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {company.commitments.map(([title, text], i) => (
              <Reveal key={title} delay={(i % 3) * 80}>
                <div className="group h-full rounded-[1.75rem] border border-[#0B2F66]/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8B1E46]/40 hover:shadow-xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B2F66]/5 text-[#8B1E46] transition-colors group-hover:bg-[#8B1E46] group-hover:text-white">
                      <CheckIcon />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#23314A]/40">
                      Standard {i + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 font-sans text-xl font-extrabold tracking-[-0.02em] text-[#0B2F66] transition-colors group-hover:text-[#8B1E46]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#23314A]/70">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA (Matching Home Page Standard)
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#071B3C]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full border border-[#8B1E46]/40" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="max-w-5xl">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D2A844]">
                {company.delivery.quote}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-6 font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
                Ready to build a
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <h2 className="mt-1 font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]">
                better distribution network?
              </h2>
            </Reveal>

            <Reveal delay={360}>
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                Connect with our team to arrange regular deliveries for your home, grocery store,
                supermarket or foodservice establishment across Qatar.
              </p>
            </Reveal>

            <Reveal delay={480}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#8B1E46] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2A844] hover:shadow-xl"
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
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  Order on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}