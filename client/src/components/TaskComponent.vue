<template>
    <article class="task">
        <header class="task-header">
            <input class="task-name" v-model="task.title" :readonly="!showDescription && userEmail === props.email">
            <span class="task-owner">{{ task.userName }}</span>
        </header>
        <div class="priority">
            <span>Priority: <span v-show="!showDescription && userEmail === props.email">{{ displayPriority }}</span></span>
            <label>
                <select v-show="showDescription && userEmail === props.email" v-model="task.priority">
                    <option :value="1">High</option>
                    <option :value="2">Midium</option>
                    <option :value="3">Normal</option>
                </select>
            </label>
        </div>
        <div v-show="!showDescription" class="button-container">
            <button @click="showDescription = true">Show Description</button>
            <button class="delete" v-if="userEmail === props.email" @click="deleteTask">
                <span v-show="!isLoading">Delete</span>
                <Loading v-model:active="isLoading" :background-color="'#0000'" :is-full-page="false" :height="20" :width="20"/>
            </button>
        </div>
        <div v-show="showDescription">
            <textarea v-model="task.description" class="task-description" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'/>
            <div class="task-footer-bottoms" v-if="userEmail === props.email">
                <button class="save" @click="editTask">
                    <span v-show="!isLoading">Save task</span>
                    <Loading v-model:active="isLoading" :background-color="'#0000'" :is-full-page="false" :height="20" :width="20"/>
                </button>
                <button class="cancel" @click="showDescription = false">
                    Cancel
                </button>   
            </div>
        </div>
    </article>
</template>
<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { useTaskStore } from '@/stores/task';
import { ApiError } from '@/utils/request';
import type { Task } from '@/interfaces/task';

interface ActualTask extends Task{
    email: string
}

const PRIORITYS = {
    1: 'Alta',
    2: 'Normal',
    3: 'Baja',
}

const props = defineProps<ActualTask>()
const task = reactive({
    _id: props._id,
    userName: props.userName,
    userEmail: props.userEmail,
    priority: props.priority,
    title: props.title,
    description: props.description,
}) 
const taskStore = useTaskStore()
const toast = useToast()
const showDescription = ref(false)
const isLoading = ref(false)
const displayPriority = computed(() => PRIORITYS[task.priority] )
const editTask = async () => {
    isLoading.value = true
    try {
        await taskStore.modifyTask(task)
        showDescription.value = false
        isLoading.value = true
    } catch (error) {
        if(error instanceof ApiError) return toast.error(error.message)
        console.log(error)
    }finally{
        isLoading.value = false
    }
}
const deleteTask = async () => {
    isLoading.value = true
    try {
        await taskStore.removeTask({_id: task._id})
        isLoading.value = true
    } catch (error) {
        if(error instanceof ApiError) return toast.error(error.message)
        console.log(error)
    }finally{
        isLoading.value = false
    }
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
    width: auto;
    height: auto;
}
.delete{
    background-color: red;
    color: white;
}
.task-name:read-only{
    outline:none;
    border:none;
}
.task-description{
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