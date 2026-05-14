<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import AuthPanel from '@/components/AuthComponents/AuthPanel.vue'
import AuthField from '@/components/AuthComponents/AuthField.vue'
import AuthDivider from '@/components/AuthComponents/AuthDivider.vue'
import AuthGoogleBtn from '@/components/AuthComponents/AuthGoogleBtn.vue'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handleSignup = () => {
  errorMessage.value = ''
  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }
  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters.'
    return
  }
  loading.value = true
  setTimeout(() => {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userEmail', email.value)
    router.push('/')
  }, 600)
}

const handleGoogleSignup = () => {
  loading.value = true
  setTimeout(() => {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userEmail', 'google-user@pawmie.com')
    router.push('/')
  }, 600)
}
</script>

<template>
  <div class="auth-root -mt-20 pt-20">

    <AuthPanel
      title="Pawmie"
      subtitle="Join thousands of pet parents<br />who trust Pawmie every day."
    />

    <div class="auth-form-side">
      <div class="auth-card">

        <div class="card-head">
          <h2 class="card-title">Create account ✨</h2>
          <p class="card-sub">It's free and takes less than a minute</p>
        </div>

        <form @submit.prevent="handleSignup" class="auth-form">

          <AuthField
            v-model="name"
            label="Full Name"
            type="text"
            placeholder="Your name"
            autocomplete="name"
            animation-delay="0.15s"
          />

          <AuthField
            v-model="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            animation-delay="0.22s"
          />

          <AuthField
            v-model="password"
            label="Password"
            type="password"
            placeholder="Min. 6 characters"
            autocomplete="new-password"
            animation-delay="0.29s"
          />

          <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

          <button type="submit" class="btn-primary" :class="{ loading }">
            <span v-if="!loading">Create Account</span>
            <span v-else class="spinner" />
          </button>

          <AuthDivider />
          <AuthGoogleBtn label="Continue with Google" @click="handleGoogleSignup" />

          <p class="switch-link">
            Already have an account?
            <router-link to="/login">Sign in</router-link>
          </p>

        </form>
      </div>
    </div>

  </div>
</template>

<style>
.auth-root {
  --bg:             #fdf4f8;
  --bg2:            #fff9fc;
  --accent:         #f472b6;
  --accent-d:       #db2777;
  --teal:           #5eaaa8;
  --ink:            #2d1b2e;
  --muted:          #a07888;
  --border:         #f9d0e8;
  --shadow:         rgba(244, 114, 182, 0.18);
  --panel-gradient: linear-gradient(145deg, #a78bfa 0%, #f472b6 60%, #fb923c 100%);
  --error-bg:       #fff1f2;
  --error-border:   #fecdd3;
  --error-color:    #f43f5e;
}

html.dark .auth-root {
  --bg:             #0d1220;
  --bg2:            #141b2e;
  --accent:         #f472b6;
  --accent-d:       #fb85c4;
  --teal:           #67c6c0;
  --ink:            #eef2ff;
  --muted:          #94a3c4;
  --border:         #1e2d4a;
  --shadow:         rgba(244, 114, 182, 0.12);
  --panel-gradient: linear-gradient(145deg, #2a1a5e 0%, #4a1060 40%, #1a3a6b 100%);
  --error-bg:       #1a0d1f;
  --error-border:   #5b2333;
  --error-color:    #fb7185;
}
</style>

<style scoped>
.auth-root {
  min-height: 100vh;
  display: flex;
  background: var(--bg);
  font-family: 'Nunito', sans-serif;
  color: var(--ink);
  transition: background 0.3s, color 0.3s;
}

.auth-form-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  animation: fadeUp 0.6s ease both;
}

.card-head {
  margin-bottom: 1.75rem;
  animation: fadeUp 0.6s ease 0.1s both;
}

.card-title {
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--ink);
  margin: 0 0 0.3rem;
  transition: color 0.3s;
}

.card-sub {
  font-size: 0.9rem;
  color: var(--muted);
  font-weight: 600;
  transition: color 0.3s;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error-msg {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--error-color);
  background: var(--error-bg);
  border-radius: 10px;
  padding: 0.5rem 0.85rem;
  border: 1.5px solid var(--error-border);
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}

.btn-primary {
  width: 100%;
  padding: 0.85rem;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #a78bfa 0%, var(--accent) 100%);
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
  box-shadow: 0 4px 18px var(--shadow);
  animation: fadeUp 0.5s ease 0.35s both;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
}
.btn-primary:hover:not(.loading) {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px var(--shadow);
}
.btn-primary:active:not(.loading) { transform: scale(0.98); }
.btn-primary.loading { opacity: 0.75; cursor: not-allowed; }

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.switch-link {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--muted);
  animation: fadeUp 0.5s ease 0.5s both;
  transition: color 0.3s;
}
.switch-link a {
  color: var(--accent);
  font-weight: 800;
  text-decoration: none;
  margin-left: 0.25rem;
}
.switch-link a:hover { color: var(--accent-d); text-decoration: underline; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>