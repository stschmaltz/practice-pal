<template>
  <nav
    class="
      bg-primaryMainLight bg-opacity-95
      fixed
      bottom-0
      flex
      justify-between
      text-sm text-primaryMainDark
      uppercase
      font-bold
      w-full
    "
  >
    <BottomNavElement title="home" link="/" icon="../house-icon.svg" />
    <BottomNavElement
      v-for="route in routes"
      :key="route.title"
      :title="route.title"
      :link="route.link"
      :icon="route.icon"
    />
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'

import { Route, routes } from './routes'
import BottomNavElement from './BottomNavElement.vue'

export default Vue.extend({
  components: {
    BottomNavElement,
  },

  data: () => ({
    routes: routes as Route[],
  }),
})
</script>
