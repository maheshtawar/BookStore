<template>
  <div class="container">
    <h3>Recommended :</h3>
    <div class="card_">
      <Carousel
        :value="products"
        :numVisible="3"
        :numScroll="3"
        :responsiveOptions="responsiveOptions"
      >
        <template #item="slotProps">
          <div class="border-1 surface-border border-round m-2 text-center px-3">
            <div class="mb-3">
              <img
                :src="'/src/data/images/' + slotProps.data.image"
                :alt="slotProps.data.name"
                class="w-6 shadow-2"
                style="height: 15rem"
              />
            </div>
            <div>
              <h5 class="mb-1">{{ slotProps.data.title }}</h5>
              <small class="text-body-secondary mt-0 mb-3"
                >Author : {{ slotProps.data.author }}</small
              >
              <h6 class="mt-0 mb-3">₹ {{ slotProps.data.price }}</h6>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import Carousel from 'primevue/carousel'
import { ref, onMounted } from 'vue'
import axios from 'axios'
const props = defineProps(['author'])

onMounted(async () => {
  const { data } = await axios.get('/books/?author=' + props.author)
  products.value = data
})

const products = ref()
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
])
</script>
