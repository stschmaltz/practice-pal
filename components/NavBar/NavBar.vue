<template>
  <div>
    <TopNavBar />
    <BottomNavBar class="block sm:hidden" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BottomNavBar from './BottomNavBar.vue'
import TopNavBar from './TopNavBar.vue'

export default Vue.extend({
  components: {
    BottomNavBar,
    TopNavBar,
  },
})
</script>
