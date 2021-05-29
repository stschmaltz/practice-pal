<template>
  <div>
    <h1 class="font-bold text-4xl mb-4 text-secondaryMain">
      Practice Log Entries
    </h1>

    <CalendarHeatmap :values="calendarEntries" :end-date="currentDate" />
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { utcToZonedTime } from 'date-fns-tz'
import format from 'date-fns/format'

export default {
  props: {
    datesPracticed: {
      type: Array as PropType<Array<Date>>,
      required: true,
      default: () => [],
    },
  },
  computed: {
    currentDate(): string {
      const timeZone = 'Mountain'
      const zonedTime = utcToZonedTime(new Date(), timeZone)

      return format(zonedTime, 'yyyy-M-d')
    },
    calendarEntries() {
      return this.datesPracticed.map((datePracticed: Date) => ({
        date: format(datePracticed, 'yyyy-M-d'),
        count: 6,
      }))
    },
  },
}
</script>
