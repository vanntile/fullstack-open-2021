import { toNewPatient } from '../../utils/patients'
import { v1 as uuid } from 'uuid'
import data from '../../../data/patients.json'

const patients = data as Patient[]

const getAll = (): SafePatient[] => patients.map((d) => ({ ...d, ssn: undefined }))

const create = (data: unknown): SafePatient | undefined => {
  const patient: Omit<SafePatient, 'id'> = toNewPatient(data)

  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...patient,
  }
  patients.push(newPatient)

  return newPatient
}

const getById = (id: string): Patient | undefined => patients.find((e) => e.id === id)

export default {
  getAll,
  create,
  getById,
}
