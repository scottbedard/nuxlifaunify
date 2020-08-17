import { ref } from '@nuxtjs/composition-api';
import axios from 'axios';

let refreshId = 0;

const currentUser = ref(null);
const currentUserIsLoading = ref(false);

/**
 * Manage the current user.
 */
export function useCurrentUser() {
  // authenticate
  const authenticateCurrentUser = async (credentials) => {
    const data = await axios.post('/.netlify/functions/user-login', credentials)
    
    console.log('authenticateCurrentUser!', data);

    return data;
  }

  // logout
  const logoutCurrentUser = async () => {
    await axios.post('/.netlify/functions/user-logout');

    currentUser.value = null;
  }

  // refresh
  const refreshCurrentUser = async () => {
    currentUserIsLoading.value = true;

    const id = ++refreshId;
    const response = await axios.get('/.netlify/functions/user-current');

    if (id === refreshId) {
      currentUserIsLoading.value = false;
      currentUser.value = response?.data?.user?.data || null;

      console.log(currentUser);
    }
  }

  return {
    authenticateCurrentUser,
    currentUser,
    currentUserIsLoading,
    logoutCurrentUser,
    refreshCurrentUser,
  };
}