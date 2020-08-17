import axios from 'axios';
import { ref } from '@nuxtjs/composition-api';

/**
 * Create a user
 */
export function useCreateUser() {
  const createUserIsLoading = ref(false);

  const createUser = async (credentials) => {
    createUserIsLoading.value = true;

    const user = axios.post('/.netlify/functions/user-create', credentials);
    
    user.finally(() => {
      createUserIsLoading.value = false;
    });
    
    return user;
  }

  return {
    createUser,
    createUserIsLoading,
  };
}