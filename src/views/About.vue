<template>
  <div :class="['pa-root', isDark ? 'dark' : 'light']">

    <!-- ══════════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════════ -->
    <section class="pa-hero">
      <div class="pa-hero-bg">
        <img
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=85"
          alt="Happy dog with owner"
          class="pa-hero-img"
          loading="eager"
        />
        <div class="pa-hero-overlay" />
      </div>

      <div class="pa-hero-content">
        <div class="pa-chip">
          <span class="pa-chip-dot" />
          Our Story
        </div>
        <h1 class="pa-hero-h1">
          Built by pet lovers,<br/>
          <em>for pet lovers.</em>
        </h1>
        <p class="pa-hero-sub">
          Pawmie started with one simple belief — every pet deserves
          stress-free care, and every pet parent deserves complete peace of mind.
        </p>
        <div class="pa-hero-tags">
          <span class="pa-tag">🐶 Dog Care</span>
          <span class="pa-tag">🐱 Cat Care</span>
          <span class="pa-tag">✂️ Grooming</span>
          <span class="pa-tag">🐾 Pet Support</span>
        </div>
      </div>

      <div class="pa-scroll-hint" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         STATS STRIP
    ══════════════════════════════════════════════════════ -->
    <div class="pa-stats-strip">
      <div class="pa-stats-inner">
        <div class="pa-stat" v-for="s in stats" :key="s.label">
          <span class="pa-stat-val">{{ s.val }}</span>
          <span class="pa-stat-lbl">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════
         STORY
    ══════════════════════════════════════════════════════ -->
    <section class="pa-section">
      <div class="pa-section-inner">
        <div class="pa-section-label-row">
          <span class="pa-eyebrow">The Origin</span>
          <h2 class="pa-section-h2">How Pawmie came to life</h2>
          <p class="pa-section-sub">
            It started with Milo — a golden retriever who absolutely hated kennels.
            His owner Maya spent weeks calling sitters, getting ghosted, and leaving
            Milo with a neighbour she barely knew. Maya and co-founder Ravi spent six
            months interviewing pet parents, sitters, and vets before writing a single
            line of code. Today, thousands of pets across 18 cities come home happy
            every week — and Milo finally loves his sitter visits.
          </p>
        </div>

        <div class="pa-story-grid">
          <div class="pa-story-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=700&q=85"
              alt="Pet owner with dog at home"
              class="pa-story-img"
              loading="lazy"
            />
            <div class="pa-story-badge">
              <span class="pa-badge-year">2021</span>
              <span class="pa-badge-lbl">San Francisco</span>
            </div>
          </div>

          <div class="pa-story-cards">
            <div class="pa-info-card" v-for="fact in facts" :key="fact.title">
              <span class="pa-info-icon">{{ fact.icon }}</span>
              <div>
                <h4 class="pa-info-title">{{ fact.title }}</h4>
                <p class="pa-info-body">{{ fact.body }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         PRINCIPLES
    ══════════════════════════════════════════════════════ -->
    <section class="pa-section pa-section--alt">
      <div class="pa-section-inner">
        <div class="pa-section-label-row">
          <span class="pa-eyebrow">Our Principles</span>
          <h2 class="pa-section-h2">What guides every Pawmie screen</h2>
        </div>

        <div class="pa-cards-grid">
          <div class="pa-card" v-for="(p, i) in principles" :key="p.title">
            <div class="pa-card-thumb-wrap">
              <img :src="p.img" :alt="p.title" class="pa-card-thumb" loading="lazy" />
              <span class="pa-card-num">0{{ i + 1 }}</span>
            </div>
            <div class="pa-card-body-wrap">
              <span class="pa-card-icon">{{ p.icon }}</span>
              <h3 class="pa-card-title">{{ p.title }}</h3>
              <p class="pa-card-body">{{ p.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         TEAM — randomuser.me (4 people, real portrait photos)
    ══════════════════════════════════════════════════════ -->
    <section class="pa-section">
      <div class="pa-section-inner">
        <div class="pa-section-label-row">
          <span class="pa-eyebrow">The People</span>
          <h2 class="pa-section-h2">The team behind Pawmie</h2>
          <p class="pa-section-sub">Small team. Big love for animals.</p>
        </div>

        <div v-if="usersLoading" class="pa-team-grid">
          <div class="pa-member" v-for="n in 4" :key="n" style="pointer-events:none;">
            <div class="sk" style="height:260px;border-radius:18px 18px 0 0;" />
            <div style="padding:16px 18px 20px;display:flex;flex-direction:column;gap:8px;">
              <div class="sk sk-line" style="width:60%;height:14px;" />
              <div class="sk sk-line" style="width:40%;height:11px;" />
            </div>
          </div>
        </div>

        <p v-else-if="usersError" class="pa-error">{{ usersError }}</p>

        <div v-else class="pa-team-grid">
          <div class="pa-member" v-for="u in users" :key="u.login.uuid">
            <div class="pa-member-img-wrap">
              <img
                :src="u.picture.large"
                :alt="`${u.name.first} ${u.name.last}`"
                class="pa-member-img"
                loading="lazy"
              />
              <div class="pa-member-overlay">
                <p>{{ u.location.city }}, {{ u.location.country }}</p>
              </div>
            </div>
            <div class="pa-member-body">
              <h3 class="pa-member-name">{{ u.name.first }} {{ u.name.last }}</h3>
              <span class="pa-member-role">{{ u.jobTitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         FAQ
    ══════════════════════════════════════════════════════ -->
    <section class="pa-section pa-section--alt">
      <div class="pa-section-inner">
        <div class="pa-section-label-row">
          <span class="pa-eyebrow">Common Questions</span>
          <h2 class="pa-section-h2">Things pet parents often ask</h2>
        </div>
        <div class="pa-faq-grid">
          <div class="pa-faq" v-for="faq in faqs" :key="faq.q">
            <span class="pa-faq-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.4"/>
                <path d="M10 6v5M10 13.5v.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
            </span>
            <div>
              <h4 class="pa-faq-q">{{ faq.q }}</h4>
              <p class="pa-faq-a">{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ── Dark mode: watches the class the Navbar toggles on <html> ──
const isDark = ref(document.documentElement.classList.contains('dark'))
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
onMounted(() => observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] }))
onBeforeUnmount(() => observer.disconnect())

// ── Static data ───────────────────────────────────────────
const stats = [
  { val: '12,400+', label: 'Happy pets served' },
  { val: '340+',    label: 'Trusted sitters' },
  { val: '18',      label: 'Cities & growing' },
  { val: '4.9★',    label: 'Average rating' },
]

const facts = [
  {
    icon: '🐾',
    title: 'Pet-first, always',
    body: 'Every decision we make starts with one question: is this good for the animals?',
  },
  {
    icon: '🔍',
    title: 'Rigorous vetting',
    body: 'Background checks, reference calls, and a trial visit before any sitter meets your pet.',
  },
  {
    icon: '📍',
    title: 'Real-time visibility',
    body: "Live GPS check-ins and photo updates so you're never in the dark.",
  },
]

const principles = [
  {
    icon: '🛡️',
    title: 'Trust above everything',
    body: 'Every sitter passes background checks, reference calls, and a supervised trial visit before they ever meet your pet.',
    img: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&q=80',
  },
  {
    icon: '📸',
    title: 'Radical transparency',
    body: "Real-time photo updates and GPS check-ins keep you in the loop — wherever you are, whatever you're doing.",
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
  },
  {
    icon: '⚡',
    title: 'Effortless booking',
    body: "Every screen is designed to feel calm and clear — even when you're booking at 11 pm in a mild panic.",
    img: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80',
  },
  {
    icon: '💛',
    title: 'Genuine animal care',
    body: 'We only work with sitters who treat pets exactly as their own. Because yours deserves nothing less.',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
  },
]

const faqs = [
  {
    q: 'How do I ask about my pet care booking?',
    a: 'Our team can help with booking details, appointment changes, and service information anytime.',
  },
  {
    q: 'Can I contact Pawmie about grooming?',
    a: 'Absolutely. You can ask about grooming packages, available time slots, and the best care option for your pet.',
  },
  {
    q: 'Can I ask general pet care questions?',
    a: 'Yes. You can contact us for friendly guidance about pet care services, visits, and support.',
  },
]

// ── randomuser.me: 4 real portrait photos ────────────────
const users = ref<any[]>([])
const usersLoading = ref(true)
const usersError = ref<string | null>(null)

const jobTitles = [
  'Co-founder & CEO',
  'Head of Veterinary Partnerships',
  'Lead Product Designer',
  'Head of Sitter Operations',
]

onMounted(async () => {
  try {
    const res = await fetch(
      'https://randomuser.me/api/?results=4&inc=name,picture,location,login&nat=us,gb,au,ca'
    )
    if (!res.ok) throw new Error(`${res.status}`)
    const d = await res.json()
    users.value = d.results.map((u: any, i: number) => ({
      ...u,
      jobTitle: jobTitles[i],
    }))
  } catch {
    usersError.value = 'Could not load team members. Please try again later.'
  } finally {
    usersLoading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600&display=swap');

/* ══════════════════════════════════════════════════════════
   TOKENS — LIGHT
   Canvas: warm cream (unchanged — About is a "calm" page).
   Every green token replaced with brand purple.
   Purple appears at accent moments only: eyebrows, badges,
   role labels, hover borders, FAQ icons, stats strip bg.
   The cream canvas stays quiet — purple is the thread, not the wall.
══════════════════════════════════════════════════════════ */
.pa-root.light {
  --bg:           #F7F4EE;
  --bg-alt:       #EEEADE;
  --surface:      #FFFFFF;

  --border:       rgba(109, 40, 217, 0.08);
  --border-mid:   rgba(109, 40, 217, 0.20);

  /* Ink: near-black with subtle purple undertone */
  --ink:          #1C1826;
  --ink-2:        #52496B;
  --ink-3:        #9B93B5;

  /* Brand purple — the only accent colour on this page */
  --accent:       #7C3AED;
  --accent-2:     #A78BFA;
  --accent-btn:   #7C3AED;
  --accent-glow:  rgba(124, 58, 237, 0.14);

  /* Amber kept for hero chip dot only — organic warmth */
  --warm:         #C47C3A;

  /* Hero overlay: deep purple-black */
  --hero-overlay: linear-gradient(100deg,rgba(14,8,30,0.86) 0%,rgba(14,8,30,0.44) 58%,transparent 100%);

  /* Stats strip: deep purple — structural brand anchor */
  --stat-bg:      #2D1B69;
  --stat-ink:     #EDE9FE;
  --stat-lbl:     rgba(237,233,254,0.55);
  --stat-div:     rgba(237,233,254,0.12);

  --skel-a:       rgba(109, 40, 217, 0.05);
  --skel-b:       rgba(109, 40, 217, 0.12);

  --card-shadow:  0 12px 40px rgba(124,58,237,0.09), 0 2px 8px rgba(0,0,0,0.05);
}

/* ══════════════════════════════════════════════════════════
   TOKENS — DARK
   Deep purple-black canvas. Same purple accent logic.
══════════════════════════════════════════════════════════ */
.pa-root.dark {
  --bg:           #0D0B14;
  --bg-alt:       #120F1E;
  --surface:      #1A1628;

  --border:       rgba(167,139,250,0.10);
  --border-mid:   rgba(167,139,250,0.26);

  --ink:          #EDE9FE;
  --ink-2:        #A78BFA;
  --ink-3:        #6D5FA8;

  --accent:       #A78BFA;
  --accent-2:     #C4B5FD;
  --accent-btn:   #7C3AED;
  --accent-glow:  rgba(167,139,250,0.20);

  --warm:         #D4924E;

  --hero-overlay: linear-gradient(100deg,rgba(4,2,12,0.93) 0%,rgba(4,2,12,0.54) 58%,transparent 100%);

  --stat-bg:      #120F1E;
  --stat-ink:     #EDE9FE;
  --stat-lbl:     rgba(237,233,254,0.45);
  --stat-div:     rgba(237,233,254,0.08);

  --skel-a:       rgba(167,139,250,0.07);
  --skel-b:       rgba(167,139,250,0.15);

  --card-shadow:  0 12px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.30);
}

/* ══════════════════════════════════════════════════════════
   BASE
══════════════════════════════════════════════════════════ */
.pa-root {
  background: var(--bg);
  color: var(--ink);
  font-family: 'Outfit', system-ui, sans-serif;
  min-height: 100vh;
  transition: background 0.35s ease, color 0.35s ease;
}

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
.pa-hero {
  position: relative;
  height: 88vh; min-height: 520px; max-height: 760px;
  display: flex; align-items: center; overflow: hidden;
}
.pa-hero-bg { position: absolute; inset: 0; }
.pa-hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; }
.pa-hero-overlay { position: absolute; inset: 0; background: var(--hero-overlay); }

.pa-hero-content { position: relative; z-index: 2; padding: 0 80px; max-width: 640px; }

.pa-chip {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: 40px; padding: 8px 16px;
  font-size: 11.5px; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: #fff; margin-bottom: 22px;
}

/* Chip dot: soft purple — first brand moment in the hero */
.pa-chip-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #C4B5FD;
  flex-shrink: 0;
  animation: blink 2.2s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.35;} }

.pa-hero-h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(36px, 5vw, 66px);
  font-weight: 700; line-height: 1.07;
  letter-spacing: -0.02em; color: #fff; margin: 0 0 20px;
}
/* em: soft purple — was green */
.pa-hero-h1 em { font-style: italic; color: #C4B5FD; }

.pa-hero-sub { font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.78); line-height: 1.8; margin: 0 0 34px; }

.pa-hero-tags { display: flex; flex-wrap: wrap; gap: 10px; }
.pa-tag {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.20);
  border-radius: 40px; padding: 8px 18px;
  font-size: 13px; font-weight: 500; color: #fff; white-space: nowrap;
}

