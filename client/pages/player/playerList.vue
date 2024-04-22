<template>
    <div>
      <!-- <pre>{{ dataAllPlayer }}</pre> -->
      <div v-for="rec in dataAllPlayer" :key="rec.id" >
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

        <PlayerDelBtn :playerToDel="rec._id" @response="async() => {await fceReadAllPlayer()}" />
        <q-btn color="primary" @click="async() => { await navigateTo('/player/player-' + rec._id) }" label="Move to record" />
        <hr>
      </div>
    </div>
</template>
  
<script setup>
  import {ref} from 'vue'
  //const runtimeConfig = useRuntimeConfig()
  const dataAllPlayer = ref(null)

  await fceReadAllPlayer()
  
  async function fceReadAllPlayer() {
    dataAllPlayer.value = await useGetAllPlayer()
  }
  
</script>
  