<template>
  <div>
    <p>Welcome {{ authUser.email }}.</p>
    <div>
      <PracticeTimeTotal :total-time="totalPracticeTime" />
      <PracticeLogRecorder />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  data: () => ({
    totalPracticeTime: 0,
  }),

  async fetch() {
    if (this.authUser.uid) {
      try {
        const allPracticeLogs = await this.$fire.firestore
          .collection('practiceLogs')
          .where('userId', '==', this.authUser.uid)
          .get()

        const totalPracticeTime = allPracticeLogs.docs.reduce(
          (totalTime, practiceLog) =>
            (totalTime += practiceLog.data().practiceTimeMinutes),
          0
        )
        this.totalPracticeTime = totalPracticeTime
      } catch (e) {
        alert(e)
      }
    }
  },

  computed: {
    ...mapState({
      authUser: (state: any) => state.authUser,
    }),
  },
})
</script>
