import { Link } from 'react-router-dom'
import { company, waLink } from '../data/company.js'
import logo from '/assets/logo.png'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-mist">
      {/* Decorative background */}
      <svg
        className="pointer-events-none absolute -right-40 -top-24 w-[900px] opacity-60"
        viewBox="0 0 600 400"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 300 C150 60 420 40 580 140"
          stroke="#7C1736"
          strokeWidth="2"
          opacity=".35"
        />
        <path
          d="M0 330 C170 110 430 90 600 190"
          stroke="#0B2F66"
          strokeWidth="2"
          opacity=".25"
        />
      </svg>

      <div className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        {/* Tagline */}
        <p
          className="font-display text-[clamp(2.2rem,7vw,6.5rem)] font-extrabold leading-[0.95] outline-text"
          data-reveal="up"
        >
          {company.tagline}
        </p>

        {/* Footer Content */}
        <div className="mt-16 grid gap-x-10 gap-y-12 md:mt-24 md:grid-cols-12">
          
          {/* Brand */}
          <div className="md:col-span-4">
            <img
              src={logo}
              alt={`${company.name} logo`}
              className="h-28 w-auto mix-blend-multiply"
              loading="lazy"
            />

            <p
              className="mt-5 font-arabic text-lg text-navy"
              lang="ar"
              dir="rtl"
            >
              {company.arabic}
            </p>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/70">
              {company.intro}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="md:col-span-2">
            <h3 className="font-display text-base font-bold">
              Explore
            </h3>

            <ul className="mt-4 space-y-3">
              {company.nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="link-u text-sm text-ink/80"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Talk to us */}
          <div className="md:col-span-3">
            <h3 className="font-display text-base font-bold">
              Talk to us
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              <li>
                <a
                  href={`tel:${company.phone}`}
                  className="link-u"
                >
                  {company.phone}
                </a>
              </li>

              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u"
                >
                  WhatsApp us
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="link-u break-all"
                >
                  {company.email}
                </a>
              </li>

              <li>
                <a
                  href={company.url}
                  className="link-u break-all"
                >
                  {company.website}
                </a>
              </li>
            </ul>
          </div>

          {/* Find us */}
          <div className="md:col-span-3">
            <h3 className="font-display text-base font-bold">
              Find us
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-ink/80">
              {company.address}
            </p>

            <p className="mt-3 text-sm text-ink/80">
              Commercial Registration{' '}
              <span className="font-semibold text-maroon">
                {company.cr}
              </span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-2 border-t border-gold/50 pt-6 text-xs text-ink/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>

          <p>Doha, Qatar</p>

          <a
            href="https://pathansaaale.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-u"
          >
            Powered by Pathans Apple Info Tech
          </a>
        </div>
      </div>
    </footer>
  )
}