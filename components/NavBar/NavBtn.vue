<template>
  <div class="buttonContainer">
    <button class="buttonMain" type="button">
      <span class="buttonLine"></span>
      <span class="buttonLine mt-1"></span>
      <span class="buttonLine mt-1"></span>
    </button>
  </div>
</template>

<style>
.buttonContainer {
  @apply relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start;
}
.buttonMain {
  @apply cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none;
}
.buttonLine {
  @apply block relative w-6 h-px rounded-sm bg-white;
}
</style>
