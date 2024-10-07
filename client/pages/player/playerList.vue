<template>
    <div>        
      <div class="fixed bg-grey-5" style="z-index: +100;" >
        <q-tabs class="shadow-2" no-caps dense>
          <PlayerDialogBtn componentLabel="New record" @response="async() => {await fceReadAllPlayer()}" />
          <q-tab name="tab1" label="Tab2" />
          <q-tab name="tab2" label="Tab2" />
        </q-tabs>
      </div>

      <!-- <pre>{{ dataAllPlayer }}</pre> -->
      <div class="q-pt-xl"> <!-- Posunutí obsahu směrem dolů, kvůli top menu. -->
        <div v-for="rec in dataAllPlayer" :key="rec.id" >

          <div class="bg-grey-4" >
            <PlayerDelBtn :playerToDel="rec._id" @response="async() => {await fceReadAllPlayer()}" />
            <q-btn no-caps flat label="Move to record" @click="async() => { await navigateTo('/player/player-' + rec._id) }" />
            <PlayerDialogBtn componentLabel="Edit record" :playerId="rec._id" @response="async() => {await fceReadAllPlayer()}" />
          </div>

          <div>Id: {{ rec._id }}</div>
          <div>fName: {{ rec.fName }}</div>
          <div>lName: {{ rec.lName }}</div>
          <div><strong>Full name: </strong> {{ `${rec.fName} ${rec.lName}` }}</div>
          <div v-if="rec.age">age: {{ rec.age }}</div>
          <!-- Následující platilo pro: na serveru: { raw: true } -->
          <!-- <div>city(parsed): {{ JSON.parse(rec.city) }}</div>
          <div v-for="c in JSON.parse(rec.city)">
            city: {{ c }}
          </div> -->
          <div v-if="rec.city">city: {{ rec.city }}</div>
          <div v-for="c in rec.city">
            city: {{ c }}
          </div>

          <!-- <div v-if="rec.files">
            <div v-for="file in rec.files"> -->
              <!-- <img :src="`http://localhost:5000/${file.path}`" width="400"> -->
              <!-- <img :src="`${runtimeConfig.public.baseURL}/${file.path}`" width="400">
            </div>
          </div> -->
          <PlayerFileList :playerId="rec._id" :playerFiles="rec.files"/>
          <hr>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  definePageMeta({
      middleware: ['auth']
  });
  
  import {ref} from 'vue'
  //const runtimeConfig = useRuntimeConfig()
  const dataAllPlayer = ref(null)

  //Data for HTML rendering
  await fceReadAllPlayer()
  
  //Načtení záznamů
  async function fceReadAllPlayer() {
    dataAllPlayer.value = await useGetAllPlayer()
  }
  
</script>
  