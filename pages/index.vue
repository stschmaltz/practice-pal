<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title text-green-800">practice-pal</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}

.title {
  @apply font-title block font-light text-8xl tracking-wide;
}
</style>
