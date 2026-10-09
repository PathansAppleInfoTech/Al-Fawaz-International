import { useEffect, useRef, useState } from 'react'

const Reveal = ({
  children,
  delay = 0,
  variant = 'up',
  className = '',
}) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

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
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const hiddenClasses = {
    up: 'opacity-0 translate-y-8 blur-[2px]',
    left: 'opacity-0 -translate-x-8 blur-[2px]',
    right: 'opacity-0 translate-x-8 blur-[2px]',
    scale: 'opacity-0 scale-[0.96] blur-[2px]',
    fade: 'opacity-0',
  }

  const visibleClasses = {
    up: 'opacity-100 translate-y-0 blur-0',
    left: 'opacity-100 translate-x-0 blur-0',
    right: 'opacity-100 translate-x-0 blur-0',
    scale: 'opacity-100 scale-100 blur-0',
    fade: 'opacity-100',
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? visibleClasses[variant] : hiddenClasses[variant]
        } ${className}`}
    >
      {children}
    </div>
  )
}

export default Reveal;