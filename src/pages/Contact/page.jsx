import { useMemo, useState } from 'react'
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = () => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const MapPinIcon = () => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ShieldIcon = () => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg
    width="20"
    height="20"
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
   CONTACT COMPONENT
========================================================= */

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    message: '',
  })

  const [activeFaq, setActiveFaq] = useState(null)

  const siteUrl = useMemo(() => {
    if (typeof window === 'undefined') return 'https://www.alfawazinternational.com'
    return window.location.origin
  }, [])

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const formattedWhatsAppText = `Hello Al Fawaz International,
*New Order / Enquiry*
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
      a: 'Yes! We deliver directly to households across Qatar, saving you the hassle of carrying heavy cartons of water, soft drinks, and staples from supermarkets.',
    },
    {
      q: 'Do you offer bulk supply for supermarkets, restaurants and groceries?',
      a: 'Absolutely. We supply wholesale quantities, multipacks, and bulk pallet orders with dedicated account support and regular delivery schedules.',
    },
    {
      q: 'What payment options are available?',
      a: 'We accommodate convenient payment options upon delivery including cash, corporate bank transfer, and approved commercial credit terms for registered partners.',
    },
  ]

  const inputClass =
    'w-full rounded-2xl border border-[#0B2F66]/15 bg-[#F2F5F9] px-5 py-4 text-sm font-semibold text-[#0B2F66] placeholder:text-[#23314A]/40 transition-all focus:border-[#8B1E46] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E46]/10'

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
            <Reveal><Eyebrow light>Direct Distribution Support · Doha, Qatar</Eyebrow></Reveal>
            <Reveal as="h1" delay={0.1} className="mt-5 font-sans text-[clamp(2.6rem,6vw,5.8rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
              Tell us what you need.
              <span className="block text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>
                We'll get it moving.
              </span>
            </Reveal>
          </div>
        </div>
      </section>


      {/* =====================================================
          MAIN CONTACT & ENQUIRY SECTION (Split Layout)
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Left Column: Direct Communication Channels */}
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Direct Channels</Eyebrow>
              </Reveal>

              <Reveal delay={120}>
                <h2 className="mt-5 font-sans text-[clamp(2.4rem,4.8vw,4.5rem)] font-extrabold leading-[0.93] tracking-[-0.045em] text-[#0B2F66]">
                  Immediate contact
                  <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                    with our dispatch team.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-6 text-base leading-7 text-[#23314A]/70">
                  Whether you are placing an urgent order or arranging a scheduled wholesale partnership,
                  our team is accessible via phone, WhatsApp and email throughout business hours.
                </p>
              </Reveal>

              {/* Channels List */}
              <div className="mt-10 space-y-4">
                {/* Phone */}
                <Reveal delay={260}>
                  <a
                    href={`tel:${company.phone}`}
                    className="group flex items-center justify-between rounded-2xl border border-[#0B2F66]/10 bg-[#F2F5F9] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#8B1E46] hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B2F66] text-white transition-colors group-hover:bg-[#8B1E46]">
                        <PhoneIcon />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#23314A]/50">
                          Call directly
                        </p>
                        <p className="mt-0.5 font-sans text-lg font-bold text-[#0B2F66] transition-colors group-hover:text-[#8B1E46]">
                          {company.phoneIntl}
                        </p>
                      </div>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0B2F66]/10 text-[#0B2F66] transition-all group-hover:translate-x-1 group-hover:border-[#8B1E46] group-hover:bg-[#8B1E46] group-hover:text-white">
                      →
                    </span>
                  </a>
                </Reveal>

                {/* WhatsApp */}
                <Reveal delay={320}>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-[#0B2F66]/10 bg-[#F2F5F9] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                        <WhatsAppIcon />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#23314A]/50">
                          Chat on WhatsApp
                        </p>
                        <p className="mt-0.5 font-sans text-lg font-bold text-[#0B2F66] transition-colors group-hover:text-[#25D366]">
                          Send order list directly
                        </p>
                      </div>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0B2F66]/10 text-[#0B2F66] transition-all group-hover:translate-x-1 group-hover:border-[#25D366] group-hover:bg-[#25D366] group-hover:text-white">
                      →
                    </span>
                  </a>
                </Reveal>

                {/* Email */}
                <Reveal delay={380}>
                  <a
                    href={`mailto:${company.email}`}
                    className="group flex items-center justify-between rounded-2xl border border-[#0B2F66]/10 bg-[#F2F5F9] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#8B1E46] hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B2F66] text-white transition-colors group-hover:bg-[#8B1E46]">
                        <MailIcon />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#23314A]/50">
                          Official Email
                        </p>
                        <p className="mt-0.5 break-all font-sans text-base font-bold text-[#0B2F66] transition-colors group-hover:text-[#8B1E46]">
                          {company.email}
                        </p>
                      </div>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0B2F66]/10 text-[#0B2F66] transition-all group-hover:translate-x-1 group-hover:border-[#8B1E46] group-hover:bg-[#8B1E46] group-hover:text-white">
                      →
                    </span>
                  </a>
                </Reveal>

                {/* Address */}
                <Reveal delay={440}>
                  <div className="rounded-2xl border border-[#0B2F66]/10 bg-[#F2F5F9] p-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B2F66] text-[#D2A844]">
                        <MapPinIcon />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#23314A]/50">
                          Headquarters Address
                        </p>
                        <p className="mt-0.5 font-sans text-base font-bold text-[#0B2F66]">
                          {company.address}
                        </p>
                        <p className="mt-1 text-xs text-[#23314A]/60">
                          Doha, State of Qatar
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* CR Verification Box */}
              <Reveal delay={500} className="mt-6">
                <div className="flex items-center justify-between rounded-2xl border border-[#0B2F66]/15 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-[#8B1E46]">
                      <ShieldIcon />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#23314A]/50">
                        Commercial Registration
                      </p>
                      <p className="text-sm font-extrabold text-[#0B2F66]">
                        № {company.cr}
                      </p>
                    </div>
                  </div>
                  <span className="font-arabic text-base font-bold text-[#0B2F66]" lang="ar" dir="rtl">
                    {company.arabic}
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right Column: High-Converting Order / Enquiry Form */}
            <div className="lg:col-span-7">
              <Reveal delay={200}>
                <div className="relative rounded-[2.5rem] border-2 border-[#0B2F66]/10 bg-white p-8 shadow-2xl md:p-12">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#8B1E46]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1E46]">
                      Quick Order Desk
                    </p>
                  </div>

                  <h3 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-[#0B2F66] md:text-4xl">
                    Send an enquiry
                    <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46]">
                      or order list.
                    </span>
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#23314A]/70">
                    Fill in your requirement below. Submitting will immediately open WhatsApp
                    with your pre-formatted order details so our team can confirm dispatch in minutes.
                  </p>

                  <form onSubmit={handleSubmitWhatsApp} className="mt-8 space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2F66]">
                        Your Name / Business Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={handleChange('name')}
                        placeholder="e.g. Ahmed Al-Mansoori / Al Rayyan Grocery"
                        className={`mt-2 ${inputClass}`}
                        autoComplete="name"
                      />
                    </div>

                    {/* Phone & Location Grid */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2F66]">
                          Phone Number (Qatar) *
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange('phone')}
                          placeholder="e.g. +974 3381 1309"
                          className={`mt-2 ${inputClass}`}
                          autoComplete="tel"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2F66]">
                          Delivery Location / Zone *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.location}
                          onChange={handleChange('location')}
                          placeholder="e.g. Doha Zone 27 / Al Wakrah / Lusail"
                          className={`mt-2 ${inputClass}`}
                        />
                      </div>
                    </div>

                    {/* Requirement / Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2F66]">
                        What do you need delivered? *
                      </label>
                      <textarea
                        required
                        rows="4"
                        value={formData.message}
                        onChange={handleChange('message')}
                        placeholder="For example: 25 cartons of drinking water (1.5L), 10 cartons of cola cans, and 5 bags of rice."
                        className={`mt-2 ${inputClass}`}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#8B1E46] px-8 py-4.5 text-base font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2A844]"
                      >
                        <WhatsAppIcon />
                        <span>Send on WhatsApp</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>

                      <div className="mt-4 flex items-center justify-between">
                        <a
                          href={`mailto:${company.email}?subject=${encodeURIComponent(
                            'Website Order / Distribution Enquiry'
                          )}&body=${encodeURIComponent(formattedWhatsAppText)}`}
                          className="text-xs font-bold text-[#0B2F66] underline transition-colors hover:text-[#8B1E46]"
                        >
                          Send by email instead
                        </a>

                        <span className="text-[11px] text-[#23314A]/50">
                          Direct response guaranteed
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LOCATION & DISTRIBUTION MAP
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#F2F5F9] py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <Eyebrow>Geographic Reach</Eyebrow>
              </Reveal>

              <Reveal delay={120}>
                <h2 className="mt-5 max-w-2xl font-sans text-[clamp(2.4rem,4.8vw,4.8rem)] font-extrabold leading-[0.93] tracking-[-0.045em] text-[#0B2F66]">
                  Doha headquarters
                  <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                    & nationwide coverage.
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div className="rounded-2xl border border-[#0B2F66]/10 bg-white px-6 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1E46]">
                  Dispatch Fleet Radius
                </p>
                <p className="font-sans text-xl font-extrabold text-[#0B2F66]">
                  Serving Doha & Greater Qatar
                </p>
              </div>
            </Reveal>
          </div>

          {/* Embedded Google Map */}
          <Reveal delay={300} className="mt-14">
            <div className="relative aspect-[16/8] min-h-[380px] overflow-hidden rounded-[2.5rem] border-2 border-[#0B2F66]/10 bg-white shadow-2xl">
              <iframe
                title="Al Fawaz International location in Doha, Qatar"
                src="https://www.google.com/maps?q=Doha+Qatar+Zone+27+Street+950&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          ORDERING FAQS (Interactive Accordion)
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Ordering Information</Eyebrow>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-5 font-sans text-[clamp(2.4rem,4.8vw,4.8rem)] font-extrabold leading-[0.93] tracking-[-0.045em] text-[#0B2F66]">
                Frequently asked
                <span className="block text-transparent [-webkit-text-stroke:1.5px_#8B1E46] md:[-webkit-text-stroke:2px_#8B1E46]">
                  questions.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {faqs.map((faq, idx) => (
              <Reveal key={faq.q} delay={idx * 80}>
                <div
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="cursor-pointer rounded-2xl border border-[#0B2F66]/10 bg-[#F2F5F9] p-6 transition-all duration-300 hover:border-[#8B1E46] hover:bg-white md:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-sans text-lg font-bold text-[#0B2F66] md:text-xl">
                      {faq.q}
                    </h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#8B1E46] shadow-sm">
                      {activeFaq === idx ? '−' : '+'}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#23314A]/70 md:text-base">
                    {faq.a}
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
                Fast, dependable delivery across Qatar
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-6 font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
                Place your order
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <h2 className="mt-1 font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]">
                directly today.
              </h2>
            </Reveal>

            <Reveal delay={360}>
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
                  className="group inline-flex items-center gap-3 rounded-full bg-[#8B1E46] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D2A844] hover:shadow-xl"
                >
                  <WhatsAppIcon />
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
