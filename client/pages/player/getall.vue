<template>
    <div>
      <pre>{{ dataAllPlayer }}</pre>
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
        <div v-if="rec.files">
          <div v-for="file in rec.files">
            <!-- <img :src="`http://localhost:5000/${file.path}`" width="400"> -->
            <img :src="`${runtimeConfig.public.baseURL}/${file.path}`" width="400">
          </div>
        </div>
        <PlayerDelBtn :playerToDel="rec._id" @response="async() => {await updateAllPlayer()}" />
        <button @click="async() => { await navigateTo('/player/getspec-' + rec._id) }">Move to record</button>
        <hr>
      </div>
    </div>
</template>
  
<script setup>
  import {ref} from 'vue'
  const runtimeConfig = useRuntimeConfig()

  //Buď useFetch přímo zde:
  // const { data: dataAllPlayer, refresh: updateAllPlayer } = await useFetch('/player', {
  //   method: 'get',
  //   baseURL: runtimeConfig.public.baseURL
  // });

  //Nebo useFetch umístěno v composables:
  const dataAllPlayer = ref(null)
  await updateAllPlayer()
  
  async function updateAllPlayer() {
    dataAllPlayer.value = await useGetAllPlayer()
  }
  
</script>
  