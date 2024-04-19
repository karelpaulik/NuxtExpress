<template>
    <div style="display: inline">
        <q-btn color="primary" @click="dialogBeforeDelRec = true" label="Delete this record" />
        <q-dialog v-model="dialogBeforeDelRec">
          <q-card>
            <q-card-section>
              <div class="text-h6">Do you want to delete the record? {{ playerToDel }}</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup @click="fceDelPlayer(playerToDel)" />
              <q-btn flat label="Cancel" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>
</template>
  
<script setup>
  import {ref} from 'vue'

  //Component properties
  const props = defineProps({
    playerToDel: String
  })

  //Component emit events
  const emit = defineEmits(['response'])

  const dialogBeforeDelRec = ref(false)

  //Smazaání záznamu
  async function fceDelPlayer(id) {
    console.log("Record to delete: ", id)
    await useDelPlayer(id)
    emit ('response')
  }  
</script>
  