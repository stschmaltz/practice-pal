<template>
  <div class="max-w-md m-auto">
    <Metronome />

    <p class="pt-10 font-semibold text-lg">
      Metronome is work in progress <br />Timer is coming soon
    </p>
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
