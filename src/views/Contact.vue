<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
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

const revealChannels = useScrollReveal({ type: 'fade-up', delay: 90 })
const revealForm     = useScrollReveal({ type: 'fade-in' })
const revealFaqs     = useScrollReveal({ type: 'fade-up', delay: 70 })

const submitted = ref(false)
const submitting = ref(false)

function handleSubmit() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
  }, 1200)
}
</script>

<template>
  <main class="min-h-screen bg-[#f8f5ff] text-slate-900 dark:bg-[#0c0c1d] dark:text-white">

<!-- ─── HERO ─────────────────────────────────────────────────────── -->
<section class="relative -mt-20 h-[100vh] max-h-[800px] overflow-hidden">

  <img
    :src="heroImage"
    alt="A happy dog holding a red telephone"
    class="absolute inset-0 h-full w-full object-cover object-center"
  />

  <!-- Soft left overlay only — no full-cover darkness -->
  <div class="absolute inset-0 bg-gradient-to-r from-[#0c0c1d]/80 via-[#0c0c1d]/40 to-transparent" />

  <!-- Very subtle bottom fade — just enough to blend -->
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f8f5ff]/40 to-transparent dark:from-[#0c0c1d]/40 dark:to-transparent" />

  <!-- Content -->
  <div class="absolute left-6 top-1/2 z-10 max-w-lg -translate-y-[55%] lg:left-14 xl:left-20">

    <span class="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm backdrop-blur-sm ring-1 ring-white/20">
      🐾 Pet Parent Support
    </span>

    <h1 class="hero-heading mb-4 text-[2.8rem] font-black leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-[3.6rem]">
      We're here for<br />every little paw.
    </h1>

    <p class="mb-7 max-w-sm text-[15px] leading-7 text-white/80">
      Questions about bookings, grooming, or pet care? Our friendly team is always happy to help.
    </p>

    <div class="mb-7 flex flex-wrap gap-2">
      <span
        v-for="tag in ['🐶 Dog Care', '🐱 Cat Care', '🛁 Grooming', '💜 Pet Support']"
        :key="tag"
        class="rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-white ring-1 ring-white/15 backdrop-blur-sm"
      >
        {{ tag }}
      </span>
    </div>

    <div class="flex flex-wrap gap-3">
      
       <a href="#contact-form"
        class="inline-flex items-center gap-2 rounded-full bg-purple-600 px-7 py-3 text-[13px] font-bold text-white shadow-lg shadow-purple-900/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-xl active:translate-y-0"
      >
        Send a Paw Note 🐾
      </a>
      
      <a   href="#faq"
        class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0"
      >
        View FAQs
      </a>
    </div>
  </div>
</section>
    <!-- ─── END HERO ──────────────────────────────────────────────────── -->


    <!-- ─── CHANNEL CARDS ─────────────────────────────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="mb-8 text-center">
        <p class="text-[11px] font-bold uppercase tracking-[0.25em] text-purple-500 dark:text-purple-400">
          Reach Us Anytime
        </p>
        <h2 class="mt-2 text-[1.6rem] font-extrabold tracking-tight text-slate-900 dark:text-white">
          Multiple ways to get in touch
        </h2>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <article
          :ref="revealChannels.add"
          v-for="channel in data.channels"
          :key="channel.id"
          class="group relative overflow-hidden rounded-2xl border border-purple-100/80 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 hover:shadow-md dark:border-white/[0.08] dark:bg-[#18132e] dark:hover:border-purple-500/40"
        >
          <div class="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-purple-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

          <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-xl shadow-sm dark:bg-purple-900/30">
            {{ getIcon(channel.icon) }}
          </div>

          <h3 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {{ channel.label }}
          </h3>

          <p class="mt-1.5 break-all text-[15px] font-bold text-purple-700 dark:text-purple-300">
            {{ channel.value }}
          </p>

          <p class="mt-2.5 text-[13px] leading-5 text-slate-500 dark:text-slate-400">
            {{ channel.description }}
          </p>
        </article>
      </div>
    </section>


    <!-- ─── CONTACT FORM ──────────────────────────────────────────────── -->
    <section id="contact-form" :ref="revealForm.add" class="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">

      <div class="mb-12 text-center">
        <p class="mb-2.5 text-[11px] font-bold uppercase tracking-[0.25em] text-purple-500 dark:text-purple-400">
          Get in Touch
        </p>
        <h2 class="text-[2rem] font-extrabold tracking-tight text-slate-900 dark:text-white">
          Send us a paw note
        </h2>
        <p class="mx-auto mt-3 max-w-sm text-[14px] leading-6 text-slate-500 dark:text-slate-400">
          Tell us what your pet needs and we'll get back to you with friendly, helpful support.
        </p>
      </div>

      <div :ref="revealForm.add" class="grid gap-6 lg:grid-cols-[1fr_1.8fr]">

        <!-- LEFT PANEL -->
        <div class="flex flex-col gap-4">

          <!-- Location Card -->
          <div class="overflow-hidden rounded-2xl border border-purple-100/80 bg-white shadow-sm dark:border-white/[0.08] dark:bg-[#18132e]">
            <iframe
              title="Map showing Pawmie Pet Care in Colombo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80385596814!2d79.8211607!3d6.9218374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000"
              class="h-44 w-full border-0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
            <div class="p-4">
              <p class="mb-0.5 text-[13px] font-bold text-slate-800 dark:text-white">📍 Pawmie Pet Care</p>
              <p class="text-[12px] leading-5 text-slate-500 dark:text-slate-400">
                123 Paw Street, Colombo 03<br />Western Province, Sri Lanka
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-purple-600 transition hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Get Directions →
              </a>
            </div>
          </div>

          <!-- What we help with -->
          <div class="rounded-2xl border border-purple-100/80 bg-white p-5 shadow-sm dark:border-white/[0.08] dark:bg-[#18132e]">
            <p class="mb-4 text-[10px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">
              What we help with
            </p>
            <ul class="space-y-4">
              <li
                v-for="promise in carePromises"
                :key="promise.title"
                class="flex items-start gap-3"
              >
                <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-sm dark:bg-purple-900/30">
                  {{ promise.icon }}
                </span>
                <div>
                  <p class="text-[13px] font-bold text-slate-800 dark:text-white">{{ promise.title }}</p>
                  <p class="mt-0.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">{{ promise.text }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Office Hours -->
          <div class="rounded-2xl border border-purple-100/80 bg-white p-5 shadow-sm dark:border-white/[0.08] dark:bg-[#18132e]">
            <p class="mb-3 text-[10px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">
              🕒 {{ data.officeHours.title }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="(line, i) in data.officeHours.lines"
                :key="i"
                class="text-[13px] text-slate-600 dark:text-slate-300"
              >
                {{ line }}
              </li>
            </ul>
          </div>
        </div>

        <!-- FORM CARD -->
        <div class="flex h-full flex-col rounded-2xl border border-purple-100 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#1a1530]">

          <!-- SUCCESS STATE -->
          <div
            v-if="submitted"
            class="flex flex-1 flex-col items-center justify-center py-16 text-center"
          >
            <div class="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl dark:bg-purple-900/40">
              🐾
            </div>
            <h3 class="text-[1.3rem] font-extrabold text-slate-900 dark:text-white">
              Paw note sent!
            </h3>
            <p class="mx-auto mt-3 max-w-xs text-[14px] leading-6 text-slate-500 dark:text-slate-400">
              Thanks for reaching out. Our team will get back to you within 24 hours.
            </p>
            <button
              type="button"
              class="mt-7 rounded-xl border border-purple-200 px-6 py-2.5 text-[13px] font-bold text-purple-700 transition hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20"
              @click="submitted = false"
            >
              Send another message
            </button>
          </div>

          <!-- FORM STATE -->
          <template v-else>
            <div class="flex flex-1 flex-col gap-4">

              <div>
                <label for="contact-full-name" class="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">Full Name</label>
                <input
                  id="contact-full-name"
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
                <label for="contact-email" class="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">Email</label>
                <input
                  id="contact-email"
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
                <label for="contact-pet-type" class="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">Pet Type</label>
                <select
                  id="contact-pet-type"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5
                  text-sm text-slate-900 outline-none transition
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50
                  dark:border-white/10 dark:bg-[#0d0d1f] dark:text-white
                  dark:focus:border-purple-500 dark:focus:ring-purple-500/20"
                >
                  <option v-for="pet in petTypes" :key="pet">{{ pet }}</option>
                </select>
              </div>

              <div>
                <label for="contact-help-type" class="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">Help Needed</label>
                <select
                  id="contact-help-type"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5
                  text-sm text-slate-900 outline-none transition
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50
                  dark:border-white/10 dark:bg-[#0d0d1f] dark:text-white
                  dark:focus:border-purple-500 dark:focus:ring-purple-500/20"
                >
                  <option v-for="item in helpTypes" :key="item">{{ item }}</option>
                </select>
              </div>

              <div class="flex flex-1 flex-col">
                <label for="contact-message" class="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us how we can help your little paw friend..."
                  class="w-full flex-1 resize-none rounded-xl border border-slate-200
                  bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition
                  placeholder:text-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50
                  dark:border-white/10 dark:bg-white/5 dark:text-white
                  dark:placeholder:text-slate-500 dark:focus:border-purple-500 dark:focus:ring-purple-500/20"
                />
              </div>
            </div>

            <div class="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-xs text-slate-400 dark:text-slate-500">
                We usually reply within 24 hours 🐾
              </p>
              <button
                type="button"
                :disabled="submitting"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-2.5
                text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:bg-purple-800
                active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                @click="handleSubmit"
              >
                <span v-if="submitting">Sending…</span>
                <span v-else>Send Paw Note 🐾</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </section>


    <!-- ─── FAQ ───────────────────────────────────────────────────────── -->
    <section id="faq" class="border-t border-slate-100 dark:border-white/[0.08]">
      <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">

        <div class="mb-12 text-center">
          <p class="mb-2.5 text-[11px] font-bold uppercase tracking-[0.25em] text-purple-500 dark:text-purple-400">
            Pet Parent Help
          </p>
          <h2 class="text-[2rem] font-extrabold tracking-tight text-slate-900 dark:text-white">
            Questions pet parents often ask
          </h2>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            :ref="revealFaqs.add"
            v-for="item in data.faq"
            :key="item.id"
            class="rounded-2xl border border-l-4 border-purple-100/80 border-l-purple-400
            bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md
            dark:border-white/[0.08] dark:border-l-purple-500 dark:bg-[#18132e] dark:hover:border-purple-500/30"
          >
            <div class="mb-3 text-xl">🐾</div>

            <h3 class="text-[14px] font-bold leading-snug text-slate-900 dark:text-white">
              {{ item.question }}
            </h3>

            <p class="mt-2.5 text-[13px] leading-6 text-slate-500 dark:text-slate-400">
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

.hero-heading {
  font-family: 'Playfair Display', Georgia, serif;
}

input,
textarea,
select {
  font-family: inherit;
}
</style>
