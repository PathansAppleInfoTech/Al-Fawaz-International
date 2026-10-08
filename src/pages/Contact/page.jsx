import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { company, waLink } from '../../data/company.js'

const field = 'w-full border-0 border-b border-navy/30 bg-transparent py-3 text-ink placeholder:text-ink/40 transition-colors focus:border-maroon focus:outline-none focus:ring-0'

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', message: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const text = `Hello Al Fawaz International,\nName: ${f.name}\nPhone: ${f.phone}\n${f.message}`

  const send = (e) => {
    e.preventDefault()
    window.open(waLink(text), '_blank', 'noopener')
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | Al Fawaz International for Food Trading, Doha Qatar</title>
        <meta name="description" content="Contact Al Fawaz International for Food Trading in Doha, Qatar. Call 00974-33811309, WhatsApp or email info@alfawazinternational.com to place an order or become a partner." />
        <link rel="canonical" href={`${company.url}/contact`} />
        <meta property="og:title" content="Contact Al Fawaz International for Food Trading" />
        <meta property="og:description" content="Call, WhatsApp or email us to place an order or discuss a partnership." />
        <meta property="og:url" content={`${company.url}/contact`} />
        <meta property="og:image" content={`${company.url}/og-logo.png`} />
      </Helmet>

      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-36 md:px-10 md:pt-52">
        <h1 className="text-[clamp(2.6rem,7vw,6.4rem)] font-extrabold leading-[0.98]" data-group>
          {['Tell us what you need.', 'We’ll get it moving.'].map((l, i) => (
            <span key={l} className="rv-line" style={{ '--d': `${i * 0.14}s` }}><span>{l}</span></span>
          ))}
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 pb-24 md:grid-cols-12 md:px-10 md:pb-36">
        <div className="md:col-span-5">
          <ul className="space-y-9">
            {[
              ['Call', company.phoneIntl, `tel:${company.phone}`],
              ['WhatsApp', 'Send your order list', waLink()],
              ['Email', company.email, `mailto:${company.email}`],
            ].map(([k, v, href], i) => (
              <li key={k} data-reveal="up" style={{ '--d': `${i * 0.1}s` }}>
                <p className="text-sm text-ink/60">{k}</p>
                <a href={href} {...(k === 'WhatsApp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="link-u mt-1 inline-block break-all font-display text-2xl font-bold text-navy md:text-3xl">{v}</a>
              </li>
            ))}
            <li data-reveal="up" style={{ '--d': '.3s' }}>
              <p className="text-sm text-ink/60">Visit</p>
              <p className="mt-1 font-display text-2xl font-bold text-navy">{company.address}</p>
            </li>
            <li data-reveal="up" style={{ '--d': '.4s' }}>
              <p className="text-sm text-ink/60">Commercial Registration</p>
              <p className="mt-1 font-display text-2xl font-bold text-maroon">{company.cr}</p>
              <p className="mt-2 font-arabic text-navy" lang="ar" dir="rtl">{company.arabic}</p>
            </li>
          </ul>
        </div>

        <form onSubmit={send} className="md:col-span-6 md:col-start-7" data-reveal="up" style={{ '--d': '.2s' }}>
          <h2 className="text-3xl font-bold">Send an enquiry</h2>
          <p className="mt-3 text-ink/70">Your message opens in WhatsApp so we can reply straight away.</p>
          <div className="mt-10 space-y-8">
            <label className="block"><span className="text-sm text-ink/70">Your name</span><input required className={field} value={f.name} onChange={set('name')} autoComplete="name" /></label>
            <label className="block"><span className="text-sm text-ink/70">Phone number</span><input required type="tel" className={field} value={f.phone} onChange={set('phone')} autoComplete="tel" /></label>
            <label className="block"><span className="text-sm text-ink/70">What do you need delivered?</span><textarea required rows="4" className={field} value={f.message} onChange={set('message')} placeholder="For example: 20 cartons of water and 10 cartons of cola" /></label>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button type="submit" className="rounded-full bg-maroon px-9 py-4 font-display font-semibold text-white transition hover:bg-navy">Send on WhatsApp</button>
            <a href={`mailto:${company.email}?subject=${encodeURIComponent('Enquiry from website')}&body=${encodeURIComponent(text)}`} className="link-u font-display font-semibold text-navy">Send by email instead</a>
          </div>
        </form>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10" data-reveal="mask">
          <div className="aspect-[16/8] min-h-[320px] overflow-hidden rounded-tl-[6rem] rounded-br-[6rem] bg-mist">
            <iframe title="Map of Al Fawaz International, Zone 27, Street 950, Doha" src="https://www.google.com/maps?q=Doha+Qatar+Zone+27+Street+950&output=embed" className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  )
}
