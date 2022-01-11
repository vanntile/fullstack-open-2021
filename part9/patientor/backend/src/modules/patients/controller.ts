import express from 'express'
import patientsService from './service'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(patientsService.getAll()).end()
})

router.post('/', (req, res) => {
  const patient = patientsService.create(req.body)

  if (patient) {
    res.json(patient)
  } else {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params as { id: string }

  const patient = patientsService.getById(id)

  if (patient) {
    res.json(patient)
  } else {
    res.status(400).json({ error: 'No patient for given id' })
  }
})

export default router
