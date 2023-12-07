<template>
  <div>
    <div v-if="books.value != undefined">
      <div v-if="books.value.length > 0">
        <h4 class="ms-3 mt-3">Search Result for "{{ route.query.q }}"</h4>
        <card-list-view :books="books"></card-list-view>
      </div>
      <div v-else class="ms-3 mt-3">No books found with the search term: {{ route.query.q }}</div>
    </div>
  </div>
</template>

<script setup>
import CardListView from '../components/CardListView.vue'
import { onMounted, reactive, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
const route = useRoute()

const books = reactive([])

const fetchData = async () => {
  const { data } = await axios.get(`/books?q=${route.query.q}`)
  books.value = data
  //   console.log(books.value.length, data, route)
}

onMounted(fetchData)

watch(() => route.query.q, fetchData)
</script>
