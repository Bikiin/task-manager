<template>
    <main>
        <Header />
        <section>
            <div>

                <button class="new-task" @click="showNewTask = true" :disabled="showNewTask">New Task</button>
            </div>
            <NewTask v-show="showNewTask" @closeNewTask="showNewTask = false"/>
            <Task v-for="task in tasks" v-bind="{...task, email}" />
        </section>
    </main>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import Header from '@/components/HeaderComponent.vue';
import Task from '@/components/TaskComponent.vue';
import NewTask from '@/components/NewTaskComponent.vue';

import { useTaskStore } from '@/stores/task';
import { useUserStore } from '@/stores/user';
import { getUser } from '@/utils/session';

const taskStore = useTaskStore()
const userStore = useUserStore()
const showNewTask = ref(false)
const { tasks } = storeToRefs(taskStore)
const { email } = storeToRefs(userStore)
taskStore.generateTasksTracking()
userStore.setUser(getUser())
</script>
<style scoped>
main{
    height: 100vh;
    display: flex;
    flex-direction: column;
}
section{
    display: flex;
    flex-direction: column;
    overflow: auto;
    margin: auto;
    padding: 10px 30px;
    height: 100%;
    max-width: var(--limit);
    width: 100%;
    gap: 10px;
}
.new-task{
    font-size: 18px;
    border-radius: 16px;
    padding: 8px 14px;
    border: none;
    outline: none;
    background-color: rgb(104, 220, 104);
}
</style>