export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useAuth()
  
  if (!user.value) {
    await fetchUser()
  }

  if (!user.value && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login')
  }
  
  if (user.value && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/projects')
  }
})
