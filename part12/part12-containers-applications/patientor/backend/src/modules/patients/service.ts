import { toNewEntry, toNewPatient } from '../../utils/patients'
import { v1 as uuid } from 'uuid'
import patients from '../../misc/patients'
import ServerError from '../../utils/ServerError'

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

const createEntry = (id: string, data: unknown): SafePatient | undefined => {
  const patient = patients.find((e) => e.id === id)
  if (!patient) throw new ServerError('No patient with that id', 400)

  const entry: Entry = toNewEntry(data)

  patient.entries.push(entry)

  return patient
}

export default {
  getAll,
  create,
  getById,
  createEntry,
}
