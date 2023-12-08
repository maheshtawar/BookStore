import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])

  const totalItems = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity * item.price, 0)
  )

  function addToCart(book) {
    // console.log(book.value[0])
    const existingItem = cartItems.value.find((item) => item.id === book.value[0].id)

    if (existingItem) {
      existingItem.quantity += 1
      alert('+1 quantity added')
    } else {
      cartItems.value.push({
        id: book.value[0].id,
        title: book.value[0].title,
        author: book.value[0].author,
        genre: book.value[0].genre,
        price: book.value[0].price,
        image: book.value[0].image,
        description: book.value[0].description,
        quantity: 1
      })
      if (cartItems.value.push) {
        alert('Item added to Cart')
      } else {
        alert('OOPS !! Something Wrong')
      }
    }
  }

  function removeFromCart(id) {
    cartItems.value = cartItems.value.filter((item) => item.id !== id)
  }

  return { cartItems, totalItems, totalPrice, addToCart, removeFromCart }
})

export const auth = defineStore('auth', () => {
  const token = ref(false)

  async function login({ username, password }) {
    try {
      const response = await axios.get('/users?username=' + username + '&password=' + password)
      // console.log(response, response.data.length)
      if (response.status === 200 && response.data.length > 0) {
        token.value = true
        // console.log(token.value)
        return true
      } else {
        // console.log(token.value)
        return false
      }
    } catch (error) {
      alert('Error during authentication:', error)
      return false
    }
  }

  async function signup({ username, password }) {
    try {
      const existingUser = await axios.get('/users?username=' + username)

      if (existingUser.data.length > 0) {
        alert('Username already taken. Please choose a different one.')
        return false
      }

      const response = await axios.post('/users', {
        username,
        password
      })

      if (response.status === 201) {
        token.value = true
        return true
      } else {
        alert('Failed to create user. Please try again.')
        return false
      }
    } catch (error) {
      alert('Error during signup:')
      return false
    }
  }

  return { token, login, signup }
})
