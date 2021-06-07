<template>
  <div class="homeBaseContainer">
    <div v-if="!isLoggedIn">
      <Logo />
      <h1 class="title">Practice Pal</h1>
      <Auth />
    </div>
    <div v-else>
      <HomeBase />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
export default Vue.extend({
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
    ...mapState({
      authUser: (state: any) => state.authUser,
    }),
  },
})
</script>

<style>
.homeBaseContainer {
  @apply flex justify-center text-center;
}
.title {
  @apply mb-9 font-title text-primaryMain block font-bold text-6xl tracking-wide;
}
</style>
