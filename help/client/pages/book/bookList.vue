<template>
    <div>
      <!-- <pre>{{ dataAllBook }}</pre> -->
       
      <!-- <div>Výpis záznamů formou: záznam po záznamu</div> -->
      <!-- <div v-for="rec in dataAllBook" :key="rec._id" >
        <div>Id: {{ rec._id }}</div>
        <div>title: {{ rec.title }}</div>
        <div>author: {{ rec.author }}</div>
        <div>year: {{ rec.year }}</div>
        <div>isActive: {{ rec.isActive }}</div>
        <div>keyWord: {{ rec.keyWord }}</div>
        <q-btn color="primary" @click="async() => { await navigateTo('/book/book-' + rec._id) }" label="Move to record" />
        <hr>
      </div> -->

      <!-- <div>Výpis záznamů formou tabulky</div> -->
      <div class="q-pa-md">
        <q-table
          title="Books"
          :rows=dataAllBook
          :columns="columns"
          row-key="_id"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn label="Action" color="primary" @click="fceAkceSeZaznamem(props.row)" />
              <q-btn color="primary" @click="async() => { await navigateTo('/book/book-' + props.row._id) }" label="Move to record" />
            </q-td>
          </template>
        </q-table>
      </div>

    </div>
</template>
  
<script setup> 
  import {ref} from 'vue'
  const dataAllBook = ref(null)

  //Definice sloupců tabulky
  const columns=[
            {name: 'prvni', align: 'center', label: 'prvni sloupec', field: '_id', sortable: 'true'},
            {name: 'druhy', align: 'center', label: 'druhy sloupec', field: 'title', sortable: 'true'},
            {name: 'treti', align: 'center', label: 'treti sloupec', field: 'author', sortable: 'true'},
            {name: 'actions', align: 'center', label: 'ctvrty sloupec', field: 'actions', sortable: 'true'},
          ]
  
  function fceAkceSeZaznamem(row) {
    alert(`Titulek je: ${row.title}`);
  }

  //Data for HTML rendering
  await fceReadAllBook()
  
  //Načtení záznamů
  async function fceReadAllBook() {
    dataAllBook.value = await useGetAllBook()
  }
  
</script>
  