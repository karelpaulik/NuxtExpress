<template>
  <q-layout view="hHh LpR fff">
    <!-- Header -->
    <q-header elevated class="bg-grey-5 text-black" height-hint="98">
      <q-toolbar align="center">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar size="64px">
            <img src="tygr.jpg" />
          </q-avatar>
          Web page title
        </q-toolbar-title>
        <q-tabs align="center" no-caps>
          <q-route-tab v-if="!logedUser.email" to="/userAuth/login" label="Login" />
          <q-route-tab v-if="logedUser.email" to="/userAuth/logout" label="Logout" />
        </q-tabs>
        <!-- <pre>logedUser: {{ logedUser.email }}</pre> -->
        <span>LogedUser:</span>&nbsp;&nbsp;<span>{{ logedUser.email }}</span> <!-- &nbsp;&nbsp; - 2x white space -->
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
      
      <!-- Tabs -->
      <q-tabs align="center" no-caps>
        <q-route-tab v-for="tab in tabs" :key="tab.label" :to="tab.to" :label="tab.label" />
        <a :href="`${runtimeConfig.public.baseURL}/expresslogin`">expressjs login - zadní vrátka</a>
        
        <!-- Player Dropdown -->
        <q-btn-dropdown no-caps auto-close stretch flat label="Player">
          <q-list separator>
            <q-item v-for="player in playerLinks" :key="player.label">
              <q-route-tab :to="player.to" :label="player.label" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-tabs>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-grey-3">
      <q-list bordered separator>
        <q-item v-for="item in leftDrawerItems" :key="item.label" clickable v-ripple>
          <q-icon :name="item.icon" :color="item.color" />
          <NuxtLink :to="item.link">{{ item.label }}</NuxtLink>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Right Drawer -->
    <q-drawer v-model="rightDrawerOpen" side="right" bordered class="bg-grey-3">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item v-for="link in essentialLinks" :key="link.label" clickable target="_blank" rel="noopener" :href="link.url">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.label }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Additional Content -->
      <q-list bordered class="rounded-borders" style="max-width: 350px">
        <q-item-label header>Friends</q-item-label>
        <q-item v-for="friend in friends" :key="friend.name" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar><img :src="friend.avatar" /></q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">{{ friend.title }}</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">{{ friend.name }}</span> -- {{ friend.message }}
            </q-item-label>
          </q-item-section>
          <q-item-section side top>{{ friend.time }}</q-item-section>
        </q-item>
      </q-list>

      <!-- Uploader -->
      <div class="text-h4 text-weight-bold">Nadpis</div>
      <q-uploader url="http://localhost:4444/upload" style="max-width: 300px" />
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <q-page class="bg-grey-6">
        <NuxtPage />
        <!-- <router-view /> -->
      </q-page>
    </q-page-container>

    <!-- Footer -->
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar><img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" /></q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

//Vypsání použité sady ikon (dá se měnit v "nuxt.config.ts")
// import { useQuasar } from 'quasar'
// const $q = useQuasar()
// console.log($q.iconSet);

// Drawer states
const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

// Functions to toggle drawers
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value;
const toggleRightDrawer = () => rightDrawerOpen.value = !rightDrawerOpen.value;
//Old solution was
// function toggleLeftDrawer () {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }

// Tabs and Links
const tabs = [
  { label: 'Index', to: '/' },
  { label: 'Private', to: '/private' },
  { label: 'Login info', to: '/userAuth/loginInfo' },
  { label: 'Signup', to: '/signup' }
];

const playerLinks = [
  { label: 'Index', to: '/player/' },
  { label: 'PlayerList', to: '/player/playerList' },
  { label: 'Player', to: '/player/player-' }
];

const leftDrawerItems = [
  { label: 'Home page', link: '/', icon: 'home' },
  { label: 'Item', link: '', icon: 'phone_iphone' },
  { label: 'Item1', link: '', icon: 'thumb_up', color: 'pink-3' },
  { label: 'Item2', link: '', icon: 'o_thumb_up', color: 'teal-14' }
];

const essentialLinks = [
  { label: 'Docs', icon: 'school', caption: 'Quasar docs', url: 'https://quasar.dev' },
  { label: 'GitHub', icon: 'code', caption: 'github.com/quasarframework', url: 'https://github.quasar.dev' },
  { label: 'Discord', icon: 'chat', caption: 'chat.quasar.dev', url: 'http://chat.quasar.dev' }
];

// Friend data
const friends = [
  { name: 'Janet', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg', title: 'Brunch this weekend?', message: 'I\'ll be in your neighborhood...', time: '1 min ago' },
  { name: 'John', avatar: 'https://cdn.quasar.dev/img/avatar4.jpg', title: 'Linear Project', message: 'Can we schedule a call for tomorrow?', time: '1 min ago' }
];

// Runtime config and logged user info
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
    onResponse({ response }) {
      logedUser.value.email = response.status === 200 ? response._data.email : '';
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

<style scoped>
body {
  background-color: gray;
}

.my-card {
  width: 100%;
  height: 230px;
  max-width: 250px;
}
</style>