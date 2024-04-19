<template>
    <div>
        <!-- <div v-if="dataPlayer.files"> -->
        <div v-if="dataPlayerFiles">
          <div class="q-pa-xs">
            <div class="fit row justify-start items-stretch q-col-gutter-xs">            
                <div class="col-xs-12 col-sm-6 col-md-3 text-primary bg-secondary" v-for="file in dataPlayerFiles">
                  <q-card class="fit">
                    <q-card-section>  
                      <q-img
                        :src="`${runtimeConfig.public.baseURL}/${file.path}`"
                      >
                        <div class="absolute-bottom text-subtitle1 text-center">
                          {{ file.originalname }}
                        </div>
                      </q-img>
                    </q-card-section>
                    <q-separator />
                    <q-card-actions>  
                      <!-- Pozor: níže je "file" ne "file._id" -->
                      <q-btn @click="fceDelPlayerFile(file)" label="Del pict" />
                    </q-card-actions>
                  </q-card>
                </div>            
            </div>
          </div>
        </div>

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
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();
  const uploader = ref(null)    //Toto definováno, abych mohl po odeslání souborů na servery tyto soubory odstranit z uploaderu.
  const dataPlayerFiles=ref(null)

  //Component properties
  const props = defineProps({
    playerId: String
  })

  await fceGetPlayerFiles()

  //Načtení player.files
  async function fceGetPlayerFiles() {
    const dataPlayer = await useGetPlayer(props.playerId)
    dataPlayerFiles.value = dataPlayer.files
  }

  //Smazání souboru
  async function fceDelPlayerFile(file) {
    //Odstranění souborů z dataPlayerFiles
    dataPlayerFiles.value = dataPlayerFiles.value.filter( (value, index, array) => {
      return value !== file
    } )
    //Smazání souboru z kollekce souborů
    await useDelPlayerFile(file._id)

    //Aktualizace player
    //dataPlayer.value = await usePutPlayer(route.params.id, dataPlayer.value)
    await usePutPlayer_files(props.playerId, dataPlayerFiles.value)
  }

  //Upload souboru
  async function fceAfterPlayerFileUpload() {
    uploader.value.removeUploadedFiles()  //Odstranění souborů z uploaderu
    await fceGetPlayerFiles()
  }  

</script>
  
