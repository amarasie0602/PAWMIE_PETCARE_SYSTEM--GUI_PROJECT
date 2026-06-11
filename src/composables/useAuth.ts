// src/composables/useAuth.ts

// ── Strict TypeScript interfaces for DummyJSON auth responses ──

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface AuthErrorResponse {
  message: string
}

export interface LoginCredentials {
  username: string
  password: string
}

// ── Composable ──

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const AUTH_KEY   = 'isAuthenticated'
const TOKEN_KEY  = 'accessToken'
const USER_KEY   = 'authUser'

export function useAuth() {
  const router = useRouter()
  const loading = ref(false)
  const errorMessage = ref('')

  const login = async (credentials: LoginCredentials): Promise<void> => {
    loading.value = true
    errorMessage.value = ''

    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          expiresInMins: 60,
        }),
      })

      const data: AuthUser | AuthErrorResponse = await res.json()

      if (!res.ok) {
        // DummyJSON returns { message: '...' } on failure
        errorMessage.value = (data as AuthErrorResponse).message ?? 'Login failed.'
        return
      }

      const user = data as AuthUser

      // Store JWT + user info
      localStorage.setItem(AUTH_KEY,      'true')
      localStorage.setItem(TOKEN_KEY,     user.accessToken)
      localStorage.setItem(USER_KEY,      JSON.stringify(user))
      localStorage.setItem('userEmail',   user.email)

      router.push('/')

    } catch {
      errorMessage.value = 'Network error. Please try again.'
    } finally {
      loading.value = false
    }
  }

  const logout = (): void => {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  const getUser = (): AuthUser | null => {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try { return JSON.parse(raw) as AuthUser } catch { return null }
  }

  const isAuthenticated = (): boolean =>
    localStorage.getItem(AUTH_KEY) === 'true'

  return { login, logout, getUser, isAuthenticated, loading, errorMessage }
}