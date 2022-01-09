import express from 'express'
import patientsService from './service'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(patientsService.getEntries()).end()
})

router.post('/', (req, res) => {
  const patient = patientsService.addEntry(req.body)

  if (patient) {
    res.json(patient)
  } else {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
