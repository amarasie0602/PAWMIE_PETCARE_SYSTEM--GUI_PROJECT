<script setup lang="ts">
import contactContent from '@/stores/contactContent.json'
import heroImage from '@/assets/contact-hero-dog-phone.png'

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
    title: 'Friendly Support',
    text: 'Helpful guidance for pet parents with care, bookings, and service questions.',
  },
  {
    icon: '🛁',
    title: 'Grooming Assistance',
    text: 'Ask about grooming options, bath care, service details, and available slots.',
  },
  {
    icon: '🐾',
    title: 'Pet Care Guidance',
    text: 'Get support for pet care services, appointments, and general enquiries.',
  },
]
</script>

<template>
  <main class="min-h-screen bg-[#f9f6ff] text-slate-900 dark:bg-[#0d0d1f] dark:text-white">

    <!-- HERO SECTION -->
    <section class="relative h-[88vh] overflow-hidden">

      <!-- Hero Image -->
      <img
        :src="heroImage"
        alt="A happy dog holding a red telephone"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />

      <!-- Light overlay for better text readability -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-white/55 via-white/20 to-transparent dark:from-[#0d0d1f]/70 dark:via-[#0d0d1f]/25 dark:to-transparent"
      />

      <!-- Bottom fade -->
      <div
        class="pointer-events-none absolute bottom-0 inset-x-0 h-28
        bg-gradient-to-t from-[#f9f6ff] to-transparent
        dark:from-[#0d0d1f] dark:to-transparent"
      />

      <!-- Hero Content -->
      <div
        class="absolute left-6 top-[42%] z-10 max-w-xl -translate-y-1/2 lg:left-14 xl:left-16"
      >
        <!-- Badge -->
        <div
          class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2
          text-xs font-bold uppercase tracking-wider text-purple-700 shadow-sm backdrop-blur-sm"
        >
          🐾 Pet Parent Support
        </div>

        <!-- Heading -->
        <h1
          class="mb-4 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
          style="font-family: 'Playfair Display', Georgia, serif; text-shadow: 0 2px 8px rgba(255,255,255,0.6);"
        >
          We are here for every little paw.
        </h1>

        <!-- Subtitle -->
        <p
          class="mb-6 max-w-md text-sm font-medium leading-7 text-slate-700 sm:text-base"
          style="text-shadow: 0 1px 4px rgba(255,255,255,0.75);"
        >Have questions about bookings, grooming, or pet care? Our friendly team is happy to help!
        </p>

        <!-- Service Pills -->
        <div class="mb-6 flex max-w-md flex-wrap gap-2">
          <span
            v-for="tag in ['🐶 Dog Care', '🐱 Cat Care', '🛁 Grooming', '💜 Pet Support']"
            :key="tag"
            class="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold
            text-purple-700 shadow-sm backdrop-blur-sm"
          >
            {{ tag }}
          </span>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-3">
          <a
            href="#contact-form"
            class="inline-flex items-center gap-2 rounded-full bg-purple-700 px-7 py-3
            text-sm font-bold text-white shadow-lg transition hover:-translate-y-px hover:bg-purple-800"
          >
            Send a Paw Note 🐾
          </a>

          <a
            href="#faq"
            class="inline-flex items-center gap-2 rounded-full border border-purple-300/70
            bg-white/90 px-7 py-3 text-sm font-bold text-purple-700 shadow-sm
            backdrop-blur-sm transition hover:-translate-y-px hover:bg-white"
          >
            View FAQs
          </a>
        </div>
      </div>
    </section>
    <!-- END HERO SECTION -->


    <!-- CONTACT CHANNEL CARDS -->
    <section class="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      <div class="grid gap-4 sm:grid-cols-3">
        <article
          v-for="channel in data.channels"
          :key="channel.id"
          class="group rounded-2xl border border-purple-100 bg-white p-6 text-center
          shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-md
          dark:border-white/10 dark:bg-[#1a1530] dark:hover:border-purple-500/30"
        >
          <div
            class="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full
            bg-purple-100 text-xl dark:bg-purple-900/40"
          >
            {{ getIcon(channel.icon) }}
          </div>

          <h3 class="text-sm font-bold text-slate-900 dark:text-white">
            {{ channel.label }}
          </h3>

          <p class="mt-1.5 break-all text-sm font-semibold text-purple-600 dark:text-purple-300">
            {{ channel.value }}
          </p>

          <p class="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {{ channel.description }}
          </p>
        </article>
      </div>
    </section>


    <!-- CONTACT FORM -->
    <section id="contact-form" class="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
      <div class="mb-10 text-center">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-purple-500 dark:text-purple-400">
          Get in Touch
        </p>

        <h2 class="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
          Send us a paw note
        </h2>

        <p class="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Tell us what your pet needs. Our team will get back to you with friendly support.
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1fr_1.7fr]">

        <!-- LEFT INFO PANEL -->
        <div class="flex flex-col gap-4">

          <!-- Image Thumbnail -->
          <div class="overflow-hidden rounded-2xl shadow-sm">
            <img
              :src="heroImage"
              alt="Pawmie pet care support"
              class="h-52 w-full object-cover object-center"
            />
          </div>

          <!-- Care Promises -->
          <div
            class="rounded-2xl border border-purple-100 bg-white p-5
            dark:border-white/10 dark:bg-[#1a1530]"
          >
            <p class="mb-4 text-[10px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">
              What we help with
            </p>

            <ul class="space-y-3.5">
              <li
                v-for="promise in carePromises"
                :key="promise.title"
                class="flex items-start gap-3"
              >
                <span class="mt-0.5 text-base leading-none">
                  {{ promise.icon }}
                </span>

                <div>
                  <p class="text-sm font-bold text-slate-800 dark:text-white">
                    {{ promise.title }}
                  </p>

                  <p class="text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {{ promise.text }}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Office Hours -->
          <div
            class="rounded-2xl border border-purple-100 bg-white p-5
            dark:border-white/10 dark:bg-[#1a1530]"
          >
            <p class="mb-3 text-[10px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">
              🕒 {{ data.officeHours.title }}
            </p>

            <ul class="space-y-1.5">
              <li
                v-for="(line, i) in data.officeHours.lines"
                :key="i"
                class="text-sm text-slate-600 dark:text-slate-300"
              >
                {{ line }}
              </li>
            </ul>
          </div>
        </div>

        <!-- FORM CARD -->
        <div
          class="rounded-2xl border border-purple-100 bg-white p-7 shadow-sm
          dark:border-white/10 dark:bg-[#1a1530]"
        >
          <div class="grid gap-5 sm:grid-cols-2">

            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5
                text-sm text-slate-900 outline-none transition placeholder:text-slate-400
                focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50
                dark:border-white/10 dark:bg-white/5 dark:text-white
                dark:placeholder:text-slate-500 dark:focus:border-purple-500 dark:focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5
                text-sm text-slate-900 outline-none transition placeholder:text-slate-400
                focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50
                dark:border-white/10 dark:bg-white/5 dark:text-white
                dark:placeholder:text-slate-500 dark:focus:border-purple-500 dark:focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                Pet Type
              </label>

              <select
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5
                text-sm text-slate-900 outline-none transition
                focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50
                dark:border-white/10 dark:bg-[#0d0d1f] dark:text-white
                dark:focus:border-purple-500 dark:focus:ring-purple-500/20"
              >
                <option v-for="pet in petTypes" :key="pet">
                  {{ pet }}
                </option>
              </select>
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
                Help Needed
              </label>

              <select
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5
                text-sm text-slate-900 outline-none transition
                focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50
                dark:border-white/10 dark:bg-[#0d0d1f] dark:text-white
                dark:focus:border-purple-500 dark:focus:ring-purple-500/20"
              >
                <option v-for="item in helpTypes" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>

          <div class="mt-5">
            <label class="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">
              Message
            </label>

            <textarea
              placeholder="Tell us how we can help your little paw friend..."
              class="min-h-[140px] w-full resize-none rounded-xl border border-slate-200
              bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition
              placeholder:text-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50
              dark:border-white/10 dark:bg-white/5 dark:text-white
              dark:placeholder:text-slate-500 dark:focus:border-purple-500 dark:focus:ring-purple-500/20"
            />
          </div>

          <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-xs text-slate-400 dark:text-slate-500">
              We usually reply within 24 hours 🐾
            </p>

            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-2.5
              text-sm font-bold text-white transition hover:-translate-y-px hover:bg-purple-800 active:translate-y-0"
            >
              Send Paw Note 🐾
            </button>
          </div>
        </div>
      </div>
    </section>


    <!-- FAQ SECTION -->
    <section id="faq" class="border-t border-slate-100 dark:border-white/10">
      <div class="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div class="mb-10 text-center">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-purple-500 dark:text-purple-400">
            Pet Parent Help
          </p>

          <h2 class="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            Questions pet parents often ask
          </h2>
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <article
            v-for="item in data.faq"
            :key="item.id"
            class="rounded-2xl border border-purple-100 bg-white p-6 transition
            hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#1a1530]"
          >
            <div
              class="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full
              bg-purple-100 text-sm dark:bg-purple-900/40"
            >
              🐾
            </div>

            <h3 class="text-sm font-bold leading-5 text-slate-900 dark:text-white">
              {{ item.question }}
            </h3>

            <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {{ item.answer }}
            </p>
          </article>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');

input,
textarea,
select {
  font-family: inherit;
}
</style>