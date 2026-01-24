import { clearUserSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  clearUserSession(event)
  return { success: true }
})
