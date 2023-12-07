<template>
  <div class="card">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Products</span>
        </div>
      </template>
      <Column field="name" header="Name">
        <template #body="slotProps">
          {{ slotProps.data.title }}
        </template>
      </Column>
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="`/src/data/images/${slotProps.data.image}`"
            :alt="slotProps.data.image"
            class="w-6rem shadow-2 border-round"
            style="height: 5rem"
          />
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps"> ₹ {{ slotProps.data.price }} </template>
      </Column>
      <Column field="quantity" header="Quantity">
        <template #body="slotProps"> {{ slotProps.data.quantity }} </template>
      </Column>
      <Column field="operations" header="Operations">
        <template #body="slotProps">
          <button @click="Dec(slotProps.data)" class="btn btn-outline-primary btn-sm me-2">
            -
          </button>
          <button @click="Inc(slotProps.data)" class="btn btn-outline-primary btn-sm me-2">
            +
          </button>
          <button @click="removeFromCart(slotProps.data.id)" class="btn btn-outline-primary btn-sm">
            Delete
          </button>
        </template>
      </Column>
      <Column header="Total">
        <template #body="slotProps">
          {{ slotProps.data.price * slotProps.data.quantity }}
        </template>
      </Column>
      <template #footer>
        <div>In total there are {{ cartStore.totalItems }} products.</div>
        <div>Total : {{ cartStore.totalPrice }}</div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-green/theme.css'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref } from 'vue'
const products = ref()

// cart
import { useCartStore } from '../stores/counter.js'
const cartStore = useCartStore()
const removeFromCart = (id) => {
  cartStore.removeFromCart(id)
  products.value = cartStore.cartItems
}
products.value = cartStore.cartItems

const Inc = (data) => {
  return (data.quantity += 1)
}

const Dec = (data) => {
  if (data.quantity <= 1) {
    removeFromCart(data.id)
  } else {
    products.value = cartStore.cartItems
    return (data.quantity -= 1)
  }
}
</script>

<style scoped>
html {
  font-size: 14px;
}

body {
  font-family: var(--font-family);
  font-weight: normal;
  background: var(--surface-ground);
  color: var(--text-color);
  padding: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.card {
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

p {
  line-height: 1.75;
}
</style>
