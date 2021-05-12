<template>
  <div>
    <p>Welcome {{ authUser.email }}.</p>
    <div>
      <PracticeLogRecorder />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  computed: {
    ...mapState({
      authUser: (state: any) => state.authUser,
    }),
  },
})
</script>
