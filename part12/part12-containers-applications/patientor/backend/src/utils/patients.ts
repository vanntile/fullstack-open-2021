import { v1 as uuid } from 'uuid'
import ServerError from './ServerError'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

export const toNewPatient = (data: unknown): Omit<SafePatient, 'id'> => {
  const { name, dateOfBirth, gender, occupation } = data as Omit<SafePatient, 'id'>

  if (!name || !isString(name)) throw new ServerError('Missing field: name', 400)

  if (!dateOfBirth || !isString(dateOfBirth)) throw new ServerError('Missing field: dateOfBirth', 400)

  if (!gender || !isString(gender) || !['male', 'female'].includes(gender as string))
    throw new ServerError('Missing field: gender', 400)

  if (!occupation || !isString(occupation)) throw new ServerError('Missing field: occupation', 400)

  const newPatient: Omit<SafePatient, 'id'> = {
    name,
    dateOfBirth,
    gender,
    occupation,
  }
  return newPatient
}

export const toNewEntry = (data: unknown): Entry => {
  const { type, description, date, specialist, diagnosisCodes } = data as BaseEntry & { type: string }

  if (!description || !isString(description)) throw new ServerError('Missing field: description', 400)
  if (!date || !isString(date)) throw new ServerError('Missing field: date', 400)
  if (!specialist || !isString(specialist)) throw new ServerError('Missing field: specialist', 400)
  if (diagnosisCodes) {
    if (!Array.isArray(diagnosisCodes)) throw new ServerError('Wrong diagnosisCodes type', 400)
    diagnosisCodes.forEach((e: unknown) => {
      if (!isString(e)) throw new ServerError('Wrong diagnosis codes type', 400)
    })
  }

  switch (type) {
    case 'HealthCheck': {
      const { healthCheckRating } = data as HealthCheckEntry
      if (
        healthCheckRating === null ||
        healthCheckRating === undefined ||
        isNaN(healthCheckRating) ||
        healthCheckRating !== parseInt(healthCheckRating) ||
        healthCheckRating < 0 ||
        healthCheckRating > 3
      )
        throw new ServerError('Error on field healthCheckRating', 400)

      const entry: HealthCheckEntry = {
        id: uuid(),
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        healthCheckRating,
      }

      return entry
    }
    case 'OccupationalHealthcare': {
      const { employerName, sickLeave } = data as OccupationalHealthCareEntry

      if (!employerName || !isString(employerName)) throw new ServerError('Missing field: employerName', 400)
      if (sickLeave) {
        if (!sickLeave.startDate || !isString(sickLeave.startDate))
          throw new ServerError('Missing field: sickLeave.startDate', 400)
        if (!sickLeave.endDate || !isString(sickLeave.endDate))
          throw new ServerError('Missing field: sickLeave.endDate', 400)
      }

      const entry: OccupationalHealthCareEntry = {
        id: uuid(),
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        employerName,
        sickLeave,
      }

      return entry
    }
    case 'Hospital': {
      const { discharge } = data as HospitalEntry

      if (!discharge) throw new ServerError('Missing field: discharge', 400)
      else {
        if (!discharge.date || !isString(discharge.date)) throw new ServerError('Missing field: discharge.date', 400)
        if (!discharge.criteria || !isString(discharge.criteria))
          throw new ServerError('Missing field: discharge.criteria', 400)
      }

      const entry: HospitalEntry = {
        id: uuid(),
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        discharge,
      }

      return entry
    }
    default:
      throw new ServerError('Unknown type', 400)
  }
}
