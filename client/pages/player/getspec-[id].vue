<template>
    <div>
      <input v-model="pk" placeholder="PK of record" @keydown.enter="send">
      <pre>{{ dataSpecPlayer }}</pre>
      <!-- <pre>{{ dtUpdate }}</pre> -->
      <!-- <div v-if="dataSpecPlayer" v-html="dataSpecPlayer.richText"></div> -->
      <div v-if="dataSpecPlayer">
        <q-editor v-model="dataSpecPlayer.richText" 
          :definitions="{
            upload: {
              tip: 'Upload',
              icon: 'cloud_upload',
              label: 'Upload',
              handler: update
            }
          }"
          :toolbar="[
            ['bold', 'italic', 'strike', 'underline'],
            ['undo', 'redo'],
            ['upload'],
            ['viewsource']
          ]"
        />
        <hr>
        
        <div v-if="dataSpecPlayer.files">
          <div v-for="file in dataSpecPlayer.files">
            <img :src="`${runtimeConfig.public.baseURL}/${file.path}`" width="400">
            <!-- Pozor: níže je "file" ne "file._id" -->
            <button @click="fceDelPicture(file)">Delete this picture</button>
          </div>
        </div>
        <button @click="fcePokus">Pokus</button>
      </div>     
    </div>
</template>
  
<script setup>
  import { ref }  from 'vue';

  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();
  const pk = ref('');
  const fileToDel = ref('');

  //const { data, refresh } = await useFetch( `/player/${pk.value}`, {  //Toto nefunguje
  const { data: dataSpecPlayer, refresh: refreshSpecPlayer } = await useFetch( () => '/player/' + route.params.id, {  
    method: 'get',
    baseURL: runtimeConfig.public.baseURL,
    //immediate: false,
    watch: false
  });

  const { data: dtUpdate, refresh: refreshUpdate } = await useFetch( () => '/player/' + pk.value, {
    method: 'put',
    baseURL: runtimeConfig.public.baseURL,
    immediate: false,
    watch: false,
    body: dataSpecPlayer
  });

  const { data: dataDeletedFile, refresh: delSpecFile } = await useFetch( () => '/playerFile/' + fileToDel.value, {  
    method: 'delete',
    baseURL: runtimeConfig.public.baseURL,
    immediate: false,
    watch: false
  });

  function send() {
    refreshSpecPlayer();
  }

  function update() {
    refreshUpdate();
  }

  function  fcePokus() {
    console.log("adsf");
    console.log(dataSpecPlayer);
    console.log(dataSpecPlayer.value);
    console.log(dataSpecPlayer.value.lName);
    dataSpecPlayer.value.lName = "xxx";
  }

  async function fceDelPicture(file) {
    console.log("file: " + file);

    dataSpecPlayer.value.files = dataSpecPlayer.value.files.filter( (value, index, array) => {
      return value !== file
    } )
    //nebo:
    // dataSpecPlayer.value.files = dataSpecPlayer.value.files.filter(function(value, index, array) {
    //   return value !== file
    // })

    fileToDel.value = file._id
    await delSpecFile();

    await refreshUpdate();
  }
</script>
  