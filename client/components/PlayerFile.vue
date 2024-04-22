<template>
    <div>
        <!-- Zde předávám i "playerId" kvůli mazání souborů - propagace smazání souboru i do "Player" -->
        <PlayerFileList :playerId="playerId" :playerFiles="dataPlayerFiles"/>

        <!-- <div v-if="dataPlayerFiles"> -->
        <q-uploader
          :url="`${runtimeConfig.public.baseURL}/playerFile/${playerId}`"
          label="Individual upload"
          multiple
          style="max-width: 300px"
          field-name="file"
          ref="uploader"
          @uploaded="fceAfterPlayerFileUpload"
        />
        <!-- </div> -->

    </div>
</template>
  
<script setup>
  import { ref, reactive }  from 'vue';
  const runtimeConfig = useRuntimeConfig();
  const uploader = ref(null)    //Toto definováno, abych mohl po odeslání souborů na servery tyto soubory odstranit z uploaderu.

  //Component properties
  const props = defineProps({
    playerId: String
  })

  //Data for HTML rendering
  const dataPlayerFiles=ref(null)

  await fceGetPlayerFiles()

  //--------------------------------------------------------------function definition------------------------------------------------
  //Načtení player.files
  async function fceGetPlayerFiles() {
    const dataPlayer = await useGetPlayer(props.playerId)
    dataPlayerFiles.value = dataPlayer.files
  }

  //Upload souboru
  async function fceAfterPlayerFileUpload() {
    uploader.value.removeUploadedFiles()  //Odstranění souborů z uploaderu
    await fceGetPlayerFiles()
  }  

</script>
  
