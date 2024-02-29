export const useLogedUser = () => {
    return useLocalStorage('user-storage', {email: ''});
  }