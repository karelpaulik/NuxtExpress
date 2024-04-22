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

    </div>
</template>
  
<script setup>
  import { ref, watch }  from 'vue';
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();

  //Component properties
  const props = defineProps({
    playerId: String, //kvůli mazání souborů
    playerFiles: Object
  })

  //Data for HTML rendering
  const dataPlayerFiles=ref(null)

  //Úvodní načtení dat
  await fceGetPlayerFiles()

  //Hlídání změn "props.playerFiles"
  watch( () => props.playerFiles,
    async() => {
      await fceGetPlayerFiles()
  })

  //--------------------------------------------------------------function definition------------------------------------------------
  //Načtení dat
  async function fceGetPlayerFiles() {
    dataPlayerFiles.value = props.playerFiles
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
    await usePutPlayer_files(props.playerId, dataPlayerFiles.value)
  }

</script>
  
