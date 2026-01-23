export default defineEventHandler(async (event) => {
  const user = getUserFromSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
  return user
})
