<template>
  <div class="container mb-5">
    <div class="row">
    <div class="col-3 mt-5 my-auto text-center" v-for="book in books.value" :key="book.id">
        <div class="card" style="width: 18rem;">
            <router-link :to="`/book/${book.id}`" class="text-decoration-none">
            <img
              :src="`/src/data/images/${book.image}`"
              class="card-img-top object-fit-cover"
              style="height: 12rem"
            />
          </router-link>
            <div class="card-body">
              <h5 class="card-title"> <strong> <router-link :to="`/book/${book.id}`" class="text-decoration-none"> {{ book.title }} </router-link>  </strong> </h5>
              <p class="card-text">
                <!-- {{ book.description }} -->
                <p>
                  <strong>Author : </strong> {{ book.author }}
                </p>
                <h5>
                  <strong>Price : </strong> {{ book.price }}
                </h5>
              </p>
              <router-link :to="`/book/${book.id}`" class="btn btn-primary">View Details</router-link>
            </div>
          </div>
    </div>
  </div>
</div>
</template>

<script setup>
const props = defineProps(['books'])
import { reactive } from 'vue'
const books = reactive(props.books)

</script>