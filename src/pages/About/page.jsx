import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { company, waLink } from '../../data/company.js'

/* ---------------------------------------------------------
   Reveal: self-contained scroll animation.
   Never leaves content hidden: falls back to visible if the
   observer is missing, motion is reduced, or it never fires.
--------------------------------------------------------- */
function Reveal({ as: Tag = 'div', from = 'up', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!el || reduce || !('IntersectionObserver' in window)) {
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
      { threshold: 0.05, rootMargin: '0px 0px -4% 0px' }
    )
    io.observe(el)
    const failsafe = setTimeout(() => setShown(true), 3000)
    return () => {
      io.disconnect()
      clearTimeout(failsafe)
    }
  }, [])

  const hidden = {
    up: { opacity: 0, transform: 'translateY(26px)' },
    left: { opacity: 0, transform: 'translateX(-30px)' },
    right: { opacity: 0, transform: 'translateX(30px)' },
    wipe: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  }[from]
  const visible = { opacity: 1, transform: 'none', clipPath: 'inset(0 0 0 0)' }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...(shown ? visible : hidden),
        transition: `opacity .8s ease ${delay}s, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}s, clip-path .9s ease ${delay}s`,
        willChange: 'opacity, transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
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

// Put your own photos in /public/assets/about/ for the most reliable loading.
// Local file first, remote photo second, hero image last.
const img = {
  warehouse: ['/assets/about/warehouse.jpg', company.images.warehouse, FALLBACK],
  logistics: ['/assets/about/logistics.jpg', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1400&q=80', FALLBACK],
  delivery: ['/assets/about/delivery.jpg', 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1400&q=80', FALLBACK],
}

const details = [
  ['Registered name', company.name],
  ['Arabic name', company.arabic],
  ['Commercial Registration', company.cr],
  ['Address', company.address],
  ['Phone', company.phoneIntl],
  ['Email', company.email],
  ['Website', company.website],
]

const outline = (color) => ({ WebkitTextStroke: `1.5px ${color}` })

function Eyebrow({ children, light }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-10 ${light ? 'bg-[#D2A844]' : 'bg-[#8B1E46]'}`} />
      <p className={`text-[10px] font-bold uppercase tracking-[0.22em] md:text-xs ${light ? 'text-[#D2A844]' : 'text-[#8B1E46]'}`}>
        {children}
      </p>
    </div>
  )
}

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Al Fawaz International for Food Trading, Doha</title>
        <meta name="description" content="Learn about Al Fawaz International for Food Trading in Doha, Qatar: our vision, mission, values and commitment to reliable food and beverage distribution." />
        <link rel="canonical" href={`${company.url}/about`} />
        <meta property="og:title" content="About Al Fawaz International for Food Trading" />
        <meta property="og:description" content="Discover the vision, mission and values behind Al Fawaz International for Food Trading in Doha, Qatar." />
        <meta property="og:url" content={`${company.url}/about`} />
        <meta property="og:image" content={`${company.url}/og-logo.png`} />
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

      {/* INTRO */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-40 top-20 h-[32rem] w-[32rem] rounded-full border border-[#0B2F66]/5" />
        <div className="pointer-events-none absolute -right-20 top-40 h-[24rem] w-[24rem] rounded-full border border-[#8B1E46]/5" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal><Eyebrow>Who we are</Eyebrow></Reveal>
              <Reveal as="h2" delay={0.1} className="mt-6 max-w-4xl font-sans text-[clamp(2.6rem,5.2vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-[#0B2F66]">
                A distribution partner
                <span className="block">built around</span>
                <span className="block text-transparent" style={outline('#8B1E46')}>trust and speed.</span>
              </Reveal>
              <Reveal as="p" delay={0.2} className="mt-8 max-w-2xl text-base leading-7 text-[#23314A]/75 md:text-lg md:leading-8">
                {company.intro}
              </Reveal>

              <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-2.5">
                {company.serves.map((s) => (
                  <span key={s} className="rounded-full border border-[#0B2F66]/15 bg-[#F2F5F9] px-4 py-2 text-xs font-semibold text-[#0B2F66]">
                    {s}
                  </span>
                ))}
              </Reveal>
            </div>

            <Reveal from="right" className="relative lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <SafeImage srcs={img.warehouse} alt="Food distribution warehouse and logistics operation" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B3C]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#D2A844]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">Doha · Qatar</span>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 border-r border-t border-[#D2A844] md:-right-6 md:-top-6 md:h-32 md:w-32" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMPANY DETAILS */}
      <section className="bg-[#F2F5F9]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal><Eyebrow>Company profile</Eyebrow></Reveal>
              <Reveal as="h2" delay={0.1} className="mt-6 font-sans text-[clamp(2.4rem,4.5vw,4.5rem)] font-extrabold leading-[0.94] tracking-[-0.045em] text-[#0B2F66]">
                The details
                <span className="block text-[#8B1E46]">behind the business.</span>
              </Reveal>
              <Reveal as="p" delay={0.2} className="mt-6 max-w-md leading-7 text-[#23314A]/70">
                A Qatar-based food trading company focused on dependable distribution, product availability and convenient delivery.
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <dl className="border-t border-[#0B2F66]/10">
                {details.map(([key, value], index) => (
                  <Reveal key={key} from="wipe" delay={index * 0.05} className="grid gap-2 border-b border-[#0B2F66]/10 py-5 sm:grid-cols-[190px_1fr] sm:gap-6">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#23314A]/50">{key}</dt>
                    <dd
                      className={`break-words text-sm font-semibold text-[#0B2F66] md:text-base ${key === 'Arabic name' ? 'font-arabic' : ''}`}
                      {...(key === 'Arabic name' ? { lang: 'ar', dir: 'rtl' } : {})}
                    >
                      {value}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-0">
            <div className="lg:pr-20">
              <Reveal><Eyebrow>Our vision</Eyebrow></Reveal>
              <Reveal as="p" delay={0.1} className="mt-6 font-sans text-[clamp(1.8rem,3vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#0B2F66]">
                {company.vision.quote}
              </Reveal>
              <Reveal as="p" delay={0.2} className="mt-7 max-w-xl leading-7 text-[#23314A]/70">{company.vision.text}</Reveal>
            </div>

            <div className="border-t border-[#0B2F66]/10 pt-12 lg:border-l lg:border-t-0 lg:pl-20 lg:pt-0">
              <Reveal><Eyebrow>Our mission</Eyebrow></Reveal>
              <Reveal as="p" delay={0.1} className="mt-6 font-sans text-[clamp(1.8rem,3vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#0B2F66]">
                {company.mission.quote}
              </Reveal>
              <Reveal as="p" delay={0.2} className="mt-7 max-w-xl leading-7 text-[#23314A]/70">{company.mission.text}</Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative overflow-hidden bg-[#0B2F66]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full border border-white/10" />
        <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal from="left" className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -bottom-5 -left-5 h-24 w-24 border-b border-l border-[#D2A844] md:-bottom-7 md:-left-7 md:h-32 md:w-32" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <SafeImage srcs={img.logistics} alt="Food logistics and distribution operation" loading="lazy" />
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal><Eyebrow light>Our philosophy</Eyebrow></Reveal>
              <div className="mt-8 space-y-1">
                {company.philosophy.line.map((line, index) => (
                  <Reveal key={line} delay={index * 0.12}>
                    <span
                      className={`block font-sans text-[clamp(2.8rem,6vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.055em] ${index === 0 ? 'text-white' : index === 1 ? 'text-transparent' : 'text-[#D2A844]'}`}
                      style={index === 1 ? { WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' } : undefined}
                    >
                      {line}
                    </span>
                  </Reveal>
                ))}
              </div>
              <Reveal as="p" delay={0.35} className="mt-8 max-w-xl leading-7 text-white/70">{company.philosophy.text}</Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* HOW AN ORDER MOVES (a real sequence, so numbering fits) */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl">
            <Reveal><Eyebrow>How an order moves</Eyebrow></Reveal>
            <Reveal as="h2" delay={0.1} className="mt-6 font-sans text-[clamp(2.4rem,4.8vw,4.8rem)] font-extrabold leading-[0.94] tracking-[-0.05em] text-[#0B2F66]">
              From your message
              <span className="block text-transparent" style={outline('#8B1E46')}>to your door.</span>
            </Reveal>
          </div>

          <div className="relative mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-[#0B2F66]/10 bg-[#0B2F66]/10 md:grid-cols-2 lg:grid-cols-4">
            {company.steps.map(([title, text], i) => (
              <Reveal key={title} delay={i * 0.08} className="group bg-white p-8 transition-colors duration-300 hover:bg-[#F2F5F9] md:p-10">
                <span className="font-sans text-5xl font-extrabold text-transparent" style={outline('#D2A844')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-sans text-xl font-extrabold tracking-[-0.02em] text-[#0B2F66]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#23314A]/70">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#F2F5F9]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Reveal><Eyebrow>What we stand for</Eyebrow></Reveal>
                <Reveal as="h2" delay={0.1} className="mt-6 font-sans text-[clamp(2.6rem,5vw,5rem)] font-extrabold leading-[0.93] tracking-[-0.05em] text-[#0B2F66]">
                  Values that
                  <span className="block text-transparent" style={outline('#8B1E46')}>guide us.</span>
                </Reveal>
                <Reveal
                  as={Link}
                  to="/contact"
                  delay={0.25}
                  className="group mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#8B1E46] transition-colors duration-300 hover:text-[#0B2F66]"
                >
                  Work with us
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#8B1E46]/20 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#8B1E46] group-hover:text-white">→</span>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-[#0B2F66]/10">
                {company.values.map(([title, description], index) => (
                  <Reveal key={title} from="wipe" delay={index * 0.04} className="group border-b border-[#0B2F66]/10 py-6 transition-colors duration-500 hover:border-[#8B1E46]/50 md:py-8">
                    <h3 className="font-sans text-xl font-extrabold tracking-[-0.02em] text-[#0B2F66] transition-colors duration-300 group-hover:text-[#8B1E46] md:text-2xl">{title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[#23314A]/70 md:text-base">{description}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <Reveal><Eyebrow>Our commitments</Eyebrow></Reveal>
          <Reveal as="h2" delay={0.1} className="mt-6 max-w-3xl font-sans text-[clamp(2.4rem,4.6vw,4.6rem)] font-extrabold leading-[0.94] tracking-[-0.05em] text-[#0B2F66]">
            What you can count on.
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {company.commitments.map(([title, text], i) => (
              <Reveal key={title} delay={(i % 3) * 0.08} className="rounded-[1.5rem] border border-[#0B2F66]/10 bg-[#F2F5F9] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#8B1E46]/40 hover:bg-white">
                <span className="block h-1 w-8 rounded-full bg-[#D2A844]" />
                <h3 className="mt-5 font-sans text-lg font-extrabold tracking-[-0.02em] text-[#0B2F66]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#23314A]/70">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28">
          <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-[#071B3C]">
            <div className="absolute inset-0 -z-10 opacity-45">
              <SafeImage srcs={img.delivery} alt="Food distribution and delivery service" loading="lazy" />
            </div>
            <div className="absolute inset-0 -z-10 bg-[#071B3C]/65" />

            <div className="relative px-6 py-16 md:px-14 md:py-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D2A844]">{company.delivery.quote}</p>
              <h2 className="mt-5 max-w-4xl font-sans text-[clamp(2.5rem,5vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-white">
                Ready to build a
                <span className="block text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>better distribution</span>
                network?
              </h2>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="group inline-flex items-center gap-3 rounded-full bg-[#8B1E46] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2A844]">
                  Talk to us
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-white hover:text-[#0B2F66]">
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}