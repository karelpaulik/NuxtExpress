<template>
    <div>
        <!-- <pre style="font-size: small">{{ dataBook }}</pre> -->
        <q-btn color="primary" @click="fceCreateBook" label="Create new record" />
        <q-btn color="primary" @click="fceUpdateBook" label="Update record" />
        <q-btn color="primary" @click="fceDeleteBook" label="Delete record" />

        <form @submit.prevent="send">
          <q-card>
            <input v-model="dataBook.title" placeholder="title" type="text"/>
            <input v-model="dataBook.author" placeholder="author" />
            <input v-model="dataBook.year" placeholder="year" type="number"/>
            <div><q-checkbox v-model="dataBook.isActive" label="isActive" /></div>
            <q-checkbox v-model="dataBook.keyWord" val="Drama" label="Drama" />
            <q-checkbox v-model="dataBook.keyWord" val="Komedie" label="Komedie" />
            <q-checkbox v-model="dataBook.keyWord" val="Akční" label="Akční" />
          </q-card>
        </form>
    </div>
</template>
  
<script setup>
  import { ref }  from 'vue';
  const route = useRoute();

  //Data for HTML rendering
  const dataBook = ref({
    title: '',
    author: '',
    year: null,
    isActive: true,
    keyWord: []
  })

  //Kontrola, zda bude nový záznam, nebo zobrazení již existujícího
  if (route.params.id) {   
    await fceGetBook(route.params.id)   //Zde musí být na začátku "await", jinak program padne.
  }

  //Načtení záznamu
  async function fceGetBook(id) {
    dataBook.value = await useGetBook(id)
  }

  //Vytvoření nového záznamu
  async function fceCreateBook() {
    //dataPlayer.value = await usePostPlayer(dataPlayer.value)  //Nepoužívám, protože se nové "_id" nepřepíše do web. adresy.
    const x = await usePostBook(dataBook.value)
    await navigateTo('/book/book-' + x._id)
  }

  //Update existujícího záznamu
  async function fceUpdateBook() {
    dataBook.value = await usePutBook(dataBook.value._id, dataBook.value)
  }

  //Delete existujícího záznamu
  async function fceDeleteBook() {
    dataBook.value = await useDelBook(dataBook.value._id, dataBook.value)
    await navigateTo('/book/book-')
  }

</script>
  
