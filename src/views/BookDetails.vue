<template>
  <div v-for="book in books.value"
  :key="book.id">
    <!-- {{ books.value }} -->
    <!-- <card-view :books="books"></card-view> -->

    <div
      class="card mt-5 container p-2"
    >
      <div class="row g-0">
        <div class="col-md-3">
          <img :src="'/src/data/images/'+book.image" class="img-fluid rounded-start" alt="..."  style="height: 60vh;" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h1 class="card-title">{{ book.title }}</h1>
            <p class="card-text">
              <div class="mb-3">
                <h5> Description : </h5>
                <div> {{ book.description }} </div>
              </div>
                <h5> Price : {{ book.price }}</h5> 
            </p>
            <p class="card-text">
              <small class="text-body-secondary">
                <strong> Author : </strong> {{ book.author }}
              </small>
            </p>
            <button @click="addToCart" class="btn btn-primary mt-5">Add to Cart</button>
            <div>
              <router-link to="/"  class="btn btn-secondary mt-5"> Back to home</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RecommendationView :author="book.author" class="my-5"> </RecommendationView>
  </div>

</template>
<script setup>
// import CardView from '../components/CardView.vue'
import RecommendationView from '../components/RecommendationView.vue';
import { useRoute } from 'vue-router'
const route = useRoute()

// console.log(route.params.id)

import { reactive, onMounted } from 'vue'
import axios from 'axios'

const books = reactive([])

onMounted(async () => {
  const { data } = await axios.get('/books')
  const newbooks = data.filter((book) => book.id == route.params.id)
  books.value = newbooks
})


// cart
import { useCartStore } from '../stores/counter.js';
const cartStore = useCartStore();
const addToCart = () => {
  cartStore.addToCart(books);
};
</script>
