<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Navbar />
  <div class="pt-20">
    <router-view />
  </div>
  <Footer />
</template>

<style>
/* Prevent the html/body from showing white in dark mode between pages */
html, body {
  background-color: #f8fafc; /* slate-50 — matches light page backgrounds */
}
html.dark, html.dark body {
  background-color: #020617; /* slate-950 — matches dark page backgrounds */
}
</style>