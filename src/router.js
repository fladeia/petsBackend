import express from 'express'
import {
  getPets,
  insertPet,
  getAdoptedPets,
  adoptPet
} from './controller.js'

export const router = express.Router()

router.route('/api/pets')
  .get(getPets)
  .post(insertPet)

router.route('/api/adopt')
  .get(getAdoptedPets)
  .post(adoptPet)
