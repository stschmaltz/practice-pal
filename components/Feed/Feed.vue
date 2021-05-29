<template>
  <div class="sm:w-5/6 w-full sm:px-0 px-5 m-auto">
    <ul
      id="example-1"
      class="flex flex-wrap item-center sm:justify-between justify-center"
    >
      <li
        v-for="practiceLog in renderPracticeLogs"
        :key="practiceLog.practiceDate"
        class="
          bg-tertiaryAccentLight
          border-2 border-tertiaryAccent
          p-5
          rounded-3xl
          h-56
          flex flex-col
          justify-start
          sm:shadow-xl
          shadow-md
          sm:w-64
          w-full
          sm:my-4
          my-2
          sm:mx-1
        "
      >
        <h4 class="font-bold text-xl">
          {{ practiceLog.instrument }}: {{ practiceLog.practiceDate }}
        </h4>
        <p class="font-semibold text-lg"></p>
        <p class="font-medium">{{ practiceLog.practiceTimeMinutes }}</p>
        <div class="flex flex-col pt-2 h-full">
          <textarea
            id="notes"
            v-model="practiceLog.notes"
            class="border h-full border-gray-300 rounded-md resize-none"
            disabled
          ></textarea>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { titleCase } from 'title-case'
import { minutesToHumanTime } from '../../helpers/time'
import { PracticeLog } from '~/models/PracticeLog'

export default Vue.extend({
  props: {
    practiceLogs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    renderPracticeLogs() {
      return (this.practiceLogs as PracticeLog[]).map(
        (practiceLog: PracticeLog) => {
          return {
            ...practiceLog,
            practiceTimeMinutes: minutesToHumanTime(
              practiceLog.practiceTimeMinutes,
            ),
            practiceDate: practiceLog.practiceDate.toDate().toDateString(),
            instrument: titleCase(practiceLog.instrument),
          }
        },
      )
    },
  },
})
</script>

<style>
#notes::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

#notes::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

#notes::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  @apply bg-offWhite;
}
</style>
:-webkit-scrollbar { }
