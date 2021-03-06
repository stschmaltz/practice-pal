import { DAYS_IN_WEEK } from './constants'

export default class Heatmap {
  constructor(
    private endDate: Date,
    private values: { count: number; date: string }[],
    private max: number,
    private daysToStartDate: number,
    private startDate?: Date,
  ) {
    this.endDate = this._parseDate(endDate)
    this.max =
      max || Math.ceil((Math.max(...values.map((day) => day.count)) / 5) * 4)
    this.startDate = this._shiftDate(endDate, -this.daysToStartDate)
    this.values = values
  }

  get activities() {
    return this.values.reduce((newValues, day) => {
      newValues[this._keyDayParser(day.date)] = {
        count: day.count,
        colorIndex: this.getColorIndex(day.count),
      }
      return newValues
    }, {})
  }

  get weekCount() {
    return this.getDaysCount() / DAYS_IN_WEEK
  }

  get calendar() {
    const date = this._shiftDate(
      this.startDate,
      -this.getCountEmptyDaysAtStart(),
    )
    return Array.from({ length: this.weekCount }, () =>
      Array.from({ length: DAYS_IN_WEEK }, () => {
        const dDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        )
        const dayValues = this.activities[this._keyDayParser(dDate)]
        date.setDate(date.getDate() + 1)
        return {
          date: dDate,
          count: dayValues ? dayValues.count : null,
          colorIndex: dayValues ? dayValues.colorIndex : 0,
        }
      }),
    )
  }

  get firstFullWeekOfMonths() {
    return this.calendar.reduce((months, week, index, weeks) => {
      if (index > 0) {
        // TODO sort these types out, file was ported and not v good to start
        // @ts-ignore
        const lastWeek = weeks[index - 1][0].date
        // @ts-ignore
        const currentWeek = week[0].date
        if (
          lastWeek.getFullYear() < currentWeek.getFullYear() ||
          lastWeek.getMonth() < currentWeek.getMonth()
        ) {
          // @ts-ignore
          months.push({ value: currentWeek.getMonth(), index })
        }
      }
      return months
    }, [])
  }

  getColorIndex(value) {
    if (value == null || value === undefined) {
      return 0
    } else if (value <= 0) {
      return 1
    } else if (value >= this.max) {
      return 5
    } else {
      return Math.ceil(((value * 100) / this.max) * 0.03) + 1
    }
  }

  getCountEmptyDaysAtStart() {
    return this.startDate.getDay()
  }

  getCountEmptyDaysAtEnd() {
    return DAYS_IN_WEEK - 1 - this.endDate.getDay()
  }

  getDaysCount() {
    return (
      this.daysToStartDate +
      1 +
      this.getCountEmptyDaysAtStart() +
      this.getCountEmptyDaysAtEnd()
    )
  }

  _shiftDate(date, numDays) {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + numDays)
    return newDate
  }

  _parseDate(entry) {
    return entry instanceof Date ? entry : new Date(entry)
  }

  _keyDayParser(date) {
    const day = this._parseDate(date)
    return `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`
  }
}
