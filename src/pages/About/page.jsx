import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { company } from '../../data/company.js'

const details = [
  ['Registered name', company.name],
  ['Arabic name', company.arabic],
  ['Commercial Registration', company.cr],
  ['Address', company.address],
  ['Phone', company.phoneIntl],
  ['Email', company.email],
  ['Website', company.website],
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Al Fawaz International for Food Trading, Doha</title>
        <meta name="description" content="Learn about Al Fawaz International for Food Trading in Doha, Qatar: our vision, mission, values and the distribution-without-delay approach behind our food and beverage service." />
        <link rel="canonical" href={`${company.url}/about`} />
        <meta property="og:title" content="About Al Fawaz International for Food Trading" />
        <meta property="og:description" content="Our vision, mission and values: a trusted food distribution partner for Qatar." />
        <meta property="og:url" content={`${company.url}/about`} />
        <meta property="og:image" content={`${company.url}/og-logo.png`} />
      </Helmet>

      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-36 md:px-10 md:pt-52">
        <h1 className="max-w-5xl text-[clamp(2.6rem,7vw,6.4rem)] font-extrabold leading-[0.98]" data-group>
          {['A distribution partner', 'built on being on time.'].map((l, i) => (
            <span key={l} className="rv-line" style={{ '--d': `${i * 0.14}s` }}><span>{l}</span></span>
          ))}
        </h1>
        <div className="mt-14 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-9" data-reveal="mask">
            <div className="aspect-[16/8] overflow-hidden rounded-tl-[8rem]">
              <img src={company.images.city} alt="Doha skyline at dusk, the city Al Fawaz International serves" className="h-full w-full object-cover" fetchpriority="high" />
            </div>
          </div>
          <p className="max-w-xs leading-relaxed text-ink/75 md:col-span-3" data-reveal="up" style={{ '--d': '.3s' }}>
            Based in Doha, we connect quality food and beverage products with homes, shops, supermarkets and businesses across Qatar.
          </p>
        </div>
      </section>

      {/* PROFILE */}
      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <h2 className="text-3xl font-bold md:text-4xl" data-reveal="up">Company details</h2>
            <dl className="mt-8">
              {details.map(([k, v], i) => (
                <div key={k} className="grid grid-cols-3 gap-4 border-t border-gold/60 py-4" data-reveal="wipe" style={{ '--d': `${i * 0.05}s` }}>
                  <dt className="text-sm text-ink/60">{k}</dt>
                  <dd className={`col-span-2 text-sm font-semibold text-navy ${k === 'Arabic name' ? 'font-arabic' : ''}`} {...(k === 'Arabic name' ? { lang: 'ar', dir: 'rtl' } : {})}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold leading-snug text-navy" data-reveal="up">
            Al Fawaz International for Food Trading is a Doha-based distributor focused on foods and beverages: water, soft drinks, colas and the everyday products that match them.
          </p>
          <p className="mt-8 max-w-2xl leading-relaxed text-ink/80" data-reveal="up" style={{ '--d': '.1s' }}>{company.mission.text}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink/80" data-reveal="up" style={{ '--d': '.15s' }}>{company.philosophy.text}</p>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="bg-mist py-24 md:py-40">
        <div className="mx-auto grid max-w-[1400px] gap-20 px-5 md:grid-cols-2 md:gap-0 md:px-10">
          <div className="md:pr-20">
            <h2 className="text-xl font-bold text-maroon" data-reveal="fade">Our vision</h2>
            <p className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-bold leading-[1.15]" data-reveal="up">“{company.vision.quote}”</p>
            <p className="mt-8 leading-relaxed text-ink/75" data-reveal="up" style={{ '--d': '.1s' }}>{company.vision.text}</p>
          </div>
          <div className="relative md:pl-20 md:pt-32">
            <span className="absolute left-0 top-0 hidden h-full w-px bg-gold md:block" aria-hidden="true" />
            <h2 className="text-xl font-bold text-maroon" data-reveal="fade">Our mission</h2>
            <p className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-bold leading-[1.15]" data-reveal="up">“{company.mission.quote}”</p>
            <p className="mt-8 leading-relaxed text-ink/75" data-reveal="up" style={{ '--d': '.1s' }}>{company.mission.text}</p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="overflow-hidden py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10" data-group>
          {company.philosophy.line.map((l, i) => (
            <span key={l} className="rv-line" style={{ '--d': `${i * 0.15}s` }}>
              <span className={`font-display text-[clamp(3rem,11vw,10rem)] font-extrabold leading-[0.95] ${i === 1 ? 'outline-text md:ml-[18%]' : i === 2 ? 'text-maroon md:ml-[36%]' : 'text-navy'}`}>{l}</span>
            </span>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-[1400px] px-5 text-ink/75 md:px-10 md:text-right" data-reveal="up">Our distribution philosophy, in three lines.</p>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-40">
        <h2 className="text-[clamp(2rem,4.4vw,4rem)] font-bold" data-reveal="up">What we stand for</h2>
        <ul className="mt-14">
          {company.values.map(([t, d], i) => (
            <li key={t} data-reveal="wipe" className="group grid gap-3 border-t border-navy/15 py-7 transition-colors duration-500 hover:border-maroon md:grid-cols-12 md:gap-8 md:py-9">
              <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-maroon md:col-span-5 md:text-3xl">{t}</h3>
              <p className="max-w-xl leading-relaxed text-ink/75 md:col-span-7">{d}</p>
            </li>
          ))}
          <li className="border-t border-navy/15" />
        </ul>
        <Link to="/contact" className="link-u mt-10 inline-block font-display text-xl font-semibold text-maroon">Work with us</Link>
      </section>
    </>
  )
}
