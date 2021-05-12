<template>
  <div
    v-if="totalTime > 0"
    class="
      bg-gray-100
      border-primaryMain
      dark:bg-gray-800
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
      cursor-pointer
      |
      hover:bg-indigo-400
      dark:hover:bg-indigo-600
      hover:border-transparent
      |
      transition-colors
      duration-500
    "
  >
    <div class="flex flex-col justify-center">
      <p class="text-secondaryMain dark:text-gray-300 font-semibold">
        Total Practice Time (Minutes)
      </p>
      <p
        class="
          text-secondaryMain
          dark:text-gray-100
          text-justify
          font-semibold
          text-4xl
          m-auto
        "
      >
        {{ totalTime }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    totalTime: {
      type: Number,
      required: true,
    },
  },
})
</script>
