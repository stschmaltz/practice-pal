import firebase from 'firebase'

export interface PracticeLog {
  instrument: string
  practiceDate: firebase.firestore.Timestamp
  practiceTimeMinutes: number
  notes: string
  userId: string
}

export type CreatePracticeLog = Omit<PracticeLog, 'practiceDate'> & {
  practiceDate: Date
}

export const isPracticeLog = (
  practiceLog: unknown,
): practiceLog is PracticeLog => {
  return (
    !!(practiceLog as PracticeLog).instrument &&
    !!(practiceLog as PracticeLog).practiceDate &&
    !!(practiceLog as PracticeLog).practiceTimeMinutes &&
    !!(practiceLog as PracticeLog).userId
  )
}

export const getTimeFromPracticeLogs = (allPracticeLogs: PracticeLog[]) =>
  allPracticeLogs.reduce(
    (totalTime, practiceLog) => (totalTime += practiceLog.practiceTimeMinutes),
    0,
  )

export const getPracticeLogsAfterTime = (
  practiceLogs: PracticeLog[],
  beforeDate: Date,
) =>
  practiceLogs.filter(
    (practiceLog) =>
      practiceLog.practiceDate.toMillis() >= beforeDate.getTime(),
  )
