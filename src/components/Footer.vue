<script setup lang="ts">
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail
} from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-[#0f1b2d] text-gray-300">
    <div class="max-w-7xl mx-auto px-6 py-16">

      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">

        <!-- Brand -->
        <div>
          <h2 class="text-xl font-bold text-white mb-4">Pawmie</h2>

          <p class="text-sm leading-relaxed text-gray-400">
            Your one-stop destination for complete pet care
            from vet booking and grooming to training and marketplace services.
          </p>

          <div class="flex gap-4 mt-6">
            <a class="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center hover:bg-indigo-500 transition">
              <Facebook class="w-5 h-5 text-white" />
            </a>
            <a class="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center hover:bg-indigo-500 transition">
              <Twitter class="w-5 h-5 text-white" />
            </a>
            <a class="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center hover:bg-indigo-500 transition">
              <Instagram class="w-5 h-5 text-white" />
            </a>
            <a class="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center hover:bg-indigo-500 transition">
              <Youtube class="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-3 text-sm">
            <li class="hover:text-white transition cursor-pointer">Services</li>
            <li class="hover:text-white transition cursor-pointer">Marketplace</li>
            <li class="hover:text-white transition cursor-pointer">Training</li>
            <li class="hover:text-white transition cursor-pointer">Reviews</li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-white font-semibold mb-4">Our Services</h3>
          <ul class="space-y-3 text-sm">
            <li class="hover:text-white transition cursor-pointer">Vet Appointment</li>
            <li class="hover:text-white transition cursor-pointer">Grooming Booking</li>
            <li class="hover:text-white transition cursor-pointer">Emergency Care</li>
            <li class="hover:text-white transition cursor-pointer">Pet Marketplace</li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-semibold mb-4">Contact Us</h3>
          <div class="space-y-4 text-sm">
            <div class="flex gap-3 items-start">
              <MapPin class="w-5 h-5 text-orange-400 shrink-0" />
              <span>123 Paw Street, Paw City, PC 12345</span>
            </div>
            <div class="flex gap-3 items-center">
              <Phone class="w-5 h-5 text-orange-400 shrink-0" />
              <span>(555) 123-4567</span>
            </div>
            <div class="flex gap-3 items-center">
              <Mail class="w-5 h-5 text-orange-400 shrink-0" />
              <span>hello@pawmie.com</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom -->
      <div class="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {{ new Date().getFullYear() }} Pawmie. All rights reserved.</p>
        <div class="flex gap-6 mt-4 md:mt-0">
          <span class="hover:text-white transition cursor-pointer">Privacy Policy</span>
          <span class="hover:text-white transition cursor-pointer">Terms of Service</span>
          <span class="hover:text-white transition cursor-pointer">Cookie Policy</span>
        </div>
      </div>

    </div>
  </footer>
</template>