.pa-scroll-hint {
  position: absolute; bottom: 26px; left: 50%;
  transform: translateX(-50%); z-index: 3;
  color: rgba(255,255,255,0.48);
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%,100%{ transform: translateX(-50%) translateY(0); }
  50%    { transform: translateX(-50%) translateY(6px); }
}

/* ══════════════════════════════════════════════════════════
   STATS STRIP — deep purple surface
══════════════════════════════════════════════════════════ */
.pa-stats-strip { background: var(--stat-bg); border-bottom: 1px solid var(--border); transition: background 0.35s ease; }
.pa-stats-inner { max-width: 1100px; margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: repeat(4, 1fr); }
.pa-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 30px 20px; border-right: 1px solid var(--stat-div); }
.pa-stat:last-child { border-right: none; }
.pa-stat-val { font-family: 'Fraunces', Georgia, serif; font-size: 28px; font-weight: 700; font-style: italic; color: var(--stat-ink); line-height: 1; }
.pa-stat-lbl { font-size: 11px; font-weight: 400; letter-spacing: 0.10em; text-transform: uppercase; color: var(--stat-lbl); }

/* ══════════════════════════════════════════════════════════
   SECTIONS
══════════════════════════════════════════════════════════ */
.pa-section { padding: 80px 0; background: var(--bg); transition: background 0.35s ease; }
.pa-section--alt { background: var(--bg-alt); }
.pa-section-inner { max-width: 1100px; margin: 0 auto; padding: 0 40px; }
.pa-section-label-row { text-align: center; margin-bottom: 52px; }

