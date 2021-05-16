<template>
  <div>
    <p>Welcome {{ authUser.email }}.</p>
    <div>
      <div class="timeCards">
        <PracticeTimeTotal :total-time-in-minutes="totalPracticeTimeMinutes" />
        <PracticeTimeMonth
          :month-time-in-minutes="totalPracticeTimeThisMonth"
        />
        <PracticeTimeWeek :week-time-in-minutes="totalPracticeTimeThisWeek" />
      </div>
      <PracticeLogRecorder />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { startOfMonth, subDays, startOfDay } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import {
  PracticeLog,
  isPracticeLog,
  getTimeFromPracticeLogs,
  getPracticeLogsAfterTime,
} from '~/models/PracticeLog'

export default Vue.extend({
  data: () => ({
    allPracticeLogs: [] as PracticeLog[],
  }),

  async fetch() {
    if (this.authUser.uid) {
      try {
        const allPracticeLogs: PracticeLog[] = (
          await this.$fire.firestore
            .collection('practiceLogs')
            .where('userId', '==', this.authUser.uid)
            .get()
        ).docs
          .map((doc) => doc.data())
          .filter(isPracticeLog)

        this.allPracticeLogs = allPracticeLogs
      } catch (e) {
        alert(e)
      }
    }
  },

  computed: {
    ...mapState({
      authUser: (state: any) => state.authUser,
    }),
    currentDate(): Date {
      const timeZone = 'Mountain'
      return utcToZonedTime(new Date(), timeZone)
    },
    totalPracticeTimeThisMonth() {
      const startOfMonthDate = startOfMonth(this.currentDate as Date) // TODO remove cast
      console.log(startOfMonthDate)

      const practiceLogsThisMonth = getPracticeLogsAfterTime(
        this.allPracticeLogs,
        startOfMonthDate,
      )

      return getTimeFromPracticeLogs(practiceLogsThisMonth)
    },
    totalPracticeTimeThisWeek() {
      const sevenDaysAgoDate = startOfDay(subDays(this.currentDate, 7))
      console.log(sevenDaysAgoDate)
      const practiceLogsThisWeek = getPracticeLogsAfterTime(
        this.allPracticeLogs,
        sevenDaysAgoDate,
      )
      console.log(practiceLogsThisWeek)

      return getTimeFromPracticeLogs(practiceLogsThisWeek)
    },
    totalPracticeTimeMinutes() {
      return getTimeFromPracticeLogs(this.allPracticeLogs)
    },
  },
})
</script>

<style>
.timeCards {
  @apply grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-5 px-4;
}
</style>
