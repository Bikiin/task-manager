import { reactive } from 'vue'
import { defineStore } from 'pinia'

import config from '@/config/env'
import { request } from '@/utils/request'
import type { Task } from '@/interfaces/task'

export const useTaskStore = defineStore('task', () => {
  const tasks: Task[] = reactive([])


  const generateTasksTracking = async () => {
    const response = await request({url: `${config.API}/tasks`, dirtyResponse: true})
    const reader = response.body?.pipeThrough(new TextDecoderStream('utf-8')).getReader() 

    while(true && reader){
      const { value } = await reader.read()
      const cleanValue = JSON.parse(value ?? '[]') as Task[]
      tasks.splice(0, tasks.length, ...cleanValue)
    }
  }

  const createTask = async (task: Task) => {
    const response = await request({url: `${config.API}/tasks`, method: 'POST', body: task})
    return response
  }

  const modifyTask = async (task: Task) => {
    const response = await request({url: `${config.API}/tasks`, method: 'PATCH', body: task})
    return response
  }

  const removeTask = async ({_id}: {_id: string}) => {
    const response = await request({url: `${config.API}/tasks/${_id}`, method: 'DELETE'})
    return response
  }

  return { 
    tasks,
    generateTasksTracking,
    createTask,
    modifyTask,
    removeTask
  }
})
