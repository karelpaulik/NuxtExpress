<template>  
  <q-layout view="hHh LpR fff">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar align="center">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
        <pre>logedUser: {{ logedUser.email }}</pre>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
      <q-tabs align="center" no-caps="">
        <q-route-tab to="/" label="Index" />
        <q-route-tab to="/private" label="Private" />
        <q-route-tab to="/userAuth/login" label="Login" />
        <q-route-tab to="/userAuth/loginInfo" label="Login info" />
        <q-route-tab to="/userAuth/logout" label="Logout" />
        <q-route-tab to="/signup" label="Signup" />
        <a :href="`${runtimeConfig.public.baseURL}/expresslogin`">expressjs login - zadní vrátka</a>
        <q-btn-dropdown no-caps auto-close stretch flat label="Player">
          <q-list separator>
            <q-item>
              <q-route-tab to="/player/" label="Index" />
            </q-item>
            <q-item>
              <q-route-tab to="/player/playerList" label="PlayerList, Privat - client and server" />
            </q-item>
            <q-item>
              <q-route-tab to="/player/player-" label="Player" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-grey-2">
      <q-list bordered separator>
        <q-item clickable v-ripple><NuxtLink to="/">Home page</NuxtLink></q-item>
        <q-item clickable v-ripple><NuxtLink to="/images">Images</NuxtLink></q-item>
        <q-item clickable v-ripple><NuxtLink to="/contacts">Contacts</NuxtLink></q-item>
        <q-item clickable v-ripple><q-icon name="phone_iphone" />Item</q-item>
        <q-item clickable v-ripple><q-icon name="thumb_up" size="md" color="pink-3" />Item1</q-item>
        <q-item clickable v-ripple><q-icon name="o_thumb_up" size="md" color="teal-14" />Item2</q-item>
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable target="_blank" rel="noopener" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>asdf asdf</q-item-label>
            <q-item-label caption>asdf asdf</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://github.quasar.dev">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>GitHub</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="http://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>https://chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>https://forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://twitter.quasar.dev">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://facebook.quasar.dev">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@QuasarFramework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list bordered class="rounded-borders" style="max-width: 350px">
        <q-item-label header>Friends</q-item-label>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Brunch this weekend?</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">Janet</span>
              -- I'll be in your neighborhood doing errands this
              weekend. Do you want to grab brunch?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            1 min ago
          </q-item-section>
        </q-item>

        <q-separator inset="item" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Linear Project</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">John</span>
              -- Can we schedule a call for tomorrow?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            1 min ago
          </q-item-section>
        </q-item>
      </q-list>

      <div class="text-h4 text-weight-bolder">Nadpis</div>

      <div style="max-width: 300px;">
        <q-input v-model="text" label="input"/>
      </div>

      <q-uploader
      url="http://localhost:4444/upload"
      style="max-width: 300px"
      />
    </q-drawer>

    <q-page-container>
      <q-page class="bg-teal-2">
        <NuxtPage />
        <!-- <router-view /> -->
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
  import { ref } from 'vue'

  //Vypsání použité sady ikon (dá se měnit v "nuxt.config.ts")
  // import { useQuasar } from 'quasar'
  // const $q = useQuasar()
  // console.log($q.iconSet);

  const leftDrawerOpen = ref(false)
  const rightDrawerOpen = ref(false)

  function toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
  }

  function toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
  }

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