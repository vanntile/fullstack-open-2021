interface Diagnosis {
  code: string
  name: string
  latin?: string
}

type MALE = 'male'
type FEMALE = 'female'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Entry {
}

interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn?: string
  gender: MALE | FEMALE
  occupation: string
  entries: Entry[]
}

type SafePatient = Omit<Patient, 'ssn' | 'entries'>
