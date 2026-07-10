import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Booking from '@/views/Booking.vue'
import MyBookings from '@/views/MyBookings.vue'
import Marketplace from '@/views/Marketplace.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Cart from '@/views/Cart.vue'
import Orders from '@/views/Orders.vue'
import VetAppointment from '@/views/services/VetAppointment.vue'
import EmergencyCare from '@/views/services/EmergencyCare.vue'
import GroomingBooking from '@/views/services/GroomingBooking.vue'
import TrainingServices from '@/views/services/TrainingServices.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import AdminMarketplace from '@/views/AdminMarketplace.vue'
import Profile from '@/views/Profile.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/booking', name: 'Booking', component: Booking, meta: { requiresAuth: true } },
  { path: '/my-bookings', name: 'MyBookings', component: MyBookings, meta: { requiresAuth: true } },
  { path: '/marketplace', name: 'Marketplace', component: Marketplace, meta: { requiresAuth: true } },
  { path: '/marketplace/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/marketplace/orders', name: 'Orders', component: Orders, meta: { requiresAuth: true } },
  { path: '/marketplace/:id', name: 'ProductDetail', component: ProductDetail, meta: { requiresAuth: true } },
  { path: '/admin/marketplace', name: 'AdminMarketplace', component: AdminMarketplace, meta: { requiresAuth: true } },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/services/vet-appointment', name: 'VetAppointment', component: VetAppointment, meta: { requiresAuth: true } },
  { path: '/services/emergency-care', name: 'EmergencyCare', component: EmergencyCare, meta: { requiresAuth: true } },
  { path: '/services/grooming-booking', name: 'GroomingBooking', component: GroomingBooking, meta: { requiresAuth: true } },
  { path: '/services/training-services', name: 'TrainingServices', component: TrainingServices, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta?.requiresAuth)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (requiresAuth && !isAuthenticated) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router