<template>
    <div>
      <Player :playerId="playerId" />

    </div>
</template>
  
<script setup>
  import { ref }  from 'vue';
  const route = useRoute();

  const playerId = ref(null);

  //Kontrola, zda bude nový záznam, nebo zobrazení již existujícího
  if (route.params.id) {   
    playerId.value = route.params.id
  }

</script>