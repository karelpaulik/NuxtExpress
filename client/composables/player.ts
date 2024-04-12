export const usePostPlayer = async(body: object) => {
  const runtimeConfig = useRuntimeConfig()

  const { data , refresh } = await useFetch( () => '/player', {
    method: 'post',
    baseURL: runtimeConfig.public.baseURL,
    body: body
  });
  console.log("usePostPlayer: ", data.value)
  return data.value;
}

export const useGetAllPlayer = async() => {
  const runtimeConfig = useRuntimeConfig()

  const { data, refresh} = await useFetch( () => '/player', {
    method: 'get',
    baseURL: runtimeConfig.public.baseURL
  });
  return data.value;
}

export const useGetPlayer = async(id: string) => {
  const runtimeConfig = useRuntimeConfig()

  const { data, refresh } = await useFetch( () => '/player/' + id, {  
    method: 'get',
    baseURL: runtimeConfig.public.baseURL,
  });

  return data.value;
}

export const usePutPlayer = async(id: string, body: object) => {
  const runtimeConfig = useRuntimeConfig()

  const { data, refresh } = await useFetch( () => '/player/' + id, {
    method: 'put',
    baseURL: runtimeConfig.public.baseURL,
    body: body
  });

  // const { data: dataGet, refresh: reftGet } = await useFetch( () => '/player/' + id, {
  //   method: 'get',
  //   baseURL: runtimeConfig.public.baseURL
  // });
  // return dataGet.value;

  return data.value;
}

export const useDelPlayer = async(id: string) => {
  const runtimeConfig = useRuntimeConfig()

  const { data, refresh } = await useFetch( () => '/player/' + id, {
    method: 'delete',
    baseURL: runtimeConfig.public.baseURL,
    //immediate: false,
    //watch: false,
    //credentials: 'include'
  });
  return data.value;
}

//playerFile----------------------------------------------------

export const useDelPlayerFile = async(id: string) => {
  const runtimeConfig = useRuntimeConfig()

  const { data, refresh } = await useFetch( () => '/playerFile/' + id, {  
    method: 'delete',
    baseURL: runtimeConfig.public.baseURL,
  });
  return data.value;
}