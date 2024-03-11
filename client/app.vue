<template>
  <div>
    <pre>logedUser: {{ logedUser.email }}</pre>
    <div><NuxtLink to="/">index</NuxtLink></div>
    <div><NuxtLink to="/private">Private</NuxtLink></div>
    <div><NuxtLink to="/userAuth/login">login</NuxtLink></div>
    <div><NuxtLink to="/userAuth/loginInfo">login info</NuxtLink></div>
    <div><NuxtLink to="/userAuth/logout">logout</NuxtLink></div>
    <div><NuxtLink to="/signup">Signup</NuxtLink></div>
    <a :href="`${runtimeConfig.public.baseURL}/expresslogin`">expressjs login - zadní vrátka</a>
    <div>---------------</div>
    <div><NuxtLink to="/player/">index</NuxtLink></div>
    <div><NuxtLink to="/player/getall">getall</NuxtLink></div>
    <div><NuxtLink to="/player/getspec">getspec</NuxtLink></div>
    <div><NuxtLink to="/player/insert">insert</NuxtLink></div>
    <div><NuxtLink to="/player/delete">delete</NuxtLink></div>
    <div>---------------</div>
    <NuxtPage />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const runtimeConfig = useRuntimeConfig();
  //const logedUser = useState('logedUser', () => ({email: ''}));
  //const logedUser = useLocalStorage('u-storage', {email: ''})
  const logedUser = useLogedUser();

  //Toto je, protože localStorage se po zavření/otevření nesmaže.
  //Kdyby se podařilo localStorage se zavřením prohlížeče smazat (ale nemazat se zavřením záložky), tak řádky níže nejsou potřeba.
  if (process.client) { //provádím pouze na client side.
    const { data, refresh } = await useFetch('/api/auth', {
        method: 'get',
        baseURL: runtimeConfig.public.baseURL,
        headers: useRequestHeaders(['cookie']),
        credentials: 'include',
        onResponse({response}) {
          if (response.status == 200) {
            logedUser.value.email = response._data.email;
          }
          if (response.status == 401) {
            logedUser.value.email = "";
          }
        }
    });
  }

// //Pozastavení zavžení záložky nebo prohlížeče
// if (process.client) {
//   window.addEventListener('beforeunload', function(event) {
//     event.preventDefault();
//     event.returnValue = '';
//   });
// }
</script>

<style>
body {
  background-color: gray;
}
</style>