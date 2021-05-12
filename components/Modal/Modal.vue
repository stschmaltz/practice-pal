<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block
        sm:p-0
      "
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8
          sm:align-middle
          sm:max-w-lg
          sm:w-full
        "
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <ModalPrimaryIcon v-if="type === 'primary'" />
            <ModalPrimaryIcon v-else-if="type === 'error'" />
            <div
              class="
                mt-3
                text-center
                w-full
                pr-0
                sm:mt-0
                sm:ml-4
                sm:pr-14
                sm:text-left
              "
            >
              <h3
                id="modal-title"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                {{ headerTitle }}
              </h3>
              <div class="mt-2">
                <slot />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-transparent
              shadow-sm
              px-4
              py-2
              bg-primaryAccent
              text-base
              font-medium
              text-white
              hover:bg-primaryAccentDark
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-primaryAccent
              sm:ml-3
              sm:w-auto
              sm:text-sm
            "
            @click="$emit('primaryAction')"
          >
            {{ primaryButtonText }}
          </button>
          <button
            type="button"
            class="
              mt-3
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-gray-300
              shadow-sm
              px-4
              py-2
              bg-white
              text-base
              font-medium
              text-gray-700
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
              sm:mt-0
              sm:ml-3
              sm:w-auto
              sm:text-sm
            "
            @click="$emit('onClose')"
          >
            {{ secondaryButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    type: {
      type: String,
      required: true,

      validator: (value) => {
        // The value must match one of these strings
        return ['primary', 'error'].includes(value)
      },
    },
    headerTitle: {
      type: String,
      required: true,
    },
    primaryButtonText: {
      type: String,
      required: true,
    },
    secondaryButtonText: {
      type: String,
      required: true,
    },
  },
})
</script>