/* Eyebrow: purple accent */
.pa-eyebrow { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; }
.pa-section-h2 { font-family: 'Fraunces', Georgia, serif; font-size: clamp(24px, 3vw, 40px); font-weight: 700; line-height: 1.12; letter-spacing: -0.015em; color: var(--ink); margin: 0 0 14px; }
.pa-section-sub { font-size: 15px; font-weight: 300; color: var(--ink-2); line-height: 1.85; max-width: 640px; margin: 0 auto; }

/* ══════════════════════════════════════════════════════════
   STORY
══════════════════════════════════════════════════════════ */
.pa-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
.pa-story-img-wrap { position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 4/5; box-shadow: 0 0 0 1px var(--border), 0 20px 60px rgba(0,0,0,0.10); }
.pa-story-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.8s cubic-bezier(0.22,0.61,0.36,1); }
.pa-story-img-wrap:hover .pa-story-img { transform: scale(1.04); }

/* Story badge: purple */
.pa-story-badge { position: absolute; bottom: 20px; right: 20px; background: var(--accent-btn); border-radius: 14px; padding: 18px 24px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 8px 32px var(--accent-glow); }
.pa-badge-year { font-family: 'Fraunces', Georgia, serif; font-size: 32px; font-style: italic; font-weight: 700; color: #fff; line-height: 1; }
.pa-badge-lbl { font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.65); }

