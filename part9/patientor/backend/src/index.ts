import cors from 'cors'
import express from 'express'
import pinoHttp from 'pino-http'
import diagnosesRouter from './modules/diagnoses/controller'
import patientsRouter from './modules/patients/controller'
import logger from './utils/logger'
import middleware from './utils/middleware'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)
// Logger middleware
const pino = pinoHttp({ logger })
app.use(pino)

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

app.use(middleware.errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
