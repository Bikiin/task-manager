<template>
    <article class="task">
        <header class="task-header">
            <input class="task-name" v-model="task.title">
            <span class="task-owner">{{ task.userName }}</span>
        </header>
        <div class="priority">
            <span>Priority: </span>
            <label>
                <select v-model="task.priority">
                    <option :value="1">High</option>
                    <option :value="2">Midium</option>
                    <option :value="3">Normal</option>
                </select>
            </label>
        </div>
        <div>
            <textarea v-model="task.description" class="task-description" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'/>
            <div class="task-footer-bottoms">
                <button class="save" @click="gerateTask">
                    <span v-show="!isLoading">Save task</span>
                    <Loading v-model:active="isLoading" :background-color="'#0000'" :is-full-page="false" :height="20" :width="20"/>
                </button>
                <button class="cancel" @click="$emit('closeNewTask')">
                    Cancel
                </button>   
            </div>
        </div>
    </article>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useTaskStore } from '@/stores/task'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { ApiError } from '@/utils/request';
import { useToast } from 'vue-toastification';
import { useUserStore } from '@/stores/user';
import type { Task } from '@/interfaces/task';

const emit = defineEmits(["closeNewTask"])
const userStore = useUserStore()
const taskStore = useTaskStore()
const toast = useToast()
const isLoading = ref(false)
const task: Task = reactive({
    _id: '',
    userName: userStore.name,
    userEmail: userStore.email,
    priority: 3,
    title: '',
    description: '',
})

const gerateTask = async () => {
    isLoading.value = true
    try {
        await taskStore.createTask(task)
        clearTask()
        emit('closeNewTask')
    } catch (error) {
        if(error instanceof ApiError) return toast.error(error.message)
        console.log(error)
    }finally{
        isLoading.value = false
    }
}
const clearTask = () => {
    task.priority = 3
    task.title = ''
    task.description = ''
}
</script>
<style scoped>
.task{
    min-height: 80px;
    box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.41);
    -webkit-box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.41);
    -moz-box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.41);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 20px;
    border-radius: 6px;
}
.task-header{
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.task-name{
    display: inline;
    padding: 0;
}
.task-name, .task-owner{
    line-height: 1;
    font-size: 18px;
}
.priority{
    display: inline;
    font-size: 12px;
    font-weight: 600;
    margin-top: 10px;
}
.button-container{
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.button-container button, .save, .cancel{
    position: relative;
    border: 0;
    outline: 0;
    padding: 8px 12px;
    border-radius: 20px;
}
.delete{
    background-color: red;
    color: white;
}
.task-description, .task-name:read-only{
    border-color: gray;
}
.task-description{
    margin-top: 10px;
    resize: none;
    border-radius: 6px;
    display: block;
    width: 100%;
    min-height: 70px;
}
.save{
    background-color: rgb(104, 220, 104);
    color: black;
}
.save, .cancel{
    width: 90px;
    height: 30px;
}
.task-footer-bottoms{
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px
}
</style>