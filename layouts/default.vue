<template>
  <div>
    <NavBar v-if="isLoggedIn" />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
})
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-secondaryMain leading-tight focus:border-transparent focus:outline-none focus:shadow-md;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
