interface Diagnosis {
  code: string
  name: string
  latin?: string
}

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry

interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn?: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

type SafePatient = Omit<Patient, 'ssn' | 'entries'>

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never
