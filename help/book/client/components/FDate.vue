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
      //Both folowing does the same.
      return new Date(oDate.value).toISOString().split('T')[0];
      //return new Date(oDate.value).toLocaleDateString('en-CA');
    },
    set(newValue) {
      // Convert input value to ISO format
      oDate.value = new Date(newValue).toISOString();
    }
  });

  </script>
  