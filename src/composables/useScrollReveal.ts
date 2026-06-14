import { onMounted, onUnmounted } from 'vue'

type RevealType = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right'

interface UseScrollRevealOptions {
  type?       : RevealType
  delay?      : number   // stagger delay between siblings in ms
  threshold?  : number   // how much of element must be visible before triggering
  rootMargin? : string   // fires earlier (negative bottom = trigger before fully in view)
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    type       = 'fade-up',
    delay      = 0,
    threshold  = 0.08,                    // trigger when just 8% is visible
    rootMargin = '0px 0px -24px 0px',    // fire slightly before bottom of viewport
  } = options

  const elements: Element[] = []
  let observer: IntersectionObserver | null = null

  function add(el: Element | null) {
    if (!el) return
    el.classList.add(`reveal-${type}`)
    elements.push(el)
    observer?.observe(el)
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement

          // Stagger: each sibling gets progressively longer delay
          if (delay > 0 && el.parentElement) {
            const siblings = Array.from(el.parentElement.children)
            const idx = siblings.indexOf(el)
            el.style.transitionDelay = `${idx * delay}ms`
          }

          el.classList.add('reveal-visible')
          observer?.unobserve(el)
        })
      },
      { threshold, rootMargin },
    )

    elements.forEach((el) => observer?.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { add }
}