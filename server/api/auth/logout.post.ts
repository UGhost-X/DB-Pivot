export default defineEventHandler(async (event) => {
  clearSession(event)
  return { success: true }
})
