<template>
  <SimpleTimeTotal
    title="Time Practiced Last 7 Days"
    :time-in-minutes="weekTimeInMinutes"
  />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    weekTimeInMinutes: {
      type: Number,
      required: true,
    },
  },
})
</script>
