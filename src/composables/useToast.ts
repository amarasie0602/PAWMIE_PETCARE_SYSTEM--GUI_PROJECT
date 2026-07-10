// src/composables/useToast.ts

import { ref } from 'vue'

export type ToastVariant = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  message: string
  variant: ToastVariant
}

const TOAST_DURATION_MS = 3000

let nextId = 1
const toasts = ref<Toast[]>([])

function dismiss(id: number) {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

function show(message: string, variant: ToastVariant = 'info') {
  const id = nextId++
  toasts.value.push({ id, message, variant })
  setTimeout(() => dismiss(id), TOAST_DURATION_MS)
}

export function useToast() {
  return {
    toasts,
    show,
    success: (message: string) => show(message, 'success'),
    error: (message: string) => show(message, 'error'),
    dismiss,
  }
}
