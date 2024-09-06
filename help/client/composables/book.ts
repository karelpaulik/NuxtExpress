export const usePostBook = async(body: object) => {
  const runtimeConfig = useRuntimeConfig()

  const { data , refresh } = await useFetch( () => '/api/book', {
    method: 'post',
    baseURL: runtimeConfig.public.baseURL,
    credentials: 'include',
    body: body
  });
  console.log("usePostBook: ", data.value)
  return data.value;
}

export const useGetAllBook = async() => {
  const runtimeConfig = useRuntimeConfig()

  const { data, refresh} = await useFetch( () => '/api/book', {
    method: 'get',
    baseURL: runtimeConfig.public.baseURL,
    credentials: 'include'
  });
  return data.value;
}

export const useGetBook = async(id: string) => {
  const runtimeConfig = useRuntimeConfig()

  const { data, refresh } = await useFetch( () => '/api/book/' + id, {  
    method: 'get',
    baseURL: runtimeConfig.public.baseURL,
    credentials: 'include',
  });

  return data.value;
}

export const usePutBook = async(id: string, body: object) => {
  const runtimeConfig = useRuntimeConfig()

  const { data, refresh } = await useFetch( () => '/api/book/' + id, {
    method: 'put',
    baseURL: runtimeConfig.public.baseURL,
    credentials: 'include',
    body: body
  });

  return data.value;
}


export const useDelBook = async(id: string) => {
  const runtimeConfig = useRuntimeConfig()

  const { data, refresh } = await useFetch( () => '/api/book/' + id, {
    method: 'delete',
    baseURL: runtimeConfig.public.baseURL,
    //immediate: false,
    //watch: false,
    credentials: 'include'
  });
  return data.value;
}
