<template>
    <div>
      <div class="text-h2">Login info</div>
      <button @click="refresh">refresh</button>
      <pre>{{ data }}</pre>
    </div>
</template>
  
<script setup>
    const runtimeConfig = useRuntimeConfig();
    //1. useRequestHeaders, headers   pro fetch na serveru - tj. aby správně fungoval i refresh přes F5
    //2. credentials: 'include'       pro fetch na klientu
    const { data, refresh } = await useFetch('/api/auth', {
        method: 'get',
        baseURL: runtimeConfig.public.baseURL,
        headers: useRequestHeaders(['cookie']),
        credentials: 'include'
    });
</script>