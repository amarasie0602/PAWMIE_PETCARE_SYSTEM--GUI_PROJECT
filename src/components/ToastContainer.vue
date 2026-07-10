<script setup lang="ts">
import { useToast, type ToastVariant } from '@/composables/useToast'

const { toasts, dismiss } = useToast()

const variantClass: Record<ToastVariant, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-900/30 dark:text-emerald-300',
  error: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/20 dark:bg-rose-900/30 dark:text-rose-300',
  info: 'border-slate-200 bg-white text-slate-800 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200',
}

const variantIcon: Record<ToastVariant, string> = {
  success: '✅',
  error: '⚠️',
  info: 'ℹ️',
}
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-24 z-[100] flex flex-col items-center gap-2 px-4">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg backdrop-blur-sm',
          variantClass[toast.variant],
        ]"
      >
        <span>{{ variantIcon[toast.variant] }}</span>
        <p class="leading-5">{{ toast.message }}</p>
        <button
          type="button"
          class="ml-1 shrink-0 text-xs opacity-60 transition hover:opacity-100"
          aria-label="Dismiss notification"
          @click="dismiss(toast.id)"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
