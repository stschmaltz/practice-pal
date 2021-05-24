import humanizeDuration from 'humanize-duration'

const minutesToHumanTime = (timeInMinutes: number): string => {
  return humanizeDuration(minutesToMilliSeconds(timeInMinutes), {
    units: ['h', 'm'],
    delimiter: ' ',
  })
}

const minutesToMilliSeconds = (minutes: number): number => minutes * 60 * 1000

export { minutesToHumanTime, minutesToMilliSeconds }
