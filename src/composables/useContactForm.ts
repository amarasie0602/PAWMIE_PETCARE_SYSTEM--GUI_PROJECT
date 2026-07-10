// src/composables/useContactForm.ts

import { ref } from 'vue'
import { useToast } from '@/composables/useToast'

export interface ContactFormOptions {
  petTypes: string[]
  helpTypes: string[]
}

export function useContactForm({ petTypes, helpTypes }: ContactFormOptions) {
  const toast = useToast()
  const submitted = ref(false)
  const submitting = ref(false)
  const submitError = ref('')

  const fullName = ref('')
  const email = ref('')
  const petType = ref(petTypes[0])
  const helpType = ref(helpTypes[0])
  const message = ref('')

  function handleSubmit() {
    if (!fullName.value.trim() || !email.value.trim() || !message.value.trim()) {
      submitError.value = 'Please fill in your name, email, and message.'
      return
    }
    submitError.value = ''
    submitting.value = true
    setTimeout(() => {
      submitting.value = false
      submitted.value = true
      fullName.value = ''
      email.value = ''
      petType.value = petTypes[0]
      helpType.value = helpTypes[0]
      message.value = ''
    }, 1200)
  }

  return {
    submitted,
    submitting,
    submitError,
    fullName,
    email,
    petType,
    helpType,
    message,
    handleSubmit,
  }
}
