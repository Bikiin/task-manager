<template>
    <main>
        <h1>Register</h1>
        <form @submit.prevent="checkForm">
            <label>
                Full name
                <input v-model="name">
            </label>

            <label>
                Email
                <input v-model="email">
            </label>

            <label>
                Password
                <input v-model="password" type="password">
            </label>

            <label>
                Repeat password
                <input v-model="passwordRepeated" type="password">
            </label>

            <button>
                <span v-if="!isLoading">Sign up</span>
                <Loading v-model:active="isLoading" :background-color="'#0000'" :is-full-page="false" :height="20" :width="20"/>
            </button>
        </form>
        
        <span>Already have an account? <router-link to="/login">Sign in</router-link></span>
    </main>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { useUserStore } from '@/stores/user'
import { isValidEmail, isValidPassword } from '@/utils/validations';
import { ApiError, SessionError } from '@/utils/request';
import { saveUser } from '@/utils/session'


const userStore = useUserStore()
const router = useRouter()
const { name, email } = storeToRefs(userStore)
const password = ref('')
const passwordRepeated = ref('')
const isLoading = ref(false)

watch(name, ()=> name.value.trim())
watch(email, ()=> email.value.trim().toLocaleLowerCase())

const checkForm = async () => {
    const toast = useToast()
    if(!name.value.length) return toast.error('Name is required')
    if(!isValidEmail(email.value)) return toast.error('Invalid email format')
    if(!isValidPassword(password.value)) return toast.error('Password must be at least 8 characters long')
    if(password.value !== passwordRepeated.value) return toast.error('Passwords are not the same')

    try{
        isLoading.value = true
        name.value = 
        await userStore.registerUser({
            name: name.value, 
            email: email.value, 
            password: password.value
        })
        saveUser({name: name.value, email: email.value})
        router.push('/')
    }catch(e){
        if(e instanceof ApiError || e instanceof SessionError) toast.error(e.message)
        else{
            console.log(e)
        }
    }finally{
        isLoading.value = false
    }
}
</script>

<style scoped>
main{
    width: 100%;
    height: 100%;
    max-width: 300px;
    min-height: 100vh;
    padding: 18px;
    padding-bottom: 15%;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
}
h1{
    margin: 0 auto;
}
form{
    display: flex;
    flex-direction: column;
    gap: 18px;
}
label{
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 18px;
}
button{
    display: inline-block;
    width: 112px;
    height: 30px;
    margin: auto;
    margin-top: 20px;
    position: relative;
    padding: 4px 8px;
    font-size: 16px;
}
:deep(.vl-overlay .vl-icon){
    display: flex;
}
span{
    text-align: center;
}
</style>