// a port of https://github.com/julienr114/vue-calendar-heatmap to
typescript/html without tooltips/legend
<template>
  <svg class="vch__wrapper" :viewBox="viewbox">
    <g
      class="vch__months__labels__wrapper"
      :transform="monthsLabelWrapperTransform[position]"
    >
      <text
        v-for="month in heatmap.firstFullWeekOfMonths"
        :key="month.value"
        class="vch__month__label"
        :x="getMonthLabelPostion(month).x"
        :y="getMonthLabelPostion(month).y"
      >
        {{ lo.months[month.value] }}
      </text>
    </g>

    <g
      class="vch__days__labels__wrapper"
      :transform="daysLabelWrapperTransform[position]"
    >
      <text
        class="vch__day__label"
        :x="vertical ? SQUARE_SIZE * 1 : 0"
        :y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 20"
      >
        {{ lo.days[1] }}
      </text>
      <text
        class="vch__day__label"
        :x="vertical ? SQUARE_SIZE * 3 : 0"
        :y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 44"
      >
        {{ lo.days[3] }}
      </text>
      <text
        class="vch__day__label"
        :x="vertical ? SQUARE_SIZE * 5 : 0"
        :y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 69"
      >
        {{ lo.days[5] }}
      </text>
    </g>

    <g class="vch__year__wrapper" :transform="yearWrapperTransform">
      <g
        v-for="(week, weekIndex) in heatmap.calendar"
        :key="weekIndex"
        class="vch__month__wrapper"
        :transform="getWeekPosition(weekIndex)"
      >
        <rect
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          class="vch__day__square"
          :transform="getDayPosition(dayIndex)"
          :width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
          :height="SQUARE_SIZE - SQUARE_BORDER_SIZE"
          :style="{ fill: rangeColor[day.colorIndex] }"
          @click="$emit('day-click', day)"
        />
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import Heatmap from './Heatmap'
import { Vector } from './types'
import {
  DAYS_IN_WEEK,
  DEFAULT_LOCALE,
  DEFAULT_RANGE_COLOR,
  SQUARE_SIZE,
} from './constants'
export default {
  props: {
    endDate: {
      type: String,
      required: true,
    },
    max: {
      type: Number,
      default: () => 10,
    },
    rangeColor: {
      type: Array,
      default: () => DEFAULT_RANGE_COLOR,
    },
    values: {
      required: true,
      type: Array,
    },
    locale: {
      type: Object,
      default: () => {},
    },

    vertical: {
      type: Boolean,
      default: false,
    },
    noDataText: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      now: new Date(),
    }
  },
  computed: {
    position(): keyof Vector {
      return this.vertical ? 'vertical' : 'horizontal'
    },
    heatmap(): Heatmap {
      return new Heatmap(this.endDate, this.values, this.max)
    },
    width(): Vector {
      const sqareSize: number = this.SQUARE_SIZE as number
      const leftSectionWidth: number = this.LEFT_SECTION_WIDTH as number
      const rightSectionWidth: number = this.RIGHT_SECTION_WIDTH as number

      return {
        horizontal:
          leftSectionWidth +
          sqareSize * (this.heatmap as Heatmap).weekCount +
          this.SQUARE_BORDER_SIZE,
        vertical:
          leftSectionWidth + sqareSize * DAYS_IN_WEEK + rightSectionWidth,
      }
    },
    height(): Vector {
      const sqareSize: number = this.SQUARE_SIZE as number
      const leftSectionWidth: number = this.LEFT_SECTION_WIDTH as number
      const bottomSectionHeigth: number = this.BOTTOM_SECTION_HEIGHT as number

      return {
        horizontal:
          leftSectionWidth +
          sqareSize * DAYS_IN_WEEK +
          this.SQUARE_BORDER_SIZE +
          bottomSectionHeigth,
        vertical:
          leftSectionWidth +
          sqareSize * (this.heatmap as Heatmap).weekCount +
          this.SQUARE_BORDER_SIZE,
      }
    },
    viewbox() {
      return `0 0 ${(this.width as Vector)[this.position as keyof Vector]} ${
        (this.height as Vector)[this.position as keyof Vector]
      }`
    },
    daysLabelWrapperTransform() {
      return {
        horizontal: `translate(0, ${this.TOP_SECTION_HEIGHT})`,
        vertical: `translate(${this.LEFT_SECTION_WIDTH}, 0)`,
      }
    },
    monthsLabelWrapperTransform() {
      return {
        horizontal: `translate(${this.LEFT_SECTION_WIDTH}, 0)`,
        vertical: `translate(0, ${this.TOP_SECTION_HEIGHT})`,
      }
    },

    yearWrapperTransform() {
      return `translate(${this.LEFT_SECTION_WIDTH}, ${this.TOP_SECTION_HEIGHT})`
    },
    SQUARE_BORDER_SIZE: () => SQUARE_SIZE / 5,
    SQUARE_SIZE() {
      return SQUARE_SIZE + this.SQUARE_BORDER_SIZE
    },
    TOP_SECTION_HEIGHT() {
      return SQUARE_SIZE + SQUARE_SIZE / 2
    },
    RIGHT_SECTION_WIDTH() {
      const sqareSize: number = this.SQUARE_SIZE as number

      return sqareSize * 3
    },
    BOTTOM_SECTION_HEIGHT() {
      return SQUARE_SIZE + SQUARE_SIZE / 2
    },
    LEFT_SECTION_WIDTH() {
      return Math.ceil(SQUARE_SIZE * 2.5)
    },
    lo() {
      if (this.locale) {
        return {
          months: this.locale.months || DEFAULT_LOCALE.months,
          days: this.locale.days || DEFAULT_LOCALE.days,
          on: this.locale.on || DEFAULT_LOCALE.on,
        }
      }
      return DEFAULT_LOCALE
    },
  },
  methods: {
    getWeekPosition(index: number) {
      const squareSize: number = this.SQUARE_SIZE as number

      if (this.vertical) {
        return `translate(0, ${
          (squareSize as number) * (this.heatmap as Heatmap).weekCount -
          (index + 1) * squareSize
        })`
      }
      return `translate(${index * squareSize}, 0)`
    },
    getDayPosition(index: number) {
      const sqareSize: number = this.SQUARE_SIZE as number

      if (this.vertical) {
        return `translate(${index * sqareSize}, 0)`
      }
      return `translate(0, ${index * sqareSize})`
    },
    getMonthLabelPostion(month: { index: number }) {
      const sqareSize: number = this.SQUARE_SIZE as number

      const position = { x: 0, y: 0 }
      position.x = this.vertical ? 3 : sqareSize * month.index
      position.y = this.vertical
        ? sqareSize * (this.heatmap as Heatmap).weekCount -
          sqareSize * month.index -
          sqareSize / 4
        : sqareSize - this.SQUARE_BORDER_SIZE
      return position
    },
  },
}
</script>

<style>
.vch__wrapper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 10px;
  max-height: 18rem;
}
.vch__wrapper .vch__months__labels__wrapper .vch__month__label {
  font-size: 10px;
}
.vch__wrapper .vch__days__labels__wrapper .vch__day__label {
  font-size: 9px;
}
.vch__wrapper .vch__months__labels__wrapper .vch__month__label,
.vch__wrapper .vch__days__labels__wrapper .vch__day__label {
  fill: #767676;
}
.vch__wrapper .vch__day__square:hover {
  stroke: #555;
  stroke-width: 1px;
}
.vch__wrapper .vch__day__square:focus {
  outline: none;
}
</style>
