import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { company, waLink } from '../../data/company.js'

const shapes = ['rounded-t-full', 'rounded-tl-[8rem] rounded-br-[8rem]', 'rounded-[3rem]', 'rounded-tr-[9rem]', 'rounded-b-full', 'rounded-bl-[9rem] rounded-tr-[4rem]']

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Products and Distribution | Water, Soft Drinks and Food Supply in Qatar</title>
        <meta name="description" content="Explore what Al Fawaz International distributes in Doha, Qatar: bottled water, soft drinks and colas, juices, dairy, staples and packed foods, with fast home delivery." />
        <link rel="canonical" href={`${company.url}/services`} />
        <meta property="og:title" content="Products and Distribution | Al Fawaz International" />
        <meta property="og:description" content="Bottled water, colas, juices, dairy, staples and packed foods, delivered across Qatar." />
        <meta property="og:url" content={`${company.url}/services`} />
        <meta property="og:image" content={`${company.url}/og-logo.png`} />
      </Helmet>

      <section className="mx-auto grid max-w-[1400px] items-end gap-14 px-5 pb-20 pt-36 md:grid-cols-12 md:px-10 md:pt-52">
        <div className="md:col-span-7">
          <h1 className="text-[clamp(2.6rem,6.6vw,6rem)] font-extrabold leading-[0.98]" data-group>
            {['Everything your', 'shelves, kitchen and', 'customers ask for.'].map((l, i) => (
              <span key={l} className="rv-line" style={{ '--d': `${i * 0.13}s` }}><span>{l}</span></span>
            ))}
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/80" data-reveal="up" style={{ '--d': '.4s' }}>
            Our core is water, soft drinks and colas. Around it we supply the food and drink products that sell alongside them, ready to deliver on your schedule.
          </p>
        </div>
        <div className="relative md:col-span-5">
          <div data-reveal="arch" className="aspect-[4/5] overflow-hidden rounded-t-full">
            <img src={company.images.shelves} alt="Supermarket shelves stocked with beverages and packed foods" className="h-full w-full object-cover" fetchpriority="high" />
          </div>
          <div className="drift absolute -bottom-6 -left-6 h-28 w-28 overflow-hidden rounded-full border-[6px] border-white shadow-xl md:h-40 md:w-40">
            <img src={company.categories[1].img} alt="Chilled cola cans" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 md:py-28">
        {company.categories.map((c, i) => (
          <article key={c.name} className={`mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-14 md:grid-cols-12 md:gap-16 md:px-10 md:py-24 ${i % 2 ? '' : ''}`}>
            <div className={`md:col-span-6 ${i % 2 ? 'md:order-2' : ''}`}>
              <div data-reveal="mask" className={`aspect-[5/4] overflow-hidden ${shapes[i]}`}>
                <img src={c.img} alt={`${c.name}: ${c.items.slice(0, 2).join(', ')}`} className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className={`md:col-span-5 ${i % 2 ? 'md:col-start-1 md:row-start-1' : 'md:col-start-8'}`}>
              <h2 className="text-[clamp(2rem,3.8vw,3.4rem)] font-bold leading-[1.05]" data-reveal="up">{c.name}</h2>
              <p className="mt-5 leading-relaxed text-ink/80" data-reveal="up" style={{ '--d': '.1s' }}>{c.blurb}</p>
              <ul className="mt-8">
                {c.items.map((it, k) => (
                  <li key={it} data-reveal="wipe" style={{ '--d': `${0.15 + k * 0.06}s` }} className="flex items-center gap-4 border-t border-gold/50 py-3 text-navy">
                    <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />{it}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      {/* ALSO SUPPLIED */}
      <section className="bg-mist py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <h2 className="text-[clamp(1.8rem,3.4vw,3rem)] font-bold" data-reveal="up">Also on our delivery runs</h2>
          <p className="mt-10 font-display text-[clamp(1.6rem,3.6vw,3.2rem)] font-semibold leading-[1.4] text-navy" data-reveal="up">
            {company.alsoSupplied.map((s, i) => (
              <span key={s}>{s}{i < company.alsoSupplied.length - 1 && <span className="mx-3 text-gold">/</span>}</span>
            ))}
          </p>
          <p className="mt-8 max-w-xl text-ink/70" data-reveal="up">Looking for a specific brand or pack size? Tell us and we will source it.</p>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 md:grid-cols-12 md:px-10 md:py-40">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <h2 className="text-[clamp(2rem,3.8vw,3.4rem)] font-bold leading-[1.05]" data-reveal="up">Our distribution commitment</h2>
            <a href={waLink('Hello, I would like to discuss a regular supply.')} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-maroon px-8 py-4 font-display font-semibold text-white transition hover:bg-navy" data-reveal="up">Discuss a regular supply</a>
          </div>
        </div>
        <ul className="md:col-span-7 md:col-start-6">
          {company.commitments.map(([t, d], i) => (
            <li key={t} data-reveal="wipe" className="flex gap-6 border-t border-navy/15 py-7">
              <svg className="mt-1 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F7A4D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" /></svg>
              <div>
                <h3 className="font-display text-2xl font-bold">{t}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-ink/75">{d}</p>
              </div>
            </li>
          ))}
          <li className="border-t border-navy/15" />
        </ul>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Link to="/contact" className="link-u font-display text-[clamp(2rem,5vw,4.5rem)] font-extrabold text-maroon" data-reveal="up">Place your first order</Link>
        </div>
      </section>
    </>
  )
}