.pa-story-cards { display: flex; flex-direction: column; gap: 14px; padding-top: 8px; }
.pa-info-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px 20px; display: flex; align-items: flex-start; gap: 16px; transition: border-color .22s, box-shadow .22s, transform .22s; }
.pa-info-card:hover { border-color: var(--border-mid); box-shadow: var(--card-shadow); transform: translateY(-2px); }
.pa-info-icon { font-size: 24px; line-height: 1; flex-shrink: 0; margin-top: 2px; }
.pa-info-title { font-size: 15px; font-weight: 600; color: var(--ink); margin: 0 0 6px; line-height: 1.25; }
.pa-info-body  { font-size: 13.5px; font-weight: 300; color: var(--ink-2); margin: 0; line-height: 1.75; }

/* ══════════════════════════════════════════════════════════
   PRINCIPLES CARDS
══════════════════════════════════════════════════════════ */
.pa-cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.pa-card { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; transition: border-color .25s, box-shadow .25s, transform .25s; cursor: default; }
.pa-card:hover { border-color: var(--accent-2); box-shadow: var(--card-shadow); transform: translateY(-4px); }

.pa-card-thumb-wrap { position: relative; height: 160px; overflow: hidden; background: var(--bg-alt); }
.pa-card-thumb { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.7s cubic-bezier(0.22,0.61,0.36,1); }
.pa-card:hover .pa-card-thumb { transform: scale(1.06); }

