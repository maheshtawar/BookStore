<template>
  <div class="card my-5 mx-5">
    <div class="flex flex-column md:flex-row">
      <div
        class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5"
      >
        <div class="flex flex-wrap justify-content-center align-items-center gap-2">
          <label class="w-6rem">Username</label>
          <InputText v-model="username" id="username" type="text" class="w-12rem" />
        </div>
        <div class="flex flex-wrap justify-content-center align-items-center gap-2">
          <label class="w-6rem">Password</label>
          <InputText v-model="password" id="password" type="password" class="w-12rem" />
        </div>
        <Button @click="login" label="Login" icon="pi pi-user" class="w-10rem mx-auto"></Button>
      </div>
      <div class="w-full md:w-2">
        <Divider layout="vertical" class="hidden md:flex"><b>OR</b></Divider>
        <Divider layout="horizontal" class="flex md:hidden" align="center"><b>OR</b></Divider>
      </div>
      <div class="w-full md:w-5 flex align-items-center justify-content-center py-5">
        <Button
          @click="$router.push('/signup')"
          label="Sign Up"
          icon="pi pi-user-plus"
          severity="success"
          class="w-10rem"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-green/theme.css'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'

import { ref } from 'vue'
import { auth } from '../stores/counter.js'
const authStore = auth()
const username = ref('')
const password = ref('')
import { useRouter } from 'vue-router'
const router = useRouter()

const login = async () => {
  const isAuthenticated = await authStore.login({
    username: username.value,
    password: password.value
  })
  // authStore.login('user1', 'password1')
  // console.log(isAuthenticated, authStore.token)
  if (isAuthenticated) {
    router.push('/')
    // alert('yes')
  } else {
    alert('OPPS !! Something Wrong Please Try Again')
  }
}
</script>
