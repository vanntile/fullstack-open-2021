interface Diagnosis {
  code: string
  name: string
  latin?: string
}

type MALE = 'male'
type FEMALE = 'female'

interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn?: string
  gender: MALE | FEMALE
  occupation: string
}

type SafePatient = Omit<Patient, 'ssn'>
