import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, avatar } = body
  
  const user = requireUser(event)
  
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: name || undefined,
      avatar: avatar || undefined
    },
    select: {
        id: true,
        email: true,
        name: true,
        avatar: true
    }
  })
  
  return { success: true, data: updatedUser }
})
