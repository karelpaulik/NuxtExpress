<template>
    <div>
      <h1>Login</h1>
      <input v-model="fd.email" placeholder="email" />
      <input v-model="fd.password" placeholder="password" />

      <button @click="login">Login</button>
      <pre>Data: {{ data }}</pre>
    </div>
</template>
  
<script setup lang="ts">
  import {ref, reactive} from 'vue';
  const runtimeConfig = useRuntimeConfig();
  // const logedUser = useState('logedUser');
  //const logedUser = useLocalStorage('u-storage', {email: ''});
  const logedUser = useLogedUser();

  const fd = reactive({
    email: "",
    password: ""
  });

  const {data, pending, error, refresh} = await useFetch('/api/auth', {
    method: 'post',
    baseURL: runtimeConfig.public.baseURL,
    immediate: false,
    watch: false,
    body: fd,
    credentials: 'include',
    onResponse({response}) {
      console.log('response: ', response);
      console.log('response._data: ', response._data);
      console.log('response status: ', response.status);
      if (response.status == 200) {
        logedUser.value.email = response._data.email;
      }
    }
  });  

  function login() {
    refresh();
  }

</script>