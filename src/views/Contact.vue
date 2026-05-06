<script setup lang="ts">
import contactContent from '@/stores/contactContent.json'

interface ContactChannel {
  id: string
  label: string
  value: string
  description: string
  icon: 'mail' | 'phone' | 'map' | string
}

interface ContactOfficeHours {
  title: string
  lines: string[]
}

interface ContactFaq {
  id: string
  question: string
  answer: string
}

interface ContactData {
  hero: {
    title: string
    subtitle: string
    badge: string
  }
  channels: ContactChannel[]
  officeHours: ContactOfficeHours
  faq: ContactFaq[]
}

const data = contactContent as ContactData

const getIcon = (icon: string) => {
  if (icon === 'mail') return '💌'
  if (icon === 'phone') return '☎️'
  if (icon === 'map') return '🏡'
  return '🐾'
}

const petTypes = ['🐶 Dog', '🐱 Cat', '🐰 Rabbit', '🐦 Bird', '🐾 Other']

const helpTypes = [
  'Booking Help',
  'Grooming Service',
  'Pet Care Support',
  'Clinic Visit',
  'General Question',
]

const carePromises = [
  {
    icon: '💜',
    title: 'Loving Care',
    text: 'Soft and friendly support for every pet parent.',
  },
  {
    icon: '🛁',
    title: 'Grooming Help',
    text: 'Ask about grooming, bath care, and available slots.',
  },
  {
    icon: '🐾',
    title: 'Paw Guidance',
    text: 'Get help with bookings, visits, and pet care services.',
  },
]
</script>

