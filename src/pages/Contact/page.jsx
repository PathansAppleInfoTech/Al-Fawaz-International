import { useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { company, waLink } from '../../data/company.js'
import Reveal from '../../components/Reveal.jsx'

/* =========================================================
   ICONS & HELPERS
========================================================= */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const ArrowIcon = ({ size = 20 }) => (
  <svg width={size} height={size} strokeWidth="1.8" {...iconProps}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" strokeWidth="2.6" {...iconProps}>
    <path d="m5 12 4 4L19 6" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="22" height="22" strokeWidth="1.6" {...iconProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = () => (
  <svg width="22" height="22" strokeWidth="1.6" {...iconProps}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const MapPinIcon = ({ size = 22 }) => (
  <svg width={size} height={size} strokeWidth="1.6" {...iconProps}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="18" height="18" strokeWidth="1.8" {...iconProps}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const WhatsAppIcon = ({ size = 22 }) => (
  <svg width={size} height={size} strokeWidth="1.8" {...iconProps}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

/* Used by the hero only (kept exactly as before) */
function Eyebrow({ children, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-10 ${light ? 'bg-[#ffffff]' : 'bg-[#8B1E46]'}`} />
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.22em] md:text-xs ${light ? 'text-[#ffffff]' : 'text-[#8B1E46]'
          }`}
      >
        {children}
      </p>
    </div>
  )
}

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
   FORM DATA
========================================================= */

const REQUEST_TYPES = ['Home delivery', 'Shop / Restaurant']
const QUICK_ITEMS = ['Drinking water', 'Soft drinks', 'Juices', 'Rice & staples', 'Cooking oil']

/* Floating-label field (underline style, sits on the navy panel) */
const fieldBase =
  'peer block w-full border-0 border-b border-white/25 bg-transparent px-0 pb-3 pt-6 text-base font-semibold text-white placeholder-transparent transition-colors focus:border-[#ffffff] focus:outline-none focus:ring-0'
const labelBase =
  'pointer-events-none absolute left-0 top-6 origin-left text-base text-white/55 transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#ffffff] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs'

function Field({ id, label, as = 'input', ...props }) {
  const Tag = as
  return (
    <div className="relative">
      <Tag id={id} placeholder=" " className={fieldBase} {...props} />
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>
    </div>
  )
}

/* =========================================================
   CONTACT COMPONENT
========================================================= */

export default function Contact() {
  const [formData, setFormData] = useState({
    type: REQUEST_TYPES[0],
    name: '',
    phone: '',
    location: '',
    message: '',
  })
  const [activeFaq, setActiveFaq] = useState(0)

  const siteUrl = useMemo(() => {
    if (typeof window === 'undefined') return 'https://www.alfawazinternational.com'
    return window.location.origin
  }, [])

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setFormData((d) => ({ ...d, [field]: value }))
  }

  const addItem = (item) =>
    setFormData((d) => {
      if (d.message.includes(`${item}:`)) return d
      const sep = d.message && !d.message.endsWith('\n') ? '\n' : ''
      return { ...d, message: `${d.message}${sep}${item}: ` }
    })

  const formattedWhatsAppText = `Hello Al Fawaz International,
*New Order / Enquiry*
*Order type:* ${formData.type}
*Name:* ${formData.name || 'Not provided'}
*Phone:* ${formData.phone || 'Not provided'}
*Delivery Location / Zone:* ${formData.location || 'Doha / Qatar'}
*Requirements:*
${formData.message || 'Please contact me regarding your product catalog.'}`

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault()
    window.open(waLink(formattedWhatsAppText), '_blank', 'noopener,noreferrer')
  }

  const faqs = [
    {
      q: 'How fast will my order arrive?',
      a: 'Orders in Doha and major zones are dispatched rapidly upon confirmation. For scheduled recurring deliveries, we establish specific delivery days for your location.',
    },
    {
      q: 'Can I order smaller quantities for my family or home?',
      a: 'Yes. We deliver directly to households across Qatar, saving you the hassle of carrying heavy cartons of water, soft drinks, and staples from supermarkets.',
    },
    {
      q: 'Do you offer bulk supply for supermarkets, restaurants and groceries?',
      a: 'Absolutely. We supply wholesale quantities, multipacks, and bulk pallet orders with dedicated account support and regular delivery schedules.',
    },
    {
      q: 'What payment options are available?',
      a: 'We accept cash on delivery, corporate bank transfer, and approved commercial credit terms for registered partners.',
    },
  ]

  const channels = [
    {
      href: `tel:${company.phone}`,
      label: 'Call us',
      value: company.phoneIntl,
      icon: <PhoneIcon />,
      hover: 'group-hover:text-[#8B1E46]',
    },
    {
      href: waLink(),
      label: 'WhatsApp',
      value: 'Send your order list',
      icon: <WhatsAppIcon />,
      hover: 'group-hover:text-[#8B1E46]',
      external: true,
    },
    {
      href: `mailto:${company.email}`,
      label: 'Email',
      value: company.email,
      icon: <MailIcon />,
      hover: 'group-hover:text-[#8B1E46]',
      small: true,
    },
  ]

  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}
      <Helmet>
        <title>Contact Us | Al Fawaz International Food Trading, Doha Qatar</title>
        <meta
          name="description"
          content="Contact Al Fawaz International for Food Trading in Doha, Qatar. Call +974 3381 1309 or message on WhatsApp for fast water, beverage and food delivery."
        />
        <link rel="canonical" href={`${company.url}/contact`} />
        <meta property="og:title" content="Contact Al Fawaz International for Food Trading" />
        <meta
          property="og:description"
          content="Call, WhatsApp or email us in Doha, Qatar to place an order or discuss a supply partnership."
        />
        <meta property="og:url" content={`${company.url}/contact`} />
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
            <Reveal><Eyebrow light>Direct Distribution Support · Doha, Qatar</Eyebrow></Reveal>
            <Reveal as="h1" delay={0.1} className="mt-5 font-sans text-[clamp(2.6rem,6vw,5.8rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
              Need something?
              <span className="block text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>
                Let's move.
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT + ORDER FORM
          Open, editorial left column (no boxes) + one
          focal navy form panel on the right.
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-20 md:py-32">
        {/* soft background wash, adds depth without boxes */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[34rem] w-[34rem] rounded-full bg-[#F2F5F9]" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* LEFT */}
            <div className="lg:col-span-5">
              <Reveal as="h2" className="font-sans text-[clamp(2.2rem,4.2vw,3.9rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#0B2F66]">
                Reach our dispatch team
                <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                  in whichever way is easiest.
                </span>
              </Reveal>

              <Reveal delay={100}>
                <p className="mt-6 max-w-md text-base leading-7 text-[#23314A]/70">
                  Placing an urgent order or setting up a regular wholesale supply? Call, message,
                  or send the form. We reply during business hours.
                </p>
              </Reveal>

              {/* Channels: open rows separated by hairlines */}
              <div className="mt-12 border-b border-[#0B2F66]/12">
                {channels.map((c, i) => (
                  <Reveal key={c.label} delay={150 + i * 90}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-5 border-t border-[#0B2F66]/12 py-6 transition-colors"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B2F66]/[0.06] text-[#8B1E46] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#0B2F66] group-hover:text-[#ffffff]">
                        {c.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-[#23314A]/55">{c.label}</span>
                        <span
                          className={`mt-0.5 block break-words font-sans font-extrabold tracking-tight text-[#0B2F66] transition-colors ${c.hover} ${c.small ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
                            }`}
                        >
                          {c.value}
                        </span>
                      </span>
                      <span className="text-[#0B2F66]/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#8B1E46]">
                        <ArrowIcon size={22} />
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>

              {/* Address + CR as plain text blocks */}
              <Reveal delay={450}>
                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-[#8B1E46]"><MapPinIcon size={20} /></span>
                    <div>
                      <p className="text-sm text-[#23314A]/55">Head office</p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-[#0B2F66]">
                        {company.address}
                        <br />
                        Doha, State of Qatar
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-[#8B1E46]"><ShieldIcon /></span>
                    <div>
                      <p className="text-sm text-[#23314A]/55">Commercial Registration</p>
                      <p className="mt-1 text-sm font-semibold text-[#0B2F66]">№ {company.cr}</p>
                      <p className="font-arabic mt-0.5 text-base font-bold text-[#0B2F66]" lang="ar" dir="rtl">
                        {company.arabic}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT: form */}
            <div className="lg:col-span-7">
              <Reveal delay={120} y={40}>
                <div className="relative overflow-hidden rounded-[2rem] bg-[#071B3C] p-7 shadow-[0_40px_80px_-30px_rgba(7,27,60,0.55)] sm:p-10 md:p-14">
                  {/* decorative rings + glow */}
                  <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
                  <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#ffffff]/25" />
                  <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#8B1E46]/30 blur-3xl" />

                  <div className="relative">
                    <h3 className="font-sans text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                      Send us your order list.
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
                      Fill this in and WhatsApp opens with everything already written. Our team
                      confirms your dispatch from there.
                    </p>

                    <form onSubmit={handleSubmitWhatsApp} className="mt-10 space-y-9">
                      {/* Request type */}
                      <fieldset>
                        <legend className="text-sm text-white/55">I'm ordering as</legend>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {REQUEST_TYPES.map((t) => {
                            const active = formData.type === t
                            return (
                              <button
                                key={t}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setFormData((d) => ({ ...d, type: t }))}
                                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffffff] 
                                  ${active
                                    ? 'border-maroon bg-[#ffffff] text-maroon'
                                    : 'border-white/20 text-white/80 hover:border-white/60 hover:text-white'
                                  }`}
                              >
                                {active && <CheckIcon />}
                                {t}
                              </button>
                            )
                          })}
                        </div>
                      </fieldset>

                      <Field
                        id="cf-name"
                        label="Your name or business name"
                        required
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange('name')}
                      />

                      <div className="grid gap-9 sm:grid-cols-2 sm:gap-8">
                        <Field
                          id="cf-phone"
                          label="Phone number"
                          required
                          type="tel"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleChange('phone')}
                        />
                        <Field
                          id="cf-location"
                          label="Delivery zone (e.g. Lusail, Al Wakrah)"
                          required
                          type="text"
                          value={formData.location}
                          onChange={handleChange('location')}
                        />
                      </div>

                      {/* Message + quick add */}
                      <div>
                        <Field
                          id="cf-message"
                          as="textarea"
                          rows={4}
                          label="What do you need delivered?"
                          required
                          value={formData.message}
                          onChange={handleChange('message')}
                        />
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="mr-1 text-xs text-white/45">Quick add:</span>
                          {QUICK_ITEMS.map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => addItem(item)}
                              className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/75 transition-colors hover:border-[#ffffff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffffff]"
                            >
                              + {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-1">
                        <button
                          type="submit"
                          className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#ffffff] px-8 py-5 text-base font-extrabold text-maroon/95 transition-colors duration-300 shadow-[0_18px_40px_-14px_rgba(210,168,68,0.7)] transition-all duration-300 hover:-translate-y-0.5  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                          <WhatsAppIcon />
                          <span>Send on WhatsApp</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            <ArrowIcon />
                          </span>
                        </button>

                        <p className="mt-5 text-center text-sm text-white/55">
                          Prefer email? {' '}
                          <a
                            href={`mailto:${company.email}?subject=${encodeURIComponent(
                              'Website Order / Distribution Enquiry'
                            )}&body=${encodeURIComponent(formattedWhatsAppText)}`}
                            className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors "
                          >
                            Send this by email instead
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LOCATION: full-bleed map with a floating info sheet
      ===================================================== */}
      <section className="relative bg-[#F2F5F9]">
        <div className="mx-auto max-w-[1400px] px-5 pt-20 md:px-10 md:pt-28">
          <Reveal as="h2" className="max-w-3xl font-sans text-[clamp(2.2rem,4.2vw,3.9rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#0B2F66]">
            Based in Doha,
            <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
              delivering across Qatar.
            </span>
          </Reveal>
        </div>

        <div className="relative mt-12 md:mt-16">
          <Reveal y={20}>
            <div className="relative h-[420px] w-full overflow-hidden md:h-[600px]">
              <iframe
                title="Al Fawaz International location in Doha, Qatar"
                src="https://www.google.com/maps?q=Doha+Qatar+Zone+27+Street+950&output=embed"
                className="h-full w-full border-0 grayscale-[0.85] contrast-[1.05] transition duration-700 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F2F5F9] to-transparent" />
            </div>
          </Reveal>

          {/* Floating sheet */}
          <div className="relative mx-auto max-w-[1400px] px-5 md:absolute md:inset-x-0 md:bottom-12 md:px-10">
            <Reveal delay={200} y={32}>
              <div className="-mt-16 rounded-[1.75rem] bg-[#071B3C] p-7 text-white shadow-[0_30px_70px_-25px_rgba(7,27,60,0.6)] md:mt-0 md:max-w-md md:p-9">
                <div className="flex items-center gap-3 text-[#ffffff]">
                  <MapPinIcon />
                  <p className="text-sm font-semibold">Head office</p>
                </div>
                <p className="mt-4 font-sans text-xl font-extrabold leading-snug tracking-tight">
                  {company.address}
                </p>
                <p className="mt-1 text-sm text-white/60">Doha, State of Qatar</p>

                <div className="my-6 h-px bg-white/15" />

                <p className="text-sm leading-6 text-white/70">
                  Our delivery fleet covers Doha and the surrounding areas, including Lusail,
                  Al Wakrah and Al Rayyan. Tell us your zone and we'll confirm the delivery day.
                </p>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    'Doha Qatar Zone 27 Street 950'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#ffffff] transition-colors hover:text-white"
                >
                  Open in Google Maps
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon size={18} />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="h-16 md:h-0" />
      </section>

      {/* =====================================================
          FAQ: sticky heading + ruled accordion (no cards)
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-24 md:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal as="h2" className="font-sans text-[clamp(2.2rem,4.2vw,3.9rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#0B2F66]">
                Before you order,
                <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                  quick answers.
                </span>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-6 max-w-sm text-base leading-7 text-[#23314A]/70">
                  Can't find what you're looking for? Ask us directly and we'll answer on WhatsApp.
                </p>
                <a
                  href={waLink('Hello Al Fawaz International, I have a question.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-center gap-3 rounded-full border border-[#0B2F66]/20 px-6 py-3 text-sm font-bold text-[#0B2F66] transition-all duration-300 hover:border-[#8B1E46] hover:bg-[#8B1E46] hover:text-white"
                >
                  <WhatsAppIcon size={18} />
                  Ask a question
                </a>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-b border-[#0B2F66]/12">
              {faqs.map((faq, idx) => {
                const open = activeFaq === idx
                return (
                  <Reveal key={faq.q} delay={idx * 90} y={20}>
                    <div className="border-t border-[#0B2F66]/12">
                      <h3>
                        <button
                          type="button"
                          id={`faq-btn-${idx}`}
                          aria-expanded={open}
                          aria-controls={`faq-panel-${idx}`}
                          onClick={() => setActiveFaq(open ? null : idx)}
                          className="group flex w-full items-center justify-between gap-6 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B1E46] md:py-8"
                        >
                          <span
                            className={`font-sans text-lg font-bold leading-snug tracking-tight transition-colors md:text-2xl ${open ? 'text-[#8B1E46]' : 'text-[#0B2F66] group-hover:text-[#8B1E46]'
                              }`}
                          >
                            {faq.q}
                          </span>
                          <span
                            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${open
                              ? 'border-[#8B1E46] bg-[#8B1E46] text-white'
                              : 'border-[#0B2F66]/20 text-[#0B2F66] group-hover:border-[#8B1E46]'
                              }`}
                            aria-hidden="true"
                          >
                            <span className="absolute h-[2px] w-4 rounded bg-current" />
                            <span
                              className={`absolute h-4 w-[2px] rounded bg-current transition-transform duration-300 ${open ? 'scale-y-0' : 'scale-y-100'
                                }`}
                            />
                          </span>
                        </button>
                      </h3>

                      <div
                        id={`faq-panel-${idx}`}
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                        className={`grid transition-all duration-500 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-2xl pb-8 pr-14 text-base leading-7 text-[#23314A]/70">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
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
            <Reveal>
              <p className="text-sm font-semibold text-[#ffffff]">
                Fast, dependable delivery across Qatar
              </p>
            </Reveal>

            <Reveal as="h2" delay={100} className="mt-6 font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
              Place your order
              <span className="block text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]">
                directly today.
              </span>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
                <a
                  href={`tel:${company.phone}`}
                  className="text-2xl font-bold text-white transition-colors duration-300 hover:text-[#ffffff] md:text-4xl"
                >
                  {company.phoneIntl}
                </a>

                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#ffffff] px-8 py-4 text-sm font-extrabold text-[#071B3C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
                >
                  <WhatsAppIcon size={20} />
                  <span>Message on WhatsApp</span>
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