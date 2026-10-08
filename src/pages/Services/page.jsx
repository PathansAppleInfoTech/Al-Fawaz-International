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

const WhatsAppIcon = () => (
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

function Eyebrow({ children, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-10 ${light ? 'bg-[#D2A844]' : 'bg-[#8B1E46]'}`} />
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.22em] md:text-xs ${light ? 'text-[#D2A844]' : 'text-[#8B1E46]'
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
   SERVICES / PRODUCTS COMPONENT
========================================================= */

export default function Services() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all')

  const siteUrl = useMemo(() => {
    if (typeof window === 'undefined') return 'https://www.alfawazinternational.com'
    return window.location.origin
  }, [])

  const filteredCategories =
    activeCategoryFilter === 'all'
      ? company.categories
      : company.categories.filter((c) => c.name === activeCategoryFilter)

  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}
      <Helmet>
        <title>Products & Distribution | Water, Soft Drinks & Food Supply Qatar</title>
        <meta
          name="description"
          content="Explore Al Fawaz International's food and beverage distribution in Doha, Qatar: bottled water, soft drinks, juices, dairy, pantry staples and packed foods with fast home and retail delivery."
        />
        <link rel="canonical" href={`${company.url}/services`} />
        <meta property="og:title" content="Products & Distribution | Al Fawaz International" />
        <meta
          property="og:description"
          content="Quality bottled water, soft drinks, juices, dairy, staples and packed foods delivered across Qatar without delay."
        />
        <meta property="og:url" content={`${company.url}/services`} />
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
            <Reveal><Eyebrow light>Product Range · Qatar Food Distribution</Eyebrow></Reveal>
            <Reveal as="h1" delay={0.1} className="mt-5 font-sans text-[clamp(2.6rem,6vw,5.8rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
              Everything Qatar's
              <span className="block text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>
                 homes ask for.
              </span>
            </Reveal>
          </div>
        </div>
      </section>
     

      {/* =====================================================
          CATEGORY FILTER NAVIGATION STRIP
      ===================================================== */}
      <section className="sticky top-[72px] z-30 border-b border-[#0B2F66]/10 bg-white/95 py-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 overflow-x-auto px-5 md:px-10">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('all')}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${activeCategoryFilter === 'all'
                  ? 'bg-[#8B1E46] text-white shadow-md'
                  : 'bg-[#F2F5F9] text-[#0B2F66] hover:bg-[#0B2F66]/10'
                }`}
            >
              All Categories ({company.categories.length})
            </button>
            {company.categories.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setActiveCategoryFilter(c.name)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${activeCategoryFilter === c.name
                    ? 'bg-[#8B1E46] text-white shadow-md'
                    : 'bg-[#F2F5F9] text-[#0B2F66] hover:bg-[#0B2F66]/10'
                  }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <a
            href={waLink('Hello Al Fawaz, I would like to request your full wholesale price list.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-2 text-xs font-bold text-[#8B1E46] transition-colors hover:text-[#0B2F66] md:flex"
          >
            <span>Request Full Price List</span>
            <ArrowIcon />
          </a>
        </div>
      </section>

      {/* =====================================================
          PRODUCT CATEGORIES (Editorial Showcase, Asymmetrical)
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="space-y-24 md:space-y-36">
            {filteredCategories.map((c, i) => {
              const isEven = i % 2 === 0

              return (
                <article
                  key={c.name}
                  id={c.name.toLowerCase().replace(/\s+/g, '-')}
                  className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20"
                >
                  {/* Category Image Side */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <Reveal variant={isEven ? 'left' : 'right'}>
                      <div className="relative">
                        {/* Branded Corner Accents */}
                        <div
                          className={`absolute h-24 w-24 border-2 md:h-32 md:w-32 ${isEven
                              ? '-left-4 -top-4 border-[#D2A844] border-b-0 border-r-0'
                              : '-right-4 -top-4 border-[#8B1E46] border-b-0 border-l-0'
                            }`}
                        />

                        {/* Visual Frame */}
                        <div className="group relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-[#071B3C] shadow-2xl">
                          <img
                            src={c.img}
                            alt={`${c.name} distributed by Al Fawaz International`}
                            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#071B3C]/80 via-transparent to-transparent" />

                          {/* Floating Category Tag */}
                          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D2A844]">
                                Category {String(i + 1).padStart(2, '0')}
                              </span>
                              <p className="mt-1 font-sans text-2xl font-extrabold text-white">
                                {c.name}
                              </p>
                            </div>
                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                              Qatar Delivery
                            </span>
                          </div>
                        </div>

                        {/* Floating Micro Badge */}
                        <div
                          className={`absolute -bottom-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#D2A844] text-xl font-extrabold text-[#0B2F66] shadow-lg md:h-16 md:w-16 ${isEven ? '-right-4' : '-left-4'
                            }`}
                        >
                          ✓
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  {/* Category Description & Items Side */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <Reveal delay={100}>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-[#8B1E46]">
                          0{i + 1}
                        </span>
                        <span className="h-px w-8 bg-[#8B1E46]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2F66]/50">
                          Direct Supply
                        </span>
                      </div>
                    </Reveal>

                    <Reveal delay={180}>
                      <h2 className="mt-5 font-sans text-[clamp(2.3rem,4.4vw,4.2rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#0B2F66]">
                        {c.name}
                      </h2>
                    </Reveal>

                    <Reveal delay={260}>
                      <p className="mt-5 max-w-xl text-base leading-7 text-[#23314A]/75 md:text-lg md:leading-8">
                        {c.blurb}
                      </p>
                    </Reveal>

                    {/* Product Variety Badges */}
                    <Reveal delay={340} className="mt-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B2F66]/60">
                        Typical Pack Sizes & Varieties:
                      </p>
                      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                        {c.items.map((it) => (
                          <div
                            key={it}
                            className="flex items-center gap-3 rounded-xl border border-[#0B2F66]/10 bg-[#F2F5F9] px-4 py-3 text-sm font-bold text-[#0B2F66] transition-all hover:border-[#8B1E46] hover:bg-white"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1F7A4D] text-white text-[10px]">
                              ✓
                            </span>
                            <span>{it}</span>
                          </div>
                        ))}
                      </div>
                    </Reveal>

                    {/* Direct WhatsApp Order CTA */}
                    <Reveal delay={420} className="mt-9 flex flex-wrap items-center gap-4">
                      <a
                        href={waLink(`Hello Al Fawaz, I would like to order items from the ${c.name} category.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 rounded-full bg-[#8B1E46] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2A844] hover:shadow-lg"
                      >
                        <WhatsAppIcon />
                        <span>Order {c.name}</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </a>

                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-full border border-[#0B2F66]/20 px-5 py-3.5 text-sm font-bold text-[#0B2F66] transition-colors hover:border-[#0B2F66] hover:bg-[#F2F5F9]"
                      >
                        Enquire wholesale
                      </Link>
                    </Reveal>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ALSO ON OUR DELIVERY RUNS (TAG CLOUD)
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#F2F5F9] py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Additional Inventory</Eyebrow>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-5 font-sans text-[clamp(2.4rem,4.8vw,4.8rem)] font-extrabold leading-[0.93] tracking-[-0.045em] text-[#0B2F66]">
                Also on our
                <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                  delivery runs.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 text-base leading-7 text-[#23314A]/70 md:text-lg">
                Need pantry extras, snacks or catering consumables along with your beverage run?
                We combine shipments to save your time and logistics costs.
              </p>
            </Reveal>
          </div>

          {/* Interactive Tag Pill Cloud */}
          <Reveal delay={300} className="mt-12">
            <div className="flex flex-wrap gap-3 md:gap-4">
              {company.alsoSupplied.map((item, idx) => (
                <div
                  key={item}
                  className="group flex items-center gap-3 rounded-full border border-[#0B2F66]/10 bg-white px-5 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8B1E46] hover:shadow-md"
                >
                  <span className="flex h-2 w-2 rounded-full bg-[#D2A844] transition-colors group-hover:bg-[#8B1E46]" />
                  <span className="font-sans text-sm font-extrabold text-[#0B2F66] transition-colors group-hover:text-[#8B1E46] md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Sourcing Callout Card */}
          <Reveal delay={400} className="mt-14">
            <div className="rounded-[2rem] border border-[#0B2F66]/10 bg-white p-8 md:p-10">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1E46]">
                    Custom Product Sourcing
                  </p>
                  <h3 className="mt-2 font-sans text-2xl font-extrabold text-[#0B2F66]">
                    Looking for a specific brand or pack size?
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#23314A]/70">
                    If you don't see your preferred brand on the list, let us know. Our Doha procurement team
                    can source and deliver it on your recurring run.
                  </p>
                </div>
                <a
                  href={waLink('Hello, I am looking for a specific brand/item not listed on your website.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#0B2F66] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#8B1E46]"
                >
                  Request custom item
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          DISTRIBUTION COMMITMENT (Sticky Sidebar + Checklist)
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Sticky Sidebar */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <Eyebrow>Distribution Assurance</Eyebrow>
                </Reveal>

                <Reveal delay={120}>
                  <h2 className="mt-6 font-sans text-[clamp(2.4rem,4.8vw,4.8rem)] font-extrabold leading-[0.93] tracking-[-0.045em] text-[#0B2F66]">
                    Reliability built
                    <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                      into every run.
                    </span>
                  </h2>
                </Reveal>

                <Reveal delay={200}>
                  <p className="mt-6 max-w-md text-base leading-7 text-[#23314A]/70">
                    From stock checking to careful temperature management during transit,
                    our distribution workflow ensures products arrive in pristine retail condition.
                  </p>
                </Reveal>

                <Reveal delay={280} className="mt-8">
                  <a
                    href={waLink('Hello, I would like to set up a regular weekly distribution schedule.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#8B1E46] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2A844]"
                  >
                    Set up regular supply
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </Reveal>
              </div>
            </div>

            {/* Commitments List */}
            <div className="lg:col-span-7">
              <div className="border-t border-[#0B2F66]/10">
                {company.commitments.map(([title, description], idx) => (
                  <Reveal key={title} delay={idx * 60}>
                    <div className="group flex items-start gap-5 border-b border-[#0B2F66]/10 py-7 transition-colors hover:border-[#8B1E46]/40 md:py-8">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B2F66]/5 text-[#1F7A4D] transition-colors group-hover:bg-[#8B1E46] group-hover:text-white">
                        <CheckIcon />
                      </span>
                      <div>
                        <h3 className="font-sans text-xl font-extrabold tracking-[-0.02em] text-[#0B2F66] transition-colors group-hover:text-[#8B1E46] md:text-2xl">
                          {title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#23314A]/70 md:text-base">
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
          FINAL CTA (Matching Home Page Standard)
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#071B3C]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full border border-[#8B1E46]/40" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="max-w-5xl">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D2A844]">
                Ready for reliable food & beverage supply?
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-6 font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
                Place your order
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <h2 className="mt-1 font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]">
                without delay.
              </h2>
            </Reveal>

            <Reveal delay={360}>
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                Whether you need home water cartons or high-volume wholesale beverage replenishment,
                our drivers are ready to dispatch across Doha and Qatar.
              </p>
            </Reveal>

            <Reveal delay={480}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={waLink('Hello Al Fawaz, I would like to place an order from your catalog.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#8B1E46] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2A844] hover:shadow-xl"
                >
                  Order on WhatsApp
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  Contact sales team
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
