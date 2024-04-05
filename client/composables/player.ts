export const useDelPlayer = async(id: string) => {
  const runtimeConfig = useRuntimeConfig()

  const { data: dataDelSpecPlayer, refresh: delSpecPlayer } = await useFetch( () => '/player/' + id, {
    method: 'delete',
    baseURL: runtimeConfig.public.baseURL,
    //immediate: false,
    watch: false,
    //credentials: 'include'
  });

  return dataDelSpecPlayer.value;
}

export const useGetAllPlayers = async() => {
  const runtimeConfig = useRuntimeConfig()

  const { data: dataAllPlayer, refresh: updateAllPlayer } = await useFetch('/player', {
    method: 'get',
    baseURL: runtimeConfig.public.baseURL
  });

  return dataAllPlayer.value;
}