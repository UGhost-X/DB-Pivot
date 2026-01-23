<template>
  <div class="flex min-h-screen items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-center text-2xl">Create a new account</CardTitle>
        <CardDescription class="text-center">
          Join us to start managing your databases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="space-y-2">
            <Label for="name">Name</Label>
            <Input id="name" v-model="name" type="text" required placeholder="Your Name" />
          </div>
          <div class="space-y-2">
            <Label for="email">Email address</Label>
            <Input id="email" v-model="email" type="email" required placeholder="name@example.com" />
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input id="password" v-model="password" type="password" required />
          </div>
          <Button type="submit" class="w-full">Register</Button>
        </form>
      </CardContent>
      <CardFooter class="justify-center">
        <NuxtLink to="/login" class="text-sm font-medium text-primary hover:underline">
          Already have an account? Sign in
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const name = ref('')
const email = ref('')
const password = ref('')
const { register } = useAuth()

const handleRegister = async () => {
  try {
    await register(email.value, password.value, name.value)
    navigateTo('/')
  } catch (error) {
    toast.error('Registration Failed', { description: String(error) })
  }
}
</script>
