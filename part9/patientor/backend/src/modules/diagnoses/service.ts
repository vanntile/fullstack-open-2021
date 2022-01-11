import data from '../../misc/diagnoses.json'

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
