<template>
    <div>
      <div class="text-h2">Logout</div>
      <pre>{{ data }}</pre>
    </div>
</template>
  
<script setup>
    const runtimeConfig = useRuntimeConfig();
    //const logedUser = useState('logedUser');
    //const logedUser = useLocalStorage('u-storage', {email: ''});
    const logedUser = useLogedUser();

    const { data } = await useFetch('/api/auth', {
        method: 'delete',
        baseURL: runtimeConfig.public.baseURL,
        headers: useRequestHeaders(['cookie']),
        credentials: 'include',
        onResponse({response}) {
            logedUser.value.email = "";
        }
    });
</script>