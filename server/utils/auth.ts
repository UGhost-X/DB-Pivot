import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-prod'

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

export const verifyPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash)
}

export const createSession = (event: any, user: any) => {
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' })
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })
}

export const clearUserSession = (event: any) => {
  deleteCookie(event, 'auth_token')
}

export const getUserFromSession = (event: any) => {
  const token = getCookie(event, 'auth_token')
  if (!token) return null
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number, email: string, name: string }
  } catch (e) {
    return null
  }
}

export const requireUser = (event: any) => {
  const user = getUserFromSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
  return user
}
