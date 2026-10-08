import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  children,
  delay = 0,
  variant = 'up',
  as: Component = 'div',
  className = '',
  style = {},
  ...rest
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
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
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    )

    observer.observe(element)

    // Failsafe in case of fast scroll or layout shifts
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1800)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const hiddenClasses = {
    up: 'opacity-0 translate-y-8 blur-[2px]',
    down: 'opacity-0 -translate-y-8 blur-[2px]',
    left: 'opacity-0 -translate-x-8 blur-[2px]',
    right: 'opacity-0 translate-x-8 blur-[2px]',
    scale: 'opacity-0 scale-[0.96] blur-[2px]',
    fade: 'opacity-0',
  }

  const visibleClasses = {
    up: 'opacity-100 translate-y-0 blur-0',
    down: 'opacity-100 translate-y-0 blur-0',
    left: 'opacity-100 translate-x-0 blur-0',
    right: 'opacity-100 translate-x-0 blur-0',
    scale: 'opacity-100 scale-100 blur-0',
    fade: 'opacity-100',
  }

  const delayMs = typeof delay === 'number' && delay < 10 ? Math.round(delay * 1000) : delay

  return (
    <Component
      ref={ref}
      style={{
        ...style,
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? visibleClasses[variant] || visibleClasses.up
          : hiddenClasses[variant] || hiddenClasses.up
      } ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}
