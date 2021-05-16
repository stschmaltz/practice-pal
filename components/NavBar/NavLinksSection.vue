<template>
  <div class="lg:flex flex-grow items-center">
    <ul class="flex flex-row lg:flex-row list-none ml-auto">
      <!-- <li class="nav-item">
        <NuxtLink class="navLink" to="/"> Placeholder1 </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink to="/" class="navLink"> Placeholder2 </NuxtLink>
      </li> -->
      <button class="navLink" outlined @click="logout">Logout</button>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
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
