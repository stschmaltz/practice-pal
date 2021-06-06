<template>
  <div>
    <nav class="navBar">
      <div class="navContent">
        <div class="flex items-center">
          <NuxtLink to="/"> <LogoSmall /></NuxtLink>
          <p class="navTitle">
            <NuxtLink to="/">Practice Pal</NuxtLink>
          </p>
        </div>
        <NavLinksSection />
      </div>
    </nav>
    <BottomNavBar class="block sm:hidden" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BottomNavBar from './BottomNavBar.vue'

export default Vue.extend({
  components: {
    BottomNavBar,
  },
})
</script>

<style>
.navBar {
  @apply top-0 h-16 fixed z-50 w-full  px-2 py-3 bg-primaryMain max-w-7xl;
}
.navContent {
  @apply flex flex-wrap items-center justify-between m-auto;
}
.navTitle {
  @apply sm:px-5 px-2 text-white sm:text-2xl text-xl;
}
</style>
