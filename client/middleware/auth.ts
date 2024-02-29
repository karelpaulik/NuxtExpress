export default defineNuxtRouteMiddleware( async(to, from) => {
    const runtimeConfig = useRuntimeConfig();

    let authStatus = 0;
            
    const { data, refresh } = await useFetch('/api/auth', {
        method: 'get',
        baseURL: runtimeConfig.public.baseURL,
        headers: useRequestHeaders(['cookie']),
        credentials: 'include',
        onResponse({response}) {
            //console.log(response.status);
            authStatus = response.status;
        }
    });
    
    if (authStatus==200) {
        return;
    } else {
        //return abortNavigation();
        return navigateTo('/userAuth/login');
    }

})