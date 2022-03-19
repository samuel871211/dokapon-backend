import UserPreference, { checkUserPreferenceSchema } from '../controllers/userPreference'
import express from 'express'

const userPreferenceRouter = express.Router()
userPreferenceRouter.get('/:userId', UserPreference.get)
userPreferenceRouter.put('/:userId', checkUserPreferenceSchema, UserPreference.put)

export default userPreferenceRouter