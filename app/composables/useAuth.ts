export const useAuth = () => {
  const user = useState<any>('user', () => null)

  const fetchUser = async () => {
    try {
      const headers = useRequestHeaders(['cookie'])
      user.value = await $fetch('/api/auth/me', { headers })
    } catch (e) {
      user.value = null
    }
  }

  const login = async (email: string, password: string) => {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    user.value = data
  }
  
  const register = async (email: string, password: string, name: string) => {
    const data = await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email, password, name }
    })
    user.value = data
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    navigateTo('/login')
  }

  return {
    user,
    fetchUser,
    login,
    register,
    logout
  }
}
