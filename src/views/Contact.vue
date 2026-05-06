<script setup lang="ts">
import contactContent from '@/stores/contactContent.json'
import contactHeroImage from '@/assets/images/contact-hero-dog-phone.png'

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
  if (icon === 'map') return '📍'
  return '🐾'
}

const petTypes = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Other']

const helpTypes = [
  'Booking Help',
  'Grooming Service',
  'Pet Care Support',
  'Clinic Visit',
  'General Question',
]
</script>

<template>
  <main
    class="min-h-screen bg-[#fbf7ff] text-slate-950 dark:bg-[#0f1024] dark:text-white"
  >
    <div class="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <!-- Hero image banner -->
      <section class="mb-14">
        <h1 class="sr-only">
          {{ data.hero.title }}
        </h1>

        <div
          class="relative overflow-hidden rounded-[34px] border border-purple-100 bg-white
          shadow-[0_26px_70px_rgba(88,28,135,0.16)]
          dark:border-white/10 dark:bg-slate-900 dark:shadow-[0_26px_70px_rgba(0,0,0,0.45)]"
        >
          <img
            :src="contactHeroImage"
            alt="Friendly pet care contact support with dog using phone"
            class="h-[280px] w-full object-cover object-center sm:h-[360px] lg:h-[430px]"
          />

          <div
            class="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-widest
            text-purple-700 shadow-sm backdrop-blur dark:bg-slate-950/70 dark:text-purple-200"
          >
            {{ data.hero.badge }}
          </div>
        </div>
      </section>

      <!-- Contact cards -->
      <section class="relative z-10 mb-16">
        <div class="grid gap-5 md:grid-cols-3">
          <article
            v-for="channel in data.channels"
            :key="channel.id"
            class="rounded-[26px] border border-purple-100 bg-white p-6 text-center
            shadow-[0_16px_45px_rgba(88,28,135,0.08)]
            transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(88,28,135,0.13)]
            dark:border-white/10 dark:bg-slate-900"
          >
            <div
              class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl
              bg-purple-100 text-2xl text-purple-700 dark:bg-purple-900/50 dark:text-purple-200"
            >
              {{ getIcon(channel.icon) }}
            </div>

            <h2 class="text-base font-black text-slate-950 dark:text-white">
              {{ channel.label }}
            </h2>

            <p class="mt-2 break-words font-mono text-sm font-bold text-purple-700 dark:text-purple-300">
              {{ channel.value }}
            </p>

            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {{ channel.description }}
            </p>
          </article>
        </div>
      </section>

      <!-- Form and info section -->
      <section class="grid gap-10 lg:grid-cols-[1.15fr,0.85fr]">
        <!-- Contact form -->
        <div>
          <div class="mb-7 text-center lg:text-left">
            <p class="text-sm font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
              Need help?
            </p>

            <h2 class="mt-2 text-3xl font-black text-slate-950 sm:text-4xl dark:text-white">
              Send us a paw note
            </h2>

            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Tell us what your pet needs. Our friendly care team will help with bookings,
              grooming, clinic visits, or general pet care support.
            </p>
          </div>

          <form
            class="rounded-[32px] border border-purple-100 bg-white p-6
            shadow-[0_24px_70px_rgba(88,28,135,0.10)]
            sm:p-8 dark:border-white/10 dark:bg-slate-900"
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
              class="mt-5 inline-flex items-center justify-center rounded-full bg-purple-700 px-8 py-3
              text-sm font-black text-white shadow-lg shadow-purple-300/50 transition duration-300
              hover:-translate-y-0.5 hover:bg-purple-800 hover:shadow-xl dark:bg-purple-400 dark:text-purple-950 dark:shadow-none"
            >
              Send Paw Note
            </button>
          </form>
        </div>

        <!-- Side info -->
        <aside class="space-y-5">
          <div
            class="rounded-[30px] border border-purple-100 bg-white p-6
            shadow-[0_18px_50px_rgba(88,28,135,0.08)]
            dark:border-white/10 dark:bg-slate-900"
          >
            <div
              class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl
              bg-purple-100 text-2xl dark:bg-purple-900/50"
            >
              🕒
            </div>

            <h2 class="text-xl font-black text-slate-950 dark:text-white">
              {{ data.officeHours.title }}
            </h2>

            <ul class="mt-4 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <li v-for="(line, index) in data.officeHours.lines" :key="index">
                {{ line }}
              </li>
            </ul>
          </div>

          <div
            class="rounded-[30px] bg-gradient-to-br from-purple-700 to-fuchsia-600 p-6 text-white
            shadow-[0_22px_60px_rgba(126,34,206,0.24)]
            dark:from-purple-900 dark:to-fuchsia-900"
          >
            <p class="text-sm font-black uppercase tracking-[0.18em] text-purple-100">
              Pawmie Promise
            </p>

            <h3 class="mt-3 text-2xl font-black">
              Gentle support for every pet parent.
            </h3>

            <p class="mt-3 text-sm leading-7 text-purple-50">
              We keep our contact experience simple, friendly, and helpful so pet parents
              can quickly get the support they need.
            </p>
          </div>
        </aside>
      </section>

      <!-- FAQ -->
      <section class="pt-16">
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
            class="rounded-[26px] border border-purple-100 bg-white p-6 shadow-sm
            transition duration-300 hover:-translate-y-1 hover:shadow-lg
            dark:border-white/10 dark:bg-slate-900"
          >
            <h3 class="text-sm font-black text-slate-950 dark:text-white">
              {{ item.question }}
            </h3>

            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {{ item.answer }}
            </p>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
input,
textarea,
select {
  font-family: inherit;
}
</style>