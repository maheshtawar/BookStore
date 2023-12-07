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
        <span class="fs-4">Book Store</span>
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
            <router-link to="/" class="nav-link active"> Home </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">
              Cart <span class="badge bg-secondary">{{ cartStore.totalItems }}</span>
            </router-link>
          </li>
        </ul>
        <form
          class="d-flex me-2"
          role="search"
          @submit.prevent="router.push(`/book/?q=${searchQuery}`)"
        >
          <input
            v-model="searchQuery"
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <router-link to="/login" class="btn btn-outline-success me-2">Login</router-link>
        <router-link to="/signup" class="btn btn-outline-success me-2">Signup</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const searchQuery = ref('')

import { useCartStore } from '../stores/counter.js'
const cartStore = useCartStore()
</script>
