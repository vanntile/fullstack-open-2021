import { Gender } from './common'
import ServerError from './ServerError'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

export const toNewPatient = (data: unknown): Omit<SafePatient, 'id'> => {
  const { name, dateOfBirth, gender, occupation } = data as Omit<SafePatient, 'id'>

  if (!name || !isString(name)) throw new ServerError('Missing field: name', 400)

  if (!dateOfBirth || !isString(dateOfBirth)) throw new ServerError('Missing field: dateOfBirth', 400)

  if (!gender || !isString(gender) || !Object.values(Gender).includes(gender as Gender))
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
