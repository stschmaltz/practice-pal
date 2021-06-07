<template>
  <div class="box-border">
    <div
      class="h-16 mt-5 lg:w-3/6 md:w-4/6 sm:w-5/6 w-full sm:px-0 px-4 m-auto"
    >
      <Btn @click="showModal = !showModal">Save New Practice Log</Btn>
    </div>

    <Modal
      v-if="showModal"
      header-title="Enter Practice Details"
      primary-button-text="Save"
      secondary-button-text="Cancel"
      type="primary"
      @onClose="showModal = false"
      @primaryAction="savePracticeLog"
    >
      <div>
        <div class="inputSection">
          <p class="inputSectionHeader">Instrument</p>
          <select
            v-model="formData.instrument"
            class="input"
            name="instruments"
          >
            <option selected value="drums">Drums</option>
            <option value="guitar">Guitar</option>
            <option value="bass">Bass</option>
            <option value="piano">Piano</option>
            <option value="vocals">Vocals</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="inputSection">
          <p class="inputSectionHeader">Date Practiced</p>
          <input
            v-model="formData.practiceDate"
            type="datetime-local"
            class="input"
          />
        </div>

        <div class="inputSection">
          <p class="inputSectionHeader">Minutes Practiced</p>
          <input
            v-model="formData.practiceTimeMinutes"
            type="number"
            class="input"
            placeholder="0"
          />
        </div>

        <div class="inputSection">
          <p class="inputSectionHeader">Notes</p>
          <textarea v-model="formData.notes" class="input h-20" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { CreatePracticeLog } from '../../models/PracticeLog'
export default Vue.extend({
  data: () => ({
    showModal: false,

    formData: {
      instrument: '',
      practiceDate: '',
      practiceTimeMinutes: '',
      notes: '',
    },
  }),
  computed: {
    ...mapState({
      authUser: (state: any) => state.authUser,
    }),
  },
  methods: {
    async savePracticeLog() {
      try {
        console.log('Save practice log', {
          formData: this.formData,
          userId: this.authUser.uid,
        })

        // TODO: better + type validation
        if (
          !this.formData.instrument ||
          !this.formData.practiceDate ||
          !this.formData.practiceTimeMinutes
        ) {
          throw new Error(
            'Must set instrument, practice date and practice time.',
          )
        }

        const practiceLog: CreatePracticeLog = {
          instrument: this.formData.instrument,
          practiceDate: new Date(this.formData.practiceDate),
          practiceTimeMinutes: Number(this.formData.practiceTimeMinutes),
          notes: this.formData.notes,
          userId: this.authUser.uid,
        }

        try {
          await this.$fire.firestore.collection('practiceLogs').add(practiceLog)
        } catch (e) {
          alert(e)
          return
        }
        this.$toast.success('Successfully saved practice log.', {
          duration: 3000,
        })
        this.showModal = false
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>

<style>
.inputSectionHeader {
  @apply font-semibold;
}
.inputSection {
  @apply pb-2;
}
</style>
