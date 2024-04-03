export const useDelPlayer = async(id: string) => {
    const runtimeConfig = useRuntimeConfig()

    const { data: dataDelSpecPlayer, refresh: delSpecPlayer } = await useFetch( () => '/player/' + id, {
        method: 'delete',
        baseURL: runtimeConfig.public.baseURL,
        //immediate: false,
        watch: false,
        //credentials: 'include'
      });

    return dataDelSpecPlayer;
  }