<template>
  <main class="min-h-screen bg-[#fbf7ff] text-slate-950 dark:bg-[#0f1024] dark:text-white">
    <!-- Hero banner -->
    <section
      class="relative overflow-hidden pt-24 pb-24
      bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.85),transparent_18%),radial-gradient(circle_at_85%_25%,rgba(216,180,254,0.45),transparent_24%),linear-gradient(135deg,#f5e8ff,#fdf4ff_48%,#eef2ff)]
      dark:bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.07),transparent_18%),radial-gradient(circle_at_85%_25%,rgba(168,85,247,0.18),transparent_24%),linear-gradient(135deg,#19142f,#111827_52%,#1e1b4b)]"
    >
      <!-- cute background decorations -->
      <div class="pointer-events-none absolute left-8 top-32 text-6xl opacity-10">🐾</div>
      <div class="pointer-events-none absolute right-10 top-40 text-7xl opacity-10">🐾</div>
      <div class="pointer-events-none absolute bottom-8 left-1/3 hidden text-6xl opacity-10 md:block">
        ✨
      </div>

      <div class="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr,0.9fr] lg:px-8">
        <!-- Hero text -->
        <div class="text-center lg:text-left">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/75 px-5 py-2
            text-xs font-extrabold uppercase tracking-widest text-purple-700 shadow-sm backdrop-blur
            dark:border-purple-300/20 dark:bg-white/10 dark:text-purple-200"
          >
            🐾 {{ data.hero.badge }}
          </span>

          <h1
            class="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-950
            sm:text-5xl lg:text-6xl dark:text-white"
          >
            {{ data.hero.title }}
          </h1>

          <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base lg:mx-0 dark:text-slate-300">
            {{ data.hero.subtitle }}
          </p>

          <div class="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <span class="rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-purple-700 shadow-sm dark:bg-white/10 dark:text-purple-100">
              🐶 Dog Care
            </span>
            <span class="rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-purple-700 shadow-sm dark:bg-white/10 dark:text-purple-100">
              🐱 Cat Care
            </span>
            <span class="rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-purple-700 shadow-sm dark:bg-white/10 dark:text-purple-100">
              🛁 Grooming
            </span>
            <span class="rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-purple-700 shadow-sm dark:bg-white/10 dark:text-purple-100">
              💜 Pet Support
            </span>
          </div>
        </div>

        <!-- Cute purple pet visual -->
        <div class="relative mx-auto w-full max-w-md">
          <div
            class="relative rounded-[42px] border border-white/80 bg-white/60 p-7 shadow-[0_30px_80px_rgba(88,28,135,0.16)]
            backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07] dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          >
            <div class="absolute -left-5 top-8 h-16 w-16 rounded-full bg-purple-300/40 blur-xl"></div>
            <div class="absolute -right-4 bottom-12 h-20 w-20 rounded-full bg-fuchsia-300/40 blur-xl"></div>

            <div class="relative flex items-end justify-center gap-3">
              <div
                class="flex h-28 w-24 items-center justify-center rounded-[2rem] bg-purple-100 text-6xl shadow-sm
                dark:bg-purple-900/30"
              >
                🐱
              </div>
              <div
                class="flex h-40 w-32 items-center justify-center rounded-[2.5rem] bg-white text-7xl shadow-lg
                dark:bg-slate-900/80"
              >
                🐶
              </div>
              <div
                class="flex h-28 w-24 items-center justify-center rounded-[2rem] bg-fuchsia-100 text-6xl shadow-sm
                dark:bg-fuchsia-900/30"
              >
                🐰
              </div>
            </div>

            <div class="mt-6 rounded-3xl bg-purple-950 px-5 py-4 text-center text-white dark:bg-purple-300 dark:text-purple-950">
              <p class="text-sm font-black">Happy pets. Loved paws.</p>
              <p class="mt-1 text-xs opacity-80">Pawmie care team is ready to help.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact cards overlap -->
    <section class="relative z-20 mx-auto -mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-5 md:grid-cols-3">
        <article
          v-for="channel in data.channels"
          :key="channel.id"
          class="rounded-[28px] border border-purple-100 bg-white p-6 text-center shadow-[0_18px_50px_rgba(88,28,135,0.10)]
          transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(88,28,135,0.16)]
          dark:border-white/10 dark:bg-slate-900 dark:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
        >
          <div
            class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full
            bg-gradient-to-br from-purple-500 to-fuchsia-400 text-2xl text-white shadow-md"
          >
            {{ getIcon(channel.icon) }}
          </div>

          <h3 class="text-base font-black text-slate-950 dark:text-white">
            {{ channel.label }}
          </h3>

          <p class="mt-2 break-words font-mono text-sm font-bold text-purple-700 dark:text-purple-300">
            {{ channel.value }}
          </p>

          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {{ channel.description }}
          </p>
        </article>
      </div>
    </section>

    <!-- Main contact form section -->
    <section class="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr,1.1fr] lg:px-8">
      <!-- Left friendly card -->
      <div class="flex items-center">
        <div
          class="w-full overflow-hidden rounded-[36px] border border-purple-100 bg-white shadow-[0_24px_70px_rgba(88,28,135,0.10)]
          dark:border-white/10 dark:bg-slate-900 dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
        >
          <div
            class="relative min-h-[340px] bg-[linear-gradient(135deg,#f3e8ff,#fdf4ff_50%,#e0e7ff)]
            dark:bg-[linear-gradient(135deg,#312e81,#111827_50%,#581c87)]"
          >
            <div class="absolute left-8 top-8 rounded-full bg-white/75 px-4 py-2 text-xs font-black text-purple-700 shadow-sm dark:bg-white/10 dark:text-purple-100">
              Pawmie Cozy Care
            </div>

            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-8xl">🐶</div>
                <div class="mt-4 text-5xl">💜 🐾 💜</div>
              </div>
            </div>

            <div class="absolute bottom-7 left-7 right-7 rounded-3xl bg-white/80 p-5 shadow-lg backdrop-blur dark:bg-slate-950/60">
              <h3 class="text-lg font-black text-slate-950 dark:text-white">
                Gentle help for your little paw friend
              </h3>
              <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Contact us for bookings, grooming questions, pet care services, or visit information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div>
        <div class="mb-7 text-center lg:text-left">
          <p class="text-sm font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
            Need Help?
          </p>
          <h2 class="mt-2 text-3xl font-black text-slate-950 sm:text-4xl dark:text-white">
            Send us a paw note
          </h2>
          <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Tell us what your pet needs. Our friendly team will guide you with care, bookings, or grooming support.
          </p>
        </div>

        <form
          class="rounded-[34px] border border-purple-100 bg-white p-6 shadow-[0_24px_70px_rgba(88,28,135,0.10)]
          sm:p-8 dark:border-white/10 dark:bg-slate-900 dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
        >
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-2 block text-xs font-black text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                class="w-full rounded-full border border-purple-100 bg-purple-50/70 px-4 py-3 text-sm text-slate-900
                outline-none transition placeholder:text-slate-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-200/60
                dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:focus:ring-purple-400/20"
              />
            </div>

            <div>
              <label class="mb-2 block text-xs font-black text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                class="w-full rounded-full border border-purple-100 bg-purple-50/70 px-4 py-3 text-sm text-slate-900
                outline-none transition placeholder:text-slate-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-200/60
                dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:focus:ring-purple-400/20"
              />
            </div>

            <div>
              <label class="mb-2 block text-xs font-black text-slate-700 dark:text-slate-300">
                Pet Type
              </label>
              <select
                class="w-full rounded-full border border-purple-100 bg-purple-50/70 px-4 py-3 text-sm text-slate-900
                outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-200/60
                dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:focus:ring-purple-400/20"
              >
                <option v-for="pet in petTypes" :key="pet">
                  {{ pet }}
                </option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-xs font-black text-slate-700 dark:text-slate-300">
                Help Needed
              </label>
              <select
                class="w-full rounded-full border border-purple-100 bg-purple-50/70 px-4 py-3 text-sm text-slate-900
                outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-200/60
                dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:focus:ring-purple-400/20"
              >
                <option v-for="item in helpTypes" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>

          <div class="mt-4">
            <label class="mb-2 block text-xs font-black text-slate-700 dark:text-slate-300">
              Message
            </label>
            <textarea
              placeholder="Tell us how we can help your little paw friend..."
              class="min-h-[150px] w-full resize-none rounded-[26px] border border-purple-100 bg-purple-50/70 px-4 py-4
              text-sm text-slate-900 outline-none transition placeholder:text-slate-400
              focus:border-purple-300 focus:ring-4 focus:ring-purple-200/60
              dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:focus:ring-purple-400/20"
            />
          </div>

          <button
            type="button"
            class="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-8 py-3
            text-sm font-black text-white shadow-lg shadow-purple-300/50 transition duration-300
            hover:-translate-y-0.5 hover:shadow-xl dark:shadow-none"
          >
            Send Paw Note 🐾
          </button>
        </form>
      </div>
    </section>

    <!-- Purple care strip -->
    <section class="relative overflow-hidden bg-gradient-to-r from-purple-700 via-violet-600 to-fuchsia-600 py-16 text-white dark:from-purple-950 dark:via-indigo-950 dark:to-fuchsia-950">
      <div class="absolute -top-10 left-0 h-20 w-full rounded-b-[50%] bg-[#fbf7ff] dark:bg-[#0f1024]"></div>
      <div class="pointer-events-none absolute left-8 bottom-8 text-7xl opacity-10">🐕</div>
      <div class="pointer-events-none absolute right-10 top-10 text-7xl opacity-10">🐾</div>

      <div class="relative z-10 mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <article
          v-for="promise in carePromises"
          :key="promise.title"
          class="rounded-[28px] bg-white/15 p-6 text-center backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
        >
          <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl">
            {{ promise.icon }}
          </div>
          <h3 class="text-lg font-black">
            {{ promise.title }}
          </h3>
          <p class="mt-2 text-sm leading-6 text-white/85">
            {{ promise.text }}
          </p>
        </article>
      </div>

      <div class="relative z-10 mx-auto mt-10 max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div class="rounded-[28px] bg-white p-6 text-slate-950 shadow-xl dark:bg-slate-950 dark:text-white">
          <h3 class="text-xl font-black">
            🕒 {{ data.officeHours.title }}
          </h3>
          <ul class="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li v-for="(line, index) in data.officeHours.lines" :key="index">
              {{ line }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mb-8 text-center">
        <p class="text-sm font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
          Pet Parent Help
        </p>
        <h2 class="mt-2 text-3xl font-black text-slate-950 dark:text-white">
          Questions pet parents often ask
        </h2>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
        <article
          v-for="item in data.faq"
          :key="item.id"
          class="rounded-[28px] border border-purple-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg
          dark:border-white/10 dark:bg-slate-900"
        >
          <h3 class="text-sm font-black text-slate-950 dark:text-white">
            🐾 {{ item.question }}
          </h3>

          <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {{ item.answer }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
input,
textarea,
select {
  font-family: inherit;
}
</style>