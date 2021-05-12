<template>
  <div class="pt-4 box-border">
    <h2 class="font-bold text-xl">The Practice Zone</h2>

    <div class="mt-5">
      <Btn @click="showModal = !showModal">New Practice Log</Btn>
    </div>
    <Modal
      v-if="showModal"
      header-title="Enter Practice Details"
      primary-button-text="Save"
      secondary-button-text="Cancel"
      type="primary"
      @onClose="showModal = false"
    >
      <PracticeLogRecorderForm />
    </Modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    showModal: false,
  }),
})
</script>
