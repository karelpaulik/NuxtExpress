<template>
    <div>
        <pre style="font-size: small">{{ fd }}</pre>
        <form @submit.prevent="send">
          <q-card>
            <input v-model="fd.fName" placeholder="fName" />
            <input v-model="fd.lName" placeholder="lName" />
            <input v-model="fd.age" placeholder="age" type="number"/>
            <q-editor v-model="fd.richText" min-height="5rem" />
            <!-- checkbox ano/ne -->
            <div><q-checkbox v-model="fd.isActive" label="isActive" /></div>
            <!-- checkbox array -->
            <q-checkbox v-model="fd.city" val="brno" label="Brno" />
            <q-checkbox v-model="fd.city" val="praha" label="Praha" />
            <q-checkbox v-model="fd.city" val="olomouc" label="Olomouc" />
            <div>city: {{ fd.city }}</div>
            <!-- select -->
            <q-select v-model="fd.prefColor" :options="['red', 'green', 'bluee']" label="prefColor" clearable outlined />
            <!-- radio -->
            <div>prefShape: {{ fd.prefShape }}</div>
            <div class="q-gutter-sm">
              <q-radio v-model="fd.prefShape" val="line" label="Line" />
              <q-radio v-model="fd.prefShape" val="rectangle" label="Rect" />
              <q-radio v-model="fd.prefShape" val="ellipse" label="Elipse" />
            </div>
            <!-- file/files -->
            <!-- <q-file v-model="fd.file" label="Standard" clearable outlined multiple /> -->
          </q-card>
        </form>

        <div v-if="fd.files">
          <div v-for="file in fd.files">
            <img :src="`${runtimeConfig.public.baseURL}/${file.path}`" width="400">
            <!-- Pozor: níže je "file" ne "file._id" -->
            <button @click="fceDelPicture(file)">Delete this picture</button>
          </div>
        </div>

        <div v-if="fd._id">
        <q-uploader
          :url="`${runtimeConfig.public.baseURL}/playerFile/${fd._id}`"
          label="Individual upload"
          multiple
          style="max-width: 300px"
          field-name="file"
          ref="uploader"
          @uploaded="uploadFiles"
        />
        </div>

        <q-btn color="primary" @click="createPlayer" label="Create new record" />
        <q-btn color="primary" @click="update" label="Update record" />
        <PlayerDelBtn :playerToDel="fd._id" @response="() => { navigateTo('/player/getall') }" />
    </div>
</template>
  
<script setup>
  import { ref, reactive }  from 'vue';
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();

  //Toto definováno, abych mohl po odeslání souborů na servery tyto soubory odstranit z uploaderu.
  const uploader = ref(null);

  const fd = ref({
    //Pozor je rozdíl, jestli u stringu zadám jako počáteční hodnotu: '', nebo null
    //Pozor, stejně tak je rozdíl u čísla
    //_id: '',
    fName: '',
    lName: '',
    age: null,
    richText: '',
    isActive: false,  //důležité: určuje def. hodnotu. Pokud nebude true/false, ale bude '' tak bude hodnota nezadaná.
    city: [],
    prefColor: '',
    prefShape: ''
    //file: null
  })

  //Kontrola, zda bude nový záznam, nebo zobrazení již existujícího
  if (route.params.id) {   
    fd.value = await useGetPlayer(route.params.id)
  }

  //Vytvoření nového záznamu
  async function createPlayer() {
    //fd.value = await usePostPlayer(fd.value)  //Nepoužívám, protože se nové "_id" nepřepíše do web. adresy.
    const x = await usePostPlayer(fd.value)
    await navigateTo('/player/player-' + x._id)
  }

  //Update existujícího záznamu
  async function update() {
    fd.value = await usePutPlayer(fd.value._id, fd.value)
  }

  //Smazání souboru
  async function fceDelPicture(file) {
    //Odstranění souborů z fd
    fd.value.files = fd.value.files.filter( (value, index, array) => {
      return value !== file
    } )
    //Smazání souboru z kollekce souborů
    await useDelplayerFile(file._id)
    //Aktualizace player
    fd.value = await usePutPlayer(route.params.id, fd.value)
  }

  async function uploadFiles() {
    uploader.value.removeUploadedFiles()  //Odstranění souborů z uploaderu
    fd.value = await useGetPlayer(route.params.id)
  }  

</script>
  
