<template>
    <div>
      <div class="text-h2">Private</div>
    </div>
</template>

<script setup>
  definePageMeta({
      middleware: ['auth']
  });
</script>