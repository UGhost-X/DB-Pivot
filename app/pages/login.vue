<template>
  <div class="flex min-h-screen items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-center text-2xl">Sign in to your account</CardTitle>
        <CardDescription class="text-center">
          Enter your email and password to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <Label for="email">Email address</Label>
            <Input id="email" v-model="email" type="email" required placeholder="name@example.com" />
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input id="password" v-model="password" type="password" required />
          </div>
          <Button type="submit" class="w-full">Sign in</Button>
        </form>
      </CardContent>
      <CardFooter class="justify-center">
        <NuxtLink to="/register" class="text-sm font-medium text-primary hover:underline">
          Don't have an account? Register
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const email = ref('')
const password = ref('')
const { login } = useAuth()

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    navigateTo('/projects')
  } catch (error) {
    toast.error('Login Failed', { description: String(error) })
  }
}
</script>
