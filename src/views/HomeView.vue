<template>
  <div class="container mb-5">
    <div class="row">
      <card-list-view :books="books"></card-list-view>
    </div>
  </div>
</template>

<script setup>
import CardListView from '../components/CardListView.vue'
const props = defineProps(['books'])
import { reactive } from 'vue'
const books = reactive(props.books)
</script>
