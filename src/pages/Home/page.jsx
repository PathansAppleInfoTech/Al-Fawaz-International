import { useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { company, waLink } from '../../data/company.js'

/* =========================================================
   ICONS
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
)

/* =========================================================
   IMAGE URL HELPER
   Converts old/external image URLs to the current domain.
========================================================= */

const assetUrl = (source, siteUrl) => {
  if (!source) return `${siteUrl}/logo.png`

  if (source.startsWith('data:image/')) {
    return source
  }

  try {
    if (/^https?:\/\//i.test(source)) {
      const parsed = new URL(source)
      return `${siteUrl}${parsed.pathname}${parsed.search || ''}`
    }
  } catch {
    // fall through to relative path
  }

  return `${siteUrl}${source.startsWith('/')
    ? source
    : `/${source.replace(/^\.?\//, '')}`
    }`
}

/* =========================================================
   SCROLL REVEAL
   Tailwind-only animation classes.
========================================================= */

const Reveal = ({
  children,
  delay = 0,
  variant = 'up',
  className = '',
}) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const hiddenClasses = {
    up: 'opacity-0 translate-y-8 blur-[2px]',
    left: 'opacity-0 -translate-x-8 blur-[2px]',
    right: 'opacity-0 translate-x-8 blur-[2px]',
    scale: 'opacity-0 scale-[0.96] blur-[2px]',
    fade: 'opacity-0',
  }

  const visibleClasses = {
    up: 'opacity-100 translate-y-0 blur-0',
    left: 'opacity-100 translate-x-0 blur-0',
    right: 'opacity-100 translate-x-0 blur-0',
    scale: 'opacity-100 scale-100 blur-0',
    fade: 'opacity-100',
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? visibleClasses[variant] : hiddenClasses[variant]
        } ${className}`}
    >
      {children}
    </div>
  )
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [heroReady, setHeroReady] = useState(false)

  /* -------------------------------------------------------
     Current website URL
  ------------------------------------------------------- */

  const pageUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      return 'https://www.alfawazinternational.com/'
    }

    return `${window.location.origin}${window.location.pathname}`
  }, [])

  const siteUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      return 'https://www.alfawazinternational.com'
    }

    return window.location.origin
  }, [])



  /* -------------------------------------------------------
     Hero entrance
  ------------------------------------------------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  /* -------------------------------------------------------
     Marquee
  ------------------------------------------------------- */

  const marqueeItems = [
    ...company.categories.map((category) => category.name),
    'Reliable Distribution',
    'Home Delivery',
    'Distribution Without Delay',
    'Qatar Wide Service',
  ]

  const currentCategory = company.categories[activeCategory]

  /* -------------------------------------------------------
     Structured data
  ------------------------------------------------------- */

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    legalName: company.name,
    alternateName: company.arabic,
    url: siteUrl,
    email: company.email,
    telephone: company.phoneIntl,
    identifier: company.cr,
    description: company.intro,
    logo: `${siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zone 27, Street 950',
      addressLocality: 'Doha',
      addressCountry: 'QA',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Qatar',
    },
  }

  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}

      <Helmet>
        <html lang="en" />

        <title>
          Al Fawaz International for Food Trading | Food Distribution in Qatar
        </title>

        <meta
          name="description"
          content="Al Fawaz International for Food Trading provides quality food and beverage distribution in Doha and across Qatar, with dependable service, product availability and convenient home delivery."
        />

        <meta
          name="keywords"
          content="food trading company Qatar, food distribution Doha, food distributor Qatar, beverage distributor Doha, food suppliers Qatar, home delivery Doha, food trading Doha, Al Fawaz International"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:title"
          content="Al Fawaz International for Food Trading | Qatar"
        />
        <meta
          property="og:description"
          content="Reliable food and beverage distribution in Doha and across Qatar."
        />
        <meta property="og:image" content='/assets/logo.png' />
        <meta property="og:image:secure_url" content='/assets/logo.png' />
        <meta
          property="og:image:alt"
          content="Al Fawaz International for Food Trading"
        />
        <meta
          property="og:site_name"
          content="Al Fawaz International for Food Trading"
        />
        <meta property="og:locale" content="en_QA" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Al Fawaz International for Food Trading | Qatar"
        />
        <meta
          name="twitter:description"
          content="Reliable food and beverage distribution in Doha and across Qatar."
        />
        <meta name="twitter:image" content='/assets/logo.png' />

        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate min-h-[90svh] overflow-hidden bg-[#071B3C]">
        {/* Background */}
        <div className="absolute inset-0 -z-30 overflow-hidden">
          <img
            src='/assets/common/hero.png'
            alt=""
            fetchPriority="high"
            aria-hidden="true"
            className={`h-full w-full object-cover object-[65%_center] transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:object-[58%_center] md:object-center ${heroReady
              ? 'scale-100 opacity-100'
              : 'scale-105 opacity-0'
              }`}
          />
        </div>

        {/* Reduced blue overlay on the left for mobile */}
        <div
          className="
      absolute inset-0 -z-20
      bg-[linear-gradient(90deg,rgba(4,18,40,0.78)_0%,rgba(4,18,40,0.64)_42%,rgba(4,18,40,0.36)_72%,rgba(4,18,40,0.18)_100%)]
      md:bg-[linear-gradient(90deg,rgba(4,18,40,0.94)_0%,rgba(4,18,40,0.82)_38%,rgba(4,18,40,0.48)_70%,rgba(4,18,40,0.26)_100%)]
    "
        />

        {/* Bottom contrast */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(7,27,60,0.08)_0%,rgba(7,27,60,0.08)_45%,rgba(7,27,60,0.82)_100%)]" />

        {/* Minimal outline graphic */}
        <div className="pointer-events-none absolute -right-52 -top-44 -z-10 h-[42rem] w-[42rem] rounded-full border border-white/10">
          <div className="absolute inset-12 rounded-full border border-white/10" />
          <div className="absolute inset-24 rounded-full border border-[#D2A844]/30" />
        </div>

        {/* Content */}
        <div className="mx-auto flex min-h-[90svh] max-w-[1400px] items-end px-5 pb-12 pt-44 sm:pt-48 md:px-10 md:pb-20 md:pt-40">
          <div className="max-w-5xl">

            {/* Eyebrow */}
            <Reveal variant="fade">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="h-px w-7 bg-[#D2A844] sm:w-10" />

                <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/75 sm:text-[9px] sm:tracking-[0.17em] md:text-xs md:tracking-[0.18em]">
                  Food & Beverage Distribution · Doha, Qatar
                </span>
              </div>
            </Reveal>

            {/* Main Heading */}
            <Reveal delay={120}>
              <h1 className="mt-6 max-w-5xl font-sans text-[clamp(3rem,12vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.06em] text-white md:mt-7">
                Quality products.
              </h1>
            </Reveal>

            <Reveal delay={260}>
              <h1 className="mt-1 max-w-5xl font-sans text-[clamp(3rem,12vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.2px_rgba(255,255,255,0.9)] sm:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]">
                Delivered without delay.
              </h1>
            </Reveal>

            {/* Intro */}
            <Reveal delay={420}>
              <p className="mt-7 max-w-2xl text-sm leading-6 !text-white/85 sm:text-base sm:leading-7 md:mt-8 md:text-lg md:leading-8">
                {company.intro}
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={540}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 md:mt-9">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0B2F66] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8B1E46] hover:text-white sm:px-7 sm:py-4"
                >
                  Explore our products

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>

                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 sm:px-7 sm:py-4"
                >
                  Order on WhatsApp
                </a>
              </div>
            </Reveal>

            {/* Trust row */}
            <Reveal delay={680}>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/15 pt-5 sm:mt-12 sm:gap-x-10 sm:pt-6">
                <div>
                  <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                    Qatar
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/45 sm:text-[10px]">
                    Market Focus
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                    {company.cr}
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/45 sm:text-[10px]">
                    Commercial Registration
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                    Fast
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/45 sm:text-[10px]">
                    Distribution
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#071B3C] to-transparent" />
      </section>

      {/* =====================================================
          OUTLINE MARQUEE
      ===================================================== */}

      <section className="relative overflow-hidden border-y border-[#0B2F66]/10 bg-white py-5 md:py-6">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent md:w-32" />

        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent md:w-32" />

        {/* Marquee */}
        <div
          className="
      flex
      w-max
      whitespace-nowrap
      animate-[marquee_55s_linear_infinite]
      hover:[animation-play-state:paused]
    "
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-8 pr-8 md:gap-10 md:pr-10"
            >
              <span
                className={`
            font-sans
            text-[2rem]
            font-extrabold
            leading-none
            tracking-[-0.03em]
            transition-colors
            duration-300
            md:text-[3.25rem]
            ${index % 2 === 0
                    ? 'text-[#0B2F66]'
                    : 'text-transparent [-webkit-text-stroke:1px_#0B2F66] md:[-webkit-text-stroke:1.5px_#0B2F66]'
                  }
          `}
              >
                {item}
              </span>

              {/* Premium separator */}
              <span className="relative flex h-5 w-5 items-center justify-center md:h-6 md:w-6">
                <span className="absolute h-full w-px rotate-45 bg-maroon" />
                <span className="absolute h-full w-px -rotate-45 bg-maroon" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          WHO WE ARE
      ===================================================== */}

      <section className="relative overflow-hidden bg-white">
        {/* Decorative detail */}
        <div className="pointer-events-none absolute -right-40 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full border border-[#0B2F66]/5" />

        <div className="pointer-events-none absolute -right-24 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full border border-[#8B1E46]/8" />

        <div className="relative mx-auto max-w-[1400px] px-5 pt-20 pb-12 md:px-10 md:pt-28 md:pb-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">

            {/* =====================================================
          LEFT CONTENT
      ====================================================== */}
            <div className="lg:col-span-8">

              {/* Eyebrow */}
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[#8B1E46]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B1E46] md:text-xs">
                    Who we are
                  </p>
                </div>
              </Reveal>

              {/* Main heading */}
              <Reveal delay={100}>
                <h2
                  className="
              mt-6
              max-w-5xl
              font-sans
              text-[clamp(2.7rem,5.6vw,6rem)]
              font-extrabold
              leading-[0.91]
              tracking-[-0.055em]
              text-[#0B2F66]
            "
                >
                  A distribution partner
                  <span className="block">
                    built around
                  </span>

                  <span
                    className="
                block
                text-transparent
                [-webkit-text-stroke:1.5px_#8B1E46]
                md:[-webkit-text-stroke:2px_#8B1E46]
              "
                  >
                    trust, speed
                  </span>

                  <span className="block">
                    and availability.
                  </span>
                </h2>
              </Reveal>

              {/* Statement */}
              <Reveal delay={220}>
                <div className="mt-8 flex items-center gap-4 md:mt-10">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-maroon" />

                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0B2F66]/45 md:text-sm">
                    Distribution without delay
                  </p>
                </div>
              </Reveal>
            </div>

            {/* =====================================================
          RIGHT CONTENT
      ====================================================== */}
            <Reveal
              delay={280}
              variant="right"
              className="flex flex-col justify-end lg:col-span-4"
            >
              {/* Description */}
              <div className="border-t border-[#0B2F66]/10 pt-6 md:pt-7">
                <p className="text-base leading-7 text-[#23314A]/70 md:text-lg md:leading-8">
                  {company.philosophy.text}
                </p>

                {/* About link */}
                <Link
                  to="/about"
                  className="
              group
              mt-7
              inline-flex
              w-fit
              items-center
              gap-3
              text-sm
              font-bold
              text-[#8B1E46]
              transition-colors
              duration-300
              hover:text-[#0B2F66]
            "
                >
                  Discover Al Fawaz

                  <span
                    className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#8B1E46]/20
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:bg-[#8B1E46]
                group-hover:text-white
              "
                  >
                    <ArrowIcon />
                  </span>
                </Link>
              </div>

              {/* ===================================================
            COMPANY SNAPSHOT
        ==================================================== */}
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-[#0B2F66]/10 pt-6 md:mt-12 md:gap-x-8 md:gap-y-8 md:pt-7">

                {/* Based in */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#23314A]/40 md:text-[10px]">
                    Based in
                  </p>

                  <p className="mt-2 text-base font-bold text-[#0B2F66] md:text-lg">
                    Doha, Qatar
                  </p>
                </div>

                {/* Registration */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#23314A]/40 md:text-[10px]">
                    Registration
                  </p>

                  <p className="mt-2 text-base font-bold text-[#0B2F66] md:text-lg">
                    {company.cr}
                  </p>
                </div>

                {/* Service */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#23314A]/40 md:text-[10px]">
                    Service
                  </p>

                  <p className="mt-2 text-base font-bold text-[#8B1E46] md:text-lg">
                    Qatar Wide
                  </p>
                </div>

                {/* Focus */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#23314A]/40 md:text-[10px]">
                    Focus
                  </p>

                  <p className="mt-2 text-base font-bold text-[#0B2F66] md:text-lg">
                    Fast Distribution
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          DISTRIBUTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F2F5F9]">
        {/* Decorative background detail */}
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full border border-[#0B2F66]/5" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full border border-[#8B1E46]/10" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">

            {/* =====================================================
          IMAGE
      ====================================================== */}
            <Reveal
              variant="left"
              className="lg:col-span-5"
            >
              <div className="relative">

                {/* Gold accent */}
                <div className="absolute -left-3 -top-3 h-24 w-24 border-l border-t border-[#D2A844] md:-left-5 md:-top-5 md:h-32 md:w-32" />

                {/* Image */}
                <div className="group relative overflow-hidden rounded-[2rem]">
                  <img
                    src="/assets/common/truck.png"
                    alt="Al Fawaz food and beverage distribution operation"
                    className="
                aspect-[4/5]
                w-full
                object-cover
                transition-transform
                duration-[1400ms]
                ease-[cubic-bezier(.22,1,.36,1)]
                group-hover:scale-[1.04]
              "
                    loading="lazy"
                  />

                  {/* Subtle cinematic gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071B3C]/40 via-transparent to-transparent" />

                  {/* Bottom editorial caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-maroon">
                          Our promise
                        </p>

                        <p className="mt-2 max-w-xs text-xl font-bold leading-tight text-white md:text-2xl">
                          Distribution without delay.
                        </p>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/10 text-white backdrop-blur-sm">
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maroon accent */}
                <div className="absolute -bottom-4 -right-4 h-20 w-20 border-b border-r border-[#8B1E46] md:-bottom-6 md:-right-6 md:h-28 md:w-28" />

                {/* Small floating label */}
                <div className="absolute -bottom-7 left-7 hidden md:block">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#8B1E46]" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2F66]/55">
                      Built for reliability
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* =====================================================
          CONTENT
      ====================================================== */}
            <div className="lg:col-span-7">

              {/* Eyebrow */}
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[#8B1E46]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1E46] md:text-xs">
                    How we work
                  </p>
                </div>
              </Reveal>

              {/* Heading */}
              <Reveal delay={120}>
                <h2 className="mt-5 max-w-4xl font-sans text-[clamp(2.5rem,5vw,5rem)] font-extrabold leading-[0.93] tracking-[-0.045em] text-[#0B2F66]">
                  Simple systems.
                  <span className="mt-1 block text-transparent [-webkit-text-stroke:1.5px_#0B2F66] md:[-webkit-text-stroke:2px_#0B2F66]">
                    Dependable delivery.
                  </span>
                </h2>
              </Reveal>

              {/* Intro */}
              <Reveal delay={200}>
                <p className="mt-7 max-w-2xl text-base leading-7 text-[#23314A]/65 md:text-lg md:leading-8">
                  From receiving your requirement to completing the delivery, every
                  step is designed to keep the process clear, responsive and reliable.
                </p>
              </Reveal>

              {/* Steps */}
              <div className="mt-12 md:mt-14">
                {company.steps.map(([title, description], index) => (
                  <Reveal
                    key={title}
                    delay={280 + index * 90}
                    className="group"
                  >
                    <div
                      className="
                  relative
                  grid
                  grid-cols-[3.5rem_1fr]
                  gap-5
                  border-t
                  border-[#0B2F66]/10
                  py-7
                  transition-all
                  duration-500
                  md:grid-cols-[4rem_1fr]
                  md:gap-6
                  md:py-8
                "
                    >
                      {/* Number */}
                      <div className="relative flex justify-center">
                        <div
                          className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#0B2F66]/10
                      bg-white
                      text-xs
                      font-extrabold
                      text-[#8B1E46]
                      shadow-sm
                      transition-all
                      duration-500
                      group-hover:border-[#8B1E46]
                      group-hover:bg-[#8B1E46]
                      group-hover:text-white
                      group-hover:shadow-lg
                    "
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Connecting line */}
                        {index !== company.steps.length - 1 && (
                          <span
                            className="
                        absolute
                        top-14
                        h-[calc(100%-2.75rem)]
                        w-px
                        bg-[#0B2F66]/8
                      "
                          />
                        )}
                      </div>

                      {/* Step content */}
                      <div>
                        <div className="flex items-center justify-between gap-6">
                          <h3 className="text-xl font-bold tracking-tight text-[#0B2F66] transition-colors duration-300 group-hover:text-[#8B1E46] md:text-2xl">
                            {title}
                          </h3>

                          <span
                            className="
                        hidden
                        shrink-0
                        text-[#8B1E46]
                        opacity-0
                        transition-all
                        duration-500
                        group-hover:translate-x-1
                        group-hover:opacity-100
                        md:block
                      "
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14" />
                              <path d="m13 6 6 6-6 6" />
                            </svg>
                          </span>
                        </div>

                        <p className="mt-2 max-w-xl text-sm leading-7 text-[#23314A]/60 md:text-base">
                          {description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Bottom statement */}
              <Reveal delay={600}>
                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px w-16 bg-maroon" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B2F66]/45">
                    Right product · Right place · Right time
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT RANGE
      ===================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1E46]">
                  Product range
                </p>
              </Reveal>

              <Reveal delay={120}>
                <h2 className="mt-5 max-w-4xl font-sans text-[clamp(2.8rem,5vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-[#0B2F66]">
                  What{' '}
                  <span className="text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                    Qatar's
                  </span>{' '}
                  shelves and tables depend on.
                </h2>
              </Reveal>
            </div>

            <Reveal delay={200} variant="right">
              <Link
                to="/services"
                className="group inline-flex shrink-0 items-center gap-3 text-sm font-bold text-[#8B1E46]"
              >
                View all products

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            {/* Category list */}
            <div className="lg:col-span-6">
              {company.categories.map((category, index) => {
                const active = activeCategory === index

                return (
                  <Reveal
                    key={category.name}
                    delay={index * 70}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setActiveCategory(index)}
                      onFocus={() => setActiveCategory(index)}
                      onClick={() => setActiveCategory(index)}
                      className={`group flex w-full items-center justify-between border-t py-6 text-left transition-all duration-500 md:py-8 ${active
                        ? 'border-[#8B1E46]'
                        : 'border-[#0B2F66]/10'
                        }`}
                    >
                      <div>
                        <span
                          className={`block font-sans text-3xl font-extrabold tracking-tight transition-all duration-500 md:text-5xl ${active
                            ? 'translate-x-3 text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]'
                            : 'text-[#0B2F66]'
                            }`}
                        >
                          {category.name}
                        </span>

                        <span className="mt-2 block max-w-md text-sm leading-6 text-[#23314A]/60 md:hidden">
                          {category.blurb}
                        </span>
                      </div>

                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${active
                          ? 'border-[#8B1E46] bg-[#8B1E46] text-white'
                          : 'border-[#0B2F66]/10 text-[#0B2F66]'
                          }`}
                      >
                        <ArrowIcon />
                      </span>
                    </button>
                  </Reveal>
                )
              })}

              <div className="border-t border-[#0B2F66]/10" />
            </div>

            {/* Product image */}
            <Reveal variant="scale" delay={160} className="lg:col-span-6">
              <div className="group relative overflow-hidden rounded-[2rem] bg-[#F2F5F9]">
                <img
                  src={assetUrl(currentCategory?.img, siteUrl)}
                  alt={`${currentCategory?.name} available from Al Fawaz International`}
                  className="aspect-[4/3] w-full object-cover transition-all duration-[1000ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071B3C]/90 via-[#071B3C]/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D2A844]">
                    Featured category
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {currentCategory?.name}
                  </h3>
                </div>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#23314A]/70">
                {currentCategory?.blurb}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME DELIVERY
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#0B2F66]">
        {/* Decorative rings */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[26rem] w-[26rem] rounded-full border border-[#D2A844]/20" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">

            {/* =====================================================
          LEFT CONTENT
      ====================================================== */}
            <div className="lg:col-span-6">

              {/* Eyebrow */}
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[#D2A844]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D2A844] md:text-xs">
                    Home delivery
                  </p>
                </div>
              </Reveal>

              {/* Heading */}
              <Reveal delay={120}>
                <blockquote
                  className="
      mt-7
      max-w-3xl
      font-sans
      text-[clamp(2.7rem,5.2vw,5.4rem)]
      font-extrabold
      leading-[0.93]
      tracking-[-0.045em]
      text-white
    "
                >
                  From our distribution network{' '}
                  <span
                    className="
        text-transparent
        [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)]
        md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]
      "
                  >
                    to your doorstep.
                  </span>
                </blockquote>
              </Reveal>
              {/* Supporting text */}
              <Reveal delay={240}>
                <p className="mt-7 max-w-xl text-base leading-7 text-white/65 md:text-lg md:leading-8">
                  Place your requirements through our communication channels and receive products directly at your door, saving the time and effort of visiting several outlets. As our network grows across Doha and the wider Qatar market, home delivery is what sets Al Fawaz International apart.
                </p>
              </Reveal>

              {/* CTA */}
              <Reveal delay={360}>
                <a
                  href={waLink(
                    'Hello, I would like to arrange a home delivery.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
              group
              mt-9
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[#8B1E46]
              px-7
              py-4
              text-sm
              font-bold
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#D2A844]
              hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]
            "
                >
                  Arrange a delivery

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
              </Reveal>

              {/* Bottom statement */}
              <Reveal delay={480}>
                <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-5">
                  <span className="h-2 w-2 rounded-full bg-[#D2A844]" />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                    From our network to your doorstep
                  </p>
                </div>
              </Reveal>
            </div>

            {/* =====================================================
          RIGHT IMAGE
      ====================================================== */}
            <Reveal
              variant="right"
              delay={180}
              className="lg:col-span-6"
            >
              <div className="relative">

                {/* Outer accent frame */}
                <div className="absolute -right-4 -top-4 h-28 w-28 border-r border-t border-[#D2A844]/70 md:-right-6 md:-top-6 md:h-36 md:w-36" />

                <div className="absolute -bottom-4 -left-4 h-20 w-20 border-b border-l border-[#8B1E46]/80 md:-bottom-6 md:-left-6 md:h-28 md:w-28" />

                {/* Image */}
                <div className="group relative overflow-hidden rounded-[2rem]">
                  <img
                    src="/assets/common/doorStep.png"
                    alt="Home delivery service from Al Fawaz International"
                    className="
                aspect-[4/3]
                w-full
                object-cover
                transition-transform
                duration-[1400ms]
                ease-[cubic-bezier(.22,1,.36,1)]
                group-hover:scale-[1.04]
              "
                    loading="lazy"
                  />

                  {/* Image gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071B3C]/50 via-transparent to-transparent" />

                  {/* Small image label */}
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#D2A844]" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
                        Delivered with care
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating number */}
                <div className="absolute -bottom-5 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D2A844] text-xl font-extrabold text-[#0B2F66] shadow-xl md:-bottom-7 md:right-8 md:h-20 md:w-20">
                  24/7
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHO WE SERVE
      ===================================================== */}

      <section className="relative overflow-hidden bg-white">
        {/* Decorative rings */}
        <div className="pointer-events-none absolute -left-40 bottom-[-10rem] h-[28rem] w-[28rem] rounded-full border border-[#0B2F66]/5" />
        <div className="pointer-events-none absolute -left-24 bottom-[-8rem] h-[20rem] w-[20rem] rounded-full border border-[#8B1E46]/8" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">

            {/* =====================================================
          LEFT
      ====================================================== */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[#8B1E46]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B1E46] md:text-xs">
                    Who we serve
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="mt-6 max-w-xl font-sans text-[clamp(2.7rem,5vw,5.4rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-[#0B2F66]">
                  Every link in the
                  <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                    food supply chain.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-7 max-w-md text-base leading-7 text-[#23314A]/65 md:text-lg md:leading-8">
                  From individual households to retailers and business customers,
                  our distribution approach is designed around convenience,
                  availability and reliable service.
                </p>
              </Reveal>

              {/* Small statement */}
              <Reveal delay={300}>
                <div className="mt-9 flex items-center gap-4">
                  <span className="h-2 w-2 rounded-full bg-maroon" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B2F66]/40">
                    One network · many needs
                  </span>
                </div>
              </Reveal>
            </div>

            {/* =====================================================
          RIGHT
      ====================================================== */}
            <div className="lg:col-span-7">
              <div className="border-t border-[#0B2F66]/10">
                {company.serves.map((serve, index) => (
                  <Reveal
                    key={serve}
                    delay={index * 70}
                    className="group"
                  >
                    <div className="relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-[#0B2F66]/10 py-6 md:grid-cols-[4rem_1fr_auto] md:gap-6 md:py-8">

                      {/* Number */}
                      <div className="relative flex h-10 w-10 items-center justify-center md:h-12 md:w-12">
                        <span className="absolute inset-0 rounded-full border border-[#0B2F66]/10 transition-all duration-500 group-hover:border-[#8B1E46]" />

                        <span className="relative text-[10px] font-extrabold text-[#8B1E46] transition-colors duration-300 group-hover:text-[#8B1E46] md:text-xs">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Name */}
                      <div>
                        <h3 className="font-sans text-xl font-extrabold tracking-[-0.02em] text-[#0B2F66] transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#8B1E46] md:text-3xl">
                          {serve}
                        </h3>
                      </div>

                      {/* Arrow */}
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0B2F66]/10 text-[#0B2F66] transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#8B1E46] group-hover:bg-[#8B1E46] group-hover:text-white">
                        <ArrowIcon />
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Bottom line */}
              <Reveal delay={company.serves.length * 70 + 100}>
                <div className="mt-7 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0B2F66]/35">
                    Serving customers across Qatar
                  </p>

                  <span className="h-px w-16 bg-maroon md:w-24" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="bg-[#F2F5F9]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-[1.75rem] bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B2F66] text-white">
                  <CheckIcon />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#0B2F66]">
                  Reliability
                </h3>

                <p className="mt-3 leading-7 text-[#23314A]/65">
                  Consistent service and dependable communication from order
                  to final delivery.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="h-full rounded-[1.75rem] bg-[#8B1E46] p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#8B1E46]">
                  <CheckIcon />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Product availability
                </h3>

                <p className="mt-3 leading-7 text-white/70">
                  We work to maintain suitable stock levels and reduce
                  unnecessary out-of-stock situations.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="h-full rounded-[1.75rem] bg-[#D2A844] p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0B2F66]">
                  <CheckIcon />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Customer convenience
                </h3>

                <p className="mt-3 leading-7 text-white/70">
                  Making ordering and receiving products easier through direct
                  communication and convenient delivery.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#071B3C]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full border border-[#8B1E46]/40" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
          <div className="max-w-5xl">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D2A844]">
                Ready when you are
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-6 font-sans text-[clamp(3rem,7vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
                Need stock
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <h2 className="mt-1 font-sans text-[clamp(3rem,7vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]">
                in a hurry?
              </h2>
            </Reveal>

            <Reveal delay={380}>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href={`tel:${company.phone}`}
                  className="text-2xl font-bold text-white transition-colors duration-300 hover:text-[#D2A844] md:text-4xl"
                >
                  {company.phoneIntl}
                </a>

                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#8B1E46] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2A844]"
                >
                  Message us on WhatsApp

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}