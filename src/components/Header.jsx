import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { company } from '../data/company.js'

import logo from '/assets/logo.png'
import logoTransparent from '/assets/logo-transparent.png'
import logoWhite from '/assets/logo-white.png'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const solidHeader = scrolled || open

  /* ---------------------------------------------
     Detect scroll
  --------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /* ---------------------------------------------
     Close mobile menu when route changes
  --------------------------------------------- */
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  /* ---------------------------------------------
     Stop Lenis while mobile menu is open
  --------------------------------------------- */
  useEffect(() => {
    if (open) {
      window.__lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      window.__lenis?.start()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500
        ${solidHeader
          ? 'bg-white/95 shadow-[0_1px_0_rgba(11,47,102,.08)] backdrop-blur-xl'
          : 'bg-transparent'
        }
      `}
    >
      {/* =========================================
          MAIN HEADER
      ========================================== */}
      <div
        className={`
          mx-auto flex max-w-[1400px] items-center
          justify-between px-5 md:px-10
          transition-all duration-500
          ${scrolled
            ? 'py-2'
            : 'py-3 md:py-4'
          }
        `}
      >
        {/* =========================================
            LOGO
        ========================================== */}
        <Link
          to="/"
          aria-label={`${company.name} home`}
          className="relative z-[60] flex shrink-0 items-center"
        >
          <img
            src={solidHeader ? logoTransparent : logoWhite}
            alt={`${company.name} logo`}
            className={`
                  logo-image
              block
              w-auto
              object-contain
              transition-all
              duration-500
              ${solidHeader
                ? 'h-12 md:h-14'
                : 'h-14 md:h-15 mix-blend-multiply'
              }
            `}
          />
        </Link>

        {/* =========================================
            DESKTOP NAV
        ========================================== */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex lg:gap-10"
        >
          {company.nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              className={({ isActive }) =>
                `
                  relative
                  pb-1
                  font-display
                  text-[15px]
                  font-semibold
                  transition-all
                  duration-300

                  ${solidHeader
                  ? 'text-navy hover:text-maroon'
                  : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.25)] hover:text-maroon'
                }

                  ${isActive
                  ? solidHeader
                    ? 'text-maroon'
                    : 'text-white'
                  : ''
                }
                `
              }
            >
              {n.label}
            </NavLink>
          ))}

          {/* Call button */}
          <a
            href={`tel:${company.phone}`}
            className="
              rounded-full
              bg-maroon
              px-6
              py-3
              font-display
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-navy
              hover:shadow-lg
            "
          >
            Call {company.phoneIntl}
          </a>
        </nav>

        {/* =========================================
            MOBILE MENU BUTTON
        ========================================== */}
        <button
          type="button"
          className="
            relative
            z-[70]
            flex
            h-11
            w-11
            shrink-0
            flex-col
            items-end
            justify-center
            gap-[7px]
            md:hidden
          "
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {/* Top line */}
          <span
            className={`
              h-[2px]
              transition-all
              duration-500
              ${solidHeader
                ? 'bg-navy'
                : 'bg-white'
              }

              ${open
                ? 'w-7 translate-y-[4.5px] rotate-45'
                : 'w-7'
              }
            `}
          />

          {/* Bottom line */}
          <span
            className={`
              h-[2px]
              transition-all
              duration-500
              ${solidHeader
                ? 'bg-maroon'
                : 'bg-white'
              }

              ${open
                ? 'w-7 -translate-y-[4.5px] -rotate-45'
                : 'w-4'
              }
            `}
          />
        </button>
      </div>

      {/* =========================================
          MOBILE MENU
      ========================================== */}
      <div
        className={`
          fixed
          inset-0
          z-[55]
          flex
          min-h-screen
          flex-col
          justify-center
          bg-white
          px-8
          transition-all
          duration-700
          md:hidden

          ${open
            ? 'visible opacity-100'
            : 'invisible opacity-0'
          }
        `}
        style={{
          clipPath: open
            ? 'circle(150% at 92% 5%)'
            : 'circle(0% at 92% 5%)',
        }}
      >
        {/* Mobile Links */}
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-5"
        >
          {company.nav.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              style={{
                transitionDelay: open
                  ? `${150 + i * 80}ms`
                  : '0ms',
              }}
              className={`
                font-display
                text-[clamp(2.5rem,10vw,4rem)]
                font-bold
                leading-none
                text-navy
                transition-all
                duration-700
                hover:text-maroon

                ${open
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
                }
              `}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Contact */}
        <div
          className={`
            mt-12
            border-t
            border-gold
            pt-6
            transition-all
            duration-700

            ${open
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
            }
          `}
          style={{
            transitionDelay: open
              ? `${150 + company.nav.length * 80}ms`
              : '0ms',
          }}
        >
          <a
            href={`tel:${company.phone}`}
            className="
              font-display
              text-2xl
              font-semibold
              text-maroon
            "
          >
            {company.phoneIntl}
          </a>

          <p className="mt-2 break-all text-sm text-ink/70">
            {company.email}
          </p>
        </div>
      </div>
    </header>
  )
}