<template>
  <SimpleTimeTotal
    title="Total Practice Time Logged"
    :time-in-minutes="totalTimeInMinutes"
  />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    totalTimeInMinutes: {
      type: Number,
      required: true,
    },
  },
})
</script>
