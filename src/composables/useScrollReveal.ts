import { onMounted, onUnmounted } from 'vue'

type RevealType = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right'

interface UseScrollRevealOptions {
  type?: RevealType
  delay?: number          // stagger delay between siblings in ms (default 0)
  threshold?: number      // 0–1, how much of element must be visible (default 0.12)
  rootMargin?: string     // IntersectionObserver rootMargin (default '0px 0px -48px 0px')
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    type      = 'fade-up',
    delay     = 0,
    threshold = 0.12,
    rootMargin = '0px 0px -48px 0px',
  } = options

  const elements: Element[] = []
  let observer: IntersectionObserver | null = null

  // Called via :ref="revealX.add" on any element or component root
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

          // Stagger siblings: find index among observed siblings in same parent
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

    // Observe any elements already registered via :ref before mount
    elements.forEach((el) => observer?.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { add }
}