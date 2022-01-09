import data from '../../../data/diagnoses.json'

const getEntries = (): Diagnosis[] => {
  return data
}

const addEntry = (): boolean | null => {
  return null
}

export default {
  getEntries,
  addEntry,
}
