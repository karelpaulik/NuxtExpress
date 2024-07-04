<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md" >
      <q-card class="my-card">
        <q-card-section>
          <pre>logedUser: {{ logedUser.email }}</pre>
          <div><NuxtLink to="/">index</NuxtLink></div>
          <div><NuxtLink to="/private">Private</NuxtLink></div>
          <div><NuxtLink to="/userAuth/login">login</NuxtLink></div>
          <div><NuxtLink to="/userAuth/loginInfo">login info</NuxtLink></div>
          <div><NuxtLink to="/userAuth/logout">logout</NuxtLink></div>
          <div><NuxtLink to="/signup">Signup</NuxtLink></div>
          <a :href="`${runtimeConfig.public.baseURL}/expresslogin`">expressjs login - zadní vrátka</a>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section>
          <div><NuxtLink to="/player/">index</NuxtLink></div>
          <div><NuxtLink to="/player/playerList">playerList</NuxtLink> Privat (client and server)</div>
          <div><NuxtLink to="/player/player-">player</NuxtLink></div>
        </q-card-section>
      </q-card>
    </div>
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

.my-card {
  width: 100%;
  height: 230px;
  max-width: 250px;
}

</style>