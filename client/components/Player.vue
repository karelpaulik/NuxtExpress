<template>
    <div>
        <!-- <pre style="font-size: smaller">{{ dataPlayer }}</pre> -->
        <div class="bg-grey-4" >
          <q-btn @click="fceCreatePlayer" label="Create new record" no-caps flat />
          <q-btn @click="fceUpdatePlayer" label="Update record" no-caps flat />
          <PlayerDelBtn :playerToDel="dataPlayer._id" @response="() => { navigateTo('/player/playerList') }" />
          <q-btn label="Update and close" @click="() => { fceUpdatePlayer(); emit ('closeAndUpdate') }" no-caps flat />
          <q-btn label="Close not update" @click="() => { console.log('begin'); emit('closeNotUpdate'); console.log('end') }" no-caps flat />
        </div>

        <form @submit.prevent="send">
          <q-card>
            <input v-model="dataPlayer.fName" placeholder="fName" />
            <input v-model="dataPlayer.lName" placeholder="lName" />
            <input v-model="dataPlayer.age" placeholder="age" type="number"/>
            <q-editor v-model="dataPlayer.richText" min-height="5rem" />
            <!-- checkbox ano/ne -->
            <div><q-checkbox v-model="dataPlayer.isActive" label="isActive" /></div>
            <!-- checkbox array -->
            <q-checkbox v-model="dataPlayer.city" val="brno" label="Brno" />
            <q-checkbox v-model="dataPlayer.city" val="praha" label="Praha" />
            <q-checkbox v-model="dataPlayer.city" val="olomouc" label="Olomouc" />
            <div>city: {{ dataPlayer.city }}</div>
            <!-- select -->
            <q-select v-model="dataPlayer.prefColor" :options="['red', 'green', 'bluee']" label="prefColor" clearable outlined />
            <!-- radio -->
            <div>prefShape: {{ dataPlayer.prefShape }}</div>
            <div class="q-gutter-sm">
              <q-radio v-model="dataPlayer.prefShape" val="line" label="Line" />
              <q-radio v-model="dataPlayer.prefShape" val="rectangle" label="Rect" />
              <q-radio v-model="dataPlayer.prefShape" val="ellipse" label="Elipse" />
            </div>
            <!-- file/files -->
            <!-- <q-file v-model="dataPlayer.file" label="Standard" clearable outlined multiple /> -->
          </q-card>
        </form>

        <PlayerFile :playerId="dataPlayer._id" v-if="dataPlayer._id" @update="(x) => { dataPlayer.files = x }" />

    </div>
</template>
  
<script setup>
  import { ref }  from 'vue';
  //const route = useRoute();

  //Component properties
  const props = defineProps({
    playerId: String
  })

  //Component emit events
  const emit = defineEmits(['response', 'closeAndUpdate', 'closeNotUpdate'])

  //Data for HTML rendering
  const dataPlayer = ref({
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
  if (props.playerId) {
    await fceGetPlayer(props.playerId)   //Zde musí být na začátku "await", jinak program padne.
  }

  //Načtení záznamu
  async function fceGetPlayer(id) {
    dataPlayer.value = await useGetPlayer(id)
  }

  //Vytvoření nového záznamu
  async function fceCreatePlayer() {
    dataPlayer.value = await usePostPlayer(dataPlayer.value)
    // const x = await usePostPlayer(dataPlayer.value)
    // await navigateTo('/player/player-' + x._id)
  }

  //Update existujícího záznamu
  async function fceUpdatePlayer() {
    dataPlayer.value = await usePutPlayer(dataPlayer.value._id, dataPlayer.value)
  }

</script>
  
