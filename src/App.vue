<template>
  <header>
    <div class="wrapper">
      <nav-bar></nav-bar>
    </div>
  </header>

  <RouterView :books="books" />
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { reactive, onMounted } from 'vue'
import axios from 'axios'

const books = reactive([])

onMounted(async () => {
  const { data } = await axios.get('/books')
  books.value = data
})
</script>
