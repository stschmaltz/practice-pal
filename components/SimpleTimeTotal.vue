<template>
  <div
    v-if="timeInMinutes > 0"
    class="
      bg-secondaryAccentLight
      border-primaryMain
      bg-opacity-95
      border-opacity-60
      |
      p-4
      border-solid
      rounded-3xl
      border-2
      |
      flex
      justify-around
      |
      hover:bg-secondaryAccent
      hover:border-transparent
      |
      transition-colors
      duration-500
    "
  >
    <div class="flex flex-col justify-center">
      <p class="text-secondaryMain dark:text-gray-300 font-semibold">
        {{ title }}
      </p>
      <p
        class="
          text-secondaryMain
          dark:text-gray-100
          font-semibold
          text-4xl
          m-auto
        "
      >
        {{ humanizedTime }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import humanizeDuration from 'humanize-duration'
export default Vue.extend({
  props: {
    timeInMinutes: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    humanizedTime() {
      const timeInMilliSeconds = this.timeInMinutes * 60 * 1000
      return humanizeDuration(timeInMilliSeconds, {
        units: ['h', 'm'],
        delimiter: ' ',
      })
    },
  },
})
</script>
