<script setup lang="ts">
</script>

<template>
  <main class="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
    <p class="text-6xl">🐾</p>
    <h1 class="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
      Page not found
    </h1>
    <p class="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
      We couldn't sniff out the page you're looking for. It may have moved or never existed.
    </p>
    <router-link
      to="/"
      class="mt-7 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
    >
      Back to Home
    </router-link>
  </main>
</template>
