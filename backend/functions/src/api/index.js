import express from 'express'
import corsLib from 'cors'
import { validateIdToken } from '../util/auth'

import getSomeData from './get-some-data'

const api = express()

const cors = corsLib({
  origin: '*',
  allowedHeaders: ['Authorization'],
  maxAge: 7200
})

api.use(cors)

// Check the request's auth token then get the data
api.get('/get-some-data', validateIdToken(), getSomeData)

export default api
