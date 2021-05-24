<template>
  <div class="md:pt-0 pt-10">
    <p class="welcomeMessage">Welcome {{ user }}.</p>
    <div>
      <PracticeLogRecorder />

      <div class="timeCards">
        <PracticeTimeWeek :week-time-in-minutes="totalPracticeTimeThisWeek" />
        <PracticeTimeMonth
          :month-time-in-minutes="totalPracticeTimeThisMonth"
        />
        <PracticeTimeTotal :total-time-in-minutes="totalPracticeTimeMinutes" />
      </div>
      <div class="feedContainer">
        <Feed :practice-logs="allPracticeLogs" />
      </div>
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
          .sort((a, b) => {
            return a.practiceDate >= b.practiceDate ? -1 : 1
          })

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
    user() {
      const authUserEmail = this.authUser.email

      return authUserEmail === 'stschmaltz@gmail.com'
        ? 'Shane'
        : this.authUser.email.split('@')[0]
    },
    currentDate(): Date {
      const timeZone = 'Mountain'
      return utcToZonedTime(new Date(), timeZone)
    },
    totalPracticeTimeThisMonth() {
      const startOfMonthDate = startOfMonth(this.currentDate as Date) // TODO remove cast

      const practiceLogsThisMonth = getPracticeLogsAfterTime(
        this.allPracticeLogs,
        startOfMonthDate,
      )

      return getTimeFromPracticeLogs(practiceLogsThisMonth)
    },
    totalPracticeTimeThisWeek() {
      const sevenDaysAgoDate = startOfDay(subDays(this.currentDate as Date, 7)) // TODO remove cast
      const practiceLogsThisWeek = getPracticeLogsAfterTime(
        this.allPracticeLogs,
        sevenDaysAgoDate,
      )

      return getTimeFromPracticeLogs(practiceLogsThisWeek)
    },
    totalPracticeTimeMinutes() {
      return getTimeFromPracticeLogs(this.allPracticeLogs)
    },
  },
})
</script>

<style>
.feedContainer {
  @apply mt-8;
}
.welcomeMessage {
  @apply font-semibold text-2xl;
}
.timeCards {
  @apply grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-5 sm:px-0 px-4 sm:w-5/6 m-auto;
}
</style>
