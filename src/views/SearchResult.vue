<template>
  <div>
    <h4 class="ms-3 mt-3">Search Result for "{{ route.query.q }}"</h4>
    <card-list-view :books="books"></card-list-view>
  </div>
</template>

<script setup>
import CardListView from '../components/CardListView.vue'
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
const route = useRoute()

const books = reactive([])

onMounted(async () => {
  const { data } = await axios.get(`/books?q=${route.query.q}`)
  books.value = data
  //   console.log(books.value.length, data, route)
})
</script>
