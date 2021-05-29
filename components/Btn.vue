<template>
  <button
    class="text-white font-bold py-2 px-4 rounded w-full h-full"
    :class="{
      'bg-primaryMain': !disabled && !loading,
      'hover:bg-primaryMainDark': !disabled && !loading,
      'bg-gray-600': disabled || loading,
      'cursor-not-allowed': disabled,
      'cursor-wait': loading,
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot v-if="!loading" />
    <div v-else>Loading...</div>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
