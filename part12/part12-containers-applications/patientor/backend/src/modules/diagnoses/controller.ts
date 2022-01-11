import express from 'express'
import diagnosesService from './service'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(diagnosesService.getEntries()).end()
})

router.post('/', (_req, res) => {
  res.send('Saving a diary!')
})

export default router
