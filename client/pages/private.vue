<template>
    <div>
      <h1>Private</h1>
    </div>
</template>

<script setup>
  definePageMeta({
      middleware: ['auth']
  });
</script>