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
        :rows="dataAllBook"
        :columns="columns"
        row-key="_id"
        :pagination="initialPagination"
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

const initialPagination = ref({
  sortBy: 'title',  //column name
  descending: false, //Is sorting in descending order?  true/false
  page: 1,          //page number
  rowsPerPage: 8,  // Set the number of rows to display initially
});

//Definice sloupců tabulky
const columns=[
  {name: '_id', align: 'center', label: 'Id', field: '_id', sortable: true},
  {name: 'title', align: 'center', label: 'Titulek', field: 'title', sortable: true},
  {name: 'author', align: 'center', label: 'Autor', field: 'author', sortable: true},
  {name: 'createDate', align: 'center', label: 'Datum vytvoření', field: 'createDate', sortable: true, 
   format: val => (val) ? new Date(val).toLocaleDateString(): ''},  //if: createDate exist then format this date, else: print empty string
  {name: 'keyWord', align: 'center', label: 'Kl. slova', field: 'keyWord', sortable: true,
   format: val => val.map(item => item + ' ' + item).join(', ')}, //Formátuj každý item pole, a pak zobraz oddělené čárkou  
  {name: 'actions', align: 'center', label: 'Akce', field: 'actions', sortable: true},
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

