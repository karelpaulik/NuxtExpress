<template>
  <div>
    <div class="text-h2">Sign up</div>
    <input v-model="fd.email" placeholder="email" />
    <input v-model="fd.password" placeholder="password" />

    <button @click="fceSignup">Sign up</button><br>
    <button @click="fceListAllUsers">List all users</button>
    <button @click="fceDelAllUsers">Delete all users</button>

    <pre>Data: {{ dataUser }}</pre>

    <div v-if="dataAllUsers" v-for="u in dataAllUsers" :key="u._id">
      {{ u }}<button @click="fceDelSpecUser(u._id)">Del this. user.</button>
    </div>

    <pre v-if="dataDelAllUsers">Del users: {{ dataDelAllUsers }}</pre>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'

const runtimeConfig = useRuntimeConfig();

let delUser = ref("");

const fd = reactive({
  email: "",
  password: "",
  isAdmin: false
});

const {data: dataUser, refresh: signupUser} = await useFetch('/api/user', {
  method: 'post',
  baseURL: runtimeConfig.public.baseURL,
  immediate: false,
  watch: false,
  body: fd,
  credentials: 'include'
});  

const {data: dataAllUsers, refresh: listAllUsers} = await useFetch('/api/user', {
  method: 'get',
  baseURL: runtimeConfig.public.baseURL,
  immediate: false,
  watch: false,
  credentials: 'include'
}); 

const {data: dataDelAllUsers, refresh: delAllUsers} = await useFetch('/api/user', {
  method: 'delete',
  baseURL: runtimeConfig.public.baseURL,
  immediate: false,
  watch: false,
  credentials: 'include'
}); 

const {data: dataDelSpecUsers, refresh: delSpecUsers} = await useFetch( () => '/api/user/' + delUser.value, {
  method: 'delete',
  baseURL: runtimeConfig.public.baseURL,
  immediate: false,
  watch: false,
  credentials: 'include'
}); 

async function fceSignup() {
  await signupUser();
  await listAllUsers();
}

function fceListAllUsers() {
  listAllUsers();
}

async function fceDelAllUsers() {
  await delAllUsers();
  await listAllUsers();
}

async function fceDelSpecUser(id) {
  delUser.value = id;
  await delSpecUsers();
  await listAllUsers();
}

</script>