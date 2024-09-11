<template>
    <div>
      <div>oDate: {{ oDate }}</div>
      <div>fDate: {{ fDate }}</div>
      <input v-model="fDate" type="date" placeholder="original date"/>
    </div>
  </template>
    
  <script setup>
  import { ref, computed } from 'vue';
  
  // Define model using Vue 3.4 feature
  const oDate = defineModel('oDate');
  
  // Computed property to handle input value and synchronization
  const fDate = computed({
    get() {
      // Convert ISO date to YYYY-MM-DD format for input field
      //return new Date(oDate.value).toISOString().split('T')[0];

      // if (oDate.value) {
      //   return new Date(oDate.value).toISOString().split('T')[0];
      // } else {
      //   return ''
      // }
      // ekvivalent:
      return (oDate.value) ? new Date(oDate.value).toISOString().split('T')[0] : '';
    },
    set(newValue) {
      // Convert input value to ISO format
      //oDate.value = new Date(newValue).toISOString();
      oDate.value = (newValue) ? new Date(newValue).toISOString() : oDate.value;
    }
  });

  </script>
  
