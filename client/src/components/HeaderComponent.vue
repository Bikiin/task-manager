<template>
    <header>
        <div>
            <h1>Task Manager</h1>
            <h2>{{ email }}</h2>
        </div>
    </header>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
const { email } = storeToRefs(userStore)
</script>

<style scoped>
header{
    width: 100%;
    border-bottom: 1px solid gray;
}
div{
    width: 100%;
    max-width: var(--limit);
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
}
h1, h2{
    margin: 0;
}
h2{
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>