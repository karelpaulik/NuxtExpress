<template>
    <div>
      <!-- <pre style="font-size: smaller">{{ dataPlayerFiles }}</pre> -->
        <!-- <div v-if="dataPlayer.files"> -->
        <div v-if="dataPlayerFiles">
          <div class="q-pa-xs">
            <div class="fit row justify-start items-stretch q-col-gutter-xs">            
                <div class="col-xs-12 col-sm-6 col-md-3 text-primary bg-secondary" v-for="file in dataPlayerFiles">
                  <q-card class="fit">
                    <q-card-section>  
                      <a :href="`${runtimeConfig.public.baseURL}/${file.path}`" target="_blank">
                        <q-img
                          :src="`${runtimeConfig.public.baseURL}/${file.path}`"
                        >
                          <div class="absolute-bottom text-subtitle1 text-center">
                            {{ file.originalname }}
                          </div>
                        </q-img>
                      </a>
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
  const runtimeConfig = useRuntimeConfig();

  //Component properties
  const props = defineProps({
    playerId: String, //kvůli mazání souborů
    playerFiles: Object
  })

  //Component emit events
  const emit = defineEmits(['update'])

  //Data for HTML rendering
  const dataPlayerFiles=ref(null)

  //Úvodní načtení dat
  dataPlayerFiles.value = props.playerFiles

  //Hlídání změn "props.playerFiles"
  watch( () => props.playerFiles,
    () => {
      dataPlayerFiles.value = props.playerFiles
  })

  //Hlídání změn "dataPlayerFiles"
  watch( dataPlayerFiles, () => {
    emit ('update', dataPlayerFiles.value)
  } )

  //--------------------------------------------------------------function definition------------------------------------------------
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
  
