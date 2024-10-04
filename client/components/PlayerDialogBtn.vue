<template>
    <div style="display: inline">
        <q-btn color="primary" @click="dialogPlayer = true" label="Player dialog" />
        <q-dialog v-model="dialogPlayer" persistent>
          <q-card style="max-width: 1000px; width: 100%;">
            <q-card-section>
              <Player :playerId="playerId" @closeAndUpdate="fceCloseDialog" @closeNotUpdate="dialogPlayer = false" />
            </q-card-section>
          </q-card>
        </q-dialog>
    </div>
</template>
  
<script setup>
    import {ref} from 'vue'

    //Component properties
    const props = defineProps({
        playerId: String
    })

    //Component emit events
    const emit = defineEmits(['response'])

    const dialogPlayer = ref(false)

    function fceCloseDialog () {
        dialogPlayer.value = false
        emit ('response')
    }
</script>
  