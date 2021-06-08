<template>
  <NuxtLink
    :to="link"
    class="
      w-full
      block
      py-2
      px-3
      text-center
      hover:bg-blue-200 hover:text-blue-800
      transition
      duration-300
      h-20
    "
  >
    <div class="h-10 pt-2">
      <InlineSvg :src="icon" class="h-8 m-auto fill-current" />
    </div>
    <p>
      {{ title }}
    </p>
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import InlineSvg from 'vue-inline-svg'

// Your component

export default Vue.extend({
  components: {
    InlineSvg,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
})
</script>
