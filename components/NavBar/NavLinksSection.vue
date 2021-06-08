<template>
  <ul class="flex">
    <li
      v-for="route in routes"
      :key="route.title"
      class="nav-item sm:block hidden"
    >
      <NuxtLink class="navLink" :to="route.link">{{ route.title }}</NuxtLink>
    </li>
    <button class="navLink" outlined @click="logout">
      <NuxtLink to="/">Logout</NuxtLink>
    </button>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

import { Route, routes } from './routes'

export default Vue.extend({
  data: () => ({
    routes: routes as Route[],
  }),
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>

<style>
.navLink {
  @apply px-3 cursor-pointer py-2 flex items-center text-lg font-semibold leading-snug text-white hover:opacity-75;
}
</style>
