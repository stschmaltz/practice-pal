<template>
  <SimpleTimeTotal :title="title" :time-in-minutes="monthTimeInMinutes" />
</template>

<script lang="ts">
import Vue from 'vue'
import format from 'date-fns/format'

import { utcToZonedTime } from 'date-fns-tz'
import { defaultTimezone } from '~/helpers/time'

export default Vue.extend({
  props: {
    monthTimeInMinutes: {
      type: Number,
      required: true,
    },
  },
  computed: {
    title() {
      const timeZone = defaultTimezone
      const zonedTime = utcToZonedTime(new Date(), timeZone)

      const thisMonth = format(zonedTime, 'MMMM')

      return `Time Practiced in ${thisMonth}`
    },
  },
})
</script>
