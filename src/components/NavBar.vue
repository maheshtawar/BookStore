<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="text-decoration-none me-5">
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/cute-clipart/64/book.png"
          alt="book"
        />
        <span class="fs-4">{{ $t('Book Store') }}</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active"> {{ $t('Home') }} </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">
              {{ $t('Cart') }} <span class="badge bg-secondary">{{ cartStore.totalItems }}</span>
            </router-link>
          </li>
        </ul>
        <form
          class="d-flex me-2"
          role="search"
          @submit.prevent="$router.push(`/book?q=${searchQuery}`)"
        >
          <input
            v-model="searchQuery"
            class="form-control me-2"
            type="search"
            :placeholder="$t('Search')"
            aria-label="Search"
            required
          />
          <button class="btn btn-outline-success" type="submit">{{ $t('Search') }}</button>
        </form>
        <dropdown
          v-model="lang"
          :options="langs"
          optionLabel="Language"
          placeholder="Change Language"
          @change="changeLanguage(lang)"
          class="me-2"
        ></dropdown>
        <span v-if="!authStore.token">
          <router-link to="/login" class="btn btn-outline-success me-2">Login</router-link>
        </span>
        <span v-else>
          <button @click="logout" class="btn btn-outline-success me-2">Logout</button>
        </span>
        <!-- <router-link to="/signup" class="btn btn-outline-success me-2">Signup</router-link> -->
      </div>
    </div>
  </nav>
</template>

<script>
import dropdown from 'primevue/dropdown'
import { useCartStore } from '../stores/counter.js'
import { auth } from '../stores/counter.js'
import { loadLanguageAsync } from '@/setup/i18n.js'
export default {
  data() {
    return {
      searchQuery: '',
      cartStore: useCartStore(),
      authStore: auth(),
      langs: [
        {
          Language: 'Hindi',
          lang: 'hi'
        },
        {
          Language: 'Marathi',
          lang: 'mr'
        },
        {
          Language: 'English',
          lang: 'en'
        }
      ],
      lang: { Language: 'English', lang: 'en' }
    }
  },
  methods: {
    logout() {
      this.authStore.token = false
    },
    changeLanguage(lang) {
      // console.log(lang)
      if (Object.keys(lang).length > 0 && lang !== undefined) {
        this.$i18n.locale = lang.lang
        this.$i18n.fallbackLocale = lang.lang
        loadLanguageAsync(lang.lang)
        console.log(lang.lang)
      }
    }
  },
  components: {
    dropdown
  },
  mounted() {
    this.$i18n.locale = this.lang.lang
    this.$i18n.fallbackLocale = this.lang.lang
    loadLanguageAsync(this.lang.lang)
  }
}
</script>

<!-- <script setup>
import dropdown from 'primevue/dropdown'
import { RouterLink, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
const router = useRouter()
const searchQuery = ref('')

import { useCartStore } from '../stores/counter.js'
const cartStore = useCartStore()

import { auth } from '../stores/counter.js'
const authStore = auth()

const logout = () => {
  authStore.token = false
}

const langs = reactive([
  {
    Language: 'Hindi',
    lang: 'hi'
  },
  {
    Language: 'Marathi',
    lang: 'mr'
  },
  {
    Language: 'English',
    lang: 'en'
  }
])
import { loadLanguageAsync } from '@/setup/i18n.js'
function changeLanguage(lang) {
  console.log(lang)
  if (Object.keys(lang).length > 0 && lang !== undefined) {
    this.$i18n.locale = lang.lang
    this.$i18n.fallbackLocale = lang.lang
    loadLanguageAsync(lang.lang)
    console.log(lang.lang)
  }
}

</script> -->
