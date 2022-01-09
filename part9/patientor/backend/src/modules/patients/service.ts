import { toNewPatient } from '../../utils/patients'
import { v1 as uuid } from 'uuid'
import data from '../../../data/patients.json'

const patients = data as Patient[]

const getEntries = (): SafePatient[] => {
  return patients.map((d) => ({ ...d, ssn: undefined }))
}

const addEntry = (data: unknown): SafePatient | undefined => {
  const patient: Omit<SafePatient, 'id'> = toNewPatient(data)

  const newPatient: SafePatient = {
    id: uuid(),
    ...patient,
  }
  patients.push(newPatient)

  return newPatient
}

export default {
  getEntries,
  addEntry,
}
