import { onMounted, onUnmounted } from 'vue'
import type { ComponentPublicInstance } from 'vue'

type RevealType = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right'

interface UseScrollRevealOptions {
  type?       : RevealType
  delay?      : number
  threshold?  : number
  rootMargin? : string
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    type       = 'fade-up',
    delay      = 0,
    threshold  = 0.08,
    rootMargin = '0px 0px -24px 0px',
  } = options

  const elements: Element[] = []
  let observer: IntersectionObserver | null = null

  function add(ref: Element | ComponentPublicInstance | null) {
    const el = ref instanceof Element ? ref : ref?.$el
    if (!(el instanceof Element)) return

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