/* Number chip: purple */
.pa-card-num { position: absolute; top: 12px; left: 12px; background: var(--accent-btn); color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; padding: 4px 10px; border-radius: 20px; }

.pa-card-body-wrap { padding: 16px 18px 22px; }
.pa-card-icon { font-size: 22px; line-height: 1; display: block; margin-bottom: 10px; }
.pa-card-title { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 600; font-style: italic; color: var(--ink); margin: 0 0 8px; line-height: 1.3; }
.pa-card-body  { font-size: 13px; font-weight: 300; color: var(--ink-2); margin: 0; line-height: 1.78; }

/* ══════════════════════════════════════════════════════════
   TEAM — 8 members, 4-col grid, wraps to 2 rows
══════════════════════════════════════════════════════════ */
.pa-team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }

.pa-member { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; transition: border-color .28s, box-shadow .28s, transform .28s; }
.pa-member:hover { border-color: var(--accent-2); box-shadow: var(--card-shadow); transform: translateY(-6px); }

.pa-member-img-wrap { position: relative; height: 260px; overflow: hidden; }
.pa-member-img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; filter: saturate(0.85); transition: transform .7s cubic-bezier(0.22,0.61,0.36,1), filter .4s; }
.pa-member:hover .pa-member-img { transform: scale(1.07); filter: saturate(1); }

/* Overlay: purple-black gradient instead of green-black */
.pa-member-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(18,8,40,0.92) 0%, transparent 52%); display: flex; align-items: flex-end; padding: 18px; opacity: 0; transition: opacity .3s; }
.pa-member:hover .pa-member-overlay { opacity: 1; }
/* Overlay text: purple-tinted white */
.pa-member-overlay p { font-size: 12px; font-weight: 300; color: rgba(220,210,255,0.90); line-height: 1.6; margin: 0; }

.pa-member-body { padding: 16px 18px 20px; display: flex; flex-direction: column; gap: 5px; }
.pa-member-name { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-style: italic; font-weight: 600; color: var(--ink); margin: 0; line-height: 1.2; }
/* Role: purple accent */
.pa-member-role { font-size: 10.5px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); }

/* ══════════════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════════════ */
.pa-faq-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.pa-faq { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px 22px; display: flex; align-items: flex-start; gap: 16px; transition: border-color .22s, box-shadow .22s, transform .22s; }
.pa-faq:hover { border-color: var(--accent-2); box-shadow: var(--card-shadow); transform: translateY(-3px); }
/* FAQ icon: purple */
.pa-faq-icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
.pa-faq-q { font-size: 14px; font-weight: 600; color: var(--ink); margin: 0 0 8px; line-height: 1.35; }
.pa-faq-a { font-size: 13px; font-weight: 300; color: var(--ink-2); margin: 0; line-height: 1.75; }

/* ══════════════════════════════════════════════════════════
   SKELETONS
══════════════════════════════════════════════════════════ */
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}
.sk { background: linear-gradient(90deg, var(--skel-a) 25%, var(--skel-b) 50%, var(--skel-a) 75%); background-size: 1200px 100%; animation: shimmer 1.6s linear infinite; border-radius: 6px; display: block; }
.sk-line { height: 12px; }
.pa-error { color: #e05050; font-size: 14px; padding: 16px 0; }

/* ══════════════════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .pa-cards-grid { grid-template-columns: repeat(2, 1fr); }
  .pa-team-grid  { grid-template-columns: repeat(2, 1fr); }
  .pa-faq-grid   { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .pa-hero-content { padding: 0 32px; }
  .pa-story-grid   { grid-template-columns: 1fr; }
  .pa-stats-inner  { grid-template-columns: repeat(2, 1fr); }
  .pa-stat { border-right: none; border-bottom: 1px solid var(--stat-div); }
  .pa-stat:nth-child(odd)       { border-right: 1px solid var(--stat-div); }
  .pa-stat:nth-last-child(-n+2) { border-bottom: none; }
}
@media (max-width: 580px) {
  .pa-section-inner { padding: 0 20px; }
  .pa-hero-content  { padding: 0 24px; }
  .pa-cards-grid    { grid-template-columns: 1fr; }
  .pa-team-grid     { grid-template-columns: 1fr; }
  .pa-faq-grid      { grid-template-columns: 1fr; }
}
</style>