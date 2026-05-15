<template>
  <main class="about-page">
    <section class="ab-hero">
      <span class="ab-badge">Our Story</span>

      <h1>
        Built by pet lovers,<br />
        for pet lovers
      </h1>

      <p>
        Pawmie started with a simple idea: every pet deserves stress-free care —
        and every pet parent deserves total peace of mind.
      </p>

      <img
        class="ab-hero-img"
        src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80"
        alt="Happy dog with owner"
      />
    </section>

    <section class="ab-stats">
      <div class="ab-stat">
        <div class="ab-stat-val">12,400+</div>
        <div class="ab-stat-lbl">Happy pets</div>
      </div>

      <div class="ab-stat">
        <div class="ab-stat-val">340+</div>
        <div class="ab-stat-lbl">Trusted sitters</div>
      </div>

      <div class="ab-stat">
        <div class="ab-stat-val">18</div>
        <div class="ab-stat-lbl">Cities & growing</div>
      </div>
    </section>

    <hr class="ab-divider" />

    <section class="ab-story">
      <img
        class="ab-story-img"
        src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80"
        alt="Person with dog"
      />

      <div class="ab-story-text">
        <h2>How Pawmie came to life</h2>

        <p>
          It started with Milo — a golden retriever who absolutely hated kennels.
          His owner Maya spent weeks calling sitters, getting ghosted, and
          leaving Milo with a neighbour she barely knew.
        </p>

        <p>
          Maya and co-founder Ravi spent six months interviewing pet parents,
          sitters, and vets before writing a single line of code.
        </p>

        <p>
          Today, thousands of pets across 18 cities come home happy every week —
          and Milo finally loves his sitter visits.
        </p>
      </div>
    </section>

    <hr class="ab-divider" />

    <section>
      <h2 class="ab-values-title">What guides every Pawmie screen</h2>

      <div class="ab-values">
        <div class="ab-value">
          <div class="ab-value-icon">🐾</div>
          <h3>Trust above everything</h3>
          <p>
            Every sitter is vetted with background checks, reference calls, and
            a trial visit.
          </p>
        </div>

        <div class="ab-value">
          <div class="ab-value-icon">📸</div>
          <h3>Radical transparency</h3>
          <p>
            Real-time photo updates and GPS check-ins so you're never out of the
            loop.
          </p>
        </div>

        <div class="ab-value">
          <div class="ab-value-icon">✨</div>
          <h3>Effortless booking</h3>
          <p>
            Every screen is designed to feel fast, calm, and clear — even at
            11 pm.
          </p>
        </div>

        <div class="ab-value">
          <div class="ab-value-icon">💛</div>
          <h3>Genuine animal care</h3>
          <p>
            We partner only with sitters who treat pets like their own.
          </p>
        </div>
      </div>
    </section>

    <hr class="ab-divider" />

    <section>
      <h2 class="ab-team-title">The team behind Pawmie</h2>
      <p class="ab-team-sub">Small team, big love for animals.</p>

      <div class="ab-team">
        <div class="ab-member">
          <img
            class="ab-member-img"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fit=crop&crop=face"
            alt="Maya Chen"
          />

          <div class="ab-member-body">
            <h3 class="ab-member-name">Maya Chen</h3>
            <p class="ab-member-role">Co-founder & CEO</p>
            <p class="ab-member-bio">
              Former product lead, dog mum to Milo. Drives Pawmie's vision and
              obsesses over the owner experience.
            </p>
          </div>
        </div>

        <div class="ab-member">
          <img
            class="ab-member-img"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face"
            alt="Ravi Menon"
          />

          <div class="ab-member-body">
            <h3 class="ab-member-name">Ravi Menon</h3>
            <p class="ab-member-role">Co-founder & CTO</p>
            <p class="ab-member-bio">
              Full-stack engineer. Architected Pawmie's real-time updates.
              Cat dad ×2, coffee snob ×1.
            </p>
          </div>
        </div>

        <div class="ab-member">
          <img
            class="ab-member-img"
            src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80&fit=crop&crop=face"
            alt="Priya Osei"
          />

          <div class="ab-member-body">
            <h3 class="ab-member-name">Priya Osei</h3>
            <p class="ab-member-role">Head of Community</p>
            <p class="ab-member-bio">
              Vet background, community ops expert. The reason our sitter
              network is rated 4.9 ★.
            </p>
          </div>
        </div>

        <div class="ab-member">
          <img
            class="ab-member-img"
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80&fit=crop&crop=face"
            alt="Leon Park"
          />

          <div class="ab-member-body">
            <h3 class="ab-member-name">Leon Park</h3>
            <p class="ab-member-role">Lead Designer</p>
            <p class="ab-member-bio">
              Crafts every Pawmie screen. Believes great design is 10%
              aesthetics, 90% empathy.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700;900&family=DM+Sans:wght@400;500;600&display=swap');

