import { defineStore } from 'pinia'
import { ref } from 'vue'

import config from '@/config/env'
import type { Register, Login, User } from '@/interfaces/user'
import { request } from '@/utils/request'

export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const email = ref('')

  const setUser = (user: User) => {
    name.value = user.name
    email.value = user.email
  }

  const registerUser = async ({ name, email, password }: Register) =>{
    const response = await request({url:`${config.API}/auth/register`, method: 'POST', body: { name, email, password }, saveSession: true })
    return response
  }

  const loginUser = async ({ email, password }: Login) =>{
    const response = await request({url:`${config.API}/auth/login`, method: 'POST', body: { email, password }, saveSession: true })
    return response
  }

  return{
    name,
    email,
    registerUser,
    loginUser,
    setUser
  }
})
