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
            <button @click="fceDelPicture(rec._id, file._id)">Delete this picture</button>
          </div>
        </div>
        <button @click="fceDelThisRecord(rec._id)">Delete this record</button>
        <button @click="fceMoveToRecord(rec._id)">Move to record</button>
        <hr>
      </div>
    </div>
  </template>
  
  <script setup>
  import {ref, reactive} from 'vue'
  const runtimeConfig = useRuntimeConfig()

  let delUser = ref("");

  const { data: dataAllPlayer, refresh: listAllPlayer } = await useFetch('/player', {
    method: 'get',
    baseURL: runtimeConfig.public.baseURL
  });

  const { data: dataDelSpecPlayer, refresh: delSpecPlayer } = await useFetch( () => '/player/' + delUser.value, {
    method: 'delete',
    baseURL: runtimeConfig.public.baseURL,
    immediate: false,
    watch: false,
    credentials: 'include'
  });

  async function fceDelThisRecord(id) {
    delUser.value=id;
    await delSpecPlayer();
    await listAllPlayer();
  }

  async function fceMoveToRecord(id) {
    await navigateTo('/player/getspec-' + id);
  }

  function fceDelPicture(player, file) {
    console.log("player: " + player, "file: " + file);
  }

  console.log(dataAllPlayer);
  
  </script>
  