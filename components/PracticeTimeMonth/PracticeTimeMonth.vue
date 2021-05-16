<template>
  <SimpleTimeTotal
    title="Time Practiced This Month"
    :time-in-minutes="monthTimeInMinutes"
  />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    monthTimeInMinutes: {
      type: Number,
      required: true,
    },
  },
})
</script>