.about-page {
  font-family: 'DM Sans', sans-serif;
  color: var(--color-text-primary);
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 70px;
}

.ab-hero {
  text-align: center;
  padding: 36px 0 28px;
}

.ab-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: #e1f5ee;
  color: #0f6e56;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.ab-hero h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 900;
  line-height: 1.05;
  margin: 0 0 16px;
  color: var(--color-text-primary);
}

.ab-hero p {
  font-size: 16px;
  color: var(--color-text-secondary);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

.ab-hero-img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 24px;
  margin-top: 28px;
  display: block;
}

.ab-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin: 32px 0;
}

.ab-stat {
  background: var(--color-background-secondary);
  border-radius: 18px;
  padding: 24px 14px;
  text-align: center;
  border: 1px solid var(--color-border-tertiary);
}

.ab-stat-val {
  font-family: 'Fraunces', serif;
  font-size: 34px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.ab-stat-lbl {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 6px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
}

.ab-divider {
  border: none;
  border-top: 1px solid var(--color-border-tertiary);
  margin: 40px 0;
}

.ab-story {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: stretch;
}

.ab-story-img {
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
  border-radius: 22px;
  display: block;
}

.ab-story-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ab-story-text h2,
.ab-values-title,
.ab-team-title {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.ab-story-text h2 {
  margin: 0 0 16px;
}

.ab-story-text p {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin: 0 0 12px;
}

.ab-values-title {
  margin: 0 0 22px;
}

.ab-values {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.ab-value {
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-tertiary);
  border-radius: 20px;
  padding: 22px;
}

.ab-value-icon {
  font-size: 26px;
  margin-bottom: 10px;
}

.ab-value h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--color-text-primary);
}

.ab-value p {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.7;
}

.ab-team-title {
  text-align: center;
  margin: 0 0 8px;
}

.ab-team-sub {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0 0 24px;
}

.ab-team {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.ab-member {
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-tertiary);
  border-radius: 22px;
  overflow: hidden;
}

.ab-member-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  object-position: top;
  display: block;
}

.ab-member-body {
  padding: 16px;
}

.ab-member-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 3px;
  color: var(--color-text-primary);
}

.ab-member-role {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #0f6e56;
  margin: 0 0 10px;
}

.ab-member-bio {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 900px) {
  .ab-team {
    grid-template-columns: repeat(2, 1fr);
  }

  .ab-story {
    grid-template-columns: 1fr;
  }

  .ab-story-img {
    min-height: 260px;
  }
}

@media (max-width: 640px) {
  .about-page {
    padding: 28px 16px 56px;
  }

  .ab-hero-img {
    height: 240px;
    border-radius: 20px;
  }

  .ab-stats {
    grid-template-columns: 1fr;
  }

  .ab-values {
    grid-template-columns: 1fr;
  }

  .ab-team {
    grid-template-columns: 1fr;
  }
}
</style>